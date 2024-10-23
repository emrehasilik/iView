import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useVideoStore from '../store/Video_Store';
import useInterviewStore from '../store/Interview_Store';
import VideoPopup from '../popup/VideoPopup';

const VideoCollection = () => {
  const { interviewId } = useParams();
  const interviews = useInterviewStore((state) => state.interviews);
  const interview = interviews[interviewId];

  const videos = useVideoStore((state) => state.videos);
  const removeVideo = useVideoStore((state) => state.removeVideo);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null); // İndeks durumu
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("passed");

  if (!interview) {
    return <div>Mülakat bulunamadı</div>;
  }

  const handleVideoClick = (video, index) => {
    setCurrentVideo(video);
    setIsPopupOpen(true);
    setNote(""); // Popup açıldığında notu sıfırla
    setStatus("passed"); // Durumu sıfırla
    setCurrentIndex(index); // İndeksi ayarla
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-grow p-8">
        <Navbar />

        <h1 className="text-xl font-bold mb-4">{interview.title} Video Collection</h1>

        <div className="grid grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2 text-center">{video.candidateName}</h2>
                <video
                  onClick={() => handleVideoClick(video, index)} // İndeksi geçir
                  className="w-full h-48 bg-gray-200 rounded-lg cursor-pointer"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={() => removeVideo(index)}
                  className="text-red-500 mt-2"
                >
                  Remove Video
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No videos available.</div>
          )}
        </div>
      </div>

      {currentVideo && currentIndex !== null && (
        <VideoPopup
          video={currentVideo}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          note={note}
          setNote={setNote}
          status={status}
          setStatus={setStatus}
          index={currentIndex} // İndeksi geçir
        />
      )}
    </div>
  );
};

export default VideoCollection;
