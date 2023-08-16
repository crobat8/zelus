import React, { 
  useContext, 
  useState 
} from "react";

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
} from "firebase/firestore";

import { 
  db 
} from "../firebase";

import { 
  AuthContext 
} from "../context/AuthContext";

const Friends = () =>{ 

  const{currentUser} = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const [loading1,setLoading1] =useState(true);
  const [loading2,setLoading2] =useState(true);
  const [loading3,setLoading3] =useState(true);
  const [requests,setRequests] = useState([]);
  const [myData,setMyData]     = useState([])
  const [friends,setFriends]   = useState([]);

  const handleSearch = async (e) => {
    const q = query(
      collection(db, "users"),
      where("brokenDisplayName", "array-contains", e.toLowerCase()),

    );
    try {
      onSnapshot(q,(snapshot)=>{
        setUsers(snapshot.docs.map(doc=>doc.data()))
      })
    } catch (err) {
      console.log(err)
      setErr(true);
    }

  };

  const sendRequest = async (e) =>{
    var requestName;
    console.log(e);
    if(currentUser.uid>e.uid){
      requestName = e.uid+currentUser.uid
    }else{
      requestName = currentUser.uid+e.uid
    }
    const userHolder ={
      displayName:currentUser.displayName,
      email:currentUser.email,
      photoURL:currentUser.photoURL,
      uid:currentUser.uid,
    }
    
    try{
        
      await setDoc(doc(db, "Request", requestName), {
        to:e.uid,
        toInfo:e,
        from:currentUser.uid,
        fromInfo:userHolder,
      });
      alert("Request was succesfully sent");
    }catch(err){
      alert(err)
    }
  }

  function getRequests(){
    const requestRef = query(collection(db,"Request")
                       ,where("to","==",currentUser.uid))
    onSnapshot(requestRef,(snapshot)=>{
      setRequests(snapshot.docs.map(doc=>doc.data()))

      setLoading1(false)
    })
  }
  
  function getFriends(){
    const meRef = query(collection(db,"users")
                  ,where("uid","==",currentUser.uid))
    onSnapshot(meRef,(snapshot)=>{
      setMyData(snapshot.docs.map(doc=>doc.data()))
      setLoading2(false)
    })
    if(loading2){
    }else{
      const friendIds = Object.values(myData[0].friends)
      const friendsRef = query(collection(db,"users")
                          ,where("uid","in",friendIds))
        onSnapshot(friendsRef,(snapshot)=>{
        setFriends(snapshot.docs.map(doc=>doc.data()))
        setLoading3(false)
      })
    }
  }
  
  const removeFriend = (incomming) =>{
    var temp = "are you sure you want to remove "+incomming.displayName+" as a friend."
    if(window.confirm(temp)){
      const deleteRef1 = doc(db,"users",myData[0].uid)
      const deleteRef2 = doc(db,"users",incomming.uid)
      var friendsPlaceHolder1 = "friends."+incomming.uid;
      var friendsPlaceHolder2 = "friends."+myData[0].uid;
      try{
        updateDoc(deleteRef1, {
          [friendsPlaceHolder1]:deleteField(),
        });
        updateDoc(deleteRef2, {
          [friendsPlaceHolder2]:deleteField(),
        });
      }catch(err){
        alert(err)
      }
      alert("deleted")
    }else{
      alert("the delete was canceled")
    }
    getFriends();
  }

  const removeRequst = (incomming) =>{  
    
    var requestsearch;
    if(incomming>currentUser.uid){
      requestsearch = currentUser.uid+incomming
    }else{
      requestsearch = incomming+currentUser.uid
    }
    deleteDoc(doc(db,"Request",requestsearch))
    
  }


  const confirm = (event,incomming)=>{
    var friendsPlaceHolder1 = "friends."+incomming;
    var friendsPlaceHolder2 = "friends."+currentUser.uid;
    const meRef = doc(db,"users",currentUser.uid);
    const themRef = doc(db,"users",incomming);
    updateDoc(meRef,{
      [friendsPlaceHolder1]:incomming
    });
    updateDoc(themRef,{
      [friendsPlaceHolder2]:currentUser.uid
    });
    removeRequst(incomming);
  }

  if(loading1||loading2||loading3){
    getRequests();
    getFriends();
    return(
      <h1>
        friends Loading
      </h1>
    )
  }else {
      
  }

  return (
    <div className="Friends">
      <div className='left'>
        <h1>
          {requests.length ? "Requests":""}
        </h1>
        
        <div className="requests">
          {requests.map((e,i)=>{
            
            return(
              <div className="request">
                <img src={e.fromInfo.photoURL} alt="" />
                <p>
                  {e.fromInfo.displayName}
                </p>
                <button onClick={(event)=>confirm(event,e.from)}>
                  confirm
                </button> 
                <button onClick={()=>removeRequst(e.from)}>
                  delete
                </button> 
              </div>
            )
          })}
        </div>
        <h1>
          My Friends
        </h1>
        <div className="people">
          {friends.map((e,i)=>{
            var info = e
            return(
              <div className="person" >
                <img src={e.photoURL} alt="" />
                <p>
                  {e.displayName}
                </p>
                <button onClick={()=> removeFriend(info)}>
                  Remove Friend
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <div className='right'>
        <h1>
          Find Friends
        </h1>
        <input
          type="text"
          placeholder="Find a user"
          
          onChange={(e) => handleSearch(e.target.value)}
          
          className="addinput"
        />
        {users.map((e,i)=>{

          return(
            <div className="add" >
          <img src={e.photoURL} alt="" width={"100%"}/>
          <div className="userChatInfo">
            <span>{e.displayName}</span>
            <button onClick={()=>sendRequest(e)} >
              add user as friend
            </button>
          </div>
         </div> 
          )
          
        
        })} 
      </div>
    </div>
  )
}
export default Friends;