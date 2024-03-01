import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar.jsx";
import CreateApps from "./pages/CreateApps.jsx";
import ImageForm from "./pages/studio.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"
import TextToText from "./aiComponents/TextToText.jsx";
import TextToImage from "./aiComponents/TextToImage.jsx";

import MarketPlace from "./pages/MarketPlace.jsx";
import New from "./pages/New.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";


export default function App() {
  
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-in' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignupPage />} />
      <Route path='/marketplace' element={<MarketPlace />}/>
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />   
        <Route path='/create/text-to-text' element={<TextToText />} /> 
        <Route path='/rate/:id' element={<ReviewPage />}/>    
        <Route path='/create/text-to-image' element={<TextToImage />} />   
      </Route>
      <Route path='/create' element={<CreateApps />} />
      <Route path='/studio' element={<ImageForm />} />
      <Route path='/market/:id' element={<New />}/>
    </Routes>
  </BrowserRouter>
  );
}