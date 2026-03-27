import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import AttendanceScanner from "./components/AttendanceScanner";
import Gradebook from "./components/Gradebook";
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <Router>
      {user && <Navbar />}
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/students"
            element={user ? <StudentList /> : <Navigate to="/login" />}
          />
          <Route
            path="/students/new"
            element={user ? <StudentForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/students/edit/:id"
            element={user ? <StudentForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/attendance"
            element={user ? <AttendanceScanner /> : <Navigate to="/login" />}
          />
          <Route
            path="/grades"
            element={user ? <Gradebook /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
