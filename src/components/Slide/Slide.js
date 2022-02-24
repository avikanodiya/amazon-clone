import React from 'react';
import './Slide.css'
import Carousel from 'react-multi-carousel'
import "../../../node_modules/react-multi-carousel/lib/styles.css";
import { Divider } from '@material-ui/core';
import { Link } from '@material-ui/core';
import Banner1 from "../../BannerImages/Banner1.jpg"
import Banner2 from "../../BannerImages/Banner2.jpg"
import Banner3 from "../../BannerImages/Banner3.jpg"

const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

const Slide = ({ title, products }) => {
    console.log(products);
    return (
        <div className="products-section">
            <div className="products-deal">
                <h3>{title}</h3>
                <button className='view-btn'>view All</button>
            </div>
            <Divider />
            <Carousel
                responsive={responsive}
                ssr={false}
                infinite={true}
                draggable={false}
                swipeable={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                showDots={false}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container">
                {
                    products.map((e) => {
                        return (
                            // <Link to={`/getproduct/${e._id}`}>
                            //     <div className="products-items">
                            //         <div className="product-img">
                            //             <img src={e.imageUrl} alt="hello" />
                            //         </div>
                            //         <p className="products-name">{e.title}</p>
                            //         <p className="products-price" style={{ color: "#007185" }}>{e.price}</p>
                            //         {/* <p className="products-explore"></p> */}
                            //     </div>
                            // </Link>
                            <img src={e.imageUrl} alt="" />
                        )
                    })
                }
            </Carousel>
        </div>
    );
};

export default Slide;


// const Slide = ({ products, title }) => {
//     const responsive = {
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 3,
//             slidesToSlide: 3 // optional, default to 1.
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2,
//             slidesToSlide: 2 // optional, default to 1.
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1,
//             slidesToSlide: 1 // optional, default to 1.
//         }
//     };

//     return (
//         <Carousel
//             swipeable={false}
//             draggable={false}
//             showDots={true}
//             responsive={responsive}
//             ssr={true} // means to render carousel on server-side.
//             infinite={true}
//             autoPlay={true}
//             autoPlaySpeed={1000}
//             keyBoardControl={true}
//             customTransition="all .5"
//             transitionDuration={500}
//             containerClass="carousel-container"
//             removeArrowOnDeviceType={["tablet", "mobile"]}
//             dotListClass="custom-dot-list-style"
//             itemClass="carousel-item-padding-40-px"
//         >
//             {
//                 products.map((e) => {
//                     return (
//                         <Link to={`/getproduct/${e._id}`}>
//                             <div className="products-items">
//                                 <div className="product-img">
//                                     <img src={e.imageUrl} alt="" />
//                                 </div>
//                                 <p className="products-name">{e.company}</p>
//                                 <p className="products-offer" style={{ color: "#007185" }}>{e.price}</p>
//                                 {/* <p className="products-explore"></p> */}
//                             </div>
//                         </Link>
//                     )
//                 })
//             }
//         </Carousel>
//     )
// }

// export default Slide;
