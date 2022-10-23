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
      if (id.length > 20) {
         const getIdDb = await Recipe.findByPk(id, { include: { model: Diet } });
         const mapped = {
            id: getIdDb.id,
            name: getIdDb.name,
            summary: getIdDb.summary,
            healthScore: getIdDb.healthScore,
            steps: getIdDb.steps,
            image: getIdDb.image,
            dishTypes: getIdDb.dishTypes,
            diets: getIdDb.diets.map(obj => obj.name)
         };
         if (mapped) return res.json(mapped);
      }
      const getIdApi = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bee23743640145c3bcf6664e2c031ec4`);
      const mapped = {
         id: getIdApi.data.id,
         name: getIdApi.data.title,
         summary: getIdApi.data.summary,
         healthScore: getIdApi.data.healthScore,
         steps: getIdApi.data.analyzedInstructions[0]?.steps.map(obj => obj.step),
         image: getIdApi.data.image,
         dishTypes: getIdApi.data.dishTypes,
         diets: getIdApi.data.diets
      };
      res.json(mapped);
   } catch (error) {
      res.status(400).send("A recipe with the id does not exist.");
   }
});

router.post("/recipes", async (req, res) => {
   const { name, summary, healthScore, steps, image, dishTypes, diets } = req.body;
   if (!name || !summary || !healthScore || !steps || !image || !dishTypes || !diets) {
      res.status(400).json({ msg: "missing data" });
   }
   try {
      const obj = { name, summary, healthScore, steps, image, dishTypes };
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
      const diets = await Diet.findAll();
      res.json(diets);
   } catch (error) {
      console.log(error);
   }
});


module.exports = router;
