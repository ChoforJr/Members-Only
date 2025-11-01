export async function homePageGet(req, res) {
  res.render("index", {
    script: "index.js",
    style: "style.css",
    currentUser: req.user,
  });
}

export async function signUpPageGet(req, res) {
  res.render("signUp", {
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
}

export async function logInPageGet(req, res) {
  res.render("logIn", {
    username: "",
    password: "",
  });
}
