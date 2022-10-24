import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function AllCards({ stateRecipes }) {
   return (
      <div>
         {
            stateRecipes.length ? stateRecipes.map((rec, i) => (
               <Link key={i} to={`/details/${rec.id}`}>
                  <Card name={rec.name} image={rec.image} diets={rec.diets} />
               </Link>
            )) : <h2>There is nothing</h2>
         }
      </div>
   );
}