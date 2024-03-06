'use client'
import axios, { AxiosError } from 'axios'
// import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Generated  to demo forms',
// }

interface UserResponse{
  user: string | null;
  error: AxiosError | null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // the line below will prevent the dashboard from even showing a glimpse untill its sure the user has rights 
  const [isSuccessful, setIsSuccessfull] = useState<boolean>(false);

  const router = useRouter()

  useEffect(()=>{
    (async()=>{
      const { user, error } = await getUser();

      if(error) {
        router.push('/')
        return;
      }

      // if error did not happen 
      setIsSuccessfull(true)
    })()
  },[router])
  if (!isSuccessful) {
    return <p>loading...</p>
  }


  return (
    <main >
      {children}
    </main>
  )
}


export async function getUser(): Promise<UserResponse>{
  try {
      const { data } = await axios.get('/api/auth/me')

      return {
        user: data,
        error: null,
      }
  } catch (e) {
      const error = e  as AxiosError;

      return {
        user: null,
        error,
      }
  }
}