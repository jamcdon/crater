var editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");

let formDiv = document.getElementById("form-div")
let previewDiv = document.getElementById("preview-div")
let titlePreview = document.getElementById("title-preview")
let titleForm= document.getElementById("title")
let imagePreview = document.getElementById("image-preview")
let imageForm= document.getElementById("image")
let imageList = document.getElementById("image-list-span")
let publicPreview = document.getElementById("public-preview")
let publicForm= document.getElementById("public")
let tagsPreview = document.getElementById("tags-preview")
let tagsForm = document.getElementById("tags")
let tagsList = document.getElementById("tags-list-span")
let yamlPreview = document.getElementById("yaml-preview")
let previewButtonDiv = document.getElementById("preview-buttons")
let formButtonDiv = document.getElementById("form-buttons")

async function uploadOrFail(){

}

function setPreview(){
    titlePreview.innerHTML = titleForm.value;
    imagePreview.innerHTML = imageForm.value;
    publicPreview.innerHTML = (publicForm.checked ? "Public" : "Private");

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