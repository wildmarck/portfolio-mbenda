import Lenis from 'lenis'
import { ScrollTrigger } from './gsapConfig'

let lenis = null

export function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

export function getLenis() {
  return lenis
}

export function scrollTo(target) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.5 })
}
