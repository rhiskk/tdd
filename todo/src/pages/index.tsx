import Head from 'next/head'
import { TodoList } from '@/components/TodoList'
import useGetTodos from '@/hooks/useGetTodos'

export default function Home() {
  const todos = useGetTodos()

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
