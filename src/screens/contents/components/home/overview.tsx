import { log } from 'console';
import { fetchemployerdata, fetchuserdata } from '../../../../firebase/function';
import React, { useEffect, useState } from 'react'
import { DataItem, employerdata, freelancedata } from 'types/interfaces';

type Props = {

  jobs: number,

}

export default function DataSheet({jobs}: Props) {

  const [employerdata, setemployerdata] = useState<employerdata[]>([])
  const [freelancedata, setfreelancedata] = useState<freelancedata[]>([])

  useEffect(() => {
      
      const fetchemployer = async() => {
      const thisdata: employerdata[] = await fetchemployerdata() || [];
      console.log(thisdata);
      setemployerdata(thisdata)
      }
     const fetchuser = async() => {
      const thisdata: freelancedata[] = await fetchuserdata() || [];
      console.log(thisdata);
      setfreelancedata(thisdata)
      }

      fetchemployer()
      fetchuser()
  },[])
  
  return (
    <div className='overview-container'>
      <div className='data-header'>
      <h1>Employment Overview</h1>
      </div>
      <div className='total-wrapper'> 
        <div className='tab-wrapper'>
          <span>
            Total Jobs:
          </span>
          <p>
          {jobs}
          </p>
        </div>
       <div className='tab-wrapper'>
          <span>
            Total Employee:
          </span>
          <p>
          {freelancedata.length}
          </p>
        </div>
        <div className='tab-wrapper'>
          <span>
            Total Employer:
          </span>
          <p>
          {employerdata.length}
          </p>
        </div>
      </div>
        <div className='data-header'>
      <p>Data Analysis on Most jobs applied for and Most jobs wanted</p>
      </div>
    </div>
  )
}