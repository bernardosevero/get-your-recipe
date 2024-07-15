import RecipeService from "@/modules/recipes/recipes-service";

export async function GET() {
  const recipes = await RecipeService.getRecipes()

  return Response.json({ data: recipes })
}
