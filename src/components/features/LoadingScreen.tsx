import { useEffect, useContext } from 'react'
import loadingAni from '../../assets/videos/food-animation.mp4'
import { AppContext } from '../../context/MainContext'

const LoadingScreen = () => {
    const { isHeaderLoaded } = useContext(AppContext)
    
    useEffect(() => {
        const section = document.querySelector('.loading-screen') as HTMLElement
        const video = section.querySelector('video') as HTMLVideoElement
        const text = section.querySelector('span') as HTMLSpanElement
        let loadingTimeout: ReturnType<typeof setTimeout>
        text.style.left = '50%'
        video.style.left = '0px'
        if(isHeaderLoaded) {
            video.pause();
            video.style.left = '1000px';
            text.style.left = '-200px';
            loadingTimeout = setTimeout(() => {
              section.style.transform = 'scale(0)';
            }, 300);
        }

        return () => {
          clearTimeout(loadingTimeout)
        }
    }, [isHeaderLoaded])

  return (
    <section className="loading-screen">
        <div>
            <video className='loading-video' src={loadingAni} autoPlay muted loop ></video>
            <span>Loading...</span>
        </div>
    </section>
  )
}

export default LoadingScreen