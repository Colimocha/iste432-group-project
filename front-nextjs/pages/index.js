import { Button } from '@mui/material'
import GlobalServices from '../lib/global'

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <h1 className="text-3xl font-bold">
          Hello world! {GlobalServices.getRole()}
        </h1>
        <Button
          variant="text"
          className="mt-16 bg-blue-500 hover:bg-blue-700 text-white"
        >
          This is a button
        </Button>
      </div>
    </>
  )
}
