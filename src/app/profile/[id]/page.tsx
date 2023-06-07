'use client'

import React,{useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@/components/Profile'

type Prompt =  {
  creator: any,
  prompt: string,
  tag: string,
  _id: string,
}

interface Props {
  params: any
}

const PublicProfile:React.FC<Props> = (props) => {

  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState<Prompt[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${props.params.id}/posts`,{
      next: {
        revalidate: 0,
        //@ts-ignore
        cache: 'no-store'
      }
    });
    const data = await response.json();

    setUserPosts(data);
  }

  useEffect(() => {
    if(props.params.id) fetchPosts();
  },[props.params.id])

  return (
    <Profile
      name={userName!}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
      handleDelete={() => {}}
      handleEdit ={() => {}}
    />
  )
}

export default PublicProfile