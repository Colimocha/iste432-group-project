import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button variant="outlined">MUI Button</Button>
      </div>
    </>
  )
}
