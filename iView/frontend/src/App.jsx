import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageQuestion from './pages/Manage_Question';
import PackageTitle from './pages/Package_Title';
import QuestionPackageEdit from './pages/Question_Package_Edit'; // Düzenleme sayfası

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ManageQuestion />} />
        <Route path="/manage-question" element={<ManageQuestion />} />
        <Route path="/package-title" element={<PackageTitle />} />
        <Route path="/edit-package/:packageIndex" element={<QuestionPackageEdit />} /> {/* Düzenleme rotası */}
      </Routes>
    </Router>
  );
}

export default App;
