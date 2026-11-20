import { addRecipe, getRecipes ,searchRecipes,deletRecipe } from "./API.js"
import {validationform} from "./validation.js"
const affichagerecette = document.querySelector("#affichagerecette")

let toutesLesRecettes = [];


function afficherErreur(error) {
    const errorContainer = document.querySelector("#error-container");
    const errorText = document.querySelector("#error-text");

    if (error.response) {
        if (error.response.status === 404) {
            errorText.textContent = "Recette introuvable (404).";
        } 
        else if (error.response.status >= 500) {
            errorText.textContent = "Erreur du serveur. Réessayez plus tard.";
        } 
        else {
            errorText.textContent = "Une erreur est survenue.";
        }

    } else if (error.code === "ECONNABORTED") {
        errorText.textContent = "Le serveur met trop de temps à répondre.";

    } else {
        errorText.textContent = "Impossible de se connecter. Vérifiez votre connexion Internet.";
    }

    errorContainer.classList.remove("hidden");
    affichagerecette.classList.add("hidden");
}


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

    const supprimer =document.createElement("button")
    supprimer.textContent= "Supprimer"
    supprimer.className ="bg-[#E87532] hover:bg-[#cf6428] red-600 text-white px-4 py-2 mt-4 rounded-lg text-sm font-semibold transition flex items-center gap-2"


    image.src = recette.image;
    titre.textContent = recette.name;
    cuisine.textContent = `Cuisine : ${recette.cuisine}`;
    difficulte.textContent = `Difficulté : ${recette.difficulty}`;
    temps.textContent = `Temps de préparation : ${recette.prepTimeMinutes} min`;


    contenu.append(titre,cuisine,difficulte,temps,supprimer);

    carte.append(image, contenu);

    supprimer.addEventListener("click",async function(event){
        event.preventDefault()
        const confirmation =confirm("est ce que voulez vous supprimer cette recette ?")
        if (!confirmation) {
            return;
        }
        try{
            if (recette.source === "api") {
                await deletRecipe(recette.id)
            }
            toutesLesRecettes = toutesLesRecettes.filter(
                item => item.id !== recette.id
            );

            carte.remove();

            const comnteurerecette = document.querySelector("#recipes-count");
            comnteurerecette.textContent = toutesLesRecettes.length;

            console.log("Recette supprimée");   

        }catch{
            const errorsuprimer = document.querySelector("#delete-error")

            if (error.response) {
                if (error.response.status === 404) {
                    errorText.textContent = "Recette introuvable (404).";
                } else if (error.response.status >= 500) {
                    errorText.textContent = "Erreur du serveur. Impossible de supprimer.";
                } else {
                    errorText.textContent = "Erreur lors de la suppression.";
                }
            } else {
                errorText.textContent = "Vérifiez votre connexion Internet.";
            }
            errorsuprimer.classList.remove("hidden")
            setTimeout(() => {
                errorsuprimer.classList.add("hidden")
            }, 3000)

        }
    })

    return carte

}


function afficherRecettes(recettes) {
    recettes.forEach(recette => {
        const carte = creerCarte(recette);
        affichagerecette.appendChild(carte);
    });
}

async function chargerRecettes() {

    try{

    const data = await getRecipes();
    const recettesAPI = data.recipes.map(recette => ({
        ...recette,
        source: "api"
    }));

    const recettesUtilisateur = toutesLesRecettes.filter(
        recette => recette.source === "user"
    );

    toutesLesRecettes = [...recettesUtilisateur, ...recettesAPI];

    // console.log(data);
    // console.log(data.recipes);
    // console.log(data.recipes[0]);
    const comnteurerecette = document.querySelector("#recipes-count")
    comnteurerecette.textContent=data.recipes.length
    affichagerecette.replaceChildren()
    emptymessage.classList.add("hidden")
    affichagerecette.classList.remove("hidden")
    afficherRecettes(toutesLesRecettes)

    }catch{
        afficherErreur(error)
        console.log(error);

    }


}
chargerRecettes()


async function rechercherecette(motrechercher) {

    
    try{
        const data = await searchRecipes(motrechercher);
        // console.log(data)
        const recettesAPI = data.recipes.map(recette => ({
            ...recette,
            source: "api"
        }));

        const recettesUtilisateur = toutesLesRecettes.filter(recette =>
            recette.source === "user" &&
            recette.name.toLowerCase().includes(motrechercher.toLowerCase())
        )

        const resultats = [...recettesUtilisateur, ...recettesAPI];

        affichagerecette.replaceChildren()

        afficherMessageVide(resultats)
        afficherRecettes(resultats)

        const comnteurerecette = document.querySelector("#recipes-count")
        comnteurerecette.textContent = resultats.length

    }catch{
        console.log(error);
        afficherErreur(error)

    }

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
        
        const nouvelleRecette = {
            ...ajouterrecette,
            source: "user"
        };
        toutesLesRecettes.unshift(nouvelleRecette)

        const carte = creerCarte(nouvelleRecette)
        emptymessage.classList.add("hidden")
        affichagerecette.classList.remove("hidden")
                affichagerecette.prepend(carte)  

        notification.classList.remove("hidden")
        setTimeout(() => {
            notification.classList.add("hidden")
        }, 3000)
        const comnteurerecette = document.querySelector("#recipes-count");
        comnteurerecette.textContent = toutesLesRecettes.length

    } catch(error){
        afficherErreur(error);
        console.log(error);    
    } finally{
        submitrecipebutton.disabled = false
        submitrecipebutton.classList.add("hover:bg-[#cf6428]")
        submitrecipebutton.classList.replace("bg-[#FDBA91]", "bg-[#E87532]")

    }
    
    
})



