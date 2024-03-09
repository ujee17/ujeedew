import express from "express";
import { conn } from "../dbconnect";


export const router = express.Router();
//http://localhost:3000/stars
router.get("/", (req, res) => {
    conn.query('select * from stars', (err, result, fields)=>{
      res.json(result);
    });
  }); 


//http://localhost:3000/stars
  router.post("/", (req, res) => {
    const { movieId, personId } = req.body;
    conn.query(
      'INSERT INTO stars (movieId, personId) VALUES (?, ?)',
      [movieId, personId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add star' });
        }
        res.status(201).json({ message: 'Star added successfully' });
      }
    );
  });


//http://localhost:3000/stars/3
  router.delete("/:starsid", (req, res) => {
    const starsid = req.params.starsid;
    conn.query(
      'DELETE FROM stars WHERE starsid = ?',
      [starsid],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to delete star' });
        }
        res.json({ message: 'Star deleted successfully' });
      }
    );
  });