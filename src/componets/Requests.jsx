import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  onSnapshot,
  get,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Requests = () =>{
  const{currentUser} = useContext(AuthContext);
  const{userInfo} =useContext(UserContext);
  const[requests,setRequests] = useState([])

  const getRequestInfo = async (e)=>{
    var temp = []
    const q = query(
      collection(db, "users"),
      where("uid", "in",userInfo[0].requests )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push(doc.data())
      setRequests(temp)
    });
  }

  function confirmRequest (x){
    const coachRef = doc(db,"users",x.uid)
    updateDoc(coachRef,{
      athletes: arrayUnion(currentUser.uid)
    })

    const athleteRef = doc(db,"users",currentUser.uid);
    updateDoc(athleteRef,{
      coaches: arrayUnion(x.uid),
      requests: arrayRemove(x.uid)
    })

    alert("sucessfully added coach");

  }

  useEffect(() => {
    if(!userInfo[0].requests){
      getRequestInfo();
    }
    

  }, []);

  if(!userInfo[0].requests){
    return(
      <h1>
        you have no requests
      </h1>
    )
  }
  return(
    <div>
      <h1>
        Request Page
      </h1>
      {requests.map((e,i)=>{

        return(
          <div className="request">
            <h3>
              {e.displayName}
            </h3>
            <button onClick={()=>confirmRequest(e)}>accept coach</button>
          </div>

        )
      })}
    </div>
  )
}

export default Requests;