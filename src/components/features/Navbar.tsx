import {
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { Link } from 'react-scroll';
import reservationIcon from '../../assets/icons/table.svg';
import menuIcon from '../../assets/icons/menu.svg';
import reviewIcon from '../../assets/icons/review.svg';
import aboutIcon from '../../assets/icons/about.svg';
import contactIcon from '../../assets/icons/contact.svg';
import { AppContext } from '../../context/MainContext';

const Navbar = () => {
  const { windowWidth, isHeaderLoaded } = useContext(AppContext);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(
    windowWidth > 800 ? true : false
  );
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const initialRendered = useRef<boolean>(false);

  const toggleNav = (action: string) => {
    const nav = document.querySelector('nav') as HTMLElement;
    const listItems = nav.querySelectorAll('li') as NodeListOf<HTMLLIElement>;
    const items = nav.querySelectorAll('div') as NodeListOf<HTMLDivElement>;
    if (action === 'show') {
      const translateValue: number = isLargeScreen ? 0 : -50;
      items?.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('btn-hover-effect');
          item.style.transform = `translateX(${translateValue}%)`;
          item.style.left = '50px';
          listItems[i].style.left = '0px';
        }, i * 200);
      });
    }
    if (action === 'hide') {
      items?.forEach((item, i) => {
        setTimeout(() => {
          item.style.transform = 'translateX(100%)';
          listItems[i].style.left = '100px';
        }, i * 100);
      });
    }
  };

  const handleNavClick = (e: MouseEvent) => {
    if (isLargeScreen) return;
    const btn = document.querySelector('.btn-nav') as HTMLButtonElement;
    btn.classList.toggle('opened');
    if (btn.classList.contains('opened')) setIsNavOpen(true);
    else setIsNavOpen(false);
  };

  useEffect(() => {
    if (isHeaderLoaded) {
      initialRendered.current = true;
      setTimeout(() => {
        if (isLargeScreen) toggleNav('show');
      }, 4000)
    }
  }, [isHeaderLoaded])
  useEffect(() => {
    const nav = document.querySelector('nav') as HTMLElement;
    const items = nav.querySelectorAll('div') as NodeListOf<HTMLDivElement>;


    items.forEach((item) => item.addEventListener('click', handleNavClick));

    return () => {
      items.forEach((item) =>
        item.removeEventListener('click', handleNavClick)
      );
    };
  }, []);
  useEffect(() => {
    setIsLargeScreen(windowWidth > 800 ? true : false);
  }, [windowWidth]);
  useEffect(() => {
    if (isLargeScreen && initialRendered.current) toggleNav('show');
    else toggleNav('hide');
  }, [isLargeScreen]);
  useEffect(() => {
    if (isLargeScreen) return;
    if (isNavOpen) {
      toggleNav('show');
      window.onscroll = () => {
        const btn = document.querySelector('.btn-nav') as HTMLButtonElement;
        btn.classList.toggle('opened');
        setIsNavOpen(false);
      };
    } else {
      toggleNav('hide');
      window.onscroll = () => {};
    }
  }, [isNavOpen]);

  return (
    <div className="navbar">
      {!isLargeScreen && <BtnToggleNav setIsNavOpen={setIsNavOpen} />}
      <nav>
        <ul>
          <li>
            <NavItem
              id="reservation"
              name="Reservation"
              icon={reservationIcon}
            />
          </li>
          <li>
            <NavItem id="menu" name="Menu" icon={menuIcon} />
          </li>
          <li>
            <NavItem id="reviews" name="Reviews" icon={reviewIcon} />
          </li>
          <li>
            <NavItem id="about" name="About Us" icon={aboutIcon} />
          </li>
          <li>
            <NavItem id="contact-us" name="Contact Us" icon={contactIcon} />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

const BtnToggleNav = ({ setIsNavOpen }: any) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    const btn = document.querySelector('.btn-nav') as HTMLButtonElement;
    btn.classList.toggle('opened');
    if (btn.classList.contains('opened')) setIsNavOpen(true);
    else setIsNavOpen(false);
  };

  return (
    <div className="btn-toggle-nav cs" onClick={handleClick}>
      <button className="btn-nav" aria-label="Main Menu">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
          />
          <path className="line line2" d="M 20,50 H 80" />
          <path
            className="line line3"
            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
          />
        </svg>
      </button>
    </div>
  );
};

interface NavItemPropTypes {
  id: string;
  name: string;
  icon: string;
}

const NavItem = ({ id, name, icon }: NavItemPropTypes) => {
  return (
    <Link smooth spy to={id} duration={500} offset={-50}>
      <div data-content={name} className="cs nav-item">
        <img src={icon} alt="" />
      </div>
    </Link>
  );
};
