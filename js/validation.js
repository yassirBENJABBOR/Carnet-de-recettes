
const  submitrecipebutton=document.querySelector("#submit-recipe-button")

export function validationform(){
    
    const recipename =document.querySelector("#recipe-name")
    const recipecuisine =document.querySelector("#recipe-cuisine")
    const recipedifficulty =document.querySelector("#recipe-difficulty")
    const recipetime =document.querySelector("#recipe-time")

    let hasError = false

    const nameerror =document.querySelector("#name-error")
    const name = recipename.value.trim()
    if (name === "") {
        nameerror.textContent = "Veuillez entrer le nom de la recette"
        nameerror.classList.remove("hidden")
        hasError = true

    } else if (name.length < 3 || name.length > 60) {
        nameerror.textContent = "Le nom doit contenir entre 3 et 60 caractères"
        nameerror.classList.remove("hidden")
        hasError = true
    } else {
        nameerror.classList.add("hidden")
    }

    const cuisineerror =document.querySelector("#cuisine-error")
    if (recipecuisine.value.trim() === "") {
        cuisineerror.textContent = "Veuillez entrer le type de cuisine"
        cuisineerror.classList.remove("hidden")
        hasError = true
    } else {
        cuisineerror.classList.add("hidden")
    }


    const difficultyerror =document.querySelector("#difficulty-error")
    if (recipedifficulty.value===""){
        difficultyerror.textContent ="Veuiller selectionner la defficulter de recette"
        difficultyerror.classList.remove("hidden")
        hasError = true

    }else {
        difficultyerror.classList.add("hidden")
    }

    const timeerror =document.querySelector("#time-error")
    const time = Number(recipetime.value)

    if (recipetime.value.trim() === "") {
        timeerror.textContent = "Veuillez entrer le temps de preparation"
        timeerror.classList.remove("hidden")
        hasError = true

    } else if (!Number.isFinite(time) || time < 1 || time > 300) {
        timeerror.textContent = "Le temps doit etre entre 1 et 300 minutes"
        timeerror.classList.remove("hidden")
        hasError = true

    } else {
        timeerror.classList.add("hidden")
    }

    if (hasError) {
        return false
    }
    return true
}