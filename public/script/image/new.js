let previewDiv = document.getElementById("preview")
let form = document.getElementById("form")
let modal = document.getElementById("load-modal")
let modalError = document.getElementById("error")

let nameError = document.getElementById("name-error")
let linkError = document.getElementById("link-error")
let descriptionError = document.getElementById("description-error")

const setForm = () => {
    form.classList.add("d-flex")
    previewDiv.classList.remove("visible")
    previewDiv.classList.add("invisible")

    form.classList.remove("invisible")
    form.classList.add("visible")
}

const setPreview = () => {
    form.classList.remove("d-flex")
    form.classList.remove("visible")
    form.classList.add("invisible")

    previewDiv.classList.remove("invisible")
    previewDiv.classList.add("visible")

    let name = document.getElementById("name").value;
    let link = document.getElementById("hyperlink").value;
    let description = document.getElementById("description").value;

    previewDiv.innerHTML = `
    <span class="d-inline-flex mt-2" id="preview-span">
        <img width="48" src="${minioPublic}/image/${imageImageDefault}.png">
        <h1>&emsp;${name}</h1>
    </span>
    <br>
    <span class="d-inline-flex mb-3">
        <p>Found at:&nbsp;</p>
        <p class="link-primary">${link}</p>
    </span>
    <p>${description}</p>
    <div class="my-3 ms-auto me-0">
        <button class="btn btn-info me-3" onclick="setForm()">Edit</button>
        <button class="btn btn-warning" id="submit-preview" onclick="uploadOrFail()" data-bs-toggle="modal" data-bs-target="#load-model">Submit</button>
    </div>
    `;
}

const uploadOrFail = () => {
    let name = document.getElementById("name").value;
    let link = document.getElementById("hyperlink").value;
    let description = document.getElementById("description").value.replace(/"/, '\\"');

    if (name == "" || link == "" || description == ""){
        if (name == ""){
            nameError.innerHTML = "Name field required"
        }
        if (link == ""){
            linkError.innerHTML = "Link field required"
        }
        if (description == ""){
            descriptionError.innerHTML = "Description field required"
        }
        return
    }

    let bsModal = bootstrap.Modal.getOrCreateInstance(modal)
    bsModal.show()


    submitFormButton = document.getElementById("submit-form")
    submitPreviewButton = document.getElementById("submit-preview")
    let reqBody = `{"name": "${name}", "hyperlink": "${link}", "description": "${description}"}`

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200 || xhr.status === 500){
                const urlName = name.replace(" ", "+").replace("/", "-");
                document.location.href = `/images/view/${urlName}`
            }
            if (xhr.status === 400){
                modalError.innerHTML = "Error occured. Image likely already exists."
            }
            if (xhr.status === 401){
                modalError.innerHTML = "Please log in."
            }
        }
    }

    xhr.open('POST', '/api/v1/image')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}