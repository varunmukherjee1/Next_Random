'use client'

import React, {useEffect,useState} from 'react'

import PromptCard from './PromptCard'

interface Props {
    
}

type Prompt =  {
  creator: string,
  prompt: string,
  tag: string,
  _id: string,
}

const Feed: React.FC<Props> = () => {

  const [prompts,setPrompts] = useState<Prompt[]>([])

  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/prompt")

      const data = await res.json();

      console.log(data);
      setPrompts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPrompts();
  },[])

  return (
    <section className = 'feed'>
      <form className = "realtive w-full flex-center">
        <input 
          type="text" 
          placeholder='search for tag or username'
          className = "search_input peer"
        />
      </form>
      <div className = "mt-16 prompt_layout">
        {
          prompts.map((p,i) => {
            return (
              <PromptCard
                key = {i}
                post = {p}
                handleEdit = {() => {}}
                handleDelete= {() => {}}
              />
            )
          })
        }
      </div>
    </section>
  )
}

export default Feed