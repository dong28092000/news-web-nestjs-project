
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000/api";
const role = document.getElementsByClassName("form-control")

function getData() {
    axios.get('/roles')
        .then(function (response) {
            appendData(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
}
getData()

function appendData(roles) {
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ''
    console.log(roles)
    roles.map((role, index) =>
        tbody.innerHTML += (`
        <tr key=${index}>
            
            <th scope="row">${role.id}</th>
            <td>${handlePermissions(role.permissions)}</td>
            <td>${role.name}</td>
            <td>
                <button  class="btn btn-primary mb-3" onclick="handleEdit(${role.id})">Edit</button>
            </td>
            <td>
                <button  class="btn btn-secondary mb-3" onclick="handleDetele(${role.id})">Detele</button>
            </td>
        </tr>
        `
        ))
}



function handleAddUser() {
    const permission = role[0].value
    const name = role[1].value
    if (name.length === 0 || permission.length === 0) {
        alert("You must complete the input !!!")
    }
    else {
        axios.post('/roles', {
            permission: permission,
            name: name,
        })
            .then(function (response) {
                getData()
                alert(response.status)
            })
            .catch(function (error) {
                alert(error);
            });
    }
}
let roleId;
function handleEdit(id){
 
    document.getElementById("button--save").style.display='block';
    document.getElementById("button--add").style.display = 'none';
  
    axios
      .get(`/roles/${id}`)
      .then(res => {
        let role = res.data;
        document.getElementById("permission").value = role.permission;
        document.getElementById("name").value = role.name;
        
      })
      .catch(err => alert(err));
      roleId=id;    
}

function handleSave() {
    const permission = role[0].value
    const name = role[1].value
   
    if (name.length === 0 || permission.length === 0 ) {
        alert("You must complete the input !!!")
    }
    else {
    axios.patch(`/roles/${roleId}`,{
        permission: permission,
        name: name,
    })
        .then(function (response) {
            getData()
            alert(response.status)
        })
        .catch(function (error) {
            alert(error);
        });
    }
    document.getElementById("button--save").style.display='none';
    document.getElementById("button--add").style.display = 'block';
}
function handleDetele(id){
    
    axios
      .delete(`/roles/${id}`)
      .then(data => {
        console.log(data);
        getData();
      })
      .catch(err => alert(err));

}

function handlePermissions(permissions) {
    const item = permissions.map((permission) => `<li>${permission.description}</li>`);
    return `
    <ul>
      ${item}  
    </ul>
    `;
}
