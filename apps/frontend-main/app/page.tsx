"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard')
  }, [router])
  return (
    <>
    </>
  )
}

export default Home