import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManageQuestion from './pages/Manage_Question';
import PackageTitle from './pages/Package_Title';
import QuestionPackageEdit from './pages/Question_Package_Edit';
import InterviewList from './pages/Interview_List';
import VideoCollection from './pages/VideoCollection';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Korunan rotalar */}
        <Route
          path="/manage-question"
          element={
            <PrivateRoute>
              <ManageQuestion />
            </PrivateRoute>
          }
        />
        <Route
          path="/interview-list"
          element={
            <PrivateRoute>
              <InterviewList />
            </PrivateRoute>
          }
        />
        <Route
          path="/package-title"
          element={
            <PrivateRoute>
              <PackageTitle />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-package/:packageIndex"
          element={
            <PrivateRoute>
              <QuestionPackageEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="/video-collection/:interviewId"
          element={
            <PrivateRoute>
              <VideoCollection />
            </PrivateRoute>
          }
        />

        {/* Varsayılan rota: Giriş yapmamışsa login'e yönlendir */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
