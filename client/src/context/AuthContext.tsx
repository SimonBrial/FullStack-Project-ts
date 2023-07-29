/* eslint-disable @typescript-eslint/no-explicit-any */
//eslint-disable react-hooks/rules-of-hooks
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

interface User {
    createdAt: string;
    updatedAt: string;
    userName: string;
    email: string;
    id: string;
}

interface ContextProps {
    user: User;
    loading: boolean;
    responseError: string[];
    isAuthenticated: boolean;
    signUp: (user: any) => void;
    signIn: (user: any) => void;
    logout: () => void;
}

const initialState = {
    user: {
        createdAt: "2023-07-21T15:02:37.482Z",
        updatedAt: "2023-07-21T15:02:37.482Z",
        id: "64ba9e0dd5415bda30660a94",
        email: "correo@correo.com",
        userName: "simon",
    },
};

const AuthContext = createContext(initialState);

const useAuth = () => {
    const context = useContext(AuthContext);
    const {
        isAuthenticated,
        responseError,
        loading,
        signUp,
        signIn,
        logout,
        user,
    } = context as ContextProps;
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return {
        isAuthenticated,
        responseError,
        loading,
        signUp,
        signIn,
        logout,
        user,
    };
};

const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>({
        createdAt: "",
        updatedAt: "",
        id: "",
        email: "",
        userName: "",
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const signUp = async (user: any) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            if (res.status === 200) {
                setUser(res.data);
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            console.log(error.response.data);
            setResponseError(error.response.data);
        }
    };

    const signIn = async (user: any) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error: any) {
            if (Array.isArray(error.response.data)) {
                console.log(error);
                return setResponseError(error.response.data);
            }
            setResponseError([error.response.data.message]);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(undefined);
    };

    useEffect(() => {
        if (responseError.length > 0) {
            const timer = setTimeout(() => {
                setResponseError([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [responseError]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            //console.log(cookies.token);
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(undefined);
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(undefined);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const contextProps: ContextProps = {
        user,
        signUp,
        signIn,
        logout,
        loading,
        isAuthenticated,
        responseError,
    };
    return (
        <AuthContext.Provider value={contextProps}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };
