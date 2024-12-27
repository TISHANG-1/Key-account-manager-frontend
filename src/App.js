import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import LoginSignUp from "./component/LoginSignUp";
import { useAuth } from "./context/auth";
import NavigationBar from "./component/NavigationBar";
import LeadsPage from "./component/Leads";
import CallSchedulePage from "./component/CallSchedules";
import PerformanceMetricsPage from "./component/Performance";
import LeadDetailsPage from "./component/LeadsDetailsPage";
import { ToastContainer } from "react-toastify";

function App() {
  const { isLoggedin } = useAuth();
  return (
    <>
      <Router>
        <Header />
        {isLoggedin || localStorage.getItem("token") ? (
          <NavigationBar />
        ) : (
          <></>
        )}
        <Routes>
          {!localStorage.getItem("token") ? (
            <Route path="/" Component={LoginSignUp} />
          ) : (
            <></>
          )}
          {localStorage.getItem("token") ? (
            <Route path="/home" Component={LeadsPage} />
          ) : (
            <></>
          )}
          {localStorage.getItem("token") ? (
            <Route path="/leads" Component={LeadsPage} />
          ) : (
            <></>
          )}
          {localStorage.getItem("token") ? (
            <Route path="/call-schedules" Component={CallSchedulePage} />
          ) : (
            <></>
          )}
          {localStorage.getItem("token") ? (
            <Route path="/performance" Component={PerformanceMetricsPage} />
          ) : (
            <></>
          )}
          {localStorage.getItem("token") ? (
            <Route path="/leads-details" Component={LeadDetailsPage} />
          ) : (
            <></>
          )}
        </Routes>
      </Router>
      <ToastContainer limit={3} />
    </>
  );
}

export default App;
