import React from 'react'

import PromptCard from './PromptCard'

type Prompt =  {
    creator: string,
    prompt: string,
    tag: string,
    _id: string,
  }

interface Props {
    name: string,
    desc: string,
    data: Prompt[],
    handleEdit: (post: Prompt) => void,
    handleDelete: (post: Prompt) => void
}

const Profile: React.FC<Props> = (props) => {
  return (
    <section className = "w-full">
        <h1 className = 'head_text text-left'>
            <span className = "blue_gradient">{props.name} Profile,</span>
        </h1>
        <p className = 'desc text-left'>{props.desc}</p>

        <div className = 'mt-10 prompt_layout'>
            {
                props.data.map((post,i) => {
                    return (
                        <PromptCard
                            key = {i}
                            post = {post}
                            handleEdit = {() => {props.handleEdit(post)}}
                            handleDelete = {() => {}}
                        />
                    )
                })
            }
        </div>
    </section>
  )
}

export default Profile