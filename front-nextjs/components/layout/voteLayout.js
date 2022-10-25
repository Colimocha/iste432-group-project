import Head from 'next/head'
import NavBar from '../navbar/NavBar'

export default function VoteLayout({ children }) {
  return (
    <>
      <Head>
        <title>Vote</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
