import React, { useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

const ClassList = (props) =>{
  const[selected,setSelected]=useState("")
  function change(e,num){
    props.changeClass(props.department+num)
    setSelected(num)

  }
  return(
    <FadeIn className="fadeClass">
      {props.classNums.map((e,i)=>{
        return(
          <div className="fullClass" >
            {selected==(e)?
            <h3  onClick={(event) =>change(event,e)} className="classNumSelected" >
            {e}
            </h3>
            :
            <h4 onClick={(event) =>change(event,e)} className="classNumNot">
            {e}
            </h4>
          }
          </div>
        )
      })}
    </FadeIn>
  )
}
export default ClassList