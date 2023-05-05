import { ReactElement, useEffect } from 'react';

const Cursor = (): ReactElement => {
  useEffect(() => {
    const cursor = document.querySelector('#custom-cursor') as HTMLElement;
    const hoverOverEl = document.querySelectorAll(
      '.cs'
    ) as NodeListOf<HTMLElement>;

    const handleMouseMove = (e: MouseEvent): void => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    };
    const handleHoverIn = (): void => {
      cursor.style.transform = 'scale(3)';
    };
    const handleHoverOut = (): void => {
      cursor.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    hoverOverEl.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverOverEl.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);
  return (
    <>
      <div id="custom-cursor"></div>
    </>
  );
};

export default Cursor;
