import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes, changePage } from "../redux/actions";
import { Link } from "react-router-dom";
import AllCards from "./AllCards";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
// import Card from "./Card";
import Paginated from "./Paginated";

export default function Home() {

   const stateRecipes = useSelector(state => state.recipes);
   const stateCopyRecipes = useSelector(state => state.copyRecipes);
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
      setCurrentPage(1);
   };

   useEffect(() => {
      // if (!stateRecipes.length) return dispatch(getRecipes());
      dispatch(getRecipes());
      setCurrentPage(initialPage);
   }, [])

   return (
      <div>
         <h4>Hello</h4>
         {
            stateCopyRecipes.length ? 
               <div>
                  <div>
                     <Link to="/create">Create Recipe</Link>
                  </div>
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
{/*                   <div>
                     {
                        stateRecipes.id ? <Card {...stateRecipes} /> : false
                     }
                  </div> */}
                  <AllCards currentRecipes={currentRecipes} />
               </div> : <h1>Error</h1>
         }
      </div>
   );
}