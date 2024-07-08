import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true
});

export async function getRecipe(text: string): Promise<string> {
    if(text.length > 2000 || !text.length) return ''
    // return "### Ovo Frito com Orégano\n### Ingredientes\n<><> \n- 1 ovo\n- Óleo (para fritar)\n- Sal a gosto\n- Orégano a gosto \n<><>\n### Modo de preparo\n<><> \n1. Aqueça uma frigideira com um pouco de óleo.\n2. Quebre o ovo na frigideira quente.\n3. Adicione sal e orégano a gosto.\n4. Frite até que a clara esteja cozida e a gema mole.\n5. Sirva imediatamente.\n<><>"

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


// ~~~
// ### Mousse de Maracujá Cremoso
// ### Ingredientes
// - 1 pacote de suco em pó sabor maracujá (Tang)
// - 1 lata de leite condensado
// - 1 lata de creme de leite

// ### Modo de preparo
// 1. Em um liquidificador, adicione o suco em pó sabor maracujá, o leite condensado e o creme de leite.
// 2. Bata os ingredientes por alguns minutos até obter uma mistura homogênea.
// 3. Reserve o resultado obtido e leve à geladeira por algumas horas.
// 4. Após esse tempo, sirva o mousse de maracujá cremoso gelado e desfrute.
// ~~~

// Esse é no segundo teste para ensinar como fazer uma receita de mousse de maracujá cremoso de maneira prática bom essa receita para fazer é muito simples basta misturar um Tang de maracujá um leite condensado e também um creme de leite coloca essas três itens num liquidificador bata para alguns minutos até ficar homogêneo depois reserve esse resultado eu não vou e deixe na geladeira por algumas horas você terá com isso depois desse tempo um mousse de maracujá perfeito


// '### Panqueca Saudável de Banana\n\n#### Ingredientes:\n- 1 banana madura\n- 2 colheres de sopa de farinha de aveia ou aveia em flocos\n- 2 colheres de sopa de leite em pó\n- 1 ovo\n- Óleo ou manteiga para untar a frigideira\n\n#### Modo de Preparo:\n1. Em uma tigela, amasse a banana até obter uma consistência homogênea.\n2. Adicione a farinha de aveia ou aveia em flocos e misture bem.\n3. Acrescente o leite em pó e o ovo, misturando até obter uma massa uniforme.\n4. Aqueça uma frigideira antiaderente untada com óleo ou manteiga em fogo médio.\n5. Despeje uma porção da massa na frigideira, espalhando para formar uma panqueca.\n6. Cozinhe por alguns minutos até que a parte de baixo esteja dourada.\n7. Com o auxílio de uma espátula, vire a panqueca para dourar o outro lado.\n8. Retire a panqueca da frigideira e repita o processo com o restante da massa.\n9. Sirva a panqueca de banana quente, acompanhada de mel, frutas ou outros ingredientes de sua preferência.\n\nAproveite sua deliciosa e saudável panqueca de banana!'
