import React, { useEffect, useState } from "react";
import FadeIn from 'react-fade-in';

import { 
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillQuestionCircle
} from 'react-icons/ai';

import { 
  GiTeacher
} from 'react-icons/gi';

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
const MultipleChoiceInput=(props)=>{
  let question = { color: "white", height:"30px",width:"30px"};
  let correct = { color: "green", height:"30px",width:"30px"};
  let wrong = { color: "red", height:"30px",width:"30px"};
  const [wrongs,setWrongs] = useState(3);

  const handleChangeWrong = (x) =>{
    if((wrongs+x)==0){

    }else if((wrongs+x)==6){

    }else{
      setWrongs(wrongs+x);
    }
  }


  const WrongAnswers = ()=>{
    const ret = []
    for(var x= 0;x<wrongs;x++){
      ret.push(        
      <div className="fullIn">
        <div className="Subleft">
          <AiFillCloseCircle style={wrong}/>
        </div>
        <div className="Subright">
          <label for='wrong'>Wrong Option</label>
          <input required type="text" placeholder={x+3} />
        </div>
      </div>
      )
    }
    return ret
  }
  const Classes = (x)=>{
    return(
      <option value={x}>
        {x}
      </option>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const choseClass = e.target[0].value;
    if(choseClass == "0"){
      alert("you must choose a class for the question")
      return
    }
    const question = e.target[1].value;
    const answer = e.target[2].value;
    const type = "multipleChoice"
    var options = [] ;
    options.push(e.target[2].value)
    for(var x = 1;x<=wrongs;x++){
      options.push(e.target[2+x].value)
    }
    e.preventDefault();
    const date = new Date().getTime();
    try{
      setDoc(doc(db, "questions", props.uid+"-"+date), {
        createdBy:props.uid,
        choseClass,
        date,
        type,
        question,
        answer,
        options
      });
      
      
      alert("question was succesfully created")
      
    }catch(err){
      console.log(err)
    }
  }


  return(
    <div className="formWrapper">
      <h1>
        Multiple choice
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
              <label for='question'>Question</label>
              <input required type="text" placeholder="what is 1+1" />
            </div>
          </div>

          <div className="fullIn">
            <div className="Subleft">
              <AiFillCheckCircle style={correct}/>
            </div>
            <div className="Subright">
              <label for='correct'>Correct Answer</label>
              <input required type="text" placeholder="2" />
            </div>
          </div>
          <WrongAnswers/>
          <div className="choices">
            <button type="button" onClick={()=>handleChangeWrong(-1)}>
              remove option
            </button>
            <button type="button" onClick={()=>handleChangeWrong(1)}>
              add option
            </button>
          </div>
          <button className="logButton">submit question</button>
        </FadeIn>
      </form>
    </div>
    
  )
}
export default MultipleChoiceInput;