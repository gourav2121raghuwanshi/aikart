import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';

const MarketPlace = () => {
    const { currentUser } = useSelector(state => state.user);
    const [market, setMarket] = useState([]);
    let y = true; 

    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/api/user/getmarket1`);
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
    <div id='marketplace' >
        <div style={{position:"absolute", top:"80px", display:"flex", flexWrap:"wrap"}}>
            {
                market && 
                market.map((curr) => (
                    <a href={y ?`/market/${curr._id}` : '/sign-in'}>
                      <div style={{padding:12, paddingLeft:20}}>
                        <MediaCard key={curr._id} Title={curr.title} desc={curr.description} imgUrl={curr['imageUrl']} />
                    </div>
                    </a>
                ))
            }
        </div>
    </div>
  )
}

export default MarketPlace


