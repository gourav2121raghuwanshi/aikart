import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';
import Footer from '../components/Footer';

const MarketPlace = () => {
    const { currentUser } = useSelector(state => state.user);
    const [market, setMarket] = useState([]);
    let y = true; 

    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/ai/getprompts`);
            const data = await res.data;
            setMarket(data);
            console.log(data);
          } catch (err) {
            console.log("cannot get market ");
          }
        };
        getMarket();
    }, []);
   
    if(currentUser === null){
        y = false;
    }        

  return (
    <div id='marketplace' className=' pt-24'  >
        <div  className='  mb-20 px-10 grid grid-cols-1 gap-10 md:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols4 ' style={{minHeight:"100vh"}}>
            {
                market && market.map((curr) => (
                  <a className=" bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"  
                    href={y ?`/market/${curr._id}` : '/sign-in'} key={curr._id}>
                      <div className="w-full overflow-hidden rounded-xl">
                          <img src={curr['avatar']}
                          className="w-full  duration-100 group-hover:-0" />
                      </div>
                      <h1 className="flex justify-between text-2xl">{curr.title}</h1>
                      <p>{curr.description}</p>
                  </a>
                )) 
            }
        </div>
        <Footer />
    </div>
  )
}

export default MarketPlace


