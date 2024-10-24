'use client';

import { Button } from '@/styled-components/Button';
import NavBar from '@/components/NavBar';
import Recipe from '@/components/Recipe';
import { useEffect, useRef, useState } from 'react';
import { PageContainer, PageContent } from '@/styled-components/PageContainer';
import { Column } from '@/styled-components/Column';
import { SubTitle } from '@/styled-components/Texts';
import {
  RecipeResult,
  RecipeTextArea,
} from '@/styled-components/RecipeContents';
import { createRecipe } from '@/service/OpenAI';
import { saveRecipe } from '@/service/Recipe';

export default function Home(): React.ReactElement {
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recipe, setRecipe] = useState('');
  const recognitionRef = useRef<SpeechRecognition>();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current as SpeechRecognition;
      recognition.interimResults = true;
      recognition.lang = 'en';
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
      const text = await createRecipe(transcript);
      setRecipe(text);
    } catch (e: unknown) {
      console.error(e as Error);
    } finally {
      setLoading(false);
    }
  }

  function getTitle() {
    const [_, title] = recipe.split('###');
    return title;
  }

  async function handleSaveRecipe() {
    setIsSaved(true);
    await saveRecipe(getTitle(), recipe);
  }

  return (
    <>
      <NavBar />
      <PageContainer>
        <PageContent>
          <Column>
            <SubTitle>Say your recipe</SubTitle>
            <RecipeTextArea
              value={transcript}
              onChange={(evt) => onWrite(evt.target.value)}
            />
            <Button
              onClick={() => handleListening(isListening)}
              disabled={loading}
            >
              {!isListening ? 'Start recording' : 'Stop recording'}
            </Button>
            <Button
              onClick={async () => await generateText()}
              disabled={isListening || !transcript || loading}
            >
              {!loading ? 'Create recipe' : 'Creating...'}
            </Button>
          </Column>

          <Column>
            <SubTitle>Result</SubTitle>
            <RecipeResult>
              {recipe && !loading && <Recipe rawText={recipe} />}
            </RecipeResult>
            <Button
              onClick={async () => await handleSaveRecipe()}
              disabled={!recipe || loading}
            >
              {!isSaved ? 'Save' : 'Saved'}
            </Button>
          </Column>
        </PageContent>
      </PageContainer>
    </>
  );
}
