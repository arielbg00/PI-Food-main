import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, changePage } from "../redux/actions";
import { Link } from "react-router-dom";
import AllCards from "./AllCards";
import Paginated from "./Paginated";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import s from "../styles/card.module.css";

export default function Home() {

   const stateRecipes = useSelector(state => state.recipes);
   const stateCopyRecipes = useSelector(state => state.copyRecipes);
   const initialPage = useSelector(state => state.initialPage);
   const dispatch = useDispatch();
   // eslint-disable-next-line
   const [recipesInPage, setRecipesInPage] = useState(9);
   const indexLastRecipe = initialPage * recipesInPage;
   const indexFirstRecipe = indexLastRecipe - recipesInPage;
   const currentRecipes = stateRecipes.slice(indexFirstRecipe, indexLastRecipe);
   // const currentRecipes = stateRecipes.length ? stateRecipes.slice(indexFirstRecipe, indexLastRecipe) : false;

   const paginate = (pageNumber) => {
      dispatch(changePage(pageNumber));
   };
   // eslint-disable-next-line
   const [order, setOrder] = useState("");

   const handleBack = () => {
      dispatch(getRecipes());
   };

   useEffect(() => {
      if (!stateRecipes.length) return dispatch(getRecipes());  // eslint-disable-next-line
   }, [])

   return (
      <div>
         {
            stateCopyRecipes.length ? 
               <div>
                  <div>
                     <Link to="/create" className={s.textW}>Create Recipe</Link>
                  </div>
                  <SearchBar />
                  <div>
                     {
                        currentRecipes.length ? 
                           <div>
                              <Filters setOrder={setOrder} />
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