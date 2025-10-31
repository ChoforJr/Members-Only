export async function homePageGet(req, res) {
  res.render("index", {
    script: "index.js",
    style: "style.css",
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
