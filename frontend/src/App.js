import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentFail from './components/Payments/PaymentFail';
import Subscribe from './components/Payments/Subscribe';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CoursePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/createcourse" element={<Dashboard />} />
        <Route path="/admin/courses" element={<Dashboard />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Request />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
