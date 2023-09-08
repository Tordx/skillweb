import React from 'react'

type Props = {
  hired: number,
  nonhired: number,
}

export default function Status({hired, nonhired}: Props) {
  return (
   <> <span className='legend1'>
        <span>
          <div/>
          <p>Hired </p>
        </span>
        <p>Total Hired: <h4>{hired}</h4></p>
      </span>
      <span className='legend2'>
        <span>
          <div/>
          <p>Non-hired</p>
        </span>
        <p>Total Non-hired: <h4>{nonhired}</h4></p>
      </span>
    </>
  )
}