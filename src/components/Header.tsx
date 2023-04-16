import Navbar from './Navbar';
import bgVideo from '../assets/videos/header-video.mp4';
import { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    const section = document.querySelector('section') as HTMLElement
    const navItems = section.querySelector('.navbar')?.querySelectorAll('div') as NodeListOf<HTMLDivElement>

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(en => {
        if(en.isIntersecting) {
          navItems.forEach(item => item.style.background = 'transparent')
        }
        else {
          navItems.forEach((item) => (item.style.background = '#0a1134'));
        }
      })
    };

    const headerObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    headerObserver.observe(section)
  });

  return (
    <section className="header">
      <div className="header-revealer reveal-horizontally"></div>
      <div className="video-wrapper">
        <video className="header-video" autoPlay muted width={'100%'}>
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
