import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../redux/actions";
import AllCards from "./AllCards";

export default function Home() {

   const stateRecipes = useSelector((state) => state.recipes);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getRecipes());
   }, [])

   return (
      <div>
         <h4>Hello</h4>
         <AllCards stateRecipes={stateRecipes} />
      </div>
   );
}