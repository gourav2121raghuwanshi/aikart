import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';
import Footer from '../components/Footer';

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
    <div style={{minHeight:"100vh"}}>
        <div id='user-app' className=' pt-28 ' style={{minHeight:"100vh"}} >
            <div className='gradientbg' style={{minHeight:"100vh"}} >
                {
                    y && market && market.map((curr) => (
                        <a href={`/market/${curr.id}`}>
                            <div style={{padding:12, paddingLeft:20}}>
                                <MediaCard key={curr.id} Title={curr.title} desc={curr.description} imgUrl={curr['avatar']} />
                            </div>
                        </a>
                    ))
                }
                
                {
                    !y &&
                    <div className='flex justify-center items-center' style={{height:"100vh", width : "100vw"}}> 
                        <div className=' '>
                            <div className=' font-bold font text-gray-600' style={{fontSize:"3rem"}}>No Apps Created</div> <br />
                            <a className=' py-2 px-4 rounded-lg bg-green-300' href={`/create`} style={{ height:20}}>+ Create App</a>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    </div>
  )
}

export default UserApp