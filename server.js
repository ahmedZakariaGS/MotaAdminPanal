const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // For static files like CSS
app.set("view engine", "ejs");

// Sample course data
let courses = [
  { id: 1, title: "Event Planning Mastery", price: "Free" },
  { id: 2, title: "Effective Tourism Guiding", price: "$39.99" },
  { id: 3, title: "Advanced Hotel Management", price: "$39.99" },

];

// 📌 Render Home Page with Table
app.get("/", (req, res) => {
  res.render("index", { courses });
});

// 📌 Add a New Course
app.post("/add", (req, res) => {
  const { title, price } = req.body;
  const newCourse = { id: courses.length + 1, title, price };
  courses.push(newCourse);
  res.redirect("/");
});

// 📌 Delete a Course
app.post("/delete/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  courses = courses.filter((course) => course.id !== courseId);
  res.redirect("/");
});

// 📌 Update a Course (For simplicity, we'll just change the title & price)
app.post("/update/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const { title, price } = req.body;
  courses = courses.map((course) =>
    course.id === courseId ? { ...course, title, price } : course
  );
  res.redirect("/");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
