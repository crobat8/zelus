import React,{
   useState,
   useEffect,
   useContext,
   memo,
} from "react";

import {  
  db
} from "../firebase";

import { 
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where, 
} from "firebase/firestore";

import myLocation from "../img/person.png"

import { 
  GoogleMap, 
  useJsApiLoader, 
  MarkerF,
  InfoWindowF,
  OverlayViewF,
} from "@react-google-maps/api";

import { 
  AuthContext 
} from "../context/AuthContext";

import { 
  AiOutlineClose
} from 'react-icons/ai';

import PartyChat from "./PartyChat";
/*global google*/


var me = {lat: 48.8584, lng: 2.2945}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    me.lat=position.coords.latitude;
    me.lng=position.coords.longitude
  });
} else {
}

const Parties = () =>{ 
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBvBeQOPrT0k1EFYDd7niC-aBbTEUj7uK0',
    libraries: ['places'],
  })
  
  const{currentUser} = useContext(AuthContext);

  while(currentUser ===null){
    console.log(currentUser,"1")
  }

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [loading,setLoading] =useState(true);
  const [loading2,setLoading2] =useState(true);
  const [loading3,setLoading3] =useState(true);
  const [parties,setParties] = useState([]);
  const [choseSlide,setChoseSlide] =useState(0);
  const [myData,setMyData]     = useState([]);
  const [friends,setFriends]   = useState([]);
  const [milesSlider,setmilesSlider] =useState(10);
  const [convertedSlider,setConvertedSlider] = useState(10/69)
  const [genreFilter,setGenreFilter] =useState(["Sports","House Party","Yard Games","Hit The Town","Video Games","Board Games"]);

  let closeStyle = { float:"right",color: "#e2f1ff", fontSize: "1.5em" ,padding:"5px"};
  function handleGenre(input){
    var value = input.target.value
    if(input.target.checked){
      setGenreFilter([...genreFilter,value])
    }else{
      const index = genreFilter.indexOf(value);
      const holderArray = genreFilter
      if(index>-1){
        holderArray.splice(index,1)
      }
      setGenreFilter(holderArray);

    }

    getParties();
    
  }

  function handleConvertedSlider(input){
    setConvertedSlider(input/69)
  }

  function handleRange(input){
    handleConvertedSlider(input)
    setmilesSlider(input )
  }

  function handleDropDown(x){
    setChoseSlide(x.i);
  }
  
  function IdCrossover(array1,array2){
    var retArray = [];
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          retArray.push(array1[i]);
        }
      }
    }
    return retArray;
  }

  function getParties(){
    const colRef =collection(db,"Event")
    onSnapshot(colRef,(snapshot)=>{
      setParties(snapshot.docs.map(doc=>doc.data()))
      setLoading(false);
    })
  }
  
  function convertIdToName(Crossed){
    var retArray= [];
    for (let i = 0; i <Crossed.length; i++) {
      for (let j = 0; j < friends.length; j++) {
        if (Crossed[i] === friends[j].uid) {
          retArray.push(friends[j].displayName);
        }
      }
    }
    return retArray;
  }

  function getMe(){
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

  function going(event,i){
    var updateKey = 'comingList.'+currentUser.uid
    const partiesRef = doc(db,"Event",parties[i-1].id)
    updateDoc(partiesRef,{
      [updateKey]:currentUser.uid
    })
    alert("added you to the going list")
  }
  
  function DropDown (props){
    var event = props.information;
    var i = props.number
    var coming = props.coming
    if(choseSlide === i){
      return(
        <div  className="slideDown" style={{overflow:"hide"}} >
          <div className="partyInfo">
            <div>
              <h3>
                Description: 
              </h3>
              <p>
                {event.Description}
              </p>
            </div>
            <div className="peopleComing">
              <h3>
                friends coming:
              </h3>
              {coming.map((e)=>{ 
                return(
                  <div  className="Person" >
                    {e}
                              
                  </div>
                )
              })}
            </div>
            
            <button onClick={(event)=> going(event,i)}>
              GOING
            </button>
              
          </div>
          <div className="partyChat">
            <PartyChat event={event} cleanText = {myData[0].cleanText}/>
          </div>
        </div>
      )
    }
  }

  
 
if(loading||!isLoaded||loading2||loading3){

    getParties();
    getMe();


    return <h1>
      Loading
    </h1>
  }else{
    
  }
  
  return (
    <div className="Parties">
      <div className='left'>
        <h2>
          filter
        </h2>
         <div className="range">
         <h3>
            Range:
          </h3>
          <input 
            id="distance"
            className="distance" 
            type="range" 
            min="1" 
            max="50" 
            onChange={(event)=>handleRange(event.target.value)}
            step="1"
            defaultValue={10}
          />
          <p>
            search range: {milesSlider} miles
          </p> 
        </div> 
        
        <div className="events">
        
          <h3>
            Event Types:
          </h3>
           <form className="filterType">
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="languages"
                  value="Sports"
                  id="flexCheckDefault"
                  onChange={(event) => handleGenre(event)}
                  defaultChecked={true}
                />
                <p>
                  Sports
                </p>
                
              </label>
              
            </div>
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="House Party"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              
                House Party
              </label>
            </div>
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Yard Games"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              
                Yard Games
              </label>
            </div>
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Hit The Town"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              
                Hit The Town
              </label>
            </div>
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
              <input
                className="form-check-input"
                type="checkbox"
                name="languages"
                value="Video Games"
                id="flexCheckDefault"
                onChange={(event) => handleGenre(event)}
                defaultChecked={true}
              />
              
                Video Games
              </label>
            </div>
            <div className="checkBoxChunk">
              <label
                className="form-check-label"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="languages"
                  value="Board Games"
                  id="flexCheckDefault"
                  onChange={(event) => handleGenre(event)}
                  defaultChecked={true}
                />
              
                Board Games
              </label>
            </div>
          </form> 
        </div>
      </div>
      <div className='right'>
        <div className="map" >
          <GoogleMap 
            center={me}
            zoom={10}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={map => setMap(map)}
          >
            {parties.map((e,i)=>{
              
              i=i+1;
              var Loc = {lat: e.Lattitude, lng: e.Longitude}
              var close = 0
              var filterBool = genreFilter.includes(e.EventType)

              var rangeBool = false
              if((me.lat-e.Lattitude<convertedSlider)&&(me.lng-e.Longitude<convertedSlider)){
                var rangeBool = true
              }
              
              if(filterBool&&rangeBool){
                
                const image = {
                  url:e.EventPhoto,
                  scaledSize :new google.maps.Size(30,50),
                }
                const label = {
                  text:e.Host,
                }
                const picture = document.createElement("div");
                picture.className = "marker";
                picture.textContent = "$2.5M";
                return(
                  
                  <MarkerF 
                  flat={true}
                  position={Loc} 
                  key={i}
                  zIndex={75}
                  onClick={() => handleDropDown({i})}
                  label={label}
                  content={picture}
                  >
                    
                    {i== choseSlide
                    ?
                    <InfoWindowF
                      position={Loc} 
                      key={i}
                      onCloseClick={(close) => handleDropDown({close})}
                      content=''
                    >
                      <div className="EventPop">
                        <div className="EventInfo">
                          <span className="eventHost">
                            Hosted By: {e.Host}
                          </span>
                          <span className="eventLoc">
                            {e.Address}
                        </span>
                        <img className="EventPic" src={e.EventPhoto} alt="" width={"100%"}/>
                        </div>
                        
                        
                      </div>
                      
                    </InfoWindowF>
                    :
                    null
                    }
                  </MarkerF>     
                )
              }
            })}
            <MarkerF 
              icon={myLocation}
              position={me} 
              zIndex={50}
            />
          </GoogleMap>
        </div> 
        <table class="table" >
          <thead>
            <tr className="header">
              <th>Host</th>
              <th>Event Type</th>
              <th>Title</th>
              <th>people coming</th>
              <th>people wanted</th>
            </tr>
          </thead>
          <tbody className="rows">
            {parties.map((e,i)=>{

              //used to find crossover between friends and who is coming to the party
              var friendIds =Object.values(myData[0].friends)
              var comingIds =Object.values(e.comingList)
              var crossOver = IdCrossover(friendIds,comingIds);
              var disNames = convertIdToName(crossOver)
              var filterBool = genreFilter.includes(e.EventType)

              var rangeBool = false
              if((me.lat-e.Lattitude<convertedSlider)&&(me.lng-e.Longitude<convertedSlider)){
                var rangeBool = true
              }
              i=i+1
              if(filterBool&&rangeBool){
                if(i === choseSlide){
                  return(
                    <div  className="FullParty" style={{backgroundColor:"#00618c"}}>
                      <tr key={i} className="line" onClick={() => handleDropDown({i})}>
                        <td>{e.Host}</td>
                        <td>{e.EventType}</td>
                        <td>{e.Title}</td>
                        <td>{Object.keys(e.comingList).length}</td>
                        <td>{e.Wanted}</td>
                          
                      </tr> 
                      <AiOutlineClose style={closeStyle} onClick={()=>setChoseSlide(0)}/>
                      <DropDown information={e} number={i} coming={disNames}>
                      </DropDown> 
                    </div>
                  )
                }else{
                  return(
                    <div  className="FullParty" >
                      <tr key={i} className="line" onClick={() => handleDropDown({i})}>
                        <td>{e.Host}</td>
                        <td>{e.EventType}</td>
                        <td>{e.Title}</td>
                        <td>{Object.keys(e.comingList).length}</td>
                        <td>{e.Wanted}</td>
                      </tr> 
                    </div>
                  )
                }
              }
              
            })}
              
          </tbody>
                
        </table> 
                
      </div>  
    </div>
  )
}
export default memo(Parties);