import Head from 'next/head'
import { useEffect, useState } from 'react'

type Hello = {
  id: string
  message: string
}

async function postHello() {
  const res = await fetch('/api/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Hello from the client' }),
  })
  return res.json()
}

export default function Home() {
  const [hellos, setHellos] = useState<Hello[]>([])

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setHellos(data)
      })
  }, [])

  const handleClick = async () => {
    const hello = (await postHello()) as Hello
    setHellos([...hellos, hello])
  }

  return (
    <>
      <Head>
        <title>Todo</title>
        <meta name="description" content="Todo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>Hello todo!</h1>
          {hellos?.map((hello) => (
            <p key={hello.id}>{hello.message}</p>
          ))}
          <button onClick={handleClick}>Post hello</button>
        </div>
      </main>
    </>
  )
}
