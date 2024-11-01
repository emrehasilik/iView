import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageQuestion from './pages/Manage_Question';
import PackageTitle from './pages/Package_Title';
import QuestionPackageEdit from './pages/Question_Package_Edit'; // Düzenleme sayfası
import InterviewList from './pages/Interview_List'; // InterviewList bileşeni
import VideoCollection from './pages/VideoCollection';  // Video Collection sayfası

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManageQuestion />} />
        <Route path="/manage-question" element={<ManageQuestion />} />
        <Route path="/interview-list" element={<InterviewList />} /> {/* Doğru tanım */}
        <Route path="/package-title" element={<PackageTitle />} />
        <Route path="/edit-package/:packageIndex" element={<QuestionPackageEdit />} /> {/* Düzenleme rotası */}
        <Route path="/video-collection/:interviewId" element={<VideoCollection />} /> {/* Rota tanımı */}
      </Routes>
    </Router>
  );
}

export default App;
