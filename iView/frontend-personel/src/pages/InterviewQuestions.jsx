import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import usePersonelInformationStore from '../store/PersonelInformation';

function InterviewQuestions() {
  const { interviewId } = useParams();
  const personalInfo = usePersonelInformationStore((state) => state.personalInfo);
  const candidateId = personalInfo?.id;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedBlobs, setRecordedBlobs] = useState([]);

  const fetchInterviewQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/interview/${interviewId}/questions`);
      const fetchedQuestions = response.data.questions;

      setQuestions(fetchedQuestions);
      setLoading(false);

      if (fetchedQuestions.length > 0) {
        setTimeLeft(fetchedQuestions[0].minutes * 60);
        startRecording();
      }
    } catch (error) {
      console.error('Sorular yüklenirken bir hata oluştu:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviewQuestions();

    return () => {
      // Cleanup
      if (isRecording) {
        stopRecording();
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && !loading) {
      handleNextQuestion();
      return;
    }

    if (!loading) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, loading]);

  const startRecording = async () => {
    try {
      setRecordedBlobs([]);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs((prev) => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        // Video dosyasını backend'e gönder
        const blob = new Blob(recordedBlobs, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('file', blob, 'video.webm');
        formData.append('candidateId', candidateId);
        formData.append('questionId', questions[currentQuestionIndex]._id);

        try {
          await axios.post(`http://localhost:5000/api/interview/${interviewId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Video başarıyla yüklendi');
        } catch (error) {
          console.error('Video yüklenirken hata oluştu:', error);
        }

        setRecordedBlobs([]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Kayda başlanırken hata oluştu:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (isRecording) stopRecording();

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(questions[nextIndex]?.minutes * 60 || 0);

      startRecording();
    } else {
      setFinished(true);
      // Video akışını durdur
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  };

  const calculateProgress = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) {
      return 0;
    }
    return (
      ((questions[currentQuestionIndex].minutes * 60 - timeLeft) /
        (questions[currentQuestionIndex].minutes * 60)) *
      100
    );
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (finished) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-2xl">
        Katıldığınız için teşekkürler! Size geri dönüş yapacağız.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Page</h1>

      {/* İlerleme Çubuğu */}
      <div className="w-full max-w-lg bg-gray-700 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
      <div className="text-center mb-2">{Math.floor(calculateProgress())}%</div>

      <div className="flex flex-row items-start bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {/* Video Alanı */}
        <div className="w-2/3 mr-4">
          <video ref={videoRef} autoPlay muted className="w-full h-full bg-black" />
        </div>

        {/* Soru Alanı */}
        <div className="w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-2">Question:</h2>
            <p>{questions[currentQuestionIndex]?.question}</p>
            <p className="mt-4">
              Time left:{' '}
              {Math.floor(timeLeft / 60)
                .toString()
                .padStart(2, '0')}
              :
              {(timeLeft % 60).toString().padStart(2, '0')}
            </p>
            <p>Total time for this question: {questions[currentQuestionIndex]?.minutes} minutes</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleNextQuestion}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Skip
            </button>
            <button onClick={handleNextQuestion} className="px-4 py-2 rounded bg-red-500 text-white">
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewQuestions;
