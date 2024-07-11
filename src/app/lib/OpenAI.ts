import OpenAI from "openai";

export async function getRecipe(text: string, key: string): Promise<string> {
    if(text.length > 2000 || !text.length) return ''

    const openai = new OpenAI({
      apiKey: key,
    });

    const response =  await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": `será inserido um texto de uma receita culinária falada em linguagem natural. Você deve transformar a receita falada em uma receita estruturada clássica, padrão livro de gastronomia. Possuindo, pelo menos, modo de preparo e ingredientes.
            O padrão de resposta será pensando numa futura separação dele em menores partes, seguindo o seguinte exemplo entre ~~~ ... ~~~:
            O conteudo retornado deve ser no formato pedido para futuras manipulações de string
            ~~~
            ### Ovo frito
            ### Ingredientes
            ----
              - ovo
              - oleo a gosto
            ----
            ### Modo de preparo
            ----
             1. quebre os ovos na frigideira
             2. frite ate ficar bom
            ----
            ~~~
            Se você julgar o texto não relativo à nenhuma receita, retorne: "Receita não compreendida, favor reenviar com mais detalhes".
            A resposta final não deve conter os "~~~" usados para delimitar o exemplo.
            A resposta deve ser em português brasileiro.
            Se julgares que alguma informação do modo de preparo está faltando, pode adicionar.
            Os textos referentes a modo de preparo e ingredientes devem estar entre ---- -----
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
