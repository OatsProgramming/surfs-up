import { Inter } from 'next/font/google'
import Form from './components/Form/Form'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Form method='DELETE'/>
      <div>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </main>
  )
}
