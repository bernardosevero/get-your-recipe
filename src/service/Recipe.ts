import { Recipe } from "@prisma/client";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const api = axios.create({baseURL})

export async function saveRecipe(title: string, content: string): Promise<string>{
  const {data: recipe} = (await api.post('save-recipe', {title, content})).data

  return recipe
}

export async function getRecipes(): Promise<Recipe[]>{
  const {data: recipes} = (await api.get('list-recipes')).data

  return recipes
}
