async function getCookie(cookieName: string) {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')

    return cookies().get(cookieName)?.value
  }

  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split('=')[1]
}

export const cookies = { getCookie }
