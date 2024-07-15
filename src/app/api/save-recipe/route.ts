import RecipeService from "@/modules/recipes/recipes-service";

export async function POST(req: Request) {
  const body = await req.json()
  await RecipeService.saveRecipe(body.content, body.title)

  return Response.json({ data: 'ok' })
}
