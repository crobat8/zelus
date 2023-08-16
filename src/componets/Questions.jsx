import React, { useState,useEffect } from "react";

import {  
  db  
} from "../firebase";

import { 
  doc, 
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  QuerySnapshot
} from "firebase/firestore";
import DepartmentList from "./DepartmentList";
import MultipleChoiceOutput from "./MultipleChoiceOutput";


const Questions =() =>{
  const[loading,setLoading]=useState(true)
  const[loading2,setLoading2]=useState(true)
  const[loadingQuestions,setLoadingQuestions]=useState(false)
  const[classes,setClasses]=useState([])
  const[brokenDown,setBrokenDown]=useState()
  const[choseClass,setChoseClass]=useState("Pick a class to get questions for")
  const[keys,setKeys] =useState()
  const[studies,setStudies]=useState(0)
  
  const getClasses = async()=>{
    await getDocs(collection(db,"classes"),
                  where("Document ID","==","Western_Washington_University"))
                  .then((querySnapshot)=>{
                    const newData = querySnapshot.docs
                      .map((doc)=>(setClasses(doc.data())))

                      setLoading(false)
                  })
  }

  function breakDown(){
    const keys = Object.keys(classes)
    setKeys(keys)
    var ret = []
    for(var x = 0;x<keys.length;x++){
      for(var y = 0;y<classes[keys[x]].length;y++){
        ret.push(keys[x]+classes[keys[x]][y])

      }
    }
    setBrokenDown(ret)
    setLoading2(false)
  }

  const getStudies = async()=>{
    setLoadingQuestions(true)
    setStudies([])
    const q = query(collection(db,"questions")
                    ,where("choseClass","==",choseClass))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.map((doc)=>{
      var data = doc.data()
      setStudies(arr=>[...arr,data])
    });
    setLoadingQuestions(false)
  }
  
  function HandleQType(x){
    var data = x.data
    if(data.type == "multipleChoice"){
      return(
        <MultipleChoiceOutput data={data}/>
      )
    }else if(data.type == "longAnswer"){
      return(
        <p>
          long Answer {data.answer}
        </p>
      )
    }else if(data.type == "fillInBlank"){
      return(
        <p>
          fill in the blank {data.answer}
        </p>
      )
    }
  }

  useEffect(()=>{
    getClasses();
  },[]);

  useEffect(()=>{
    breakDown();
  },[classes])

  useEffect(()=>{
    getStudies();
  },[choseClass])

  if(loading){
    return(
      <h1>
        loading 1
      </h1>
    )
  }
  if(loading2){
    return(
      <h1>
        loading 2
      </h1>
    )
  }
  return(
    <div className="questions">
      <div className='left'>
        <h1>
          pick a class 
        </h1>
        <DepartmentList 
        keys={keys} 
        classes={classes} 
        brokenDown={brokenDown} 
        changeClass={setChoseClass} />
      </div>
      <div className='right'>
        <h1>
          {choseClass}
        </h1>
        {loadingQuestions?
          <h3>
            getting questions
          </h3>
        :
          <div className="questionList">
            {studies.map((e)=>{
              return(
                <HandleQType data={e}/>
              )
            })}
          </div>
        }
      </div>
    </div>
  )
}
export default Questions;