import { useState, ReactElement } from 'react';
import img from '../../assets/icons/menuCard-bar.webp';

interface CardStyle {
  top: string;
  left: string;
  opacity: number;
  transform: string;
}
interface MenuItem {
  name: string;
  description: string;
  price: number;
}
interface Pos {
  top: string;
  left: string;
}

const MenuCard = ({ dishesInCard }: any) => {
  const [pos, setPos] = useState<Pos>({ top: '0px', left: '0px' });
  const [isDishCard, setIsDishCard] = useState<boolean>(false);
  const [hoveredDish, setHoveredDish] = useState<MenuItem>({
    name: '',
    description: '',
    price: 0,
  });

  const cardStyle: CardStyle = {
    top: pos.top,
    left: pos.left,
    opacity: isDishCard ? 1 : 0,
    transform: isDishCard ? 'scale(1)' : 'scale(0)',
  };

  const handleMouseMove = (e: any) => {
    const menuCard = document.querySelector('.menu-card') as HTMLDivElement;
    const cardTop = menuCard.getBoundingClientRect().top;
    const cardLeft = menuCard.getBoundingClientRect().left;
    const checkTop = window.outerHeight - e.clientY > 280 ? 0 : 240;
    const checkLeft = window.outerWidth - e.clientX > 280 ? 0 : 240;
    let x: number = e.clientX - cardLeft - checkLeft + 20;
    let y: number = e.clientY - cardTop - checkTop + 20;

    setPos({
      top: y + 'px',
      left: x + 'px',
    });
  };
  const handleMouseOver = (item: MenuItem) => {
    setHoveredDish(item);
    setIsDishCard(true);
  };
  const handleMouseLeave = () => {
    setIsDishCard(false);
  };

  const menuItems = (items: MenuItem[]) => {
    items.sort((a, b) => a.price - b.price);
    const list: ReactElement[] = [];
    items.forEach((item, i): void => {
      list.push(
        <li
          key={i}
          className="cs"
          onMouseOver={() => handleMouseOver(item)}
          onMouseLeave={handleMouseLeave}
        >
          <span>{item.name}</span>
          <span>${item.price}</span>
        </li>
      );
    });
    return list;
  };

  return (
    <div className="menu-card" onMouseMove={handleMouseMove}>
      <div className="content-wrapper">
        <img src={img} alt="" />
        <ul>{menuItems(dishesInCard)}</ul>
      </div>
      <div className="dish-card" style={cardStyle}>
        <h4>{hoveredDish.name}</h4>
        <p>{hoveredDish.description}</p>
        <p>${hoveredDish.price}</p>
      </div>
    </div>
  );
};

export default MenuCard;
