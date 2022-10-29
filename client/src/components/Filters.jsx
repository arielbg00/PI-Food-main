import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, filterByDiets, healthScoreOrder, alphabeticalOrder, filterRecipes, changePage } from "../redux/actions";

export default function Filters({ setOrder }) {

   const stateDiets = useSelector(state => state.diets);
   const dispatch = useDispatch();

   const diets = stateDiets.map(obj => obj.name);

   useEffect(() => {
      dispatch(getDiets());  // eslint-disable-next-line
   }, [])

   const handleFilterByDiets = (e) => {
      dispatch(filterByDiets(e.target.value));
      dispatch(changePage(1));
   };

   const handleHealthScore = (e) => {
      dispatch(healthScoreOrder(e.target.name));
      dispatch(changePage(1));
      setOrder(e.target.name);
   };

   const handleAlphabeticalOrder = (e) => {
      dispatch(alphabeticalOrder(e.target.name));
      dispatch(changePage(1));
      setOrder(e.target.name);
   };

   const handleFilterRecipes = (e) => {
      dispatch(filterRecipes(e.target.value));
      dispatch(changePage(1));
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
         <button name="max" onClick={(e) => handleHealthScore(e)}>Max</button>
         <button name="min" onClick={(e) => handleHealthScore(e)}>Min</button>
         <button name="a-z" onClick={(e) => handleAlphabeticalOrder(e)}>Order A-Z</button>
         <button name="z-a" onClick={(e) => handleAlphabeticalOrder(e)}>Order Z-A</button>
         <select onChange={(e) => handleFilterRecipes(e)}>
            <option value="All">Todos</option>
            <option value="api">Existentes</option>
            <option value="created">Creados</option>
         </select>
      </div>
   );
}