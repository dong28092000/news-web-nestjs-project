axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const user = document.getElementsByClassName("form-control");

function Redirect(url) {
  window.location = `http://127.0.0.1:5500/front-end/${url}`;
}

const handleLogin = () => {
  const email = user[0].value;
  const password = user[1].value;

  if (!email.trim() || !password.trim()) {
    alert(" email | password not be blank");
    return;
  }
  axios
    .post("/authentication/login", {
      email,
      password,
    })
    .then(function (response) {
      console.log(response);
      Redirect("index.html");
    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
};
