import React from 'react'

type Props = {}

export default function DataSheet({}: Props) {
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
          {30}
          </p>
        </div>
       <div className='tab-wrapper'>
          <span>
            Total Employee:
          </span>
          <p>
          {30}
          </p>
        </div>
        <div className='tab-wrapper'>
          <span>
            Total Employer:
          </span>
          <p>
          {30}
          </p>
        </div>
      </div>
        <div className='data-header'>
      <p>Data Analysis on Most jobs applied for and Most jobs wanted</p>
      </div>
    </div>
  )
}