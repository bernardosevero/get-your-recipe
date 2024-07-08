import { FormatedTextContainer } from '@/styled-components/FormatedTextContainer';
import {
  RecipeContent,
  RecipeSubTitle,
  RecipeTitle,
  SubTitle,
} from '@/styled-components/Texts';
import React, { useEffect, useState } from 'react';

type Props = {
  rawText: string;
};

type Recipe = {
  title: string;
  ingredientsTitle: string;
  ingredientsContent: string;
  howToPrepareTitle: string;
  howToPrepareContent: string;
};

const initialRecipe: Recipe = {
  howToPrepareContent: '',
  howToPrepareTitle: 'Modo de preparo',
  ingredientsContent: '',
  ingredientsTitle: 'Ingredientes',
  title: '',
};

const NO_ANSWER = 'Receita não compreendida, favor reenviar com mais detalhes.';

export default function Recipe({ rawText }: Props): React.ReactElement {
  const [fields, setFields] = useState<Recipe>(initialRecipe);

  if (!rawText) return <></>;
  if (rawText === NO_ANSWER) return <SubTitle>{rawText}</SubTitle>;

  useEffect(() => {
    const [_, title, ingredients, howToPrepare] = rawText.split('###');
    const [__, ingredientsContent] = ingredients.split('----');
    const [___, howToPrepareContent] = howToPrepare.split('----');

    setFields((currentFields) => ({
      ...currentFields,
      title: title || '',
      ingredientsContent: ingredientsContent || '',
      howToPrepareContent: howToPrepareContent || '',
    }));
  }, []);

  return (
    <FormatedTextContainer>
      <RecipeTitle>{fields.title.trim()}</RecipeTitle>
      <RecipeSubTitle>{fields.ingredientsTitle}</RecipeSubTitle>
      <RecipeContent>{fields.ingredientsContent.trim()}</RecipeContent>
      <RecipeSubTitle>{fields.howToPrepareTitle}</RecipeSubTitle>
      <RecipeContent>{fields.howToPrepareContent.trim()}</RecipeContent>
    </FormatedTextContainer>
  );
}
