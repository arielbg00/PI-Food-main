import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../redux/actions";
import AllCards from "./AllCards";
import Filters from "./Filters";

export default function Home() {

   const stateRecipes = useSelector(state => state.recipes);
   const dispatch = useDispatch();

   const [currentPage, setCurrentPage] = useState(1);  //  eslint-disable-next-line
   const [recipesInPage, setRecipesInPage] = useState(9);
   const indexLastRecipe = currentPage * recipesInPage;
   const indexFirstRecipe = indexLastRecipe - recipesInPage;
   const currentRecipes = stateRecipes.slice(indexFirstRecipe, indexLastRecipe);

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const [order, setOrder] = useState("");

   useEffect(() => {
      dispatch(getRecipes());
      // if (!stateRecipes.length) { return dispatch(getRecipes()) }
   }, [])

   return (
      <div>
         <h4>Hello</h4>
         <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
         <AllCards 
            currentRecipes={currentRecipes} 
            stateRecipes={stateRecipes.length} 
            recipesInPage={recipesInPage} 
            paginate={paginate} 
         />
      </div>
   );
}