'use client'

import React,{useEffect,useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/Profile'

type Prompt =  {
  creator: any,
  prompt: string,
  tag: string,
  _id: string,
}

const PersonalProfile = () => {

  const [myPosts, setMyPosts] = useState<Prompt[]>([])
  const {data: session} = useSession();
  const router = useRouter();

  const fetchPosts = async () => {
    //@ts-ignore
    const res = await fetch(`/api/users/${session?.user.id}/posts`,{
      next: {
        revalidate: 0,
      }
    })
    const data = await res.json();

    setMyPosts(data)
  }
  
  useEffect(() => {

    //@ts-ignore
    if(session?.user.id){
      //@ts-ignore
      fetchPosts();
    }
    //@ts-ignore
  },[session?.user.id])

  const handleEdit = (post: Prompt) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name = "My"
      desc = 'Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data = {myPosts}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
    />
  )
}

export default PersonalProfile