import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeId } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Detail(props) {

   const recipe = useSelector((state) => state.recipeDetails);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getRecipeId(props.match.params.id));
   }, [])

   return (
      <div>
         <div>
            <Link to="/home"><button>Go Back</button></Link>
         </div>
         <div>
            <h1>{recipe.name}</h1>
         </div>
         <div>
            <img src={recipe.image} alt="" />
         </div>
         <div>
            <h4>HealthScore: {recipe.healthScore}</h4>
            <h4>Diets:</h4>
            {recipe.diets?.map((el, i) => (<h4 key={i}>{el}</h4>))}
            <h4>Dish Types:</h4>
            {recipe.dishTypes?.map((el, i) => (<h4 key={i}>{el}</h4>))}
         </div>
         <div>
            <h4>Summary</h4>
            <h4>{recipe.summary?.replace(/<[^>]+>/g, "")}</h4>
         </div>
         <div>
            <h4>Steps:</h4>
            {
               recipe.steps?.map((el, i) => (
                  <h4 key={i}>Step {i + 1}: {el}</h4>
               ))
            }
         </div>
      </div>
   );
}