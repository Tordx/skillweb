import React from 'react'

type Props = {
  employed: number,
  unemployed: number,
  underemployed: number,
}

export default function Overview({employed, unemployed, underemployed}: Props) {
  return (
    <>   
      <span className='legend1'>
        <span>
          <div/>
          <p>Employed </p>
        </span>
        <p>Employment this month: <h4>{employed}</h4></p>
      </span>
      <span className='legend2'>
        <span>
          <div/>
          <p>Underemployed</p>
        </span>
        <p>Underemployment this month: <h4>{underemployed}</h4></p>
      </span>
      <span className='legend3'>
        <span>
          <div/>
          <p>Unemployed</p>
        </span>
        <p>Unemployment this Month: <h4>{unemployed}</h4></p>
      </span>
    </>
  )
}