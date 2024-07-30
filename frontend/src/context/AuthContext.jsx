import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState(null);
    //if token present
    useEffect(()=> {
        if(token){
            setIsAuth(true)
        }else{
            setIsAuth(false)
        }
    }, [token])
    
    //for logout
    const logout = () => {
        setToken(null)
        setName(null)
        setIsAuth(false)
    }
    return (
        <AuthContext.Provider value={{setToken, setName, logout, name, isAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
