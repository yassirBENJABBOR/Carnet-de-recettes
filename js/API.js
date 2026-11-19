import axios from "axios";


export async function getRecipes() {
    const response = await api.get("/recipes", {
        params: {
            limit: 12
        }
    })
    return response.data;
}


export async function searchRecipes(motrechercher) {
    const response = await api.get("/recipes/search", {
        params: {
            q: motrechercher
        }
    })
    return response.data;
}

export const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000
});



export async function addRecipe(data){
    const response =await api.post("/recipes/add",data)
    return response.data
}