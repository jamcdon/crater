tableContent = document.getElementById("table-body")

function getPaginated(){
    let results = [{
        url: "/error/404",
        script: "simple mysql",
        image: "mysql",
        stars: 5,
        creator: "Diggory©"
    }]

    let tableBody="";
    let i=1;

    for(const row of results){
        tableBody+= `<tr onclick="document.location='${row.url}'" role="button">
            <th scope="row">${i}</th>
            <td>${row.script}</td>
            <td>${row.image}</td>
            <td>${row.stars}</td>
            <td>${row.creator}</td>`;
        }
        tableContent.innerHTML = tableBody;
}

getPaginated()