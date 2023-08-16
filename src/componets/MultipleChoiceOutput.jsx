import React, { useState } from "react";

const MultipleChoiceOutput=( props )=>{
  const [picked,setPicked] =useState("")
  var correctBorder = {border: "solid 2px green"}
  var wrongBorder = {border: "solid 2px #ffd000"}
  var correctFill = {background: "green"}
  var wrongFill = {background: "#ffd000"}
  var data = props.data
  console.log(data)

  return(
    <div className="fullQuestion" style={data.answer==picked?correctBorder:wrongBorder}>
      <div className="ask">
        <h3>
          Multiple Choice
        </h3>
        <p>
          {data.question }
          
        </p>
        
      </div>
      <div className="answers" style={data.answer==picked?correctFill:wrongFill}>
        {data.options.map((e,i)=>{
          return(
            <p className="answer" onClick={()=>setPicked(e)}>
              {e}
            </p>
          )
        })}
      </div>
    </div>
  )
}
export default MultipleChoiceOutput