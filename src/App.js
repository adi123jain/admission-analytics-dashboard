import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdmissionDashboard from './pages/AdmissionDashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AdmissionDashboard />} />
      </Routes>
    </>
  );
}

export default App;
