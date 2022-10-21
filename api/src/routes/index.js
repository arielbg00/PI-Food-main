const { Router } = require('express');
const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("../utils/utils");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
   try {
      const { name } = req.query;
      const getAll = await getAllRecipes();

      if (name) {
         const recipe = getAll.filter(obj => obj.name.toLowerCase().includes(name.toLowerCase()));
         recipe.length ? res.json(recipe) : res.status(400).send("Recipe not found");
      } else {
         res.json(getAll);
      }
   } catch (error) {
      console.log(error);
   }
});

router.get("/recipes/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const getById = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bee23743640145c3bcf6664e2c031ec4`);
      res.json(getById.data);
   } catch (error) {
      console.log(error);
   }
});

router.post("/recipes", async (req, res) => {
   const { name, summary, healthScore, image, diets } = req.body;
   if (!name || !summary || !healthScore || !image || !diets) {
      res.status(400).json({ msg: "missing data" });
   }
   try {
      const obj = { name, summary, healthScore, image };
      const newRecipe = await Recipe.create(obj);

      const dietsDb = await Diet.findAll({ where: { name: diets } });
      await newRecipe.addDiets(dietsDb);

      const a = await Recipe.findAll({ include: { model: Diet } });
      console.log(a);
      res.json(a);
   } catch (error) {
      console.log(error);
   }
});

router.get("/diets", async (req, res) => {
   try {
      const diets = [{name: "gluten free"}, {name: "ketogenic"}, {name: "vegetarian"}, {name: "lacto vegetarian"}, {name: "ovo vegetarian"}, {name: "vegan"}, {name: "pescetarian"}, {name: "paleo"}, {name: "primal"}, {name: "low fodmap"}, {name: "whole 30"}];
      await Diet.bulkCreate(diets);

      res.send("Diets were added to the DataBase");
   } catch (error) {
      console.log(error);
   }
});


module.exports = router;
