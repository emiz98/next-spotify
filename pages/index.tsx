import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import HomePage from './home'


export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/spotify.ico" />
      </Head>

      <HomePage/>
    
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }, // will be passed to the page component as props
  }
}