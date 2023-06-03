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
    data: string,
    handleEdit: string,
    handleDelete: string
}

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile