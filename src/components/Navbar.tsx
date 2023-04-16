import { useEffect } from 'react'
import { Link  } from 'react-scroll'

const Navbar = () => {

  const showNav = (items: NodeListOf<HTMLDivElement> | undefined) => {
    items?.forEach((item, i) => {
      setInterval(() => {
        item.classList.remove('hidden-item')
      }, i * 200)
    })
  }

  useEffect(() => {
    const items = document.querySelector('nav')?.querySelectorAll('div') as NodeListOf<HTMLDivElement>;
    items?.forEach(item => {
      item.classList.add('hidden-item', 'btn-hover-effect')
    })
    setInterval(() => {
      showNav(items)
    }, 4000)
    
  }, [])

  return (
    <div className="navbar cs">
      <nav>
        <ul>
          <li>
            <Link activeClass='active' smooth spy to='reservation' duration={500} ><div>Reservation</div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='menu' duration={500} ><div>Menu</div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='about' duration={500} ><div>About</div></Link>
          </li>
          <li>
            <Link activeClass='active' smooth spy to='contact-us' duration={500} ><div>Contact Us</div></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar