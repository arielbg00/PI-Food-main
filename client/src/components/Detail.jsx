import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeId } from "../redux/actions";

export default function Detail(props) {

   const recipeDetails = useSelector((state) => state.recipeDetails);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getRecipeId(props.match.params.id));
   }, [])

   return (
      <div>
         <h1>{recipeDetails.name}</h1>
         {recipeDetails.summary}
      </div>
   );
}