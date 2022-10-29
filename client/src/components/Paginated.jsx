import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changePage } from "../redux/actions";
import s from "../styles/paginated.module.css";

export default function Paginated({ initialPage, stateRecipes, recipesInPage, paginate }) {

   const dispatch = useDispatch();

   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(stateRecipes/recipesInPage); i++) {
      pageNumbers.push(i);
   }

   useEffect(() => {
      let interval = null;
      if (initialPage === pageNumbers.length) interval = setInterval(() => dispatch(changePage(1)), 5000);
      if (initialPage < pageNumbers.length) {
         interval = setInterval(() => {
            dispatch(changePage(initialPage + 1));
         }, 5000);
      }
      if (stateRecipes < 10) clearInterval(interval);
      console.log("I'm inside, page:", initialPage);
      return () => {
         console.log("I'm outside, page:", initialPage);
         clearInterval(interval);
      };
   })

   return (
      <div className={s.container}>
         <nav>
            <ul className={s.list}>
               {
                  initialPage > 1 && <li className={s.eachList} onClick={() => paginate(initialPage - 1)}>&lt;</li>
               }
               {
                  pageNumbers?.map(num => (
                     <li key={num} className={s.eachList} onClick={() => paginate(num)}>{num}</li>
                  ))
               }
               {
                  initialPage < pageNumbers.length && <li className={s.eachList} onClick={() => paginate(initialPage + 1)}>&gt;</li>
               }
            </ul>
         </nav>
      </div>
   );
}