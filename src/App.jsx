import { useState, useEffect } from 'react'
import './css/App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Results from './Pages/Results';
import { Navigate } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import FlightDetail from './pages/FlightDetail';

function App() {
    // const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null); // user state tracking
    const [message, setMessage] = useState('');
    const api = import.meta.env.VITE_API_URL;

    // const handleLogin = (newToken) => {
    //     localStorage.setItem('token', newToken);
    //     setToken(newToken);
    //     setMessage('Logged in successfully.');
    // };

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     setToken('');
    //     setMessage('Logged out.');
    // };

    useEffect(() => {
        // fetch('http://localhost:4000/api/auth/me', {
        //     credentials: 'include'
        // })
        // .then(res => res.ok ? res.json() : null)
        // .then(data => setUser(data))
        fetch(`${api}/api/flights`);
    }, []);

    const handleLogin = (user) => {
        setUser(user); // Update the user state
        setMessage('Logged in successfully.');
    };

    const handleLogout = async () => {
        await fetch(`${api}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        setUser(null);
        setMessage('Logged out.');
    };


    // Updated Return should look something like this:
    return (
        <div>
            {/* <Navbar token={token} onLogout={handleLogout} /> */}
            <Navbar token={user} onLogout={handleLogout} />

            {message && (
                <div>
                    {message}
                </div>
            )}

            <Routes>
                <Route
                    path="/signup"
                    element={<Signup
                    onAuth={handleLogin}
                    setMessage={setMessage} />}
                />
                <Route
                    path="/login"
                    element={
                        <Login
                            onAuth={handleLogin}
                            setMessage={setMessage}
                        />
                    }
                />
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                {/* <Route path="/flights/:id" element={token ? <FlightDetail token={token} /> : <Navigate to="/login" />} /> */}
                <Route path="/flights/:id" element={user ? <FlightDetail token={user} /> : <Navigate to="/login" />} />

                {/* <Route path="/profile" element={token ? <Profile token={token} /> : <Navigate to="/login" />} /> */}
                <Route path="/profile" element={user ? <Profile token={user} /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;


/*
import { useState } from 'react'
import './css/App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Results from './Pages/Results';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
*/