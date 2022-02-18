import { getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'

function Login({ providers }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <Head>
        <title>Spotify 2.0</title>
        <link rel="icon" href="/spotify.ico" />
      </Head>

      <img className="mb-5 w-44" src="/assets/spotify.ico" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-full bg-[#18D860] p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
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
