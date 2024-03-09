import express from "express";
import { conn } from "../dbconnect";

export const router = express.Router();
//http://localhost:3000/person
router.get("/", (req, res) => {
    conn.query('select * from person', (err, result, fields)=>{
      res.json(result);
    });
  }); 

//http://localhost:3000/person
  router.post("/", (req, res) => {
    const { personname, birthdate, personal } = req.body;
    conn.query(
      'INSERT INTO person (personname, birthdate,personal) VALUES (?, ?, ?)',
      [personname, birthdate,personal],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add person' });
        }
        res.status(201).json({ message: 'Person added successfully' });
      }
    );
  });
//http://localhost:3000/person/7
  router.delete("/:personId", (req, res) => {
    const personId = req.params.personId;
    conn.query(
      'DELETE FROM person WHERE personId = ?',
      [personId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to delete person' });
        }
        res.json({ message: 'Person deleted successfully' });
      }
    );
  });

