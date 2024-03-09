import express from "express";
import { conn } from "../dbconnect";

export const router = express.Router();
//http://localhost:3000/movie
router.get("/", (req, res) => {
    conn.query('select * from movie', (err, result, fields)=>{
      res.json(result);
    });
  });


//http://localhost:3000/movie
  router.post("/", (req, res) => {
    const { name, genre, releaseYear, rating, description } = req.body;
    conn.query(
      'INSERT INTO movie (name, genre, releaseYear, rating, description) VALUES (?, ?, ?, ?, ?)',
      [name, genre, releaseYear, rating, description],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to add movie' });
        }
        res.status(201).json({ message: 'Movie added successfully' });
      }
    );
  });
//http://localhost:3000/movie/5
  router.delete("/:movieId", (req, res) => {
    const movieId = req.params.movieId;
    conn.query(
      'DELETE FROM movie WHERE movieId = ?',
      [movieId],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to delete movie' });
        }
        res.json({ message: 'Movie deleted successfully' });
      }
    );
  });



//http://localhost:3000/movie/The Lord of the Rings: The Return of the King
router.get("/:title", (req, res) => {
  const searchTerm = req.params.title;
  
  conn.query(
    `SELECT movie.*, person.*, creators.*, person.*
    FROM movie
    LEFT JOIN stars ON movie.movieId = stars.movieId
    LEFT JOIN person ON stars.personId = person.personId
    LEFT JOIN creators ON movie.movieId = creators.movieId AND creators.creatorsid = movie.movieId
    WHERE movie.name LIKE '%${searchTerm}%'`,
    (err, movieResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch movie data' });
      }

      conn.query(
        `SELECT creators.creatorsid, creators.movieId, creators.personId, person.*
        FROM creators
        INNER JOIN person ON creators.personId = person.personId
        WHERE creators.movieId IN (
            SELECT movieId
            FROM movie
            WHERE name LIKE '%${searchTerm}%'
        )`,
        (err, creatorsResult) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch creators data' });
          }

          res.json({ movie: movieResult, creators: creatorsResult });
        }
      );
    }
  );
});









