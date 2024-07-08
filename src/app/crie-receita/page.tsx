'use client';

import { Button } from '@/styled-components/Button';
import NavBar from '@/components/NavBar';
import Recipe from '@/components/Recipe';
import { getRecipe } from '@/service/OpenAI';
import { useEffect, useRef, useState } from 'react';
import { PageContainer, PageContent } from '@/styled-components/PageContainer';
import { Column } from '@/styled-components/Column';
import { SubTitle } from '@/styled-components/Texts';
import {
  RecipeResult,
  RecipeTextArea,
} from '@/styled-components/RecipeContents';

export default function Home(): React.ReactElement {
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recipe, setRecipe] = useState('');
  const recognitionRef = useRef<SpeechRecognition>();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current as SpeechRecognition;
      recognition.interimResults = true;
      recognition.lang = 'pt-BR';
      recognition.continuous = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let text = '';

        Object.values(event.results).forEach(
          (result: SpeechRecognitionResult) => {
            text += result[0].transcript;
          }
        );

        setTranscript(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      return () => {
        recognition.stop();
      };
    }
  }, []);

  function handleListening(currentListeningValue: boolean): void {
    if (!recognitionRef.current) return;

    if (currentListeningValue) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  }

  function onWrite(value: string): void {
    if (isListening) return;

    setTranscript(value);
  }

  async function generateText(): Promise<void> {
    setLoading(true);
    try {
      const text = await getRecipe(transcript);
      setRecipe(text);
    } catch (e: unknown) {
      console.error(e as Error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageContent>
          <Column>
            <SubTitle>Fale sua receita.</SubTitle>
            <RecipeTextArea
              value={transcript}
              onChange={(evt) => onWrite(evt.target.value)}
            />
            <Button
              onClick={() => handleListening(isListening)}
              disabled={loading}
            >
              {!isListening ? 'Comece a gravar' : 'Parar de gravar'}
            </Button>
            <Button
              onClick={async () => await generateText()}
              disabled={isListening || !transcript || loading}
            >
              {!loading ? 'Gerar receita' : 'Gerando...'}
            </Button>
          </Column>

          <Column>
            <SubTitle>Receita escrita</SubTitle>
            <RecipeResult>{recipe && <Recipe rawText={recipe} />}</RecipeResult>
            <Button disabled={!recipe || loading}>Salvar</Button>
          </Column>
        </PageContent>
      </PageContainer>
    </>
  );
}
