import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

 const HomeCard = ({ data }) => {
  return <div className="card home-option bg-primary-subtle shadow shadow-lg-light">
    <div className="card-body text-center">
      <h3 className='my-4'>{data.title}</h3>
      <h5 className='mb-3'>toplam <span>{data.total_words}</span> kart</h5>
    </div>
    <div className="card-footer d-flex justify-content-between">
      <p className='my-auto'>son giriş: <span>{data.last_date}</span></p>
      <Link to={data.link} className="btn btn-primary "> başla →</Link>
    </div>
  </div>
}

const SettingsAdditions = ({ data }) => {
  return <div className="card home-option bg-primary-subtle shadow shadow-lg-light home-settings-options">
    <div className="card-body text-center">
      <h3 className=''>{data.title}</h3>
    </div>
      <Link to={data.link} className="btn btn-primary m-2"> {data.isAddition? "Ekle" : "Ayarla"} </Link>
  </div>
}

const Home = () => {
  const [jars, setJars] = useState([]);
  const settingsAdditionsList = [
    {title:"Not ekle ve sil",isAddition:true,link:"/edit_note"},
    {title:"Ayarlar",isAddition:false,link:"/settings"},
  ] 

  useEffect(() => {
    const jarList=localStorage.getItem("chosen_jar_options_list");
    if (jarList == null) {
      const newList=[
        { title: "1 Saatlik Kavanoz", total_words: "8", last_date: "1/11/2023", link:"/jars/1hours" },
        { title: "3 Saatlik Kavanoz", total_words: "2", last_date: "1/12/2023", link:"/jars/3hours" },
        { title: "8 Saatlik Kavanoz", total_words: "25", last_date: "1/05/2023", link:"/jars/8hours" },
        { title: "24 Saatlik Kavanoz", total_words: "19", last_date: "25/01/2024", link:"/jars/24hours" },
        { title: "Öğrenilenler Kavanozu", total_words: "35", last_date: "2/01/2024", link:"/jars/finished" },
      ]
      setJars(newList);
      localStorage.setItem("chosen_jar_options_list",JSON.stringify(newList));
    }else{
      setJars(JSON.parse(jarList))
    }
    
  }, []);

  return (
    <div className='vh-100 bg-home overflow-y-scroll'>
      <Navbar />
    <div className='d-flex flex-wrap gap-4 justify-content-around p-5'>

      {jars.map((data, index) => (
        <HomeCard key={index} data={data} />
      ))}      
      {settingsAdditionsList.map((data, index) => (
        <SettingsAdditions key={index} data={data} />
      ))}</div>
      
    </div>
  );
};

export default Home;