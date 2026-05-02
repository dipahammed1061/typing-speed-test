import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/theme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    const [theme, setTheme] = useState(() => {
        const stored = JSON.parse(localStorage.getItem('theme'));
        const isValid = stored && themeOptions.some(t => t.value.label === stored.label);
        if (!isValid) localStorage.removeItem('theme');
        return isValid ? stored : themeOptions[0].value;
    });
    const values = {
        theme,
        setTheme,
    }


    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>);
}

export const useTheme = ()=> useContext(ThemeContext);
