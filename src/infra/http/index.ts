import { api } from '@/config/variables'
import { cookies } from '@/infra/cookies'
import { rTag } from '../rTag'
import { Tags } from '@/utils/constants/tags'
import { headers } from 'next/headers'

interface RequestOptions extends Omit<RequestInit, 'next'> {
  tenant?: string
  auth?: boolean
  revalidateTag?: (typeof Tags)[number][]
  tags?: (typeof Tags)[number][]
}

export async function http(
  path: string,
  { auth = true, tenant = '', revalidateTag = [], tags = [], ...options }: RequestOptions = {}
) {
  const authorization = (auth && (await cookies.getCookie('at'))) || ''
  const subdomain = headers().get('x-subdomain') || ''

  const res = await fetch(api + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-TenantID': tenant || subdomain,
      Authorization: `Bearer ${authorization}`,
      ...options?.headers,
    },
    next: {
      tags,
    },
  })

  await Promise.all(revalidateTag.map(async (tag) => rTag(tag)))

  return res
}
