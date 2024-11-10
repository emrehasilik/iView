import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateInfoForm from './pages/CandidateInfoForm';
import InterviewQuestions from './pages/InterviewQuestions';

function App() {
  return (
    <Router>
      <Routes>
        {/* Adayın form doldurduğu rota */}
        <Route path="/interview/:interviewId" element={<CandidateInfoForm />} />
        
        {/* Adayın soruları cevapladığı rota, questionId opsiyonel */}
        <Route path="/interview/:interviewId/:candidateId/:questionId?" element={<InterviewQuestions />} />
      </Routes>
    </Router>
  );
}

export default App;
