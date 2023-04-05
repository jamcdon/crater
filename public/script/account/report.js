const reportUser = () => {
    let message = document.getElementById('message').value.replace(/"/g, '\\"')
    let modalBody = document.getElementById('modal-body')

    let reqBody = `{"reportedUserID": "${userID}", "message": "${message}"}`

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                modalBody.innerHTML = '<p> Report submitted! Thank you and we will review this report!</p>'
            }
            if (xhr.status === 400){
                modalBody.innerHTML = '<p class="text-danger">An error occured, please try again</p>'
            }
            if (xhr.status === 401){
                modalBody.innerHTML = '<p class="text-danger">User not logged in! Please log in to submit a report.</p>'
            }
        }
    }

    xhr.open('POST', '/api/v1/report/user')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(reqBody)
}
