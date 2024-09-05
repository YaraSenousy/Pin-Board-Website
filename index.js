import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
let notes = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/pin", (req, res) =>{
    res.render("post.ejs");
});

app.post("/delete", (req,res) => {
    notes.splice(req.body.noteNumber,1);
    res.redirect("/");  
});
let noteToEdit
app.post("/edit", (req,res) => {
    noteToEdit = req.body.noteNumber;
    res.render("edit.ejs", {
        prevTitle: notes[noteToEdit].title,
        prevContent: notes[noteToEdit].content
    });
});

app.post("/edit2", (req, res) => {
    notes[noteToEdit].title = req.body.title;
    notes[noteToEdit].content = req.body.content;
    notes[noteToEdit].newDate = new Date();
    console.log(notes[noteToEdit].newDate);
    res.redirect("/");
});

app.post("/pin", (req, res) =>{
    //adding the note to the home page
    const date = new Date();
    notes.push(
        {title: req.body.title,
        content: req.body.content,
        date: date
    });
    //rendering the updated home page
    res.redirect("/");
});

app.get("/", (req, res) =>{
    res.render("index.ejs", {
        notes: notes
    });
});

app.listen(port, (req, res) => {
    console.log(`Server running on port: ${port}`);
});