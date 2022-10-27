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
            <p>HealthScore: {recipe.healthScore}</p>
            <p>Diets:</p>
            {recipe.diets?.map((el, i) => (<p key={i}>{el}</p>))}
            <p>Dish Types:</p>
            {recipe.dishTypes?.map((el, i) => (<p key={i}>{el}</p>))}
         </div>
         <div>
            <p>Summary</p>
            <p>{recipe.summary?.replace(/<[^>]+>/g, "")}</p>
         </div>
         <div>
            <p>Steps:</p>
            {
               recipe.steps?.map((el, i) => (
                  <p key={i}>Step {i + 1}: {el}</p>
               ))
            }
         </div>
      </div>
   );
}