import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <div className='md:max-w-10/12 mx-auto mt-2 mb-10'>
            <Carousel showThumbs={false} >
            <div>
                <img src="https://i.ibb.co.com/YBRS5LY4/1st-img-4.jpg" />
                
            </div>
            <div>
                <img src="https://i.ibb.co.com/DgjWyjhh/Endowd-5-types-of-Scholarship-Feature-Image-Land-Scape-0cc2b0f5fc.png" />
                
            </div>
            <div>
                <img src="https://i.ibb.co.com/5xjNGSj9/scholarship-program-img.jpg" />
               
            </div>
            <div>
                <img src="https://i.ibb.co.com/nNRcj8W0/scholarship-img.jpg" />
                
            </div>
        </Carousel>
        </div>
    );
};

export default Banner;