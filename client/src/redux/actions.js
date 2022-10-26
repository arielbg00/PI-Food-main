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

export const getRecipeName = (name) => {
   return async (dispatch) => {
      try {
         const getByName =await axios.get(`http://localhost:3001/recipes/?name=${name}`);
         dispatch({
            type: "GET_RECIPE_NAME",
            payload: getByName.data
         });
      } catch (error) {
         alert(`${name} is not a Recipe`);
      }
   };
};

export const changePage = (payload) => {
   return {
      type: "CHANGE_PAGE",
      payload
   };
};

export const healthScoreOrder = (payload) => {
   return {
      type: "HEALTH_SCORE_ORDER",
      payload
   };
};

export const createRecipe = (payload) => {
   return async (dispatch) => {
      const response = await axios.post("http://localhost:3001/recipes", payload);
      dispatch({
         type: "CREATE_RECIPE",
         payload: response.data
      });
   };
};