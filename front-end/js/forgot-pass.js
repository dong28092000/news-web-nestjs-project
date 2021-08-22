axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const user = document.getElementsByClassName("form-control");



function Redirect(url) {
    window.location = `http://127.0.0.1:5500/front-end/${url}`;
  }
  
  function handleForgotPass() {
    const email = user[0].value;
    if (!email.trim()) {
      alert("email not be blank");
      return;
    }
  
    axios
      .post("/authentication/forgot-password", { email })
      .then(()=> {
        Redirect("verify-forgot-password.html");
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }
  