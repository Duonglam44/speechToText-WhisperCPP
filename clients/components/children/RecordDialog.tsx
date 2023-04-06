import axios from 'axios';
import React, { useState, useEffect } from 'react';

type recordType = {
  recordRef: any
}

let oldResult: Array<string> = []
let audioChunks: Array<any> = [];
const Record: React.FC<recordType> = ({ recordRef }) => {
  const [result, setResult] = useState<string[]>([])

  const checkRecord = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(async (stream) => {
      recordRef.current = new MediaRecorder(stream, { bitsPerSecond: 16000 });
      recordRef.current.ondataavailable = (e: any) => {
        console.log("🚀 ~ file: RecordDialog.tsx:15 ~ .then ~ ondataavailable:", e)
        audioChunks.push(e.data);
      };
      recordRef.current.onstart = () => {
        audioChunks = [];
      }
      recordRef.current.onstop = () => {
        const blob = new Blob(audioChunks, {
          type: "audio/ogg; codecs=opus"
        });
        const fileTime = `${Date.now()}`;

        const formData = new FormData()
        const file = new File([blob], `${fileTime}.ogg`);
        formData.append('file', file);
        axios.post('http://localhost:8080/dictation', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          oldResult = [...oldResult, res.data];
          setResult(oldResult)
        })
      }
      console.log("🚀 ~ file: RecordDialog.tsx:38 ~ .then ~ init successfully:")
    });
  }

  useEffect(() => {
    oldResult = result;
  }, [result])

  return (
    <div>
      <button onClick={checkRecord}>Check record</button>
      <div>
        result: <br />
        {
          result.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))
        }
      </div>
    </div>
  );
};

export default Record;