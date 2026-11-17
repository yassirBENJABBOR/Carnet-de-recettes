import { getRecipes ,searchRecipes } from "./API.js"

const affichagerecette = document.querySelector("#recipes-container")

async function afficherRecettes(recette) {

    recette.forEach(recette => {
        const carte = document.createElement("div")

        carte.className = "bg-white rounded-xl shadow-md overflow-hidden  ";

        const image = document.createElement("img")
        image.className = "w-full h-48 object-cover"

        const contenu = document.createElement("div")
        contenu.className = "p-4";
        const titre = document.createElement("h2")
        titre.className = "text-xl font-bold mb-2"

        const cuisine = document.createElement("p");
        cuisine.className = "text-gray-600 mb-2";

        const difficulte = document.createElement("p");
        difficulte.className = "text-gray-600 mb-2";

        const temps = document.createElement("p");
        temps.className = "text-gray-600";


        image.src = recette.image;
        titre.textContent = recette.name;
        cuisine.textContent = `Cuisine : ${recette.cuisine}`;
        difficulte.textContent = `Difficulté : ${recette.difficulty}`;
        temps.textContent = `Temps de préparation : ${recette.prepTimeMinutes} min`;


        contenu.append(titre,cuisine,difficulte,temps);

        carte.append(image, contenu);

        affichagerecette.appendChild(carte);

    });
}

async function chargerRecettes() {
    const data = await getRecipes();
    const recettes = data.recipes;  

    // console.log(data);
    // console.log(data.recipes);
    // console.log(data.recipes[0]);
    const comnteurerecette = document.querySelector("#recipes-count")
    comnteurerecette.textContent=data.recipes.length

    afficherRecettes(recettes);
}
chargerRecettes()


async function rechercherecette(motrechercher) {
    const data = await searchRecipes(motrechercher);
    // console.log(data)
    affichagerecette.replaceChildren()
    afficherRecettes(data.recipes);
    
}

const searchForm = document.querySelector("#search-form")
const searchinput = document.querySelector("#search-input")


searchForm.addEventListener("submit",function(event){

    event.preventDefault
    affichagerecette.replaceChildren()
    const recette= searchinput.value.trim()
    rechercherecette(recette)
    afficherMessageVide()

})

const emptymessage = document.querySelector("#empty-message")
const showallbutton = document.querySelector("#show-all-button")

async function afficherMessageVide() {
    if (searchinput.value.trim()=== ""){
        emptymessage.classList.remove("hidden")
        affichagerecette.classList.add("hidden")
    }
} 