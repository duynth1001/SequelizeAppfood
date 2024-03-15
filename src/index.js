// Importing required modules for the BAITAP_SEQUELIZE
import express from "express"; // Express.js for handling HTTP requests
import cors from "cors"; // CORS for enabling Cross-Origin Resource Sharing
import rootRouter from "./routes/rootRouter.js"; // Importing the root router module

const app = express(); // Creating an instance of Express application

app.use(express.json()); // Middleware for parsing JSON request bodies
app.use(cors()); // Middleware for enabling CORS

// Starting the server on port 8899 and logging a message when it starts
app.listen(8899, () => {
    console.log('Server started on port 8899');
});

app.use(rootRouter); // Attaching the root router to the application
