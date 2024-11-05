
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import './assets/css/app.css'
import DrowList from './components/drow/DrowList';
import PlayGame from './components/drow/PlayGame';
import Game from './components/drow/Game';
import Report from './components/report/Report';
import Ledger from './components/ledger/Ledger';
function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/drow" replace />} />
            <Route path="drow" element={<DrowList />} />
            <Route path="drow/:drowId" element={<Game />} />
            <Route path="drow/:drowId/:roundType" element={<PlayGame />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="report" element={<Report />} />
            <Route path="ledger" element={<Ledger />} />
          </Route>
        </Routes>
        <ToastContainer /> {/* Add ToastContainer here to display toasts globally */}
      </AuthProvider>
    </Router>
  )
}

export default App
