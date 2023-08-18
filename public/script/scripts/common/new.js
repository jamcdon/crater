let tagsList = document.getElementById("tags-list-span")
let imageList = document.getElementById("image-list-span")
let tagsForm = document.getElementById("tags")
let publicForm= document.getElementById("public")
let imageForm= document.getElementById("image")
let titleForm= document.getElementById("title")
let validationText = document.getElementById("validation")

function setTags() {
    let tags = tagsForm.value.split(",")
    for (let i in tags){
        if (tags[i][0] == " "){
            tags[i] = tags[i].substring(1)
        }
        if (tags[i][tags[i].length-1] == " "){
            tags[i] = tags[i].substring(0, tags[i].length - 1)
        }
    }

    let tagsText = ""

    for (i in tags){
        if (i != tags.length - 1){
            tagsText += `"${tags[i]}", `
        }
        else {
            tagsText += `"${tags[i]}"`
        }
    }
    return tagsText
}

// \/ xhr adding options to Primary Image/Tags \/

function handleResponse(isReady, xhrObj, key, label, current) {
    if (isReady){
        json = JSON.parse(xhrObj.responseText);
        setInnerHTML(json, key, label, current);
    }
    else {
        setTimeout(() => {
            handleResponse((xhrObj.readyState === 4 && xhr.status === 200), xhrObj)
        }, 350)
    }
}

function setInnerHTML(xhrResponse, passedKey, passedLabel, current) {
    if (passedLabel == "tags" && setTag[passedKey] == true){
        setTag[passedKey] = false;
        parseAndUpdate()
    }
    else if (passedLabel == "image" && setImage[passedKey] == true){
        setImage[passedKey] = false;
        parseAndUpdate()
    }

    function parseAndUpdate() {
        if (current != ""){
            current = current.substring(current.indexOf("\n") + 1);
            current = current.substring(current.lastIndexOf("\n") + 1, -1);
        }
        for (item in xhrResponse){
            current +=`<option value="${xhrResponse[item]}"></option>\n`;
        }
        let optionList = `<datalist id="${passedLabel}-list">\n${current}</datalist>`;
        if (passedLabel == "tags"){
            tagsList.innerHTML = optionList;
        }
        else if (passedLabel == "image"){
            imageList.innerHTML = optionList;
        }

        if(xhrResponse[0] != undefined){
            passedKey = Number(passedKey) + 1
            setImage[passedKey] = true;
            let nextXHR = new XMLHttpRequest();
            nextXHR.onreadystatechange = () => {
                setTimeout(() => {
                    getCurrentlyUsedOptions(passedLabel, optionList, passedKey)
                }, 350)
            }
            nextXHR.open('GET', `/api/v1/${passedLabel}/paginate/${passedKey}`, true)
            nextXHR.send()
        }
    }
}

async function getCurrentlyUsedOptions(label, current, key){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        setTimeout(() => {
            handleResponse((xhr.readyState === 4 && xhr.status === 200), xhr, key, label, current)
        }, 350)
    }
    xhr.open('GET', `/api/v1/${label}/paginate/${key}`, true)
    xhr.send()
}

let setImage = {
    1: true
}
let setTag = {
    1: true
}

getCurrentlyUsedOptions("image", imageList.innerHTML, Object.keys(setImage).pop())
getCurrentlyUsedOptions("tags", tagsList.innerHTML, Object.keys(setTag).pop())