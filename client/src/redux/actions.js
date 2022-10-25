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

export const filterRecipes = (payload) => {
   return {
      type: "FILTER_RECIPES",
      payload
   };
};

export const filterByDiets = (payload) => {
   return {
      type: "FILTER_BY_DIETS",
      payload
   };
};

export const getDiets = () => {
   return async (dispatch) => {
      const getDietsDb = await axios.get("http://localhost:3001/diets");
      dispatch({
         type: "GET_DIETS",
         payload: getDietsDb.data
      });
   };
};

export const alphabeticalOrder = (payload) => {
   return {
      type: "ALPHABETICAL_ORDER",
      payload
   };
};