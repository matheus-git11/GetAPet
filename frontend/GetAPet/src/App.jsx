//dependencias
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Páginas
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";

//layout
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Container from './components/layout/container/Container'
import Message from "./components/layout/message/Message";




function App() {
  return (
    <Router> 
      <Navbar />
      <Message/>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/pet/mypets" element={<MyPets />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}
export default App;
