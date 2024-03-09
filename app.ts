import express from "express";
import bodyParser from "body-parser";
import { router as movie } from "./api/movies";
import { router as person } from "./api/person";
import { router as stars } from "./api/stars";
import { router as creators } from "./api/creators";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/movie",movie);
app.use("/person",person);
app.use("/stars",stars);
app.use("/creators",creators);




//app.use("/", (req, res) => {
 // res.send("Hello World!!!");
//});