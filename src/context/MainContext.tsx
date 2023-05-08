import { createContext, useEffect, useState } from 'react'
const AppContext = createContext<any>(null);

interface valueType {
    windowWidth: number,
    isReduced: boolean,
    isHeaderLoaded: boolean,
    changeState: (state: string, newValue: any) => void
}

const MainContext = ({children}: any) => {
     const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
     const [isHeaderLoaded, setIsHeaderLoaded] = useState<boolean>(false)
     const isReduced: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

     const changeState = (state: string, newValue: any) => {
        if(state === 'isHeaderLoaded') setIsHeaderLoaded(newValue)
     }
     const handleResize = () => {
        setWindowWidth(window.outerWidth);
     }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    const value: valueType = {
        windowWidth, isReduced, isHeaderLoaded, changeState
    }
    
    return (
        <AppContext.Provider value={value} >{children}</AppContext.Provider>
    )
}

export { AppContext, MainContext }