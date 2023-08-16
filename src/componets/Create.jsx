import React,{
  useState,
  useRef,
  useContext,
  useEffect
} from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'

import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'

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

import { 
  AuthContext
} from "../context/AuthContext";
import MultipleChoice from './MultipleChoiceInput';
import FillInBlank from './FillInBlankInput';
import LongAnswer from './LongAnswerInput';

const Create = () =>{ 
  const{currentUser} = useContext(AuthContext);
  const[loading,setLoading] = useState(true)
  const[loading2,setLoading2] = useState(true)
  const[form,setForm]= useState(1)
  const[classes,setClasses]=useState([]);
  const[brokenDown,setBrokenDown]=useState()
  function HandleForm(){
    

    if(form === 1){
      return (
        <MultipleChoice uid={currentUser.uid} classes={brokenDown}/>
      )
    }else if(form === 2){
      return (
        <FillInBlank uid={currentUser.uid} classes={brokenDown}/>
      )
    }else if(form === 3){
      return (
        <LongAnswer uid={currentUser.uid} classes={brokenDown}/>
      )
    }else{
      return (
        <div style={{"min-height": "1000px","textAlign":"center"}}>
          <h1 style={{"backgroundColor":"#00b2be",
                      "textAlign":"center",
                      "padding":"20px",
                      "borderRadius":"20px"}}>
            select a page to go to
          </h1>
        </div>
      )
    }
  }
  
  
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
    var ret = []
    for(var x = 0;x<keys.length;x++){
      for(var y = 0;y<classes[keys[x]].length;y++){
        ret.push(keys[x]+classes[keys[x]][y])

      }
    }
    setBrokenDown(ret)
    setLoading2(false)
  }

  useEffect(()=>{
    getClasses();
  },[]);

  useEffect(()=>{
    breakDown();
  },[classes])

  if(loading){
    
    return(
      <div>
        <h1>
          Loading 
        </h1>
        <h2>
          getting class list 
        </h2>
      </div>
    )
      
  }else if(loading2){
    return(
      <div>
        <h1>
          Loading 
        </h1>
        <h2>
          breaking down class list
        </h2>
      </div>
    )
  }
  
  return (
    <div className='create'>
      <div className='left'>
        <button onClick={()=>setForm(1)}>
          Multiple choice
        </button>
        <button onClick={()=>setForm(2)}>
          Fill in the blank
        </button>
        <button onClick={()=>setForm(3)}>
          Long answer
        </button>
      </div>
      <div className='right'>
        <HandleForm/>
      </div>
    </div>
  )
}

export default Create;