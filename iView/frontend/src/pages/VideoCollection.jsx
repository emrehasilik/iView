import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import useVideoStore from '../store/Video_Store'; // Video store'u import ediyoruz
import useInterviewStore from '../store/Interview_Store'; // Mülakat store'u import ediyoruz

const VideoCollection = () => {
  const { interviewId } = useParams(); // URL'den interviewId parametresini alıyoruz

  // Interview store'dan mülakatı alıyoruz
  const interviews = useInterviewStore((state) => state.interviews);
  const interview = interviews[interviewId]; // interviewId'ye göre ilgili mülakatı alıyoruz

  // Video store'dan videoları alıyoruz
  const videos = useVideoStore((state) => state.videos);
  const removeVideo = useVideoStore((state) => state.removeVideo); // Video silme fonksiyonu

  if (!interview) {
    return <div>Mülakat bulunamadı</div>;
  }

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex-grow p-8">
        <Navbar />

        {/* Mülakat Başlığı */}
        <h1 className="text-xl font-bold mb-4">{interview.title} Video Collection</h1>

        <div className="grid grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-2 text-center">{video.candidateName}</h2>
                <video controls className="w-full h-48 bg-gray-200 rounded-lg">
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
    </div>
  );
};

export default VideoCollection;
