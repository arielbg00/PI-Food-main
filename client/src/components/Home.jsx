import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, changePage, healthScoreOrder, filterRecipes, filterByDiets, changeFilter } from "../redux/actions";
import { Link } from "react-router-dom";
import AllCards from "./AllCards";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated";
import s from "../styles/card.module.css";

export default function Home() {

   const stateRecipes = useSelector(state => state.recipes);
   const stateCopyRecipes = useSelector(state => state.copyRecipes);
   const dispatch = useDispatch();

   const initialPage = useSelector((state) => state.initialPage);
   //- const [currentPage, setCurrentPage] = useState(initialPage);  //  eslint-disable-next-line
   const [recipesInPage, setRecipesInPage] = useState(9);
   const indexLastRecipe = initialPage * recipesInPage;  //- initialPage instead currentPage
   const indexFirstRecipe = indexLastRecipe - recipesInPage;
   const currentRecipes = stateRecipes.slice(indexFirstRecipe, indexLastRecipe);
   // const currentRecipes = stateRecipes.length ? stateRecipes.slice(indexFirstRecipe, indexLastRecipe) : false;

   const paginate = (pageNumber) => {
      //- setCurrentPage(pageNumber);
      dispatch(changePage(pageNumber));
   };

   const [order, setOrder] = useState("");

   // const currentFilter = useSelector(state => state.filter);
   // function changeFilters(data) {
   //    if (!data || data === "All") dispatch(getRecipes());
   //    else if (data === "max") dispatch(healthScoreOrder(data));
   //    else if (data === "api") dispatch(filterRecipes(data));
   //    else if (data === "created") dispatch(filterRecipes(data));
   //    else dispatch(filterByDiets(data));
   // }

   const handleBack = () => {
      // if (!stateRecipes.length) {
         // dispatch(changeFilter(""));
         dispatch(getRecipes());
      // } else {
         // changeFilters(currentFilter);
         //- setCurrentPage(initialPage);
      // }
   };

   useEffect(() => {
      if (!stateRecipes.length) return dispatch(getRecipes());
      // dispatch(getRecipes());
      //- setCurrentPage(initialPage);
   }, [])

   return (
      <div>
         {
            stateCopyRecipes.length ? 
               <div>
                  <div>
                     <Link to="/create" className={s.textW}>Create Recipe</Link>
                  </div>
                  <SearchBar /* setCurrentPage={setCurrentPage} */ />
                  <div>
                     {
                        currentRecipes.length ? 
                           <div>
                              <Filters /* setCurrentPage={setCurrentPage} */ setOrder={setOrder} />
                              <Paginated 
                                 initialPage={initialPage} 
                                 stateRecipes={stateRecipes.length} 
                                 recipesInPage={recipesInPage} 
                                 paginate={paginate} 
                              />
                           </div> : <button type="text" onClick={(e) => handleBack(e)}>Volver</button>
                     }
                  </div>
                  <AllCards currentRecipes={currentRecipes} />
               </div> : <h1>Error</h1>
         }
      </div>
   );
}