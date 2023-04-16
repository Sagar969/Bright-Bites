import {
  ReactElement,
  ReactEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import data from '../data/data.json';
import img1 from '../assets/images/plate1.png';
import img2 from '../assets/images/plate2.png';
import img3 from '../assets/images/plate3.png';
import { useParallax } from 'react-scroll-parallax';
import MenuCard from './MenuCard';

interface CardStyle {
  top: string;
  left: string;
  // display: string,
  opacity: number;
  // transform: string
}
interface MenuItem {
  name: string;
  description: string;
  price?: number;
}
type menuType = {
  starters: MenuItem[];
  entrees: MenuItem[];
  desserts: MenuItem[];
  beverages: MenuItem[];
  'starters-description': string;
  'entrees-description': string;
  'desserts-description': string;
  'beverages-description': string;
};

const Menu = () => {
  const menu: menuType = data['menu'];
  const [intSecPoint1, setIntSecPoint1] = useState<number>(10000);
  const [intSecPoint2, setIntSecPoint2] = useState<number>(10000);
  const [intSecPoint3, setIntSecPoint3] = useState<number>(10000);
  const [dishesInCard, setDishesInCard] = useState<MenuItem[]>(menu.starters);

  const getFirstandLastPos = () => {
    const w: number = window.outerWidth;
    if(w < 1000) return '5vw';
    return '10vw';
  }
  const getMidPos = () => {
    const w: number = window.outerWidth;
    if(w < 1000) return '55vw';
    return '50vw';
  }

  useEffect(() => {
    const sectionWrapper = document.querySelector<HTMLElement>('.menu');
    const imgs = sectionWrapper?.querySelectorAll(
      'img'
    ) as NodeListOf<HTMLImageElement>;
    const sections = sectionWrapper?.querySelectorAll(
      '.menu-section'
    ) as NodeListOf<HTMLElement>;
    const menuCard = sectionWrapper?.querySelector('.menu-card') as HTMLElement;
    const sectionHeight = sections[0].getBoundingClientRect().height;
    console.log(sectionHeight);

    const showImg = (i: number) => {
      imgs[i].style.opacity = '1';
      imgs[i].style.transform = 'rotate(0deg)';
      if (i === 1) imgs[i].style.right = '0px';
      else imgs[i].style.left = '0px';
    };
    const posMenuCard = (i: number) => {
      menuCard.style.right = i === 1 ? getMidPos() : getFirstandLastPos();
      menuCard.style.top = 135 + 200 + 750 * i + 'px';
      menuCard.style.transform = `rotate3d(1, 1, 1, ${360 * i}deg)`;
    };

    const handleSectionIntersection = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((en) => {
        if (!sections) return;
        if (en.isIntersecting) {
          const i = Array.from(sections).findIndex((sec) => sec === en.target);
          showImg(i);
          posMenuCard(i);
          menuCard.style.opacity = '1';
          if (en.target === sections[0]) {
            setDishesInCard(menu.starters);
            setIntSecPoint1(window.scrollY);
          }
          if (en.target === sections[1]) {
            setDishesInCard(menu.entrees);
            setIntSecPoint2(window.scrollY);
          }
          if (en.target === sections[2]) {
            setDishesInCard(menu.desserts);
            setIntSecPoint3(window.scrollY);
          }
        }
      });
    };

    const posSections = (i: number) => {
      sections[i].style.transform = 'rotate(0deg)';
      sections[i].style.opacity = '1';
    };
    const handleMenuSectionIntersection = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((en) => {
        if (!sections) return;
        if (en.isIntersecting) {
          const i = Array.from(sections).findIndex((sec) => sec === en.target);
          posSections(i);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(
      handleSectionIntersection,
      { threshold: 0.7 }
    );
    const menuSectionObserver = new IntersectionObserver(
      handleMenuSectionIntersection,
      { threshold: 0.1 }
    );

    sections?.forEach((section) => sectionObserver.observe(section));
    sections?.forEach((section) => menuSectionObserver.observe(section));
  }, []);

  return (
    <section className="menu section-wrapper" id="menu">
      <h3 className="cs section-heading-text cs-text section-heading">Menu</h3>
      <section className="starters menu-section">
        <h4 className="cs">Starters</h4>
        <section>
          <article className="starters-description">
            {menu['starters-description']}
          </article>
          <img src={img1} alt="plate - 1" />
        </section>
      </section>
      <section className="entrees menu-section">
        <h4 className="cs">Entrees</h4>
        <section>
          <article className="entrees-description">
            {menu['entrees-description']}
          </article>
          <img
            src={img2}
            alt="plate - 2"
            className="right-img"
          />
        </section>
      </section>
      <section className="desserts menu-section">
        <h4 className="cs">Desserts</h4>
        <section>
          <article className="desserts-description">
            {menu['desserts-description']}
          </article>
          <img src={img3} alt="plate - 3" />
        </section>
      </section>
      <MenuCard dishesInCard={dishesInCard} />
    </section>
  );
};

export default Menu;