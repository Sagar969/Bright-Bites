import Header from './components/Header';
import Cursor from './components/Cursor';
import Greetings from './components/Greetings';
import Menu from './components/Menu';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { useContext } from 'react';
import { AppContext } from './context/MainContext';

function App() {
  const con = useContext(AppContext);

  return (
    <div className="app">
      <Cursor />
      <Header />
      <Greetings />
      <Menu />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;
