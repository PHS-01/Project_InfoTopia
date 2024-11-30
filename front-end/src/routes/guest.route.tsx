import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../api/client";

interface Props {
    children: string | JSX.Element | JSX.Element[];
}

const GuestRoute = ({ children }: Props) => {
    const [isGuest, setIsGuest] = useState<boolean | null>(null);

    useEffect(() => {
        const check = async () => {
            try {
                const response = await client.get("/api/auth/check")
                setIsGuest(!response.data.authenticated);
            } catch {
                setIsGuest(true);
            }
        };

        check();
    }, []);

    if (isGuest === null) {
        return <div>Loading...</div>;
    }

    return isGuest ? (
        <>{children}</>
    ) : (
        <Navigate to="/dashboard" replace />
    );
};

export default GuestRoute;
