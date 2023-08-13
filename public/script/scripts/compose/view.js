let commentDiv = document.getElementById("comments");
let createdComment = document.getElementById("comment-body");
let commentPages = document.getElementById("comment-page-selector");

const sendComment = async() => {
    let xhr = new XMLHttpRequest;

    let commentBody = `{"content": "${createdComment.value}"}`;
    if (createdComment.value == ""){
        return
    }
    createdComment.value = "";

    async function runUntilResults(){
        if (xhr.readyState === 4 && xhr.status == 200){
            currentComments.unshift(JSON.parse(xhr.responseText))
            loadComments(currentComments)
        }
        else {
            setTimeout(() => {
                runUntilResults();
            }, 100)
        }
    }

    xhr.open('POST', `/api/v1/comments/${composeID}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(commentBody);

    await runUntilResults()
}

const getComments = async(page) => {
    let xhr = new XMLHttpRequest;
    async function runUntilResults(){
        if (xhr.readyState === 4 && xhr.status == 200){
            currentComments = JSON.parse(xhr.responseText).comments
            loadComments(currentComments)
        }
        else {
            setTimeout(() => {
                runUntilResults();
            }, 100)
        }
    }

    xhr.open('GET', `/api/v1/comments/compose/${composeID}/${page}`)
    xhr.send()

    await runUntilResults()
}

const loadComments = (comments) => {
    let commentsHTML = "";
    comments.forEach((comment) => {
        if (loggedIn == true){
            commentsHTML += `
<div class="card my-3">
    <div class="card-header d-flex justify-content-start">
        <img width="24" height="24" src="${minioPublic}/user/${comment.userID}.png">
        <h4 class="mb-0">&nbsp;${comment.user}</h4>
    </div>
    <div class="card-body">
        <p class="card-text">${comment.content}</p>
        <span class="card-text d-flex justify-content-end">
            <span class="border border-light bg-light">
                <button class="btn btn-light" onclick = "upvoteDownvoteComment('${comment.id}', true)">
                    &#128077;
                </button>
                <button class = "btn btn-light" onclick = "upvoteDownvoteComment('${comment.id}', false)">
                    &#128078;
                </button>
                <button class="btn btn-light disabled" id="${comment.id}-upvotes">
                    ${comment.upvotes}
                </button>
            </span>
        </span>
    </div>
</div>
    `
        }
        else {
            commentsHTML += `
<div class="card my-3">
    <div class="card-header d-flex justify-content-start">
        <img width="24" height="24" src="${minioPublic}/user/${comment.userID}.png">
        <h4 class="mb-0">&nbsp;${comment.user}</h4>
    </div>
    <div class="card-body">
        <p class="card-text">${comment.content}</p>
        <span class="card-text d-flex justify-content-end">
            <span class="border border-light bg-light">
                <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#overlay">
                    &#128077;
                </button>
                <button class = "btn btn-light" data-bs-toggle="modal" data-bs-target="#overlay">
                    &#128078;
                </button>
                <button class="btn btn-light disabled" id="${comment.id}-upvotes">
                    ${comment.upvotes}
                </button>
            </span>
        </span>
    </div>
</div>
    `
        }
    
    })
    commentDiv.innerHTML = commentsHTML
}

const upvoteDownvoteComment = async(id, upvote) => {
    let xhr = new XMLHttpRequest;
    async function runUntilResults(){
        if (xhr.readyState === 4 && xhr.status == 200){
            let upvotes = JSON.parse(xhr.responseText).upvotes
            document.getElementById(`${id}-upvotes`).innerHTML = upvotes;
        }
        //else if(xhr.readyState === 4 && xhr.status == 401) {
        //    console.log('not logged in')
        //}
        else {
            setTimeout(() => {
                runUntilResults();
            }, 100)
        }
    }

    xhr.open('PUT', `/api/v1/comments/upvote/${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(`{"upvote": ${upvote}}`);

    await runUntilResults()
}


const reportCompose = () => {
    let badName = document.getElementById('name').checked
    let badScript = document.getElementById('script-content').checked
    let badTags = document.getElementById('tags').checked
    let badComments = document.getElementById('comments-report').checked
    let badImage = document.getElementById('image').checked
    let message = document.getElementById('message').value

    message = message.replace(/"/g, '\\"')

    let reqBody = `{"reportedScriptID": "${composeID}", "badName": ${badName}, "badScript": ${badScript}, "badTags": ${badTags}, "badComments": ${badComments}, "badContainerImage": ${badImage}, "message": "${message}"}`

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
                let modalBody = document.getElementById('modal-body')
            if (xhr.status === 200){
                //place a success message in the modal
                modalBody.innerHTML = "<h3>Report submitted!</h3><p>Thank you for the submission. It will be reviewed by a moderator</p>"
            }
            else if (xhr.status === 400){
                modalBody.innerHTML = "<h4>Sorry, an error has occured</h4><p>Please try again</p>"
            }
            else if (xhr.status === 401){
                modalBody.innerHTML = "<h4>Sorry, you are not logged in.</h4><p>Please log in to report this image.</p>"

            }
        }
    }

    xhr.open('POST', '/api/v1/report/script')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}

getComments(currentPage)