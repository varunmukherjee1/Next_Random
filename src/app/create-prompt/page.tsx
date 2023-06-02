"use client"

import React,{useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@/components/Form'

const CreatePrompt:React.FC = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const [submitting,setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })


  const createPrompt = async (e: React.FormEvent) => {
    console.log(post);
    e.preventDefault();
    setIsSubmitting(true);


    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          //@ts-ignore
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  )
}

export default CreatePrompt