import React from "react";

export default function Paginated({ stateRecipes, recipesInPage, paginate }) {
   
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(stateRecipes/recipesInPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul>
            {
               pageNumbers?.map(num => (
                  <li key={num}>
                     <button onClick={() => paginate(num)}>{num}</button>
                  </li>
               ))
            }
         </ul>
      </nav>
   );
}