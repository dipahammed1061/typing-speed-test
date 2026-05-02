import React from 'react'
import Select from 'react-select'
import { useTheme } from '../Context/ThemeContext'
import { themeOptions } from '../Utils/theme'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {

    const { theme, setTheme } = useTheme()

    const handleThemeChange = (e) => {
        setTheme(e.value)
        localStorage.setItem('theme', JSON.stringify(e.value))
    }

    const selectStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: theme.background,
            border: `1px solid ${theme.typeBoxText}30`,
            borderRadius: '8px',
            boxShadow: 'none',
            minWidth: '160px',
            cursor: 'pointer',
            '&:hover': {
                borderColor: `${theme.title}60`,
            },
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: theme.surface || theme.background,
            border: `1px solid ${theme.typeBoxText}25`,
            borderRadius: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
        }),
        option: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused ? `${theme.title}18` : 'transparent',
            color: isFocused ? theme.title : theme.typeBoxText,
            cursor: 'pointer',
            fontSize: '0.85rem',
            padding: '0.5rem 0.85rem',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: theme.title,
            fontSize: '0.85rem',
            fontWeight: 500,
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            color: `${theme.typeBoxText}80`,
        }),
        indicatorSeparator: () => ({ display: 'none' }),
    }

    return (
        <div className="footer">

            <div className="intructions">
                <div className="hint">
                    press <kbd>TAB</kbd> to open commands
                </div>
            </div>

            <div className="actual-footer">
                <div className="links">
                    <a href="https://github.com/dipahammed1061" target="_blank" rel="noreferrer">
                        <GitHubIcon style={{ fontSize: '1.2rem' }} />
                    </a>
                    <a href="https://www.linkedin.com/in/afsana-mimi-124bb6285/" target="_blank" rel="noreferrer">
                        <LinkedInIcon style={{ fontSize: '1.2rem' }} />
                    </a>
                </div>

                <div className="themes">
                    <Select
                        options={themeOptions}
                        onChange={handleThemeChange}
                        menuPlacement="top"
                        defaultValue={{ value: theme, label: theme.label }}
                        styles={selectStyles}
                    />
                </div>
            </div>

        </div>
    )
}

export default Footer
