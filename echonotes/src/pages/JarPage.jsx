import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DraggableCore from 'react-draggable';
import ReactCardFlip from 'react-card-flip';
import Navbar from '../components/Navbar';

const JarNotes = ({ note, index, JarNext, JarBefore, setJarContentDict, handleNoteChange }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleDragStop(e) {
    const jarNextX = JarNext.location.x;
    const jarNextY = JarNext.location.y;
    const jarBeforeX = JarBefore.location.x;
    const jarBeforeY = JarBefore.location.y;

    if (jarNextX+200>e.x && jarNextX<e.x) {
        if(jarNextY+260>e.y && jarNextY+50<e.y){
            const selectedEntry={};
            selectedEntry[note[0]]=note[1];
            handleNoteChange(note);
            setJarContentDict(prev=>({nextLst:{...prev["nextLst"],...selectedEntry},prevLst:prev["prevLst"],currentLst:prev["currentLst"]}));
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
        }
    }else if (jarBeforeX+200>e.x && jarBeforeX<e.x) {
      if(jarBeforeY+260>e.y && jarBeforeY+50<e.y){
          const selectedEntry={};
          selectedEntry[note[0]]=note[1];
          handleNoteChange(note);
          setJarContentDict(prev=>({nextLst:prev["nextLst"],prevLst:{...prev["prevLst"],...selectedEntry},currentLst:prev["currentLst"]}));
          e.target.parentElement.parentElement.parentElement.parentElement.classList.add("d-none");
      }
    }

  }

  return (
    <DraggableCore 
        key={index} 
        onDrop={(e)=>{e.preventDefault();}}
        onStop={handleDragStop}

    >
      <div className='z-3' draggable={false}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          <div className='d-inline-block position-relative ' draggable={false}>
            <img src="../../images/notes1.png" width="300px" draggable={false} alt="." />
            <span className="position-absolute top-50 start-50 translate-middle text-center ">{note[0]}</span>
            <button className="btn btn-primary position-absolute bottom-0 start-50 p-3 translate-middle-x" onClick={()=>{setIsFlipped(prev=>(!prev))}} >çevir</button>
          </div>
          
          <div className='d-inline-block position-relative'>
            <img src="../../images/notes1.png" width="300px" draggable={false} alt="." />
            <span className="position-absolute top-50 start-50 translate-middle text-center ">{note[1]}</span>
            <button className="btn btn-primary position-absolute bottom-0 start-50 p-3 translate-middle-x" onClick={()=>{setIsFlipped(prev=>(!prev))}} >çevir</button>

          </div>
        </ReactCardFlip>
      </div>
      </DraggableCore>

  )
}


const Jar = ({setJar,jar,jarNameDict,isOpen}) => {
    const divRef = useRef(null);
    useEffect(() => {
      function trackDivCoordinates() {
        if (divRef.current) {
          const rect = divRef.current.getBoundingClientRect();
          console.log(`Div x: ${rect.x}, y: ${rect.y}`);
          setJar(prev =>({"location":{"x":rect.x,"y":rect.y},"key":prev.key}))
        }
      }
      window.addEventListener('resize', trackDivCoordinates);
      trackDivCoordinates();
      return () => window.removeEventListener('resize', trackDivCoordinates);
    }, [isOpen]);

    return (
    <div className='position-relative d-inline-block p-3 m-3' ref={divRef}>
          <h4 className='text-center'>{jarNameDict[jar.key]}</h4>
          <img src="../images/jar_cute2.png" alt="jar" />
        </div>
    )

}


const JarPage = () => {
  let a = useParams();
  const [notes, setNotes] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [JarNext, setJarNext] = useState({});
  const [JarBefore, setJarBefore] = useState({});
  const [jarContentDict, setJarContentDict] = useState({prevLst:{},nextLst:{},currentLst:{}});
  const jarNameDict={"1hours":"1 Saatlik Kavanoz","3hours":"3 Saatlik Kavanoz","8hours":"8 Saatlik Kavanoz","24hours":"24 Saatlik Kavanoz","done":"Tamamlandı"};
  const navigate = useNavigate();

  console.log(jarContentDict);

  const handleNoteChange = (note) => {
    const newNotes = {...jarContentDict.currentLst}
    delete newNotes[note[0]];
    setJarContentDict(prev=>({prevLst:prev.prevLst,nextLst:prev.nextLst,currentLst:newNotes}));  
    return note;
  }

  const saveChanges = () => {
    //first set what left in the jar for the case of the current jar was the last or the first jar 
    localStorage.setItem(a.id,JSON.stringify(jarContentDict.currentLst));
    // then add other jar 
    const lclDbBefore = localStorage.getItem(JarBefore.key);
    const lclDbNext = localStorage.getItem(JarNext.key);
  

    if (lclDbBefore != undefined) {
      console.log("indside before");
      const db = JSON.parse(lclDbBefore);
      const newDb = {...db,...jarContentDict.prevLst};
      localStorage.setItem(JarBefore.key,JSON.stringify(newDb));
    } else {
      console.log("not indside before");
      localStorage.setItem(JarBefore.key,JSON.stringify(jarContentDict.prevLst));
    }

    if (lclDbNext != undefined) {
      console.log("indside");
      const db = JSON.parse(lclDbNext);
      const newDb = {...db,...jarContentDict.nextLst};
      localStorage.setItem(JarNext.key,JSON.stringify(newDb));
    } else {
      console.log("not indside");
      localStorage.setItem(JarNext.key,JSON.stringify(jarContentDict.nextLst));
    }
    
    navigate("/");
  }

  useEffect(() => {
    setIsOpen(false)
    const jarUrl = a.id;
    const jarName = jarNameDict[jarUrl];
    if (jarName != undefined) {
      const notes = JSON.parse(localStorage.getItem(jarUrl));
      if (notes) {
        setNotes(notes);
        setJarContentDict({prevLst:{},nextLst:{},currentLst:notes});
      } else {
        // setNotes({ "Bye": "Tschüss", "Night": "Nacht", "Hello": "Halo", "No":"Nein" });
        // setJarContentDict({prevLst:{},nextLst:{},currentLst:{ "Bye": "Tschüss", "Night": "Nacht", "Hello": "Halo", "No":"Nein" }});
        setNotes({});
        setJarContentDict({prevLst:{},nextLst:{},currentLst:{}});
      }
      if (jarUrl=="1hours") {
        setJarBefore(prev => ({"location":prev.location,"key":"1hours"}));
        setJarNext(prev => ({"location":prev.location,"key":"3hours"}));
      } else if (jarUrl=="3hours") {
        setJarBefore(prev => ({"location":prev.location,"key":"1hours"}));
        setJarNext(prev => ({"location":prev.location,"key":"8hours"}));
      } else if (jarUrl=="8hours") {
        setJarBefore(prev => ({"location":prev.location,"key":"3hours"}));
        setJarNext(prev => ({"location":prev.location,"key":"24hours"}));
      }else if (jarUrl=="24hours") {
        setJarBefore(prev => ({"location":prev.location,"key":"8hours"}));
        setJarNext(prev => ({"location":prev.location,"key":"done"}));
      }else {
        setJarBefore(prev => ({"location":prev.location,"key":"24hours"}));
        setJarNext(prev => ({"location":prev.location,"key":"done"}));
      }
    } else {
      navigate("/");
    }
  }, [a.id])


  return (
    <div>
      <div className='vw-100 position-fixed top-0'><Navbar/></div>
      <div id='jarsBg' className='vw-100 vh-100 position-fixed top-0 z-n1 x'> </div>
      
      <div className='container-fluid d-flex margin-top-navbar'>
        {isOpen && (
          Object.entries(notes).map((note, index) =>
              <JarNotes key={index} note={note} JarNext={JarNext} JarBefore={JarBefore} setJarContentDict={setJarContentDict} handleNoteChange={handleNoteChange} />
          ))
        }
        <div className="vw-100 d-flex justify-content-around position-fixed bottom-0 z-0">

          <Jar setJar={setJarBefore} jar={JarBefore} jarNameDict={jarNameDict} isOpen={isOpen} />        
          <div className={`position-relative d-inline-block p-3 m-3 ${isOpen ? "d-none":""}`}>
            <h4 className='text-center'>{jarNameDict[a.id]}unu aç</h4>
            <button onClick={() => { setIsOpen(true) }} className='btn btn-primary position-absolute bottom-0 end-0 btn-lg'>Notları Aç</button>
            <img src="../images/jar_cute2.png" alt="jar" />
          </div>
            <div className={`${isOpen ? "":"d-none"} align-self-end`}>
              <button onClick={saveChanges} className="rounded-circle btn p-0"><img className='rounded-circle' src="../../images/done.png" alt="done" /></button>
            </div>
          <Jar setJar={setJarNext} jar={JarNext} jarNameDict={jarNameDict} isOpen={isOpen}/>
        </div>

      </div>
    </div>
  )
}

export default JarPage
