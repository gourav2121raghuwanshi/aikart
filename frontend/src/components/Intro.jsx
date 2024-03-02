import React from 'react'
import { useParams } from 'react-router-dom';

const Intro = () => {
    const {id}  = useParams();
  return (
    <div >
        <div style={{position:"absolute",top:"60px",width:"400px", backgroundColor:"black", color:"white"}}>
            <div style={{marginTop:"5px",marginBottom:"5px",fontWeight:"600", fontSize:28,display:"flex", justifyContent:"center"}}>Welcome to AI Kart</div>
            <div style={{fontWeight:500}}>
                We help you do various activities : 
                For ex -
                <ul style={{ display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                    <li>Text to Image Conversion :
                        <img src="https://picsum.photos/seed/picsum/220/200" alt="" />
                    </li>
                    <li>Image to Text Conversion :
                        <img src="https://picsum.photos/seed/picsum/220/200" alt="" />
                    </li>
                    <li>Image to Text Conversion :
                        <img src="https://picsum.photos/seed/picsum/220/200" alt="" />
                    </li>
                </ul>
            </div>

            <a href={`/rate/${id}`} style={{background:"blue", height:20}}><button >Rate us!!</button></a>
        </div>
        
    </div>
  )
}

export default Intro