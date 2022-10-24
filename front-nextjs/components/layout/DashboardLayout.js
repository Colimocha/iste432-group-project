import Head from 'next/head'
import NavBar from '../navbar/NavBar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
