import React from 'react';
import image from "./image.ico"
import "./form.css"

const Home = () => {
    return (
        <div className='home requires-no-scroll' style={{minHeight:620}}>
            <div className='left-circles'>
                <div className='circle1'></div>
                <div className='circle2'></div>
                <div className='circle3'></div>
                <img src={image} className="img-fluid" alt="Not Found"></img>
            </div>
        </div>
     );
}
 
export default Home;