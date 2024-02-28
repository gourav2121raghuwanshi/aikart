import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar.jsx";
import Features from "./components/Features.jsx";
import Testimonials from "./components/Testimonials.jsx";
import FAQ from "./components/FAQ.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import About from "./components/About.jsx";
export default function App() {
  
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
      <Route path='/features' element={<Features/>} />
      <Route path='/testimonials' element={<Testimonials/>} />
      <Route path='/faq' element={<FAQ/>} />
      <Route path='/faq' element={<ProfilePage/>} />
      <Route path='/about' element={<About/>} />

      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />      
      </Route>
      
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}