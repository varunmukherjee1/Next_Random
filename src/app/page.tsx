import React from 'react'
import Feed from '@/components/Feed'

const Home:React.FC = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className = "head_text text-center">
        Discover & Share
        <br className = "max-md:hidden"/>
        <span className = "orange_gradient text-center"> Random Thoughts & Ideas</span>
      </h1>
      <p className = "desc text-center">
        Next-Random is an open-source views sharing tool for modern world to discover, create and share creative ideas.
      </p>

      <Feed/>
    </section>
  )
}

export default Home