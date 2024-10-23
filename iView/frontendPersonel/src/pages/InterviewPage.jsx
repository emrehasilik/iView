import React, { useState, useEffect, useRef } from 'react';

const questions = [
  { question: "Soru 1: Kendi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında ndi hakkında bilgi ver.", duration: 10 },
  { question: "Soru 2: En büyük başarın nedir? Bu sorunun detaylarını lütfen paylaş.", duration: 10 },
  { question: "Soru 3: Gelecek hedeflerin neler? Lütfen daha fazla bilgi ver.", duration: 10 },
];

const InterviewPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[0].duration);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Kamera akışını saklamak için

  useEffect(() => {
    if (isVideoPlaying) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion(); // Süre dolduğunda bir sonraki soruya geç
            return questions[currentQuestionIndex + 1]?.duration || 0; // Eğer soru kalmadıysa 0 yap
          }
          return prev - 1;
        });
      }, 1000); // Her saniye güncelle

      return () => clearInterval(timer);
    }
  }, [isVideoPlaying, currentQuestionIndex]);

  const handleStartInterview = () => {
    setIsVideoPlaying(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream; // Akışı sakla
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Kamera açılamadı: ", error);
      });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(questions[currentQuestionIndex + 1].duration);
    } else {
      setIsFinished(true);
      setIsVideoPlaying(false); // Mülakat tamamlandığında video durdurulabilir
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop()); // Kamerayı kapat
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Mülakat Sayfası</h1>
      {isVideoPlaying && (
        <div className="w-full max-w-5xl bg-gray-300 rounded-lg mb-4">
          <p className="text-center text-lg font-semibold mt-1">
            Süre: {timeLeft} saniye kaldı
          </p>
          <div
            className="bg-blue-500 h-2 rounded-lg"
            style={{ width: `${((questions[currentQuestionIndex].duration - timeLeft) / questions[currentQuestionIndex].duration) * 100}%` }}
          />
        </div>
      )}
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden h-[800px]"> {/* Yüksekliği artırdık */}
        <div className="flex-1 p-4">
          <video ref={videoRef} controls className="w-full h-full rounded-lg">
            <source src="/assets/deneme.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex-1 flex flex-col justify-between items-center p-6 overflow-y-auto"> {/* Dikey kaydırma çubuğu için ayarlandı */}
          {isVideoPlaying && (
            <div className="text-center mb-4 overflow-y-auto max-h-[500px]"> {/* Soru metni için kaydırma */}
              <p className="font-semibold overflow-hidden text-ellipsis whitespace-normal">
                Soru: {questions[currentQuestionIndex].question}
              </p>
            </div>
          )}
          {!isFinished ? (
            <div className="flex flex-col items-center w-full flex-grow justify-center"> {/* Butonu dikeyde ortalamak için */}
              {!isVideoPlaying && (
                <button 
                  onClick={handleStartInterview} 
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-200 mb-4"
                >
                  Start
                </button>
              )}
              {isVideoPlaying && (
                <div className="w-full flex justify-end mt-4">
                  <button 
                    onClick={handleNextQuestion} 
                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition duration-200"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          ) : (
            <h2 className="text-xl text-green-600 text-center font-semibold">
              Mülakat Tamamlandı! Katıldığınız için teşekkür ederiz.
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
