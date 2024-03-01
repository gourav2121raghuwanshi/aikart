import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';

const MarketPlace = () => {
    const { currentUser } = useSelector(state => state.user);
    const [market, setMarket] = useState([]);

    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/api/user/getmarket1`);
            const data = await res.data;
            console.log(data);
            setMarket(data);
          } catch (err) {
            console.log("cannot get market ");
          }
        };
        getMarket();
    }, []);

    
            
        

  return (
    <div id='marketplace' style={{backgroundColor:"black"}}>
        <div style={{position:"absolute", top:"80px", display:"flex", flexWrap:"wrap"}}>
            {
                market && 
                market.map((curr) => (
                    <div style={{padding:12, paddingLeft:20}}>
                        <MediaCard key={curr._id} Title={curr.title} desc={curr.description} imgUrl={curr['imageUrl']} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MarketPlace


