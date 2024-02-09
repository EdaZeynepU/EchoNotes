import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ReactCardFlip from 'react-card-flip'
import Table from '../components/Table'


const NotePart = ({ isFlipped, setIsFlipped, setNote }) => {

    const checkValid = (e) => {
        if (e.target.classList.contains("is-invalid")) {
            e.target.classList.remove("is-invalid")
        }
    }

    return <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div>
            <h4 className='text-center offcanvas-title'>Ön Kısım</h4>
            <div className='d-inline-block position-relative '>
                <img src="../../images/notes1.png" width="300px" alt="." />
                <span className="position-absolute top-50 start-50 translate-middle text-center"><textarea id="addNoteFront" onChange={(e) => {
                    setNote(prev => ({ front: e.target.value, back: prev["back"] }));
                    checkValid(e);
                }} className={`form-control input-group-text`} /></span>
                {/*  is-invalid  */}
                <button className="btn btn-primary position-absolute bottom-0 start-50 p-3 translate-middle-x" onClick={() => { setIsFlipped(prev => (!prev)) }} >çevir</button>
            </div>
        </div>
        <div>
            <h4 className='text-center offcanvas-title'>Arka Kısım</h4>
            <div className='d-inline-block position-relative'>
                <img src="../../images/notes1.png" width="300px" alt="." />
                <span className="position-absolute top-50 start-50 translate-middle text-center"><textarea id="addNoteBack" onChange={(e) => {
                    setNote(prev => ({ back: e.target.value, front: prev["front"] }));
                    checkValid(e);
                }}
                    className='form-control input-group-text' /></span>
                <button className="btn btn-primary position-absolute bottom-0 start-50 p-3 translate-middle-x" onClick={() => { setIsFlipped(prev => (!prev)) }} >çevir</button>
            </div>
        </div>
    </ReactCardFlip>
}


const EditNote = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [allNotesList, setallNotesList] = useState([])
    const [note, setNote] = useState({ front: "", back: "" });
    const jarNameDict = { "1hours": "1 Saatlik Kavanoz", "3hours": "3 Saatlik Kavanoz", "8hours": "8 Saatlik Kavanoz", "24hours": "24 Saatlik Kavanoz", "done": "Tamamlandı" };
    // const [isLoading, setIsLoading] = useState(true);

    const getAllNotes = () => {
        if (allNotesList.length>0) {
            setallNotesList([]);
        }
        // let loading = true; 
        Object.entries(jarNameDict).map((value) => {
            const dbNotes = JSON.parse(localStorage.getItem(value[0]))
            if (dbNotes != null) {
                Object.entries(dbNotes).map((wordEntry)=>{
                    const newData = {};
                    newData["front"]=wordEntry[0];
                    newData["back"]=wordEntry[1];
                    newData["stage"]=value[0];
                    setallNotesList(prev=>([...prev,newData]));
                })
            }
        });
        // loading = false; 
        // setIsLoading(loading);
    }

    useEffect(() => {
        getAllNotes()
    }, [])




    const addNoteTosystem = () => {
        if (note.front.length > 0 && note.back.length > 0) {
            const localDb = JSON.parse(localStorage.getItem("1hours"));
            if (localDb == undefined || localDb.length < 1) {
                const newData = {};
                newData[note.front] = note.back;
                localStorage.setItem("1hours", JSON.stringify(newData))
            } else {
                localDb[note.front] = note.back;
                localStorage.setItem("1hours", JSON.stringify(localDb))
            }
            window.location.reload();
        } else {
            console.log("hata");
            if (note.front.length < 1) {
                const invalidArea = document.getElementById("addNoteFront");
                console.log(invalidArea);
                invalidArea.classList.add("is-invalid");
            }
        }


    }

    return (
        <div className='vh-100' >
            <div id='jarsBg' className='vh-100 vw-100 position-absolute z-n1'></div>
            <Navbar />
            <div className='row container-fluid h-75'>

                <div className='d-flex flex-column align-items-center justify-content-between mt-5 h-100 col-5'>
                    <h3 className='bg-primary p-4 rounded-pill'>Not ekle</h3>
                    <NotePart isFlipped={isFlipped} setIsFlipped={setIsFlipped} setNote={setNote} />
                    <button className="rounded-circle btn p-0" onClick={addNoteTosystem}><img className='rounded-circle' height="80px" src="../../images/done.png" alt="done" /></button>
                </div>

                <div className='d-flex flex-column align-items-center gap-3 mt-5 h-100 col-7 h-75'>
                    <h2 className='bg-primary p-4 rounded-pill'>Not sil</h2>
                    <div className='w-100 py-2 bg-white rounded-3'>
                        <Table tableData={allNotesList} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditNote