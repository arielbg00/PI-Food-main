import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

const validating = (input) => {
   let error = {};
   if (!input.name) error.name = "A name is required";
   else if (!input.summary) error.summary = "Add a recipe summary";
   else if (input.healthScore < 1 || input.healthScore > 100) error.healthScore = "Add a number between 1-100";
   else if (!input.steps.length) error.steps = "Add the recipe step by step with at least 10 characters";
   else if (!input.diets.length) error.diets = "Add one or more than one diet";
   
   return error;
};

export default function Create() {

   const diets = useSelector(state => state.diets);
   const dispatch = useDispatch();
   const history = useHistory();
   
   const [error, setError] = useState({});
   const [input, setInput] = useState({
      name: "",
      summary: "",
      healthScore: 0,
      steps: [],
      image: "",
      dishTypes: [],
      diets: []
   });

   useEffect(() => {
      dispatch(getDiets());
   }, [])

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createRecipe(input));
      alert("Recipe Created!");
      // setInput({});
      history.push("/home");
   };

   const handleInputChange = (e) => {
      setInput({
         ...input,
         [e.target.name]: e.target.value
      });
      setError(validating({
         ...input,
         [e.target.name]: e.target.value
      }));
   };

   const handleDiets = (e) => {
      setInput({
         ...input,
         diets: [...input.diets, e.target.value]
      });
      setError(validating({
         ...input,
         diets: [...input.diets, e.target.value]
      }));
   };

   const handleDelete = (el) => {
      setInput({
         ...input,
         diets: input.diets.filter(diet => diet !== el)
      });
   };

   const handleSteps = (e) => {
      setInput({
         ...input,
         steps: [e.target.value]
      });
      setError(validating({
         ...input,
         steps: [e.target.value]
      }));
   };

   return (
      <div>
         <Link to="/home">Back</Link>
         <h1>Create Recipe</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Name: </label>
               <input type="text" name="name" value={input.name} onChange={handleInputChange} />
               {error.name && (<p>{error.name}</p>)}
            </div>
            <div>
               <label>Summary: </label>
               <input type="text" name="summary" value={input.summary} onChange={handleInputChange} />
               {error.summary && (<p>{error.summary}</p>)}
            </div>
            <div>
               <label>HealthScore: </label>
               <input type="number" name="healthScore" value={input.healthScore} onChange={handleInputChange} />
               {error.healthScore && (<p>{error.healthScore}</p>)}
            </div>
            <div>
               <label>Steps: </label>
               <input type="text" value={input.steps} onChange={handleSteps} />
               {error.steps && (<p>{error.steps}</p>)}
            </div>
            <div>
               <label>Image: </label>
               <input type="text" name="image" value={input.image} onChange={handleInputChange} />
            </div>
            <select defaultValue="default" onChange={handleDiets}>
               <option value="default" disabled>Select Diets</option>
               {
                  diets.length && diets.map((obj, i) => (
                     <option key={i} value={obj.name}>{obj.name}</option>
                  ))
               }
            </select>
            {error.diets && (<p>{error.diets}</p>)}
            {/* <ul><li>{input.diets.join(", ")}</li></ul> */}
            <div>
               {
                  error.name || error.summary || error.healthScore || error.steps || error.diets ? 
                  <button type="submit" disabled>Create Recipe</button>
                  : <button type="submit">Create Recipe</button>
               }
            </div>
         </form>
         <ul>
            {
               input.diets.map((el, i) => (
                  <li key={i}>{el} <button onClick={() => handleDelete(el)}>X</button></li>
               ))
            }
         </ul>
      </div>
   );
}