// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to your email provider
    auth: {
        user: 'abdelrahemanhamd@gmail.com', // Your email address
        pass: '552004Ola&Me', // Your email password or app password
    },
});

app.post('/send', (req, res) => {
    const { firstName, email, country, phoneNumber, comments } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'abdelrahemanhamd@yahoo.com', // Your recipient email address
        subject: 'New Contact Form Submission',
        text: `
            You have a new submission from:
            Name: ${firstName}
            Email: ${email}
            Country: ${country}
            Phone Number: ${phoneNumber}
            Comments: ${comments}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
