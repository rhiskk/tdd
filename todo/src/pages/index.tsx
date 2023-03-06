import Head from 'next/head'
import { TodoList } from '@/components/TodoList'
import useGetTodos from '@/hooks/useGetTodos'

// async function postHello() {
//   const res = await fetch('/api/hello', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ message: 'Hello from the client' }),
//   })
//   return res.json()
// }

export default function Home() {
  const todos = useGetTodos()

  // const handleClick = async () => {
  //   const hello = (await postHello()) as Hello
  //   setHellos([...hellos, hello])
  // }

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
          <h1>Todos:</h1>
          <TodoList todos={todos} />
        </div>
      </main>
    </>
  )
}
