import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './carousel.css'
import { ArrowBackIosIcon, ArrowForwardIosIcon } from '@mui/icons-material'
const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon style={{ color: "blue", fontSize: "30px" }} />
        </div>
    )
}
const Nextbtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon style={{ color: 'blue', fontSize: '30px' }} />
        </div>
    )
}
const Carousel = ({ products }) => {
    return (
        <div style={{ margin: "30px" }} className='carousel'>
            <Slider
                autoplay
                autoplaySpeed={2000}
                initialSlide={2}
                infinite
                prevArrow={<PreviousBtn />}
                nextArrow={<Nextbtn />}
                customPaging={(i) => {
                    return (
                        <div>
                            <img src="" alt="" />
                        </div>
                    )
                }}
        </div>
    )
}

export default Carousel