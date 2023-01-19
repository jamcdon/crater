var editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");

let formDiv = document.getElementById("form-div")
let previewDiv = document.getElementById("preview-div")
let titlePreview = document.getElementById("title-preview")
let titleForm= document.getElementById("title")
let imagePreview = document.getElementById("image-preview")
let imageForm= document.getElementById("image")
let publicPreview = document.getElementById("public-preview")
let publicForm= document.getElementById("public")
let tagsPreview = document.getElementById("tags-preview")
let tagsForm = document.getElementById("tags")
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

function getCurrentlyUsedOptions(label){

}
getCurrentlyUsedOptions("image")
getCurrentlyUsedOptions("tags")