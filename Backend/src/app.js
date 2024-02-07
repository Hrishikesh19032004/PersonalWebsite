const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
require('./Connection/db');
const ConnectModel = require('./model/model');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'styles' directory
const stylesPath = path.join(__dirname, '../../style.css');
app.use('/styles', express.static(stylesPath));

// Serve static files from the project root directory
const rootPath = path.join(__dirname, '../../'); // Adjust the path accordingly
app.use(express.static(rootPath));

// Define routes
app.get("/", (request, response) => {
    response.sendFile(path.join(rootPath, 'index.html'));
});

app.get("/about", (request, response) => {
    response.sendFile(path.join(rootPath, 'About.html'));
});

app.get("/resume", (request, response) => {
    // Redirect to the URL where your resume is hosted
    response.redirect('https://drive.google.com/file/d/1JunZ5ZUWk2c0cSj7Ni7OZL25YnOUh3GF/view?usp=sharing');
});

app.get("/Contact.html", (request, response) => {
    response.sendFile(path.join(rootPath, 'Contact.html'));
});

// Handle contact form submission
app.post("/contact", async (request, response) => {
    try {
        const { Fname, Lname, email, phNumber, Message } = request.body;

        // Check if the phNumber already exists in the database
        const existingContact = await ConnectModel.findOne({ phNumber: phNumber });

        if (existingContact) {
            return response.status(400).sendFile(path.join(rootPath, 'Contact.html'));
        }

        // If the phNumber is unique, save the new document
        const newConnect = new ConnectModel({ Fname, Lname, email, phNumber, Message });
        const savedConnect = await newConnect.save();

        console.log(savedConnect);
        response.status(201).sendFile(path.join(rootPath, 'Contact.html'));;
    } catch (error) {
        response.status(400).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
