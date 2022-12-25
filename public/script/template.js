async function logout(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/v1/user/log/out/')
    xhr.onload = function() {
        if (xhr.status == 200 || xhr.status == 400 || xhr.status == 406){
            document.location.href = `/account/logout/${xhr.status}`
        }
    }
    xhr.send()
}