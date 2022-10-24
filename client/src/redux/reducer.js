const initialState = {
   recipes: [],
   recipeDetails: {}
};

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_RECIPES":
         return {
            ...state,
            recipes: action.payload
         };
      case "GET_RECIPE_ID":
         return {
            ...state,
            recipeDetails: action.payload
         };
      default:
         return {...state};
   }
}