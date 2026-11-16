import axios from "axios";


export async function getRecipes() {
    const response = await api.get("/recipes", {
        params: {
            limit: 15
        }
    })
    return response.data;
}

export const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 10000
});



