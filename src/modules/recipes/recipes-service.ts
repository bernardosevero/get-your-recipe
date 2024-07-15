import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import AuthService from "../auth/auth-service";

const prisma = new PrismaClient()

async function getRecipes() {
  const sessionCookie = cookies().get('session');
  const {email} = await AuthService.openSessionToken(sessionCookie?.value || '')

  const user  = await prisma.user.findFirst({where:{email: email || ''}})
  const recipes = await prisma.recipe.findMany({where:{userId: user?.id }})

  return recipes
}

async function saveRecipe(content: string, title: string) {
  const sessionCookie = cookies().get('session');
  const {email} = await AuthService.openSessionToken(sessionCookie?.value || '')

  const user  = await prisma.user.findFirst({where:{email: email || ''}})

  if (!user) return null

  await prisma.recipe.create({
    data: {
      content,
      title,
      userId: user.id
    }
  })
}

const RecipeService =  {
  getRecipes,
  saveRecipe
}

export default RecipeService
