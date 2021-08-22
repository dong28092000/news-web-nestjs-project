axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

function getData() {
    axios.get('/profile')
        .then(function (response) {
            appendData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
getData();

function appendData(user) {
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ''
        tbody.innerHTML += (`
        <tr>
            
            <th scope="row">${user.id}</th>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${handleRoles(user.roles)}</td>
        </tr>
        `
        )
}

function handleRoles(roles) {
    const item = roles.map((role) => `<li>${role.name}</li>`);
    return `
    <ul>
      ${item}  
    </ul>
    `;
}
