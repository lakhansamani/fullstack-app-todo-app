import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuthorizer } from "@authorizerdev/authorizer-react";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  const { loading, user, logout } = useAuthorizer();
  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      {user ? (
        <div>
          {user.email}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            logout
          </button>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      ) : (
        <nav>
          <Link to="/">Home</Link> |<Link to="/login">Login</Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </nav>
      )}
    </>
  );
}

export default App;
