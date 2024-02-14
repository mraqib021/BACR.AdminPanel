import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../../screens/Home";
import Notfound from "../../screens/notfound";
import Admin from "../../screens/Admin";
import Login from "../../screens/Login";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Home}></Route>
                <Route path="/dashboard/*" Component={Admin}></Route>
                <Route path="/login" Component={Login}></Route>
                <Route path="*" Component={Notfound}></Route>
            </Routes>
        </Router>
    )
}