import axios from 'axios'
import { JSDOM } from 'jsdom'
import puppeteer, { Browser } from 'puppeteer'
import { BlobObject } from '../models'

const defaultImage = process.env.MINIO_IMAGE_IMAGE_DEFAULT as string;

const puppetPage = async (url: string): Promise<[JSDOM, Browser] | [undefined, undefined]> => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: [
        '--no-sandbox',
        '--headless',
        '--disable-gpu',
        '--disable-dev-shm-usage'
        ]
    })

    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle0'})

    const bodyHandle = await page.$('body')
    const html = await page.evaluate(body => body?.innerHTML, bodyHandle)

    if (html != undefined){
        return [new JSDOM(html), browser]
    }
    browser.close()
    return [undefined, undefined]
}

const axiosPage = async (url: string): Promise<JSDOM | undefined> => {
    const html = axios
        .get(url)
        .then(res => res.data)
        .catch((error: any) => {
            console.log(`axios error: ${error}`)
            return undefined
        })
    return html
}

const scrapeImageUrl = async (jsDom: JSDOM, browser: Browser | undefined, attribute: string):Promise<string | undefined> => {
    let domDocument = jsDom.window.document

    let domDocImgs = domDocument.querySelectorAll('img')

    for (let key  in Object.keys(domDocImgs)){
        const img = domDocImgs[key]

        if (
            img != null
            && !img.getAttribute('src')?.includes("cookielaw")
            && !img.getAttribute('src')?.includes('t.co')
            && !img.getAttribute('src')?.includes('twitter')
        ){
            if (browser != null){
                await browser.close()
            }
            const imgSrc = img.getAttribute(attribute)
            if (imgSrc != undefined){
                return imgSrc
            }
        }
    }
    if (browser != undefined){
        await browser.close()
    }
    return undefined
}

const setImageImageFromUrl = async(imgSrc: string, imageName: string): Promise<boolean> => {
    const imageDownload = await axios({
        url: imgSrc,
        method: 'GET',
        responseType: 'arraybuffer'
    })

    const imageImage = Buffer.from(imageDownload.data, 'binary')
    if (imageImage.length < 200){
        return false
    }
    const imageImageObject = new BlobObject("image", `${imageName}.png`, imageImage.length, imageImage)
    return await imageImageObject.upload()
}

export const scrapeImage = async (query: string): Promise<boolean> => {
    let [scrapedDom, browser] = await puppetPage(`https://hub.docker.com/search?q=${query}`)
    let imgSrc: string | undefined = undefined
    let success = false

    if (scrapedDom != undefined){
        imgSrc = await scrapeImageUrl(scrapedDom, browser, 'src')
    }
    else {
        scrapedDom = await axiosPage(`https://commons.wikimedia.org/w/index.php?search=${query}&title=Special:MediaSearch&go=Go&type=image&filemime=svg`)
        if (scrapedDom != undefined){
            imgSrc = await scrapeImageUrl(scrapedDom, undefined, 'data-src')
        }
    }
    if (imgSrc != undefined){
        success = await setImageImageFromUrl(imgSrc, query)
    }
    if (!success){
        const imageImageObject = new BlobObject("image", `${query}.png`, 0, null)
        success = await imageImageObject.copy(`${defaultImage}.png`)
    }
    return success
}