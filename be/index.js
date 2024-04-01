// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
app.get('/', (req, res) => {
    res.send('Hello World!');
});
require('dotenv').config();

async function sendEmailService(email) {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.user,
            pass: process.env.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"You" <***-example-person@gmail.com>',
        to: email,
        subject: "Image test",
        html: `
      <h1>Hello world</h1>
      <p>Here's an image for you</p>
      <img src="cid:unique@gmail.com>"/>'
      `, // Embedded image links to content ID
        attachments: [{
            filename: 'image.png',
            path: './img1.jpg',
            cid: 'unique@gmail.com' // Sets content ID
        }]
    });

    return info
}

sendEmailService("huydarealest@gmail.com")
    .catch(err => console.log(err));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
