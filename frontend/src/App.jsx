import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar.jsx";
import ImageForm from "./pages/studio.jsx";
import CreateApps from "./pages/CreateApps.jsx";

export default function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
      <Route path='/studio' element={<ImageForm />} />
      <Route path='/create' element={<CreateApps />} />
    </Routes>
  </BrowserRouter>
  );
}