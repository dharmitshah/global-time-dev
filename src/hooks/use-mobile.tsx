
import * as React from "react"

// Default breakpoint for mobile devices
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if the device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on initial render
    checkMobile()

    // Set up event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Use media query for more consistent behavior
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile()
    }
    
    // Modern API for media query listeners
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // Fallback for older browsers
      mql.addListener && mql.addListener(onChange)
    }

    // Clean up event listeners
    return () => {
      window.removeEventListener("resize", checkMobile)
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        // Fallback for older browsers
        mql.removeListener && mql.removeListener(onChange)
      }
    }
  }, [])

  // Return the current mobile state (defaulting to false if undefined)
  return !!isMobile
}

// Additional hook to detect touch devices
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    // Check if device supports touch
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        // @ts-ignore
        (navigator.msMaxTouchPoints > 0))
    }
    
    setIsTouch(isTouchDevice())
  }, [])
  
  return isTouch
}
