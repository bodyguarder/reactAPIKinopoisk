import React from "react";
import ParseSources from "../components/Parsers/ParseSources";
import ParseStaff from "../components/Parsers/ParseStaff";
import { useParams } from "react-router-dom";

function MoviePage() {
  const params = useParams();
  ParseSources(params.movieId);
  const extSource = JSON.parse(localStorage.getItem('external_source'));
  console.log(extSource);

  ParseStaff(params.movieId);
  const staff = JSON.parse(localStorage.getItem('staff'));
  console.log(staff);

  const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
  console.log(currentMovie);

  return <div>
    <h1>Hello</h1>
  </div>
}

export default MoviePage;