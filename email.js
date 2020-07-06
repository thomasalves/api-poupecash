const express = require("express");
const nodemailer = require("nodemailer")

const { error } = require("console")


const hbs = require("nodemailer-express-handlebars");

const app = express()



const createMail = (email) => {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "poupecash20@gmail.com",
        pass: "7belogama"
    }
})

transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: "./src/views/",
        layoutsDir: "./src/views/",
        defaultLayout: undefined,
      },
      viewPath: "./src/views/",
      extName: ".handlebars",
    })
  );


transporter.sendMail({
    from: "Poupe Cash <poupecash20@gmail.com >",
    to: email,
    subject: "ola estou testando nodemailer",
    template: "firstEmail"

}).then(message => {
    console.log(message)
}).catch(err => {
    console.log(err)
})

}


app.post("/:type", (req, res) => {
  const { email, name } = req.body;
  const { type } = req.params;

  console.log("[EMAIL, NAME ==>]", email, name);



  createMail(email);
});

app.listen(3000, (req, res) => {
  console.log("is running boy");
});

