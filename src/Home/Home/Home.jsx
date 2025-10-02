import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import Banner from '../Pages/Banner/Banner';
import TopScholarship from '../Pages/TopScholarship/TopScholarship';
import StatsCounter from '../Count/StatsCounter';

const Home = () => {
    return (
        <div>
           
           <Banner></Banner>
           <TopScholarship></TopScholarship>
           <StatsCounter></StatsCounter>
           
           
        </div>
    );
};

export default Home;