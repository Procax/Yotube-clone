import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const { createContext } = require("react");


const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const storedTheme = localStorage.getItem('theme') || 'light';

    const [theme, setTheme] = useState(storedTheme)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)

    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');

    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}