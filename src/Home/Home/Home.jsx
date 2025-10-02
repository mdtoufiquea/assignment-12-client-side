import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import Banner from '../Pages/Banner/Banner';
import TopScholarship from '../Pages/TopScholarship/TopScholarship';
import StatsCounter from '../Count/StatsCounter';
import TopCountriesChart from '../TopCountriesChart/TopCountriesChart';

const Home = () => {
    return (
        <div>
           
           <Banner></Banner>
           <TopScholarship></TopScholarship>
           <StatsCounter></StatsCounter>
           <TopCountriesChart></TopCountriesChart>
           
           
        </div>
    );
};

export default Home;