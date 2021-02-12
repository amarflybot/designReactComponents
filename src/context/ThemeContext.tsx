import {createContext} from "react";
import useTheme from "../hooks/useTheme";

const THEMELIST = {
    DARK: 'dark',
    LIGHT: 'light',
};

interface ThemeContextProps {
    theme: string
    toggleTheme(): void
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: '',
    toggleTheme: () => {},
});

const ThemeProvider = ({children, startingTheme}) => {
    const state = useTheme(startingTheme);

    return (
        <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
    )
};

export { ThemeContext, ThemeProvider, THEMELIST };