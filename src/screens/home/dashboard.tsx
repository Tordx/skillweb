import React, {useState, useEffect} from 'react'
import { Header } from 'screens/contents/components/gen/header'
import DataSheet from 'screens/contents/components/home/overview'
import './styles/styles.css'
import Data from 'screens/contents/components/home/data'
import Navbarmenu from 'screens/contents/components/gen/navigator/navbarmenu'
import { db } from '../../firebase'
import { collection, getDocs } from '@firebase/firestore'
import { jobdata } from 'types/interfaces'

interface DataItem  {
  id: number;
  value: number;
  name: string;
};



export default function Home({}) {

  const [data, setdata] = useState<jobdata[]>([])
  const [filtereddata, setfiltereddata] = useState<DataItem[]>([])


  useEffect(() => {
      fetchdata()
  }, [])


  const fetchdata = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, "job-post"));
      const thisdata: jobdata[] = []
      querySnapshot.forEach((doc) => {
        thisdata.push({
          budget: doc.data().budget,
          description: doc.data().description,
          fullname: doc.data().fullname,
          jobid: doc.data().jobid,
          joblocation: doc.data().joblocation,
          jobtitle: doc.data().jobtitle,
          pertimeframe: doc.data().pertimeframe,
          photoURL: doc.data().photoURL,
          qualification: doc.data().qualification,
          requirements: doc.data().requirements,
          scope: doc.data().scope,
          status: doc.data().status,
          timestamp: doc.data().timestamp,
          type: doc.data().type,
          userid: doc.data().userid,
        })
      })
   const resultArray: DataItem[] = thisdata.map((item, index) => ({
      id: index, 
      value: 1, 
      name: item.jobtitle, // Use an appropriate field for the name
    }));
      console.log(resultArray)
      setfiltereddata(resultArray)
      setdata(thisdata)
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <Header menu={Navbarmenu}/>
      <DataSheet/>
      <div className='data-wrapper'>
        <Data data={filtereddata} title = 'Most jobs applied for'/>
        <Data data = {filtereddata} title = 'Most jobs wanted'/>
      </div>
    </div>
  )
}