import React, { useState, useEffect } from 'react'
import './BacktoTop.css'

const BacktoTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVis = () => {
        if (window.pageYOffset > 370) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: "smooth"
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVis);
        return () => {
            window.removeEventListener("scroll", toggleVis)
        }
    }, [])
    return (
        <>
            <div className="scroll-to-top">
                {isVisible && (
                    <div onClick={scrollToTop} className="back-top-container">
                        Back to Top
                    </div>
                )}
            </div>
        </>
    )
}

export default BacktoTop
