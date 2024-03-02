import React from 'react'
import Intro from '../components/Intro';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const New = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>
      <Intro />
    </div>
  )
}

export default New