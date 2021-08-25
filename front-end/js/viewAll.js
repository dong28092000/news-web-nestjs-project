axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;
const post = document.getElementsByClassName("form-control");

function getData() {
  document.getElementById("button--save").style.display = "none";
  axios
    .get("/posts")
    .then(function (response) {
      appendData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData();

function appendData(posts) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  posts.map((post, index) => {
    return (tbody.innerHTML += `
        <tr key=${index}>
            
            <th scope="row">${post.id}</th>
            <td><img src=${
              post?.imageUrl
            } width="100" height="100"></img></td>
            <td>${loadTags(post.tags)}</td> 
            <td>${post?.title}</td>
            <td>${post?.content}</td>
            <td>${handleComments(post?.comments)}</td>
            <td>
                <button  class="btn btn-primary mb-3" onclick="handleEdit(${
                  post.id
                })">Edit</button>
            </td>
            <td>
                <button  class="btn btn-primary mb-3" onclick="handleDeletePost(${
                  post.id
                })">Delete</button>
            </td>
    </tr>
    <input type="text" id=${post.id}>
    <button  class="btn btn-primary mb-3" onclick="handleComment(${
      post.id
    })">Comment</button>
        `);
  });
}

const handleCreatePost = () => {
  const imagefile = document.querySelector("#image").files[0];
  let formData = new FormData();
  formData.append("image", imagefile)
  formData.append("title", post[1].value);
  formData.append("content", post[2].value);
  const tagId = handleTag();

  axios
    .post(`/posts?tagId=${tagId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
};

let postId;

function handleEdit(id) {
  document.getElementById("button--save").style.display = "block";
  document.getElementById("bt--create").style.display = "none";
  axios
    .get(`/posts/${id}`)
    .then((res) => {
      let post = res.data;
      document.getElementById("title").innerHTML = post.title;
      document.getElementById("content").innerHTML = post.content;
    })
    .catch((err) => alert(err));
  postId = id;
}

function handleSave() {
  const title = post[1].value;
  const content = post[2].value;
  if (!title.trim() || !content.trim()) {
    alert("title | content not be blank");
    return;
  } else {
    axios
      .patch(`/posts/${postId}?tagId=${handleTag()}`, {
        title: title,
        content: content,
      })
      .then(function (response) {
        getData();
        alert(response.status);
      })
      .catch(function (error) {
        alert(error);
      });
  }
  document.getElementById("button--save").style.display = "none";
  document.getElementById("bt--create").style.display = "block";
}

function handleDeletePost(id) {
  axios
    .delete(`/posts/${id}`)
    .then((data) => {
      console.log(data);
      getData();
    })
    .catch((err) => alert(err));
}

function handleTag() {
  const tag = document.getElementById("selectTag").value;
  return tag;
}

function handleComment(id) {
  console.log(id);
  let content = document.getElementById(id).value;
  console.log(content);
  axios
    .post(`/comments`, {
      postId: id,
      content,
    })
    .then(() => {
      getData();
    })
    .catch((err) => alert(err));
}


function handleComments(comments) {
  const item = comments.map((comment) => `<li>${comment.content}</li>`);
  return `
  <ul>
    ${item}  
  </ul>
  `;
}

function loadTags(tags) {
  const item = tags.map((tag) => `<li>${tag.name}</li>`);
  return `
  <ul>
    ${item}  
  </ul>
  `;
}
