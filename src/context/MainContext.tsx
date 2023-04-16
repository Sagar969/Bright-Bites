import { ReactComponentElement, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const AppContext = createContext<any>(null);

interface scrollUnitTypes {
  curScrollPos: number;
  lastScrollPos: number;
  scrollDis: number;
  scrollDir: string;
}

const MainContext = ({children}: any) => {
    const [scrollPos , setScrollPos] = useState<scrollUnitTypes>({ 
        curScrollPos : 0,
        lastScrollPos : 0,
        scrollDis : 0,
        scrollDir : 'down'
     });

     const changeState = (stateRef: string , newState: any) => {
         if(stateRef === 'scrollPos') {
             setScrollPos({
                 curScrollPos: newState[0],
                 lastScrollPos: newState[1],
                 scrollDis: newState[2],
                 scrollDir: newState[3],
             })
         }
     }
     let lastScrollPos = useRef(0);

     useEffect(() => {
        // console.log(scrollPos)
     }, [scrollPos])
    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPos: number = window.scrollY;
            const scrollDirection: string =
              currentScrollPos > lastScrollPos.current ? 'down' : 'up';
            const scrollDistance = Math.abs(currentScrollPos - lastScrollPos.current);

            changeState('scrollPos', [currentScrollPos, lastScrollPos.current, scrollDistance, scrollDirection])

            lastScrollPos.current = currentScrollPos;
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })


    const value: object = {
        
    }
    return (
        <AppContext.Provider value={value} >{children}</AppContext.Provider>
    )
}

export { AppContext, MainContext }