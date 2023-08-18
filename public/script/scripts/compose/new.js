var editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");

let formDiv = document.getElementById("form-div")
let previewDiv = document.getElementById("preview-div")
let titlePreview = document.getElementById("title-preview")
let imagePreview = document.getElementById("image-preview")
let imageImagePreview = document.getElementById("image-image-preview")
let tagsPreview = document.getElementById("tags-preview")
let yamlPreview = document.getElementById("yaml-preview")
let previewButtonDiv = document.getElementById("preview-buttons")
let formButtonDiv = document.getElementById("form-buttons")

async function uploadOrFail(){
    const tags = setTags()

    let reqBody = `{"title": "${titleForm.value}", "imageName": "${imageForm.value}", "tags": [${tagsText}], "public": ${publicForm.checked}, "yaml": "${editor.getValue().replace(/\n/g, '\\n').replace(/"/g, '\\"')}"}`
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                let jsonResponse = JSON.parse(xhr.response)
                document.location.href=`/scripts/compose/view/${jsonResponse._id}`
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

    xhr.open('POST', "/api/v1/compose/")
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
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