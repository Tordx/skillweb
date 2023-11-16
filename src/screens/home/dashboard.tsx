import React, {useState, useEffect} from 'react'
import { Header } from 'screens/contents/components/gen/header'
import DataSheet from 'screens/contents/components/home/overview'
import './styles/styles.css'
import Data from 'screens/contents/components/home/data'
import Navbarmenu from 'screens/contents/components/gen/navigator/navbarmenu'

import { DataItem, jobdata } from 'types/interfaces'
import { fetchdata } from '../../firebase/function'




export default function Home({}) {

  const [jobdata, setjobdata] = useState<jobdata[]>([])
  const [filtereddata, setfiltereddata] = useState<DataItem[]>([])


  useEffect(() => {
    const fetchjobdata =async() => {
      
      const thisdata: jobdata[] = await fetchdata("job-post")||[];
        console.log(thisdata.length)
        setjobdata(thisdata)
      const resultArray: DataItem[] = thisdata
        .filter(item => item.status === true) 
        .map((item, index) => ({
          id: index, 
          value: 1, 
          name: item.jobtitle,
        }));
      setfiltereddata(resultArray)
    }

      fetchjobdata()
  }, [])

  return (
    <div className='container'>
      <Header menu={Navbarmenu}/>

      <div className='data-wrapper'>
      <DataSheet jobs={jobdata.length} />
        <div className='data-list'>
          <Data data={filtereddata} title = 'Available jobs'/>
          <Data data = {filtereddata} title = 'Most jobs wanted'/>
          </div>
      </div>
    </div>
  )
}