import SignupPage from "./pages/SignupPage"; 
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate } from "react-router-dom";
import Tasks from "./pages/TaskPage";
import Nosql from "./pages/Nosql";
import RXSS from "./pages/RXSS";
import SXSS from "./pages/SXSS";
import CommandInjection from "./pages/CommandInjection";
import OpenRedirectLogin from "./pages/OpenRedirectLogin";
import OpenRedirectHome from "./pages/OpenRedirectHome";
import FileUpload from "./pages/FileUpload";
import CSRF from "./pages/CSRF";
import IdorHome from "./pages/IdorHome";
import IdorLogin from "./pages/IdorLogin";




function App() {
  const {authUser}=useAuthStore()
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>} /> 
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} /> 
        <Route path="/tasks" element={authUser ? <Tasks/> : <Navigate to="/login"/>} /> 
        <Route path="/tasks/nosql" element={<Nosql/>} />
        <Route path="/tasks/RXSS" element={<RXSS/>} />
        <Route path="/tasks/SXSS" element={<SXSS/>} />
        <Route path="/tasks/command-injection" element={<CommandInjection/>} />
        <Route path="/tasks/open-redirect" element={<OpenRedirectLogin/>} />
        <Route path="/tasks/openredirect-Home" element={<OpenRedirectHome/>} />
        <Route path="/tasks/file-upload" element={<FileUpload/>} />
        <Route path="/tasks/csrf" element={<CSRF/>} />
        <Route path="/tasks/IDOR" element={<IdorLogin/>} />
        <Route path="/tasks/idor-home" element={<IdorHome/>} />
        
        
      </Routes>
    </div>
  );
}

export default App;
