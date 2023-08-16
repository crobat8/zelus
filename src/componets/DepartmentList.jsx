import React, { useState } from "react";
import ClassList from "./ClassList";
import FadeIn from "react-fade-in/lib/FadeIn";
import { color } from "framer-motion";

const DepartmentList = (props) =>{

  const[subject,setSubject]=useState("")

  function change(e,x){
    props.changeClass(x)

  }

  function handleSubject(e,x){
    if(subject==x){
      setSubject("")
    }else{
      setSubject(x)
    }

  }

  return(
    // <div onClick={(event)=>change(event,props.brokenDown[0])}>
    //   class list 
    // </div>
    <FadeIn className="fadeDept">
      {props.keys.map((e,i)=>{
        return(
          <div className="fullDept">
            <div onClick={(event)=>handleSubject(event,e)} className="nameDept">
              {subject==(e)?
              <h3 className="selectedDepartment">
                {e}
              </h3>
              :<h4 className="notSelectedDepartment">
                {e}
              </h4>}
            </div>
            {subject==(e)?
            <ClassList changeClass={props.changeClass} department={e} classNums={props.classes[e]}/>
            :
            <div>
              
            </div>}
          </div>
        )
        })}
    </FadeIn>

  )
}
export default DepartmentList