import React, { useState } from 'react';
import useVideoStore from '../store/Video_Store';

const VideoPopup = ({ video, isOpen, onClose, note, setNote, status, setStatus, index }) => {
  const updateVideo = useVideoStore((state) => state.updateVideo);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    updateVideo(index, {
      note,
      status,
    });
    setMessage("Cevap başarıyla kaydedildi.");
    setTimeout(() => {
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full flex"> {/* Div boyutu artırıldı */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 text-center">{video.candidateName}</h2>
          {/* Video boyutunu otomatik olarak büyüt */}
          <video controls className="w-full h-auto bg-gray-200 rounded-lg mb-4"> {/* Yüksekliği otomatik ayarladık */}
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="flex-1 ml-4">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-48 p-2 border border-gray-300 rounded mb-2"
            placeholder="Notlarınızı buraya yazın..."
          />

          <div className="flex items-center mb-4">
            <label className="mr-2">Durum:</label>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={status === "passed"}
                onChange={() => setStatus(status === "passed" ? "failed" : "passed")}
              />
              <div className={`toggle ${status === "passed" ? 'bg-green-500' : 'bg-red-500'} w-10 h-5 rounded-full transition duration-200`}>
                <div className={`dot ${status === "passed" ? 'translate-x-5' : 'translate-x-0'} bg-white w-5 h-5 rounded-full transition duration-200`}></div>
              </div>
            </label>
          </div>

          {message && <p className="text-green-500 text-center">{message}</p>}

          <div className="flex justify-between mt-4">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
              Kaydet
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
