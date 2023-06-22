import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Pet: {router.query.id}</p>
}