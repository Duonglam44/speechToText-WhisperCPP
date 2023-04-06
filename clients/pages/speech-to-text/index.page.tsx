import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import Api from '@configs/api';

const RecordCPN = dynamic(() => import('@components/children/RecordDialog'), {
  ssr: false
})

let data = '';
const Dictaphone = () => {
  const recordRef = useRef<MediaRecorder>();
  const [isListening, setListening] = useState(false);
  const speechRecognitionRef = useRef<typeof SpeechRecognition>();
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    data = transcript;
  }, [transcript])

  useEffect(() => {
    speechRecognitionRef.current = SpeechRecognition.getRecognition();
    speechRecognitionRef.current.lang = 'vi-VN';
    speechRecognitionRef.current.onspeechend = () => {
      if (!data) return;
      recordRef.current?.stop();
    }
    speechRecognitionRef.current.onstart = () => {
      if (recordRef.current?.state === 'recording') return;
      recordRef.current?.start();
    }
    speechRecognitionRef.current.onend = () => {
      speechRecognitionRef.current.start()
    }
  }, [])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  const stopDetect = () => {
    speechRecognitionRef.current.onend = () => {
      setListening(false);
    }
    speechRecognitionRef.current.stop();
  }

  const start = () => {
    setListening(true);
    speechRecognitionRef.current.start();
  } 

  return (
    <div>
      <p>Microphone: {isListening ? 'on' : 'off'}</p>
      <button onClick={start}>Start</button>
      <button onClick={stopDetect}>Stop</button>
      <RecordCPN recordRef={recordRef} />
      <p>transcript: {transcript}</p>
    </div>
  );
};
export default Dictaphone;