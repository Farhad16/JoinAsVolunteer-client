import React from 'react';

const OurWorkCarousel = (props) => {
    const { name, img } = props.item;
    return (
        <div className="cardStyle pb-5">
            <img src={img} alt="" className="h-100 w-100" />
            <h5 className="text-light py-3 bgColor">{name}</h5>
        </div>

    );
};

export default OurWorkCarousel;