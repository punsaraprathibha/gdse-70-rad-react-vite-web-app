01. Now, let's start doing the Authentication related integration in frontend side.
02. Firstly we need to install following dependencies.
```shell
npm install jwt-decode
npm install -D @types/jwt-decode
```
03. Then, you've to update the `api.ts` as below in order to set the `Authentication` header in the request to make the request valid using a `requestInterceptor`.
```typescript
import axios from "axios";

export const backendApi = axios.create(
    {
        baseURL: "http://localhost:3000/api",
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

// Add a request interceptor
backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Always get latest from local storage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
```
04. Create new interface called `UserData.ts` inside `model`.
```typescript
export interface UserData {
    username: string | null;
    role: string | null;
}
```
05. Then let's start with the login functionality implementation.
```typescript jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../api.ts";

type FormData = {
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        try {
            const userCredentials = {
                username: data.username,  // assuming your backend uses "username" for email
                password: data.password
            };

            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert("Successfully logged in!");
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="w-full max-w-sm bg-white border border-green-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-green-800 underline decoration-2 mb-6 text-center">
                    Sign In
                </h2>
                <div className="mt-1 mb-4">
                    <button onClick={() => navigate("/")}
                            className="text-sm text-green-600 hover:text-green-900 underline">
                        Go Back
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(authenticateUser)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
```
06. Now, we've to implement redirecting users back to log in page when the token is expired.
07. For that let's create a new folder called `auth` and create a file called `auth.ts`
    and let's define function to validate if the token is expired or not inside `auth.ts`.
```typescript
import {jwtDecode} from "jwt-decode";

export const isTokenExpired = (token: string) => {
    try {
        // Get expiration date time
        const { exp } = jwtDecode(token);
        if (!exp) return true // Treat when exp date is undefined as expired
        return Date.now() >= exp * 1000;
    } catch (e) {
        return true; // Treat invalid tokens as expired
    }
};
```
08. Now, we can implement it in `App.tsx` file as below-mentioned to redirect the logged-in user back
    to login page if the access token is expired as of now.
```typescript jsx
import './App.css';
import { Route, Routes, useNavigate} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import {Login} from "./view/pages/Login/Login.tsx";
import {useEffect} from "react"; // Import useEffect
import {isTokenExpired} from "./auth/auth.ts"; // Import JWT token validation

function App() {
    const navigate = useNavigate(); // Define useNavigate

    useEffect(() => {
        const token = localStorage.getItem("token"); // Get token from the local storage
        if (!token || isTokenExpired(token)) { // Make sure whether token is available or is valid
            localStorage.removeItem("token"); // Remove token from local storage
            navigate("/login"); // Redirect to login page
        }
    }, [navigate]);

    return (
        <Routes>
            <Route path="/*" element={<DefaultLayout/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    );
}

export default App;
```
09. Then we'll be getting this kind of error.
```
Uncaught Error: useNavigate() may be used only in the context of a <Router> component.
```
10. To prevent above error, we've to move browser router from `app.tsx` to `main.tsx`.
```typescript jsx
import {createRoot} from 'react-dom/client';
import './index.css';
import * as React from "react";
import App from './App.tsx';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
```
11. Now, you should be able to successfully log in to the application.

12. Then, let's do some additional steps to restrict user access to the UI functionality (Authorization) based on their user role.
13. Then let's put following function to decode and extract user info from the access token in `auth.ts`.
```typescript
import { jwtDecode } from "jwt-decode";
import type { UserData } from "../model/UserData";

export function getUserFromToken(token: string): UserData {
    return jwtDecode<UserData>(token);
}
```
14. Now, let's create UserModel inside model package.
````typescript
export interface UserData {
    username: string | null;
    role: string | null;
}
````
15. Then let's store the user information by decoding the access token.
```typescript jsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { backendApi } from "../../../api.ts";
import { saveUserInfo } from "../../../slices/userSlice.ts";
import type { UserData } from "../../../model/UserData.ts";
import {getUserFromToken} from "../../../auth/auth.ts";

type FormData = { // Step 1: Define form data type
    username: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>(); // Step 2: Define useForm react hook
    
    // Step 6: Define authenticateUser function to extract 
    // form data and call backend to authenticate user
    const authenticateUser = async (data: FormData) => {
        try {
            // Step 7: Access data and create object
            const userCredentials = {
                username: data.username,
                password: data.password
            };

            // Step 8: Call backend to authenticate user.
            const response = await backendApi.post('/auth/login', userCredentials);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            // Step 9: Save tokens in local storage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert("Successfully logged in!");
            // Step 9: Get user details by decoding from accessToken
            const user: UserData = getUserFromToken(accessToken);

            // Step 10: Save user information in local storage
            localStorage.setItem('username', user.username);
            localStorage.setItem('role', user.role);

            // Step 11: Then navigate to home page
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Login failed!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
            <div className="w-full max-w-sm bg-white border border-green-300 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-green-800 underline decoration-2 mb-6 text-center">
                    Sign In
                </h2>
                <div className="mt-1 mb-4">
                    <button onClick={() => navigate("/")}
                            className="text-sm text-green-600 hover:text-green-900 underline">
                        Go Back
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(authenticateUser)}> // Step 5: Call authenticateUser function on submit
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="username"
                        /> {/* Step 3: Define to map username to form data*/}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-green-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="mt-1 block w-full border border-green-200 rounded-md text-sm shadow-sm focus:ring-green-500 focus:border-green-500"
                            placeholder="••••••••"
                        /> {/* Step 4: Define to map password to form data*/}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
```
16. So, then let's go to `Navbar.tsx` and update it as following to access state from store and make decisions based on that.
```typescript jsx
import './Navbar.css';
import icon from '../../../assets/icon.png';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // Load from localStorage when component mounts
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        setUsername(storedUsername);
        setRole(storedRole);
    }, []);

    return (
        <div className="p-2 bg-[#444544] flex justify-between items-center">
            <div className="flex items-center p-2">
                <h1 className="text-3xl text-[#e6f0e6] hover:text-green-400">
                    Organic Shop
                </h1>
                <img className="h-[2.5rem] w-[2.5rem] ml-2" src={icon} alt="" />
            </div>
            <ul className="list-none flex gap-4 mt-2 mb-2">
                {/* Customer-only links */}
                {role === 'customer' && (
                    <>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/about">About</Link>
                        </li>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/shopping-cart">My-Cart</Link>
                        </li>
                    </>
                )}

                {/* Admin-only links */}
                {role === 'admin' && (
                    <>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/admin-panel">Admin Panel</Link>
                        </li>
                        <li className="text-[1.9rem] text-[#e6f0e6] hover:text-green-400">
                            <Link to="/manage-products">Manage Products</Link>
                        </li>
                    </>
                )}
            </ul>

            <div className="flex items-center space-x-4">
                {username ? (
                    <p className="text-2xl text-white">{username}</p>
                ) : (
                    <Link
                        to="/login"
                        className="text-[1.5rem] text-[#e6f0e6] bg-[#1f9e4b] py-2 px-4
                        rounded-lg border-white border-2 hover:bg-green-400"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    );
}
```
17. Then we have to define `ProtectedRoute.tsx` inside `auth` folder to determine if there are any permission issues.
```typescript jsx
import { Navigate } from "react-router-dom";
import type {JSX} from "react";
import {useEffect, useState} from "react";

export function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // Load from localStorage when component mounts
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    // Wait for role to be loaded
    if (role === null) {
        return null
    }

    // Redirect to /unauthorized page if role permissions mismatch
    if (!allowedRoles.includes(role as string)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}
```
18. Also, let's define another file called `Unauthorized.tsx` inside `auth` to display unauthorized error message.
```typescript jsx
export function Unauthorized() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-5xl text-red-600">You are unauthorized!</h1>
        </div>
    );
}
```
19. Also, define the route for `/unauthorized` inside `App.tsx`.
```typescript jsx
import {Unauthorized} from "./auth/Unauthorized.tsx";

<Routes>
    <Route path="/*" element={<DefaultLayout/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/unauthorized" element={<Unauthorized/>}></Route> // Define Route for unauthorized access
</Routes>
```
20. Let's create our new admin components called `AdminPanel` and `ManageProducts` inside `view/pages`.
````typescript jsx
export function AdminPanel() {
    return (
        <>
            <h1>This is Admin Panel</h1>
        </>
    );
}
````
```typescript jsx
export function ManageProducts() {
    return (
        <>
            <h1>This is Manage Products</h1>
        </>
    );
}
```
21. Then, update `MainContent.tsx` as below to include routes and the `ProtectedRoute` for new components.
```typescript jsx
import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {About} from "../../pages/About/About.tsx";
import {Contact} from "../../pages/Contact/Contact.tsx";
import {ShoppingCart} from "../../pages/ShoppingCart/ShoppingCart.tsx";
import {ProtectedRoute} from "../../../auth/ProtectedRoute.tsx";
import {AdminPanel} from "../../pages/AdminPanel/AdminPanel.tsx";
import {ManageProducts} from "../../pages/ManageProducts/ManageProducts.tsx";
import {useEffect, useState} from "react";

export function MainContent() {
    const [role, setRole] = useState<string | null>(null);
    useEffect(() => {
        // Load from localStorage when component mounts
        const storedRole = localStorage.getItem("role");
        setRole(storedRole);
    }, []);

    return (
        <div className="flex justify-center
                       items-center min-h-screen">
            <Routes>
                {/* Routes visible to non-admins only */}
                {role === 'customer' && (
                    <>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/shopping-cart" element={<ShoppingCart/>}/>
                    </>
                )}
                <>
                    <Route path="/admin-panel" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminPanel/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/manage-products" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <ManageProducts/>
                        </ProtectedRoute>
                    }/>
                </>
            </Routes>
        </div>
    );
}
```