import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'

function Login({ providers }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-end overflow-hidden bg-[#2941ab] scrollbar-hide md:justify-between">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/spotify.ico" />
      </Head>

      <div className="flex w-full items-center">
        <img
          className="opacity-40 md:opacity-100"
          src="/assets/bursts.png"
          alt=""
        />
      </div>
      <div className="absolute flex h-screen max-w-[20rem] flex-col items-center justify-center space-y-5 text-center md:max-w-4xl md:space-y-10">
        <img
          className="absolute top-20 w-44 md:top-10"
          src="/assets/spotify.png"
          alt=""
        />
        <h1 className="text-5xl font-bold text-[#1ed760] md:text-9xl">
          Listening is everything
        </h1>
        <p className="text-[#1ed760]">
          This is not a real app, It is built for educational purposes only.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className="mt-5 rounded-full bg-[#1ed760] p-3 px-5 font-medium
              text-[#2941ab] transition ease-in-out hover:scale-105"
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
      </div>

      {/* <img className="mb-5 w-44" src="/assets/spotify.ico" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-full bg-[#18D860] p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))} */}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
