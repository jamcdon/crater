let tableContent = document.getElementById("table-body")

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
    
    xhr.open('GET', "/api/v1/manifest/paginate/popular/1")
    xhr.send()
    
    return await runUntilResults()
}

function setPaginated(jsonResponse){

    let tableBody="";
    let i=1;

    for(const row of jsonResponse){
        tableBody+= `<tr onclick="document.location='/scripts/manifest/view/${row._id}'" role="button">
            <th scope="row">${i}</th>
            <td>${row.title}</td>
            <td>${row.imageName}</td>
            <td>${row.stars}</td>
            <td>${row.authorName}</td>`;
            i++;
        }
        tableContent.innerHTML = tableBody;
}

getPaginated();
