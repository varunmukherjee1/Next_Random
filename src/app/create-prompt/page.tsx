"use client"

import React,{useState} from 'react'

import Form from '@/components/Form'

const CreatePrompt:React.FC = () => {

  const [submitting,setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
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
        type = "Create"
        post = ""
        setPost = ""
        submitting = ""
        handleSubmit = ""
      />
    </div>
  )
}

export default CreatePrompt