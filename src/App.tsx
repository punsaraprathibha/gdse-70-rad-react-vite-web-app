import './App.css';
import {Navbar} from "./view/common/Navbar/Navbar.tsx";
import {MainContent} from "./view/common/MainContent/MainContent.tsx";
import {Footer} from "./view/common/Footer/Footer.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import * as React from "react";
import {Login} from "./view/pages/Login/Login.tsx";
function App() {
    return(
        <BrowserRouter>
            {/*<DefaultLayout/>*/}
            <Routes>
                <Route path="/*" element={<DefaultLayout />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;