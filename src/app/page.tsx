import { headers } from 'next/headers'

export default function Home() {
  const subDomain = headers().get('x-subdomain') || ''

  return <div>{subDomain}</div>
}
