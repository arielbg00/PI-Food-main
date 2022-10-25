import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRecipes, filterByDiets, getDiets, alphabeticalOrder } from "../redux/actions";

export default function Filters({ setCurrentPage, setOrder }) {

   const stateDiets = useSelector(state => state.diets);
   const dispatch = useDispatch();

   const diets = stateDiets.map(obj => obj.name);

   const handleFilterRecipes = (e) => {
      dispatch(filterRecipes(e.target.value));
      setCurrentPage(1);
   };

   useEffect(() => {
      dispatch(getDiets());
   }, [])

   const handleFilterByDiets = (e) => {
      dispatch(filterByDiets(e.target.value));
      setCurrentPage(1);
   };

   const handleAlphabeticalOrder = (e) => {
      dispatch(alphabeticalOrder(e.target.value));
      setCurrentPage(1);
      setOrder(`Order ${e.target.value}`);
   };

   return (
      <div>
         <select onChange={(e) => handleFilterByDiets(e)}>
            <option value="all">All Diets</option>
            {
               diets.length && diets.map((el, i) => (
                  <option key={i} value={`${el}`}>{el}</option>
               ))
            }
         </select>
         <select onChange={(e) => handleAlphabeticalOrder(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
         </select>
         <select onChange={(e) => handleFilterRecipes(e)}>
            <option value="All">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
         </select>
      </div>
   );
}