import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL;

const MarketPlace = () => {
  const { currentUser } = useSelector(state => state.user);
  const [market, setMarket] = useState([]);

  useEffect(() => {
    const getMarket = async () => {
      try {
        const res = await axios.get(`${API_URL}/ai/getprompts`, {
          withCredentials: true,
        });

        setMarket(res.data);
      } catch (err) {
        console.log("cannot get market ", err);
      }
    };

    getMarket();
  }, []);

  const isLoggedIn = currentUser !== null;

  return (
    <div id='marketplace' className='pt-24'>
      <div
        className='mb-20 px-10 grid grid-cols-1 gap-10 md:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        style={{ minHeight: "100vh" }}
      >
        {market.map((curr) => (
          <Link
            className="bg-blue-300 group flex flex-col gap-3 rounded-2xl p-5 duration-100 hover:bg-brand-amber-2"
            to={isLoggedIn ? `/market/${curr._id}` : '/sign-in'}
            key={curr._id}
          >
            <div className="w-full overflow-hidden rounded-xl">
              <img
                src={curr.avatar}
                className="w-full duration-100 group-hover:-0"
                alt={curr.title}
              />
            </div>

            <h1 className="flex justify-between text-2xl">{curr.title}</h1>
            <p>{curr.description}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MarketPlace;