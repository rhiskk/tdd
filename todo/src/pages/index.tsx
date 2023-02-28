import Head from 'next/head'
import { Todo } from '@/components/todo'
import { useEffect, useState } from 'react'

type Todo = {
  id: string
  title: string
  completed: boolean
  archived: boolean
}

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
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    fetch('/api/todo')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
      })
  }, [])

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
          <ul>
            {todos?.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
