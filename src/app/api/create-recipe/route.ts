import { getRecipe } from "@/app/lib/OpenAI";

export async function POST(req: Request) {
  const body = await req.json()
  const recipe = await getRecipe(body.text, process.env.OPENAI_KEY as string)
  return Response.json({ data: recipe })
}
