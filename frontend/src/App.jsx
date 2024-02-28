import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar.jsx";

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
<Route path='/studio' element={<ImageForm />} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />      
      </Route>
      <Route path='/create' element={<CreateApps />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}