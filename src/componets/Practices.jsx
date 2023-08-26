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
import FadeIn from "react-fade-in"

const Practices = ()=>{
  const [date,setDate] = useState()
  const [displaydate,setDisplayDate]=useState()
  const [practice,setPractice] = useState([])
  const{currentUser} = useContext(AuthContext);
  const[loading,setLoading] = useState(true)
  
  function handleDate(e){
    setDate(e.target.value)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    for(var x = 0;x<practice.workouts.length;x++){
      console.log(practice.workouts[x])
    }
    console.log(e)
  }

  function convertMonth(x){
    if(x ==='01'){
      return 'January'
    }else if(x === '02'){
      return 'Febuary'
    }else if(x === '03'){
      return 'March'
    }else if(x === '04'){
      return 'April'
    }else if(x === '05'){
      return 'May'
    }else if(x === '06'){
      return 'June'
    }else if(x === '07'){
      return 'July'
    }else if(x === '08'){
      return 'Augest'
    }else if(x === '09'){
      return 'September'
    }else if(x === '10'){
      return 'October'
    }else if(x === '11'){
      return 'November'
    }else if(x === '12'){
      return 'December'
    }else{
      return x
    }
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
    month = convertMonth(month) +" "+ day
    setDisplayDate(month)
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
      <div className="Practices">
        <div className="date">
          <h2>
            pick day of practice
          </h2>
          <form onChange={handleDate}>
            <input type="date"/>
          </form>
        </div>

      </div>
      
    )
  }

  return(
    <div className="Practices">
      <div className="date">
        <h2>
          pick day of practice
        </h2>
        <form onChange={handleDate}>
          <input type="date"/>
        </form>
      </div>
      <hr
        style={{
          background: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
          margin:'5px'
        }}
      />
      <div className="workouts">
        <h1>
          Practice for {displaydate}
        </h1>
        <form className="practiceForm" onSubmit={handleSubmit}>
          <FadeIn>
            {practice.workouts.map((e,i)=>{
            return(
              <div key={i}>
              
                <h2>
                  {e.exercise} reps: {e.reps}
                </h2>
                <p>
                  notes: {e.notes }
                </p>
                <label>
                  mark distance/time
                </label>
                <input type="number" placeholder="ex 46.4" key={e}>
                </input>
              </div>
            )
            })}
            <button>
              submit
            </button>
          </FadeIn>

        </form>  
      </div>
    </div>
  )
}

export default Practices