import React, { useState } from "react";
import FadeIn from 'react-fade-in';

import { 
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillQuestionCircle
} from 'react-icons/ai';

import { 
  doc, 
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

import {  
  db  
} from "../firebase";

import { 
  GiTeacher
} from 'react-icons/gi';

const FillInBlankInput=(props)=>{
  let question = { color: "white", height:"30px",width:"30px"};
  let correct = { color: "green", height:"30px",width:"30px"};
  let wrong = { color: "red", height:"30px",width:"30px"};
  const [wrongs,setWrongs] = useState(3);

  const Classes = (x)=>{
    return(
      <option value={x}>
        {x}
      </option>
    )
  }

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    const choseClass = e.target[0].value;
    if(choseClass == "0"){
      alert("you must choose a class for the question")
      return
    }
    const text1 = e.target[1].value;
    const answer = e.target[2].value;
    const text2 = e.target[3].value;
    const type = "fillInBlank"

    const date = new Date().getTime();
    try{
      setDoc(doc(db, "questions", props.uid+"-"+date), {
        createdBy:props.uid,
        choseClass,
        date,
        type,
        text1,
        text2,
        answer,
      });
      
      alert("question was succesfully created")
      
    }catch(err){
      console.log(err)
    }

  }
  
  return(
    <div className="formWrapper">
      <h1>
        Fill in the blank
      </h1>
      <form onSubmit={handleSubmit}>
        <FadeIn className="fade">

        <div className="fullIn">
          <div className="Subleft">
            <GiTeacher style={question}/>
          </div>
          <div className="Subright">
            <label for='class'>What class is this for</label>
              <select>
                <option value="0">
                  Select Class
                </option>
                {props.classes.map((e)=>{

                  return(
                    Classes(e)
                  )
                })}
              </select>
          </div>
        </div>
        
        <div className="fullIn">
          <div className="Subleft">
            <AiFillQuestionCircle style={question}/>
          </div>
          <div className="Subright">
            <label for='question'>Start of Text</label>
            <input required type="text" placeholder="The state of" />
          </div>
        </div>

        <div className="fullIn">
          <div className="Subleft">
            <AiFillCheckCircle style={correct}/>
          </div>
          <div className="Subright">
            <label for='correct'>Blank Space Answer</label>
            <input required type="text" placeholder="Washington" />
          </div>
        </div>

        <div className="fullIn">
          <div className="Subleft">
            <AiFillQuestionCircle style={question}/>
          </div>
          <div className="Subright">
            <label for='question'>End of Text</label>
            <input required type="text" placeholder="contains the space needle" />
          </div>
        </div>

        <button className="logButton">submit question</button>
        </FadeIn>
      </form>
    </div>
    
  )
}
export default FillInBlankInput;