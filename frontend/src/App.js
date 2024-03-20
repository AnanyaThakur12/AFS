import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Viewpost from "./components/Viewpost";
import Posts from "./components/Posts";
import Contact from "./components/Contact";
import VideoComponent from "./components/VideoComponent";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/homepage"
          element={<Homepage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/signup" element={<Signup setCurrentUser={setCurrentUser} />}
        />
        <Route path="/posts" element={<Viewpost />} />

        <Route path="/check" element={<Posts />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/" element={<Signup></Signup>}></Route>

       <Route path="/about" element={<VideoComponent/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
