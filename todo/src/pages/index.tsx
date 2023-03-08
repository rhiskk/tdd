import Head from 'next/head'
import { TodoList } from '@/components/TodoList'
import useGetTodos from '@/hooks/useGetTodos'
import { TodoForm } from '@/components/TodoForm'
import useArchiveTodos from '@/hooks/useArchiveTodos'

export default function Home() {
  const archiveTodos = useArchiveTodos()
  const todos = useGetTodos()

  const handleArchive = async () => {
    await archiveTodos()
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
          <h1>Todos:</h1>
          <TodoForm />
          <TodoList todos={todos} />
          <button onClick={handleArchive}>Archive Completed Todos</button>
        </div>
      </main>
    </>
  )
}
