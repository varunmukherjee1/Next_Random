'use client'

import React,{useEffect} from 'react'
import { useSession } from 'next-auth/react'

import Profile from '@/components/Profile'

const PersonalProfile = () => {

  const {data: session} = useSession();

  const fetchPosts = async () => {
    
  }

  return (
    <div>PersonalProfile</div>
  )
}

export default PersonalProfile