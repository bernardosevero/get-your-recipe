import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const api = axios.create({baseURL})

export async function createRecipe(text: string): Promise<string>{
  const {data: recipe} = (await api.post('create-recipe', {text})).data

  return recipe
}
