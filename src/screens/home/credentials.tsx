import React from 'react'
import { Header } from 'screens/contents/components/gen/header'
import Navbarmenu from 'screens/contents/components/gen/navigator/navbarmenu'

type Props = {}

export default function Credentials({}: Props) {
  return (
    <div>
    <Header menu={Navbarmenu}/>
    </div>
  )
}