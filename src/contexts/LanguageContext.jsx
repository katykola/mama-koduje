import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LanguageContext = createContext();

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('cs');
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/eng') || path.includes('/reviews') || path.includes('/blog') || path.includes('/about-me')) {
            setLanguage('eng');
        } else {
            setLanguage('cs')
        }
    }, [location]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}