'use client';

import NavBar from '@/components/NavBar';
import { getRecipes } from '@/service/Recipe';
import { Button } from '@/styled-components/Button';
import { RecipeTitle, SubText, Title } from '@/styled-components/Texts';
import { Recipe } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function Home(): React.ReactElement {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [wasCopied, setWasCopied] = useState<string[]>([]);

  function copyContent(text: string, id: string) {
    try {
      navigator.clipboard.writeText(text);
      setWasCopied((current) => [...current, id]);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  async function fetchRecipes() {
    const response = await getRecipes();
    setRecipes(response);
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <Title>Olá</Title>
        <SubText>Aqui estão suas receitas</SubText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {recipes.map((recipe) => (
          <div
            style={{
              borderRadius: '12px',
              width: '200px',
              boxShadow: 'rgb(215 215 215) 0px 4px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '12px',
              padding: '12px',
              textAlign: 'center',
            }}
          >
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <Button onClick={() => copyContent(recipe.content, recipe.id)}>
              {wasCopied.includes(recipe.id) ? 'Copiado' : 'Copiar'}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
