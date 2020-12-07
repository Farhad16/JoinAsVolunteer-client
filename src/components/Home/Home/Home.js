import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import OurWork from '../OurWork/OurWork';
import Programs from '../Programs/Programs';
import './Home.css'

const Home = () => {


    return (
        <div>
            <Header></Header>
            <Programs></Programs>
            <OurWork></OurWork>
            <Footer></Footer>
        </div>
    );
};

export default Home;