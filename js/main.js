import { getRecipes } from "./API.js"

async function afficherRecettes() {
    const data = await getRecipes();

    console.log(data);
    console.log(data.recipes);
}

afficherRecettes();