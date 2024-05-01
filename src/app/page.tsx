'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
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

  function startListening() {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }

  function stopListening() {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }

  return (
    <>
      <button
        onClick={() => (isListening ? stopListening() : startListening())}
      >
        {!isListening ? 'Start to record' : 'recording'}
      </button>
      <p>{transcript}</p>
    </>
  );
}
