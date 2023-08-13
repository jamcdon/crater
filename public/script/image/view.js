const reportImage = () => {
    let badDescription = document.getElementById('description').checked
    let badPicture = document.getElementById('picture').checked
    let badLink = document.getElementById('link').checked
    let badImage = document.getElementById('image').checked
    let message = document.getElementById('message').value

    message = message.replace(/"/g, '\\"')

    let reqBody = `{"reportedImageID": "${imageID}", "badDescription": ${badDescription}, "badPicture": ${badPicture}, "badLink": ${badLink}, "badContainerImage": ${badImage}, "message": "${message}"}`

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

    xhr.open('POST', '/api/v1/report/image')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}