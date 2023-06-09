import { Attributes, ReactElement, createContext, useEffect, useState } from "react";

type Props = {
    children: ReactElement
};

export type AuthToken = string;

export const AuthContext = createContext({
    accessToken: "",
    refreshToken: "",
    username: "",
    setAccessToken: (token: string) => {},
    setRefreshToken: (token: string) => {},
    setUsername: (username: string) => {},
    logout: () => {},
});

const AuthProvider = ({ children }: Props) => {
    const [accessToken, setAccessToken] = useState<AuthToken>("");
    const [refreshToken, setRefreshToken] = useState<AuthToken>("");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const username = localStorage.getItem("username");
        accessToken && setAccessToken(accessToken);
        refreshToken && setRefreshToken(refreshToken);
        username && setUsername(username);

        return () => {
            
        }
    }, []);
    

    return ( 
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            username,
            setAccessToken: (token: string) => {
                setAccessToken(token);
                localStorage.setItem("accessToken", token);
            },
            setRefreshToken: (token: string) => {
                setRefreshToken(token);
                localStorage.setItem("refreshToken", token);
            },
            setUsername: (name: string) => {
                setUsername(name);
                localStorage.setItem("username", name);
            },
            logout: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("username");
                setAccessToken("");
                setRefreshToken("");
                setUsername("");
            },
        }}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;