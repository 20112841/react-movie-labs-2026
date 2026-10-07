import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const TemplateMoviePage = ({ movie, children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => json.posters)
      .then((images) => {
        setImages(images);
      });
  }, [movie.id]);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <MovieHeader movie={movie} />
      </Grid>
      <Grid item container spacing={5} sx={{ padding: "20px" }}>
        <Grid item xs={3}>
          <div sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt={image.file_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateMoviePage;