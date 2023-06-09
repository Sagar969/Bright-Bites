import Header from './components/sections/Header';
import Cursor from './components/features/Cursor';
import Greetings from './components/sections/Greetings';
import Menu from './components/sections/Menu';
import Reviews from './components/sections/Reviews';
import AboutUs from './components/sections/AboutUs';
import ContactUs from './components/sections/ContactUs';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from './context/MainContext';
import LoadingScreen from './components/features/LoadingScreen';

function App() {
  const { isHeaderLoaded, changeState } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
    const loadingTimeout = setTimeout(() => {
      changeState('isHeaderLoaded', true)
    }, 5000)

    return () => {
      clearTimeout(loadingTimeout)
    }
  }, []);
  useEffect(() => {
    let timeOutID: ReturnType<typeof setTimeout>;
    if (isHeaderLoaded) {
      timeOutID = setTimeout(() => {
        setIsLoading(false);
      }, 500)
    }

    return () => {
      clearTimeout(timeOutID)
    }
  }, [isHeaderLoaded]);
  useEffect(() => {
    if(!isLoading) {
      const body = document.querySelector('body') as HTMLBodyElement;
      body.style.overflowY = 'visible';
    }
  }, [isLoading])

  return (
    <div className="app">
      {isLoading && <LoadingScreen />}
      <Cursor />
      <Header />
      <Greetings />
      <Menu />
      <Reviews />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;
