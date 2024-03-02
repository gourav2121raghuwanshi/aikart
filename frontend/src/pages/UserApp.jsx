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

    let y = true;
    if(market.length === 0){
        y = false;
    }

  return (
    <div>
        <div id='user-app'>
            <div style={{position:"absolute", top:"80px", display:"flex", flexWrap:"wrap"}}>
                {
                    y && market && 
                    market.map((curr) => (
                        <a href={`/market/${curr._id}`}>
                            <div style={{padding:12, paddingLeft:20}}>
                                <MediaCard key={curr._id} Title={curr.title} desc={curr.description} imgUrl={curr['avatar']} />
                            </div>
                        </a>
                    ))
                }
                {
                    
                    !y &&
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", margin:"auto"}}> 
                        <div>You have not created any App</div> <br />
                        <a href={`/create`} style={{background:"blue", height:20}}><button >Create one</button></a>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default UserApp