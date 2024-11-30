import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/client";
import { scopeUser, UserType } from "../api/responses";
import { can } from "../utils/authorization";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

const AdminRoute = ({ children }: Props) => {
    const [user, setUser] = useState<UserType>(scopeUser)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const response = await client.get("/api/users/current");
            setUser(response.data.data)
            setIsLoading(false)
        };

        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return can(user.roles, ['Administrador']) ? (
        <>{children}</>
    ) : (
        <Navigate to="/dashboard" replace />
    );
};

export default AdminRoute;
