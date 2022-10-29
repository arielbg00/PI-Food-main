import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import s from "../styles/card.module.css";

export default function AllCards({ currentRecipes }) {
   return (
      <div>
         <div className={s.ccontainer}>
            {
               currentRecipes.length ? currentRecipes.map((rec, i) => (
                  <Link key={i} to={`/details/${rec.id}`} className={s.text}>
                     <Card name={rec.name} image={rec.image} diets={rec.diets} />
                  </Link>
               )) : <h2>There is nothing</h2>
            }
         </div>
      </div>
   );
}