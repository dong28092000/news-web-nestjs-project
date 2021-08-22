axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const user = document.getElementsByClassName("form-control");

function Redirect(url) {
    window.location = `http://127.0.0.1:5500/front-end/${url}`;
  }
  
function handleVerifyPass() {
  const newPass = user[0].value;
  const token = user[1].value;
  if (!newPass.trim() || !token.trim()) {
    alert("email or token not be blank");
    return;
  }
  axios
    .post("/authentication/verify-forgot-password", {
      password: newPass,
      token,
    })
    .then(function (response) {
      Redirect("login.html");
    })
    .catch(function (error) {
      console.log(error);
    });
  event.preventDefault();
}
