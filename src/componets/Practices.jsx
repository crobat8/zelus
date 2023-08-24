import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Practices = ()=>{
  const [date,setDate] = useState()
  const [practice,setPractice] = useState([])
  const{currentUser} = useContext(AuthContext);
  const[loading,setLoading] = useState(true)
  function handleDate(e){
    setDate(e.target.value)
  }

  function getDate() {
    var today = new Date();
    var year = today.getFullYear();
    year = year.toString();

    var month = today.getMonth() + 1;
    month = month.toString();

    if(month.length == 1){
      month = "0"+month
    }
    var day = today.getDate();
    day = day.toString();

    if(day.length == 1){
      console.log("test2")
      day = "0"+day
    }
    setDate(`${year}-${month}-${day}`)
    
  }

  const getPractice = async ()=>{


    setPractice([])
    setLoading(true)
    var practicePath = currentUser.uid+"_"+date
    var temp = []

    const q = query(
      collection(db, "practices"),
      where("practiceID", "==", practicePath)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      setPractice(doc.data())
      setLoading(false)
    });
  }

  useEffect(()=>{
    getDate();
    getPractice();
  },[])

  useEffect(()=>{

    getPractice();
  },[date,setDate])

  if(loading){
    
    return(
      <div>
        <h1>
          Practices
        </h1>
        <h2>
          pick day of practice
        </h2>
        <form onChange={handleDate}>
          <input type="date"/>
        </form>
      </div>
      
    )
  }

  return(
    <div>
      <h1>
        Practice
      </h1>
      <div>
        <h2>
          pick day of practice
        </h2>
        <form onChange={handleDate}>
          <input type="date"/>
        </form>
      </div>
      <div>
        <h1>
          workouts
        </h1>
        <div>
          {practice.workouts.map((e,i)=>{
            return(
              <div key={i}>
                <h3>
                  {e.exercise}X{e.reps}
                </h3>
                <h4>
                  {e.notes }
                </h4>
              </div>
            )
          })}
        </div>  
      </div>
    </div>
  )
}

export default Practices