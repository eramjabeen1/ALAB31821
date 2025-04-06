const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// setting up ejs as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parsing form data and serving static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// simple middleware for logging each request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// route for home page
app.get('/', (req, res) => {
  res.render('home');
});

// dynamic route for /about/:name
app.get('/about/:name', (req, res) => {
  const name = req.params.name;
  res.render('about', { name });
});

// handling form submission from /submit
app.post('/submit', (req, res) => {
  console.log(req.body);
  res.send('form submitted!');
});

// route for downloading an image file
app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'public', 'example.jpg');
  res.download(file);
});

// list of tech career paths for the explore page
const techPaths = [
  {
    title: "Frontend Developer",
    description: "building what users see: websites, apps, and beautiful interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    resource: "https://roadmap.sh/frontend"
  },
  {
    title: "QA Tester",
    description: "testing apps for bugs and performance issues.",
    skills: ["Manual Testing", "Bug Reports", "Test Cases"],
    resource: "https://roadmap.sh/qa"
  },
  {
    title: "Project Manager",
    description: "leading tech teams, planning tasks, and managing timelines.",
    skills: ["Agile", "Scrum", "Communication"],
    resource: "https://coursera.org/professional-certificates/google-project-management"
  },
  {
    title: "Full-Stack Developer",
    description: "working on both frontend and backend systems.",
    skills: ["JavaScript", "Node.js", "MongoDB", "React"],
    resource: "https://roadmap.sh/full-stack"
  },
  {
    title: "UX/UI Designer",
    description: "designing user-friendly and accessible digital experiences.",
    skills: ["Figma", "User Research", "Wireframing"],
    resource: "https://www.freecodecamp.org/news/learn-ui-design/"
  }
];

// route for explore page
app.get('/explore', (req, res) => {
  res.render('explore', { paths: techPaths });
});

// route for showing the legacy letter form
app.get('/letter', (req, res) => {
  res.render('letter');
});

// route for submitting and displaying the letter
app.post('/letter', (req, res) => {
  const message = req.body.message;
  res.render('letter-view', { message });
});

// route for the single mom ceo starter pack checklist
app.get('/starter-pack', (req, res) => {
  res.render('starter-pack');
});

// starting the server
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
