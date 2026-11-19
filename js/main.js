import { addRecipe, getRecipes ,searchRecipes } from "./API.js"
import {validationform} from "./validation.js"
const affichagerecette = document.querySelector("#affichagerecette")



function creerCarte(recette){
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

        return carte

}


function afficherRecettes(recettes) {
    recettes.forEach(recette => {
        const carte = creerCarte(recette);
        affichagerecette.appendChild(carte);
    });
}

async function chargerRecettes() {
    const data = await getRecipes();
    const recettes = data.recipes;  

    // console.log(data);
    console.log(data.recipes);
    // console.log(data.recipes[0]);
    const comnteurerecette = document.querySelector("#recipes-count")
    comnteurerecette.textContent=data.recipes.length
    affichagerecette.replaceChildren()
    emptymessage.classList.add("hidden")
    affichagerecette.classList.remove("hidden")
    afficherRecettes(recettes)
}
chargerRecettes()


async function rechercherecette(motrechercher) {
    const data = await searchRecipes(motrechercher);
    // console.log(data)
    affichagerecette.replaceChildren()
    afficherMessageVide(data.recipes)
    afficherRecettes(data.recipes)

    const comnteurerecette = document.querySelector("#recipes-count");
    comnteurerecette.textContent = data.recipes.length;
    
}

const searchForm = document.querySelector("#search-form")
const searchinput = document.querySelector("#search-input")


searchForm.addEventListener("submit",function(event){

    event.preventDefault()
    const recette = searchinput.value.trim();

    if (recette !== "") {
        rechercherecette(recette)
    }

})

const emptymessage = document.querySelector("#empty-message")
const showallcarte = document.querySelector("#show-all-button")

async function afficherMessageVide(recettes) {
    if (recettes.length === 0) {
        emptymessage.classList.remove("hidden")
        affichagerecette.classList.add("hidden")
    } else {
        emptymessage.classList.add("hidden")
        affichagerecette.classList.remove("hidden")
    }
} 
showallcarte.addEventListener("click", function(event) {
    event.preventDefault()

    emptymessage.classList.add("hidden")
    affichagerecette.classList.remove("hidden")
    affichagerecette.replaceChildren()

    chargerRecettes()
});


const ajouterrecette = document.querySelector("#ajouterrecette")
const  submitrecipebutton=document.querySelector("#submit-recipe-button")
const notification =document.querySelector("#notification")

ajouterrecette.addEventListener("submit",async function(event){

    event.preventDefault()
    const isValid = validationform()
    console.log("Validation :", isValid)
    if (!isValid){
        return ;
    }

    
    const recipename =document.querySelector("#recipe-name")
    const recipecuisine =document.querySelector("#recipe-cuisine")
    const recipedifficulty =document.querySelector("#recipe-difficulty")
    const recipetime =document.querySelector("#recipe-time")

    const data = {
        image: "https://resize.elle.fr/article_960_webp/var/plain_site/storage/images/elle-a-table/les-dossiers-de-la-redaction/news-de-la-redaction/recettes-faciles-cuisine-marocaine-4173785/100676152-1-fre-FR/Cuisine-marocaine-5-recettes-pour-s-y-mettre.jpg",
        name: recipename.value.trim(),
        cuisine: recipecuisine.value.trim(),
        difficulty: recipedifficulty.value,
        prepTimeMinutes: Number(recipetime.value)
    }
    console.log("valider");
    

    submitrecipebutton.disabled = true
    submitrecipebutton.classList.remove("hover:bg-[#cf6428]")
    submitrecipebutton.classList.replace("bg-[#E87532]","bg-[#FDBA91]")
    try{
        const ajouterrecette = await addRecipe(data)
        console.log(ajouterrecette)
        
        const carte = creerCarte(ajouterrecette);
        affichagerecette.prepend(carte);    

        notification.classList.remove("hidden")
        setTimeout(() => {
            notification.classList.add("hidden")
        }, 3000)

    } catch(error){
        console.log("erreur dajouter un recette")
    } finally{
        submitrecipebutton.disabled = false
        submitrecipebutton.classList.add("hover:bg-[#cf6428]")
        submitrecipebutton.classList.replace("bg-[#FDBA91]", "bg-[#E87532]")

    }
    
    
})

