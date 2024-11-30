import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/client";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null para estado inicial indefinido

    useEffect(() => {
        const check = async () => {
            try {
                const response = await client.get("/api/auth/check");
                setIsAuthenticated(response.data.authenticated);
            } catch {
                setIsAuthenticated(false);
            }
        };

        check();
    }, []);

    // Renderize nada enquanto a autenticação está sendo verificada
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Redirecione se não autenticado
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" replace />
    );
};

export default ProtectedRoute;
