import data from '../data/data.json';
import img1 from '../assets/images/chef-inspecting.jpg';
import img2 from '../assets/images/chefs.jpg';
import { useEffect } from 'react';

const AboutUs = () => {
  const aboutUs: string = data['about-us'];

  useEffect(() => {
    const section: HTMLElement | null = document.querySelector('.about-us');
    const text = section?.querySelector('article') as HTMLElement
    const imgContainer = section?.querySelector('.img-container') as HTMLDivElement
    const imgsDiv = imgContainer?.querySelectorAll(
      'div'
    ) as NodeListOf<HTMLDivElement>;
    console.log(imgsDiv[0]);

    if (!section) return;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          section.style.top = '0px';
          section.style.opacity = '1';
          setTimeout(() => {
            imgsDiv[0].classList.add('reveal-horizontally');
            imgsDiv[1].classList.add('reveal-vertically');
            imgContainer.style.opacity = '1';
            text.style.left = '0px'
            text.style.opacity = '1'
            setTimeout(() => {
              imgsDiv.forEach(el => {
                const img = el.querySelector('img') as HTMLImageElement
                img.style.transform = 'scale(1)'
              })
            }, 800)
          }, 800);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.4,
    });

    sectionObserver.observe(section);
  }, []);
  return (
    <section className="about-us section-wrapper" id='about'>
      <h2 className="section-heading cs cs-text">About us</h2>
      <section>
        <article className="about">{aboutUs}</article>
        <div className="img-container">
          <div className="img-wrapper-1">
            <img src={img2} alt="" />
          </div>
          <div className="img-wrapper-2">
            <img src={img1} alt="" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
