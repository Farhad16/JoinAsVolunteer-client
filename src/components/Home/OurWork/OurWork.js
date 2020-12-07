import React from 'react';
import './OurWork.css';

import childSupport from '../../images/childSupport.jpg'
import technology from '../../images//ITHelp.png'
import library from '../../images/libraryBooks.png'
import animal from '../../images/animalShelter.png'
import tree from '../../images/tree.jpg'

import ReactCardCarousel from 'react-card-carousel';
import OurWorkCarousel from '../OurWorkCarousel/OurWorkCarousel';

const OurWork = () => {

    var items = [
        {
            name: 'Child Support',
            img: childSupport,
        },
        {
            name: 'IT training',
            img: technology,
        }, {
            name: 'Public Library',
            img: library,
        }, {
            name: 'Animal Shelter',
            img: animal,
        }, {
            name: 'Plant Tree',
            img: tree,
        },
    ];
    return (
        <section className="ourWork text-center py-5">
            <h2 className="font-weight-bold text-center py-3">Our Upcoming <span style={{ color: '#71d437' }}>Programs</span></h2>
            <div className="carousel container d-flex align-items-center mb-3">
                <ReactCardCarousel autoplay={true} autoplay_speed={2500}>
                    {
                        items.map((item, i) => <OurWorkCarousel item={item} key={i} />)
                    }
                </ReactCardCarousel>
            </div>
        </section>
    );
};

export default OurWork;