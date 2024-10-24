import OpenAI from "openai";

export async function getRecipe(text: string, key: string): Promise<string> {
    if(text.length > 2000 || !text.length) return ''
    const openai = new OpenAI({
      apiKey: key,
    });

    const response =  await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "system",
            "content": `You will be given a text of a spoken culinary recipe in natural language. You must transform the spoken recipe into a structured, classic recipe format, as seen in a standard cookbook. The recipe should at least contain the method of preparation and ingredients. The response pattern should be designed for future separation into smaller parts, following the example below between ~~~ ... ~~~:
            ~~~
            ### Fried Egg
            ### Ingredients
            ----
            - egg
            - oil to taste
            ----
            ### Method of preparation
            ----
            1. Break the eggs into the pan
            2. Fry until done
            ----
            ~~~
            If you believe the text is not related to any recipe, return: "Recipe not understood, please resend with more details." The final response should not contain the "~~~" used to delimit the example. The response must be in English. If you think any information is missing in the method of preparation, feel free to add it. The texts referring to the method of preparation and ingredients must be between ---- ----
            `
          },
          {
            "role": "user",
            "content": text
          }
        ],
        temperature: 0.6,
        max_tokens: 400,
        top_p: 1,
      });

      const recipe = response.choices[0].message.content

      return recipe || ''
}
