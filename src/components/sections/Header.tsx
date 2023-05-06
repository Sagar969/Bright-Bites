import Navbar from '../features/Navbar';
import bgVideo from '../../assets/videos/header-video.mp4';
import { useEffect, useContext } from 'react';
import { AppContext } from '../../context/MainContext';

const Header = () => {
  const { changeState, isHeaderLoaded } = useContext(AppContext)
  useEffect(() => {
    const section = document.querySelector('.header') as HTMLElement;
    const navItems = section
      .querySelector('.navbar')
      ?.querySelectorAll('div') as NodeListOf<HTMLDivElement>;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navItems.forEach((item) => (item.style.background = 'transparent'));
        } else {
          navItems.forEach((item) => (item.style.background = '#0a1134'));
        }
      });
    };

    const headerObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    headerObserver.observe(section);

    return () => {
      headerObserver.disconnect();
    }
  }, []);
  useEffect(() => {
    if(isHeaderLoaded) {
      const section = document.querySelector('.header') as HTMLElement;
      const reveal = section.querySelector('div') as HTMLDivElement
      const video = section.querySelector('video') as HTMLVideoElement
      const title = section.querySelector('h1') as HTMLHeadingElement;
      const slogan = section.querySelector('h2') as HTMLHeadingElement;
      video.play();
      reveal.classList.add('header-revealer')
      title.classList.add('title-reveal')
      slogan.classList.add('slogan-reveal')
    }
  }, [isHeaderLoaded])

  const handleVideoLoad = () => {
    changeState('isHeaderLoaded', true)
  }

  return (
    <section className="header">
      <div className="reveal-horizontally"></div>
      <div className="video-wrapper">
        <video className="header-video" muted autoPlay={false} onCanPlay={handleVideoLoad}>
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>
      <h1 className="title cs cs-text">Bright Bites</h1>
      <Navbar />
      <h2 className="slogan cs cs-text">
        Where every bite is a bright spot in your day!
      </h2>
    </section>
  );
};

export default Header;
