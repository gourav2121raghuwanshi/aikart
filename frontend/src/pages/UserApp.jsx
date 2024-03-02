import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';

const UserApp = () => {

    const { currentUser } = useSelector(state => state.user);
    const [market, setMarket] = useState([]);

    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/ai/getuserprompts/${currentUser._id}`);
            const data = await res.data;
            setMarket(data);
            console.log(data);
          } catch (err) {
            console.log("cannot get market ");
          }
        };
        getMarket();
    }, []);

  return (
    <div>
        <div id='user-app'>
            <div style={{position:"absolute", top:"80px", display:"flex", flexWrap:"wrap"}}>
                {
                    market && 
                    market.map((curr) => (
                        <a href={`/market/${curr._id}`}>
                            <div style={{padding:12, paddingLeft:20}}>
                                <MediaCard key={curr._id} Title={curr.title} desc={curr.description} imgUrl={curr['avatar']} />
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default UserApp