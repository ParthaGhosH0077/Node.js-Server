import http from "http";
import fs from "fs";
import EventEmitter from "events";
import nodemailer from "nodemailer";

// Define CustomEvent class to handle custom events
class CustomEvent extends EventEmitter {
  mailSent(email) {
    this.emit("mailSent", email);
  }
}

const customEvent = new CustomEvent();

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let data = "";

    // Collect the data chunks from the request body
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, email, message } = JSON.parse(data);
      const queryString = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

      // (iii) Append the query to 'queries.txt'
      fs.appendFile("queries.txt", queryString, (err) => {
        if (err) {
          res.end("Error writing to file");
          return;
        }

        // Set up Nodemailer transport for sending emails
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "codingninjas2k16@gmail.com",
            pass: "slwvvlczduktvhdj", // Make sure this is kept secure
          },
        });

        // (iv) Define the email options
        const mailOptions = {
          from: "codingninjas2k16@gmail.com",
          to: email,
          subject: "Query received",
          text: "We have received your query and will get back to you soon.",
        };

        // (iv) Send email and emit custom event on success
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.end("Error sending email");
            return;
          }

          // (v) Emit "mailSent" custom event
          customEvent.mailSent(email);

          res.end("Query received and email sent!");
        });
      });
    });
  } else {
    res.end("Welcome to Coding Ninjas!");
  }
});

// (v) Listen for the 'mailSent' event and confirm email sent
const Solution = () => {
  customEvent.addListener("mailSent", (email) => {
    console.log("Custom event 'mailSent' emitted");
    console.log(`Confirmation: Email successfully sent to ${email}`);
  });
};

export default server;
export { server, CustomEvent, Solution };
