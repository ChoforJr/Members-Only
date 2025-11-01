import { getMessages } from "../db/queriesGet.js";

export async function homePageGet(req, res) {
  const messages = await getMessages();
  res.render("index", {
    script: "index.js",
    style: "style.css",
    currentUser: req.user,
    messages: messages,
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

export async function newMsgPageGet(req, res) {
  res.render("newMessage", {
    title: "",
    text: "",
  });
}

export async function codePageGet(req, res) {
  res.render("join", {
    code: "",
  });
}
