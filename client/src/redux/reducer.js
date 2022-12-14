const initialState = {
   recipes: [],
   recipeDetails: {},
   copyRecipes: [],
   diets: [],
   initialPage: 1
};

export default function rootReducer(state = initialState, action) {
   switch (action.type) {
      case "GET_RECIPES":
         return {
            ...state,
            recipes: action.payload,
            copyRecipes: action.payload
         };
      case "GET_RECIPE_ID":
         return {
            ...state,
            recipeDetails: action.payload
         };
      case "FILTER_RECIPES":
         const allRecipes = state.copyRecipes;
         const filtered = action.payload === "created" ? allRecipes.filter(el => el.created) 
            : allRecipes.filter(el => !el.created);
         return {
            ...state,
            recipes: action.payload === "All" ? allRecipes : filtered
         };
      case "FILTER_BY_DIETS":
         const filterByDiet = action.payload === "all" ? state.copyRecipes 
            : state.copyRecipes.filter(el => el.diets.includes(action.payload));
         return {
            ...state,
            recipes: filterByDiet
         };
      case "GET_DIETS":
         return {
            ...state,
            diets: action.payload
         };
      case "ALPHABETICAL_ORDER":
         const recipesSorted = action.payload === "a-z" ? 
            state.copyRecipes.sort((a, b) => {
               if (a.name > b.name) return 1;
               else if (b.name > a.name) return -1;
               else return 0;
            }) 
            : state.copyRecipes.sort((a, b) => {
               if (a.name > b.name) return -1;
               else if (b.name > a.name) return 1;
               else return 0;
            });
         return {
            ...state,
            recipes: recipesSorted
         };
      case "GET_RECIPE_NAME":
         return {
            ...state,
            recipes: action.payload
         };
      case "CHANGE_PAGE":
         return {
            ...state,
            initialPage: action.payload
         };
      case "HEALTH_SCORE_ORDER":
         const healthScoreSorted = action.payload === "max" ? 
            state.copyRecipes.sort((a, b) => b.healthScore - a.healthScore)
            : state.copyRecipes.sort((a, b) => a.healthScore - b.healthScore);
         return {
            ...state,
            recipes: healthScoreSorted
         };
      case "CREATE_RECIPE":
         return {
            ...state
         };
      case "RESET":
         return {
            ...state,
            recipeDetails: {}
         };
      default:
         return {...state};
   }
}