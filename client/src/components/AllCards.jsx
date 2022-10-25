import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginated";

export default function AllCards({ currentRecipes, stateRecipes, recipesInPage, paginate }) {
   return (
      <div>
         <Paginated 
            stateRecipes={stateRecipes} 
            recipesInPage={recipesInPage} 
            paginate={paginate} 
         />
         <div>
            {
               currentRecipes.length ? currentRecipes.map((rec, i) => (
                  <Link key={i} to={`/details/${rec.id}`}>
                     <Card name={rec.name} image={rec.image} diets={rec.diets} />
                  </Link>
               )) : <h2>There is nothing</h2>
            }
         </div>
      </div>
   );
}