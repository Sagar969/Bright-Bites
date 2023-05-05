import {
  MouseEventHandler,
  ReactElement,
  useEffect,
  useState,
  useContext,
  useRef
} from 'react';
import data from '../../data/data.json';
import quote from '../../assets/icons/quote.png';
import { AppContext } from '../../context/MainContext';

interface ReviewDataType {
  name: string;
  review: string;
}
interface UserDataType {
  [key: string]: any;
  picture?: { [key: string]: string };
  name?: { [key: string]: string };
}

const Reviews = () => {
  const { isReduced } = useContext(AppContext);
  const reviewsData: ReviewDataType[] = data.reviews;
  const [users, setUsers] = useState<UserDataType[]>([{}]);
  const [slideId, setSlideID] = useState<any>(undefined);
  const [activeDot, setActiveDot] = useState<number>(3);
  let autoSlideID: NodeJS.Timeout | undefined = undefined;

  const updateDots = (active: number) => {
    const dots: NodeListOf<HTMLDivElement> = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
      dot.classList.remove('active-dot');
    });
    dots[active]?.classList.add('active-dot');
  };

  const slide = (dir: 'left' | 'right') => {
    const items: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.review');

    if (dir === 'left') {
      items.forEach((item, i) => {
        const dataItem = Number(item.dataset.item);
        if (dataItem <= 0) item.dataset.item = '6';
        else item.dataset.item = (dataItem - 1).toString();
        const active: number = Array.from(items).findIndex(
          (item) => item.dataset.item === '3'
        );
        setActiveDot(active);
      });
    } else {
      items.forEach((item, i) => {
        const dataItem = Number(item.dataset.item);
        if (dataItem >= 6) item.dataset.item = '0';
        else item.dataset.item = (dataItem + 1).toString();
        const active: number = Array.from(items).findIndex(
          (item) => item.dataset.item === '3'
        );
        setActiveDot(active);
      });
    }
  };

  const handleMouseOverCarouselItem: MouseEventHandler<HTMLDivElement> = (
    e
  ) => {
    const target = e.target as HTMLElement;
    const itemIndex = Number(target.closest('div')?.dataset.item);
    if (itemIndex === 4) {
      slide('left');
    }
    if (itemIndex === 2) {
      slide('right');
    }
    autoSlideStop();
  };
  const handleMouseLeaveCarouselItem: MouseEventHandler<
    HTMLDivElement
  > = () => {
    autoSlideStart();
  };
  const handleClickDot: MouseEventHandler<HTMLDivElement> = (e) => {
    const dotEl = e.target as HTMLDivElement;
    const dotIndex: number = Number(dotEl.dataset.dot);
    if (dotIndex < activeDot) {
      Array.from({ length: activeDot - dotIndex }, () => slide('right'));
    }
    if (dotIndex > activeDot) {
      Array.from({ length: dotIndex - activeDot }, () => slide('left'));
    }
    setActiveDot(dotIndex);
    autoSlideStop();
  };

  let touchStart = useRef<number>(0);
  let touchEnd: number = 0;
  const handleTouch = (e: React.TouchEvent, action: 'start' | 'end') => {
    if (action === 'start') {
      touchStart.current = e.changedTouches[0].screenX;
      autoSlideStop();
    }
    if (action === 'end') {
      touchEnd = e.changedTouches[0].screenX;
      if (touchEnd < touchStart.current) slide('left');
      if (touchEnd > touchStart.current) slide('right');
      autoSlideStart();
    }
  };

  const getQuoteSign = (): ReactElement => {
    return (
      <span className="quote-sign">
        <img src={quote} alt="" />
        <div className="quote-bar"></div>
      </span>
    );
  };

  const getReviews = () => {
    let list: ReactElement[] = [];
    let i: number = 0;
    while (i < 7) {
      const imgSrc = users[i]?.picture?.medium as string;
      const reviewerName: string =
        users[i]?.name?.first + ' ' + users[i]?.name?.last;
      list.push(
        <div
          key={i}
          data-item={i}
          className="review"
          onMouseEnter={handleMouseOverCarouselItem}
          onClick={handleMouseOverCarouselItem}
          onMouseLeave={handleMouseLeaveCarouselItem}
          onTouchStart={(e) => handleTouch(e, 'start')}
          onTouchEnd={(e) => handleTouch(e, 'end')}
        >
          <img src={imgSrc} alt="" />
          <h3 className="reviewer-name">{reviewerName}</h3>
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <div className="review-body">
            {getQuoteSign()}
            <article>{reviewsData[i].review}</article>
          </div>
        </div>
      );
      i++;
    }
    return list;
  };
  const printDots = () => {
    let list = [];
    let i: number = 0;
    while (i < 7) {
      list.push(
        <div
          key={i}
          data-dot={i}
          className="dot cs"
          onClick={handleClickDot}
        ></div>
      );
      i++;
    }
    return list;
  };

  const getUsers = async () => {
    await fetch('https://randomuser.me/api/?results=7&nat=us')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  };

  const autoSlideStart = () => {
    if (slideId || autoSlideID) return;
    autoSlideID = setInterval(() => {
      slide('left');
    }, 7000);
    setSlideID(autoSlideID);
  };
  const autoSlideStop = () => {
    if (!slideId) return;
    clearInterval(slideId);
    setSlideID(undefined);
  };

  const handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const section = document.getElementById('reviews') as HTMLElement;
    const reviews = section.querySelectorAll(
      '.review'
    ) as NodeListOf<HTMLDivElement>;
    const dotsContainer = section.querySelector(
      '.carousel-dots'
    ) as HTMLDivElement;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.style.opacity = '1';
        section.style.top = '0px';
        reviews.forEach((review, i) => {
          setTimeout(() => {
            review.style.left = '50%';
          }, 200 * i + 200);
        });
        setTimeout(() => {
          dotsContainer.style.left = '0%';
          autoSlideStart();
        }, 1400);
        observer.unobserve(section);
      }
    });
  };

  useEffect(() => {
    getUsers();
    updateDots(3);

    const sectionObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    const section = document.getElementById('reviews') as HTMLElement;
    if (!isReduced) sectionObserver.observe(section);
    if (isReduced) autoSlideStart();
  }, []);
  useEffect(() => {
    updateDots(activeDot);
  }, [activeDot]);

  return (
    <section className="reviews section-wrapper" id="reviews">
      <h2 className="section-heading cs cs-text">Reviews</h2>
      <section className="section-content">
        <div className="review-carousel">{getReviews()}</div>
        <div className="carousel-dots">{printDots()}</div>
      </section>
    </section>
  );
};

export default Reviews;
