import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Write from "./Pages/Write/write";
import Settings from "./Pages/SettingsPage/settingsPage";
import SinglePost from "./Pages/singlePost/singlePost";
import { useContext } from "react";
import { Context } from "./context/Context";
import VerifyOTP from "./Pages/Register/VerifyOTP";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route
          path="/verifyOTP/:userId"
          element={user ? <Home /> : <VerifyOTP />}
        />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route
          path="/post/:postId"
          element={user ? <SinglePost /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
