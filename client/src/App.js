import Home from './pages/Home';
import ReportPage from './pages/ReportPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
     <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/generate" element={<ReportPage />} />
     </Routes>
     </Router>
    
  );
}

export default App;
