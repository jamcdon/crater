var editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");

let formDiv = document.getElementById("form-div")
let previewDiv = document.getElementById("preview-div")
let titlePreview = document.getElementById("title-preview")
let titleForm= document.getElementById("title")
let imagePreview = document.getElementById("image-preview")
let imageImagePreview = document.getElementById("image-image-preview")
let imageForm= document.getElementById("image")
let imageList = document.getElementById("image-list-span")
let publicForm= document.getElementById("public")
let tagsPreview = document.getElementById("tags-preview")
let tagsForm = document.getElementById("tags")
let tagsList = document.getElementById("tags-list-span")
let yamlPreview = document.getElementById("yaml-preview")
let previewButtonDiv = document.getElementById("preview-buttons")
let formButtonDiv = document.getElementById("form-buttons")
let validationText = document.getElementById("validation")

async function uploadOrFail(){
    let tagsText = ""
    let tags = setTags()
    for (i in tags){
        if (i != tags.length - 1){
            tagsText += `"${tags[i]}", `
        }
        else {
            tagsText += `"${tags[i]}"`
        }
    }

    let reqBody = `{"title": "${titleForm.value}", "imageName": "${imageForm.value}", "tags": [${tagsText}], "public": ${publicForm.checked}, "yaml": "${editor.getValue().replace(/\n/g, '\\n')}"}`

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                let jsonResponse = JSON.parse(xhr.response)
                document.location.href=`/scripts/compose/view/${jsonResponse._id}`
            }
            else if (xhr.status === 400){
                //server error somewhere
                let urlTitle = titleForm.value.replace(/ /g, "+").replace(/\//g, "-")
                validationText.innerHTML = `${xhr.response} - Does the Image exist? Check <a href="/images/view/${urlTitle}">here</a>`
            }
            else if (xhr.status === 401){
                //user not logged in
                validationText.innerHTML = `${xhr.response}`
            }
        }
    }

    xhr.open('POST', "/api/v1/compose/")
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}

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
    return tags
}

function setPreview(){
    titlePreview.innerHTML = titleForm.value;
    imagePreview.innerHTML = `&nbsp;${imageForm.value}`;

    tagsList = setTags()
    let tagsPreviewUl = "<ul class='d-inline-flex'>"
    for (let i in tagsList){
        tagsPreviewUl += `<li class="d-inline-flex mx-3">${tagsList[i]}</li>`
    }
    tagsPreviewUl += '</ul>'

    tagsPreview.innerHTML = tagsPreviewUl
    imageImagePreview.src = `${minioPublic}/image/${imageForm.value}.png`

    editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
    });
    editor.renderer.$cursorLayer.element.style.display = "none"

    formDiv.style = "height:0;";
    formButtonDiv.style = "height:0;";
    previewDiv.style = "";
    previewButtonDiv.style = "";
    formDiv.className = "invisible"
    formButtonDiv.className = "invisible"
    previewDiv.className="visible"
    previewButtonDiv.className="visible"
}

function setEdit(){
    editor.setOptions({
        readOnly: false,
        highlightActiveLine: true,
    });
    editor.renderer.$cursorLayer.element.style.display = ""

    formDiv.className="d-flex flex-wrap justify-content-between w-100"
    formButtonDiv.className="d-flex flex-wrap align-items-center justify-content-left justify-content lg-start"
    formDiv.style = "";
    formButtonDiv.style = "";
    previewButtonDiv.style = "height:0;";
    previewDiv.style = "height:0;";
    previewDiv.className="invisible"
    previewButtonDiv.className="invisible"
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