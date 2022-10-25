import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, changePage } from "../redux/actions";
import AllCards from "./AllCards";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginated from "./Paginated";

export default function Home() {

   const stateRecipes = useSelector(state => state.recipes);
   const dispatch = useDispatch();

   const initialPage = useSelector((state) => state.initialPage);
   const [currentPage, setCurrentPage] = useState(initialPage);  //  eslint-disable-next-line
   const [recipesInPage, setRecipesInPage] = useState(9);
   const indexLastRecipe = currentPage * recipesInPage;
   const indexFirstRecipe = indexLastRecipe - recipesInPage;
   const currentRecipes = stateRecipes.length ? stateRecipes.slice(indexFirstRecipe, indexLastRecipe) : false;

   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      dispatch(changePage(pageNumber));
   };

   const [order, setOrder] = useState("");

   const handleBack = () => {
      dispatch(getRecipes());
      setCurrentPage(initialPage);
   };

   useEffect(() => {
      dispatch(getRecipes());
      setCurrentPage(initialPage);
      // if (!stateRecipes.length) { return dispatch(getRecipes()) }
   }, [])

   return (
      <div>
         <h4>Hello</h4>
         <SearchBar />
         <div>
            {
               currentRecipes.length ? 
                  <div>
                     <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
                     <Paginated 
                        stateRecipes={stateRecipes.length} 
                        recipesInPage={recipesInPage} 
                        paginate={paginate} 
                     />
                  </div> : <button type="text" onClick={(e) => handleBack(e)}>Volver</button>
            }
         </div>
         <div>
            {
               stateRecipes.id ? <Card {...stateRecipes} /> : false
            }
         </div>
         <AllCards currentRecipes={currentRecipes} />
      </div>
   );
}