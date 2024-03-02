import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import { useEffect, useState } from 'react';


const Intro = () => {
    const {id}  = useParams();
    const [market, setMarket] = useState([]);
    useEffect(() => {
        const getMarket = async () => {
          try {
            const res = await axios.get(`/api/user/getCurrMarket/${id}`);
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
    <div >
        <div style={{position:"absolute",top:"80px",width:"400px", backgroundColor:"#4A3D3D", color:"white"}}>
            <img src={market?.imageUrl} style={{height:"300px"}}/>
            <div style={{marginTop:"10px",marginBottom:"10px",fontWeight:"600", fontSize:30,display:"flex", justifyContent:"center"}}>{market?.title}</div>
            <div style={{fontWeight:500, marginTop:"10px",marginBottom:"10px"}}>
            <span style={{fontSize:18}}>Description : </span> {market?.description}
            </div>
            <div style={{fontWeight:500}}>
               <span style={{fontSize:18}}> How to use : </span>{market?.howToUse}
            </div>

            <a href={`/rate/${id}`} style={{background:"blue", height:20}}><button >Rate us!!</button></a>
        </div>
        
    </div>
  )
}

export default Intro