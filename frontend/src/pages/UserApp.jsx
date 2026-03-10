import React from 'react';
import axios from 'axios'; 
import  { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MediaCard from './card';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL;

const UserApp = () => {
  const { currentUser } = useSelector(state => state.user);
  const [market, setMarket] = useState([]);

  useEffect(() => {
    if (!currentUser?._id) return;

    const getMarket = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/ai/getuserprompts/${currentUser._id}`,
          { withCredentials: true }
        );

        const data = res.data;
        setMarket(data);
        console.log(data);
      } catch (err) {
        console.log("cannot get market ", err);
      }
    };

    getMarket();
  }, [currentUser]);

  const hasApps = market.length > 0;

  return (
    <div style={{ minHeight: "100vh" }}>
      <div id='user-app' className='pt-28' style={{ minHeight: "100vh" }}>
        <div className='gradientbg' style={{ minHeight: "100vh" }}>
          {hasApps &&
            market.map((curr) => (
              <a href={`/market/${curr.id}`} key={curr.id}>
                <div style={{ padding: 12, paddingLeft: 20 }}>
                  <MediaCard
                    Title={curr.title}
                    desc={curr.description}
                    imgUrl={curr.avatar}
                  />
                </div>
              </a>
            ))}

          {!hasApps && (
            <div className='flex justify-center items-center' style={{ height: "100vh", width: "100vw" }}>
              <div>
                <div className='font-bold text-gray-600' style={{ fontSize: "3rem" }}>
                  No Apps Created
                </div>
                <br />
                <a className='py-2 px-4 rounded-lg bg-green-300' href={`/create`} style={{ height: 20 }}>
                  + Create App
                </a>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UserApp;