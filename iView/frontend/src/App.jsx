import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageQuestion from './pages/Manage_Question';
import PackageTitle from './pages/Package_Title';
import AddQuestion from './popup/Add_Question'; // Add_Question bileşeni doğru yoldan import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/manage-question" element={<ManageQuestion />} />
        <Route path="/package-title" element={<PackageTitle />} />
        <Route path="/add-question" element={<AddQuestion />} /> {/* Yönlendirme /add-question */}
        {/* Varsayılan yönlendirme */}
        <Route path="*" element={<ManageQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
