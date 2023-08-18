function addYamlDiv(index) {
    document.getElementById(`span${index}`).innerHTML = `
<input type="text" placeholder="file name" class="form-control w-25 mb-2" id="title${index}">
<div id="yaml${index}" style="height:50vh;" class="border border-primary"></div>`
}

async function uploadOrFail() {
    const tagsText = setTags()

    let reqBody = `{"title": "${titleForm.value}", "imageName": "${imageForm.value}", "tags": [${tagsText}], "public": ${publicForm.checked}, `
    for (const [index, contents] of Object.entries(newYamls)){
        const fileName = document.getElementById(`title${index}`).value
        const yamlVal = contents.getValue().replace(/\n/g, '\\n').replace(/"/g, '\\"')

        // some form of validation needs to go here- likely a separate function we can call that returns errors to html

        if (index == 0){
            reqBody += `"yaml": "${yamlVal}", "yamlTitle": "${fileName}", `
        }
        else if (Number(index) == 1){
            if (Number(index) + 1 == Object.keys(newYamls).length){
                reqBody += `"yamls": { "${fileName}": "${yamlVal}"}, `
            }
            else {
                reqBody += `"yamls": { "${fileName}": "${yamlVal}", `
            }
        }
        else if (Number(index) + 1 == Object.keys(newYamls).length){
            reqBody += `"${fileName}": "${yamlVal}"}, `
        }
        else {
            const yamlVal = (`${fileName}: ${contents.getValue().replace(/\n/g, '\\n').replace(/"/g, '\\"')}`)
            reqBody += `"${fileName}": "${yamlVal}", `
        }
    }

    reqBody = reqBody.substring(0, reqBody.length - 2);
    reqBody += "}";

    let xhr = new XMLHttpRequest

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                let jsonResponse = JSON.parse(xhr.response)
                document.location.href=`/scripts/manifest/view/${jsonResponse._id}`
            }
            else if (xhr.status === 400){
                //server error somewhere
                let urlImage = imageForm.value.replace(/ /g, "+").replace(/\//g, "-")
                validationText.innerHTML = `${xhr.response} - Does the Image exist? Check <a href="/images/view/${urlImage}">here</a>`
            }
            else if (xhr.status === 401){
                //user not logged in
                validationText.innerHTML = `${xhr.response}`
            }
        }
    }

    xhr.open('POST', '/api/v1/manifest/')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}

potentialYamls = [0, 1, 2, 3, 4, 5, 6, 7]

function addYaml(){
    const index = potentialYamls.shift()
    if (index == undefined){
        document.getElementById("add-error").innerHTML = "You have reached the maximum of 8 files"
        return
    }
    addYamlDiv(index)
    newYamls[index] = ace.edit(`yaml${index}`)
    newYamls[index].session.setMode("ace/mode/yaml")
}

let newYamls = {}

addYaml()