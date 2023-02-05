let tableContent = document.getElementById("table-body")

let forgotModal = document.getElementById("forgot-div");
let loginModal = document.getElementById("login-div");

function toggleForgot(toggled){
    if (toggled){
        forgotModal.className = ("invisible")
        loginModal.className = ("visible")
    }
    else {
        loginModal.className = ("invisible")
        forgotModal.className = ("visible")
    }
}

async function getPaginated(){
    let xhr = new XMLHttpRequest;
    async function runUntilResults(){
        if (xhr.readyState === 4 && xhr.status == 200){
            setPaginated(JSON.parse(xhr.responseText))
        } else {
            setTimeout(() => {
                runUntilResults();
            }, 100)
        }
    }
    
    xhr.open('GET', "/api/v1/compose/paginate/popular/1")
    xhr.send()
    
    return await runUntilResults()
}

function setPaginated(jsonResponse){

    let tableBody="";
    let i=1;

    for(const row of jsonResponse){
        tableBody+= `<tr onclick="document.location='/scripts/compose/view/${row._id}'" role="button">
            <th scope="row">${i}</th>
            <td>${row.title}</td>
            <td>${row.imageName}</td>
            <td>${row.stars}</td>
            <td>${row.authorID}</td>`;
            i++;
        }
        tableContent.innerHTML = tableBody;
}

getPaginated();
