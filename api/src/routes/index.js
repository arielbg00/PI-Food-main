const { Router } = require('express');
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
   const getApi = await axios.get("https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=bee23743640145c3bcf6664e2c031ec4");
   res.json(getApi.data);
});


module.exports = router;
