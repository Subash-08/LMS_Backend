if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const userController = require("./controllers/userController")
const requireAuth = require("./middleware/requireAuth")

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectToDb();
app.get("/",(req,res)=>{
  res.send("hello")
})
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/logout", userController.logout);
app.get("/check-auth", requireAuth, userController.checkAuth);
app.post("/leads", notesController.createNote);
app.get("/leads", notesController.fetchLeads);
app.get("/leads/:id", notesController.fetchLead);

app.put("/leads/:id", notesController.updateLead);
app.delete("/leads/:id", notesController.deleteLead);

app.listen(3000);



// {
//   "name" : "subash",
//   "email": "subash@gmail.com",
// "phone": "1234498",
// "companyName": "xyz",
// "companyType":"Manufacturing",
// "location": "chennai"
// }