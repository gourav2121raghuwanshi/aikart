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
import About from "./components/About.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import New from "./pages/New.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import UserApp from "./pages/UserApp.jsx";
import Text_ImageToText from "./aiComponents/Text_ImageToText.jsx"


export default function App() {
  
  return (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sign-up' element={<SignupPage />} />
      <Route path='/sign-in' element={<LoginPage />} />
      <Route path='/about' element={<About />} />
      <Route path='/marketplace' element={<MarketPlace />}/>
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />   
        <Route path='/create/text-to-text' element={<TextToText />} />
        <Route path='/create/text-image-to-text' element={<Text_ImageToText />} />
        <Route path='/rate/:id' element={<ReviewPage />}/>    
        <Route path='/user-apps/:id' element={<UserApp />}/>    
        <Route path='/create/text-to-image' element={<TextToImage />} />   
      </Route>
      <Route path='/create' element={<CreateApps />} />
      <Route path='/studio' element={<ImageForm />} />
      <Route path='/market/:id' element={<New />}/>
    </Routes>
  </BrowserRouter>
  );
}