import axios from "axios";

export const getRecipes = () => {
   return async (dispatch) => {
      const getApi = await axios.get("http://localhost:3001/recipes");
      dispatch({
         type: "GET_RECIPES",
         payload: getApi.data
      });
   };
};

export const getRecipeId = (id) => {
   return async (dispatch) => {
      const getById = await axios.get(`http://localhost:3001/recipes/${id}`);
      dispatch({
         type: "GET_RECIPE_ID",
         payload: getById.data
      });
   };
};