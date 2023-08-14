let queryEle = document.getElementById('image-search');

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

//support opening new page on image-search box
queryEle.addEventListener("keydown", (e) => {
    if (e.code === "Enter"){
        let queryValue = queryEle.value.replace(/ /g, "+").replace(/\//g, "-")
        document.location.href = `/images/search/${queryValue}/1`
    }
})