import data from '../../data/data.json';
import img1 from '../../assets/images/chef-inspecting.webp';
import img2 from '../../assets/images/chefs.webp';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/MainContext';

const AboutUs = () => {
  const { isReduced } = useContext(AppContext);
  const aboutUs: string = data['about-us'];

  useEffect(() => {
    const section: HTMLElement | null = document.querySelector('.about-us');
    const text = section?.querySelector('article') as HTMLElement;
    const imgContainer = section?.querySelector(
      '.img-container'
    ) as HTMLDivElement;
    const imgsDiv = imgContainer?.querySelectorAll(
      'div'
    ) as NodeListOf<HTMLDivElement>;

    if (!section) return;

    let contentRevealTimeout: ReturnType<typeof setTimeout>
    let imgsZoomTimeout: ReturnType<typeof setTimeout>
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          section.style.top = '0px';
          section.style.opacity = '1';
          contentRevealTimeout = setTimeout(() => {
            imgsDiv[0].classList.add('reveal-horizontally');
            imgsDiv[1].classList.add('reveal-vertically');
            imgContainer.style.opacity = '1';
            text.style.left = '0px';
            text.style.opacity = '1';
            imgsZoomTimeout = setTimeout(() => {
              imgsDiv.forEach((el) => {
                const img = el.querySelector('img') as HTMLImageElement;
                img.style.transform = 'scale(1)';
              });
            }, 800);
          }, 800);
        }
      });
    };

    const sectionObserver = new IntersectionObserver(handleIntersection, {
      threshold: 0.4,
    });

    if (!isReduced) sectionObserver.observe(section);

    return () => {
      clearTimeout(contentRevealTimeout)
      clearTimeout(imgsZoomTimeout)
      sectionObserver.disconnect();
    }
  }, []);
  return (
    <section className="about-us section-wrapper" id="about">
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
