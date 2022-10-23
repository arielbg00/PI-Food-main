// const axios = require("axios");
const { Recipe, Diet } = require("../db");
const api = require("../../api.json");

const saveDietsInDb = async () => {
	const diets = [{name: "gluten free"}, {name: "dairy free"}, {name: "lacto ovo vegetarian"}, {name: "vegan"}, {name: "paleolithic"}, {name: "primal"}, {name: "whole 30"}, {name: "pescatarian"}, {name: "ketogenic"}, {name: "fodmap friendly"}];
	await Diet.bulkCreate(diets);
};

const getAllApi = async () => {
    // const getApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=300&apiKey=bee23743640145c3bcf6664e2c031ec4");
	const getApi = api;
	return getApi.results.map(obj => {
		return {
			id: obj.id,
			name: obj.title,
			summary: obj.summary,
			healthScore: obj.healthScore,
			steps: obj.analyzedInstructions[0]?.steps.map(obj => obj.step),
			image: obj.image,
			dishTypes: obj.dishTypes,
			diets: obj.diets
		};
	});
};

const getAllDb = async () => {
	const getApi = await Recipe.findAll({ include: { model: Diet } });
	return getApi.map(({id, name, summary, healthScore, steps, image, dishTypes, created, diets}) => {
		return {
			id,
			name,
			summary,
			healthScore,
			steps,
			image,
			dishTypes,
			created,
			diets: diets.map(obj => obj.name)
		};
	});
};

let store = [];

const getAllRecipes = async () => {
	const db = await getAllDb();
	if (store.length) return store.slice(0, 100).concat(db);

	const api = await getAllApi();
	store = [...api, ...db];
	return store;
};

module.exports = {
	saveDietsInDb,
	getAllRecipes
};