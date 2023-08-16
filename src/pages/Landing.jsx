import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import Whitelogo from '../img/WhiteBackLogo.png'
import Clearlogo from '../img/ClearBackLogo.png'
import Pill from '../componets/Pill';
import FadeIn from 'react-fade-in';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"Practice",
      description:"Answer questions to practice prior to a test",
      pic:Whitelogo
    },
    {
      title:"Create",
      description:"Make questions that others can learn from in the.",
      pic:Whitelogo
    },
    {
      title:"Test",
      description:"Test yourself with a practice test to see where you are prior to an exam.",
      pic:Whitelogo
    },
    {
      title:"School",
      description:"Choose what school you attend to allow for questions specific to your class",
      pic:Whitelogo
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
        <img src={Clearlogo} alt='logo' /> 
        <p>
          Course Prep
        </p>
      </header>
      <main >
        <FadeIn delay={100}>
          <div className='focus'> 
            {/* <div className='imageContainer'> 
              <img className='home_banner1' src={background} alt='logo'/>
            </div> */}
            
            <HandleSwap/>
            
          </div>
          {/* <img className='home_banner2' src={background} alt='logo'/> */}
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