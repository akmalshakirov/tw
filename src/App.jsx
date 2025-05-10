import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPanel";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        user ? (
                            user.role === "admin" ? (
                                <Navigate to='/admin' />
                            ) : (
                                <Navigate to='/dashboard' />
                            )
                        ) : (
                            <Login onLogin={handleLogin} />
                        )
                    }
                />

                <Route
                    path='/dashboard'
                    element={
                        user && user.role === "user" ? (
                            <Dashboard user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />

                <Route
                    path='/admin'
                    element={
                        user && user.role === "admin" ? (
                            <AdminPanel user={user} onLogout={handleLogout} />
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
