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