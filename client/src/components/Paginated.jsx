import React from "react";

export default function Paginated({ initialPage, stateRecipes, recipesInPage, paginate }) {
   
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(stateRecipes/recipesInPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <div>
         <nav>
            <ul>
               {
                  initialPage > 1 && <li onClick={() => paginate(initialPage - 1)}>&lt;</li>
               }
               {
                  pageNumbers?.map(num => (
                     <li key={num} onClick={() => paginate(num)}>{num}
                        {/* <button onClick={() => paginate(num)}>{num}</button> */}
                        {/* <a onClick={() => paginate(num)}>{num}</a> */}
                     </li>
                  ))
               }
               {
                  initialPage < pageNumbers.length && <li onClick={() => paginate(initialPage + 1)}>&lt;</li>
               }
            </ul>
         </nav>
      </div>
   );
}