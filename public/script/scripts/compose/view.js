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


getComments(currentPage)