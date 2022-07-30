import { randpix, RandpixColorScheme, Symmetry, ColorScheme } from 'randpix'
import * as crypto from 'crypto'

export const generateImage = (): {buffer: Buffer, size: number} => {
    const colors: Array<ColorScheme> = [
        RandpixColorScheme.BLOOD,
        RandpixColorScheme.BLOOD_MOON,
        RandpixColorScheme.BLUE,
        RandpixColorScheme.CYBERPUNK,
        RandpixColorScheme.DARKULA,
        RandpixColorScheme.DIAMOND,
        RandpixColorScheme.GERMANY,
        RandpixColorScheme.GOLD_ORE,
        RandpixColorScheme.ICE,
        RandpixColorScheme.LAVA_POOL,
        RandpixColorScheme.MAGMA,
        RandpixColorScheme.PURPLE_SOLARIZED,
        RandpixColorScheme.RETROWAVE,
        RandpixColorScheme.SKY
    ]

    const randomColor = Math.floor(Math.random() * (colors.length + 1))

    const pixelGen = randpix({
        colorScheme: colors[randomColor],
        size: 8,
        scale: (Math.floor(Math.random() * 10) + 30),
        symmetry: Symmetry.VERTICAL,
        seed: crypto.randomBytes(32).toString('base64'),
        colorBias: 15,
        grayscaleBias: false
    })

    const pixel = pixelGen()
    const pixelBuffer = pixel.toBuffer('image/png')

    return {
        buffer: pixelBuffer,
        size: pixelBuffer.byteLength
    }
}