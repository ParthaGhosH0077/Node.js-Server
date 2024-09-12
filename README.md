Node.js Server with Email Confirmation and Custom Event Handling


This project demonstrates the development of a Node.js server that handles POST requests, stores user data, sends confirmation emails using Nodemailer, and emits custom events to confirm successful email delivery.

Features
Handles POST requests: Receives user data (name, email, and message) and processes it.
File storage: Appends the received user queries to a file named queries.txt.
Email confirmation: Sends a confirmation email to the user using Nodemailer.
Custom events: Emits a mailSent custom event upon successful email delivery and logs it to the console.
Requirements
Node.js
Nodemailer
Setup Instructions
Clone the repository:

bash

git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash

npm install
Ensure Nodemailer is installed:

bash

npm install nodemailer
Configure Gmail credentials:

Update the user and pass fields in the nodemailer.createTransport method in the index.js file with your Gmail credentials.
Note: If using Gmail, ensure you generate an app password as Gmail no longer supports direct login from third-party apps.

Run the server:

bash

node server.js
The server listens on port 5000 by default. You can make a POST request to http://localhost:5000 with a JSON body containing the name, email, and message fields.

Usage
1. Sending a POST Request
Send a POST request to the server with the following JSON structure:

json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "message": "This is a test message."
}
Upon sending the request:

The query will be appended to the queries.txt file.
A confirmation email will be sent to the provided email address.
A custom event mailSent will be emitted to log that the email was sent successfully.
2. Example queries.txt Output
After processing multiple requests, your queries.txt file will look like:

vbnet
Name: John Doe
Email: johndoe@example.com
Message: This is a test message.

Name: Jane Doe
Email: janedoe@example.com
Message: This is another test message.

...
Project Structure
arduino
Copy code
├── index.js       // Main server logic with POST request handling, file I/O, and email sending
├── server.js      // Starts the server and listens on port 5000
├── queries.txt    // Stores the received queries (auto-created on first request)
└── README.md      // Project documentation
License
This project is open-source. Feel free to use it for educational purposes.
