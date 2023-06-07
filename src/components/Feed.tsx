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

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Prompt[]>([]);

  const fetchPrompts = async () => {
    try {
      const res = await fetch("/api/prompt",{
        cache: 'no-cache',
      })

      const data = await res.json();
      setPrompts(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPrompts();
  },[])

  const searchPrompts = (val: string) : Prompt[] => {
    const regex = new RegExp(val,'i');

    return prompts.filter((p) => (
      regex.test(p.prompt) ||
      //@ts-ignore
      regex.test(p.creator.username) ||
      regex.test(p.tag)
    ))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)

    const res = searchPrompts(e.target.value)
    setSearchedResults(res);
  };

  const handleTagClick = (val: string) => {
    setSearchText(val);

    const res = searchPrompts(val);
    setSearchedResults(res);
  }

  return (
    <section className = 'feed'>
      <form className = "realtive w-full flex-center">
        <input 
          type="text" 
          placeholder='search for tag or username'
          className = "search_input peer"
          onChange = {handleSearchChange}
          value = {searchText}
        />
      </form>
      
      {searchText.length === 0 ? (
        <div className = "mt-16 prompt_layout">
        {
          prompts.map((p,i) => {
            return (
              <PromptCard
                key = {i}
                post = {p}
                handleEdit = {() => {}}
                handleDelete= {() => {}}
                handleTagClick={ () => {handleTagClick(p.tag)}}
              />
            )
          })
        }
      </div>
      ) : (
        <div className = "mt-16 prompt_layout">
        {
          searchedResults.map((p,i) => {
            return (
              <PromptCard
                key = {i}
                post = {p}
                handleEdit = {() => {}}
                handleDelete= {() => {}}
                handleTagClick={ () => {handleTagClick(p.tag)}}
              />
            )
          })
        }
      </div>
      )}
    </section>
  )
}

export default Feed