import React from "react";
import s from "../styles/paginated.module.css";

export default function Paginated({ initialPage, stateRecipes, recipesInPage, paginate }) {
   
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(stateRecipes/recipesInPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <div className={s.container}>
         <nav>
            <ul className={s.list}>
               {
                  initialPage > 1 && <li className={s.eachList} onClick={() => paginate(initialPage - 1)}>&lt;</li>
               }
               {
                  pageNumbers?.map(num => (
                     <li key={num} className={s.eachList} onClick={() => paginate(num)}>{num}
                        {/* <button onClick={() => paginate(num)}>{num}</button> */}
                        {/* <a onClick={() => paginate(num)}>{num}</a> */}
                     </li>
                  ))
               }
               {
                  initialPage < pageNumbers.length && <li className={s.eachList} onClick={() => paginate(initialPage + 1)}>&lt;</li>
               }
            </ul>
         </nav>
      </div>
   );
}