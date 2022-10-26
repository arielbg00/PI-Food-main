import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDiets, createRecipe } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";

export default function Create() {

   const diets = useSelector(state => state.diets);
   const dispatch = useDispatch();
   const history = useHistory();
   
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
   };

   const handleDiets = (e) => {
      setInput({
         ...input,
         diets: [...input.diets, e.target.value]
      });
   };

   const handleDelete = (el) => {
      setInput({
         ...input,
         diets: input.diets.filter(diet => diet !== el)
      });
   };

   return (
      <div>
         <Link to="/home">Back</Link>
         <h1>Create Recipe</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Name: </label>
               <input type="text" name="name" value={input.name} onChange={handleInputChange} />
            </div>
            <div>
               <label>Summary: </label>
               <input type="text" name="summary" value={input.summary} onChange={handleInputChange} />
            </div>
            <div>
               <label>HealthScore: </label>
               <input type="number" name="healthScore" value={input.healthScore} onChange={handleInputChange} />
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
            {/* <ul><li>{input.diets.join(", ")}</li></ul> */}
            <div>
               <button type="submit">Create Recipe</button>
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