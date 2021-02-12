import {useState} from "react";
import {THEMELIST} from "../context/ThemeContext";

const useTheme = (startingTheme) => {

    const [theme, setTheme]  =useState(startingTheme);

    return {
        theme,
        toggleTheme: () => {
            if (theme === THEMELIST.DARK) {
                setTheme(THEMELIST.LIGHT)
            } else {
                setTheme(THEMELIST.DARK)
            }
        }
    }

}

export default useTheme;