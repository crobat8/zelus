import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import RedLogo from '../img/CWU_wildcat_spirit_mark_RGB.png'
import Pill from '../componets/Pill';
import FadeIn from 'react-fade-in';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"Practice",
      description:"Check Daily practice plan",
      pic:RedLogo
    },
    {
      title:"Progress",
      description:"Track progress for different preacice activities ",
      pic:RedLogo
    },
    {
      title:"Notes",
      description:"Make notes to refer back to later",
      pic:RedLogo
    }
  ]
  function HandleSwap(){
    
    if(slide === 1){
      return (
      <FadeIn className='fade'>
        <Login change={changeSlide}/>
      </FadeIn>
      )
      
    }else if(slide === 2){
      return(
        <FadeIn className='fade'>
          <ResetPassword change={changeSlide}/>
        </FadeIn>
      ) 
    }else if(slide === 3){
      return (
        <FadeIn className='fade'>
          <Register change={changeSlide}/>
        </FadeIn>
      ) 
    }
  }
  const changeSlide = (x) =>{
    setSlide(x)
    
  }

  return (
    <div className="landing">
      
      <header className="topBar" >
        <img src={RedLogo} alt='logo' /> 
        <div className='title'>
          <h1>
            CWU Track and Field 
          </h1>
          <p>
            athlete page
          </p>
        </div>
        
      </header>
      <main >
        <FadeIn delay={100}>
          <div className='focus'> 
            
            <HandleSwap/>
            
          </div>
          
          <div className='pills'>
            
              {pillInfo.map((e,i)=>{
                return(
                  <Pill data={e} count={i}/>
                )
                
              })}
            
          </div>
        </FadeIn>
      </main>
      
      
      <footer className='botBar'>
      </footer>
    </div>
  )
}

export default Landing;