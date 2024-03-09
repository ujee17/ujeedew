import express from "express";
import { conn } from "../dbconnect";


export const router = express.Router();
//http://localhost:3000/creators
router.get("/", (req, res) => {
    conn.query('select * from creators', (err, result, fields)=>{
      res.json(result);
    });
  }); 

//http://localhost:3000/creators
  router.post("/", (req, res) => {
    const { movieId, personId } = req.body;
    conn.query(
      'INSERT INTO creators (movieId, personId) VALUES (?, ?)',
      [movieId, personId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add creator' });
        }
        res.status(201).json({ message: 'Creator added successfully' });
      }
    );
  });

//http://localhost:3000/creators/3
  router.delete("/:creatorsid", (req, res) => {
    const creatorsid = req.params.creatorsid;
    conn.query(
      'DELETE FROM creators WHERE creatorsid = ?',
      [creatorsid],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to delete creator' });
        }
        res.json({ message: 'Creator deleted successfully' });
      }
    );
  });