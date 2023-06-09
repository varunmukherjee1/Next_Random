'use client'

import React,{useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

type Prompt =  {
  creator: any,
  prompt: string,
  tag: string,
  _id: string,
}
interface Props {
  post: Prompt,
  handleEdit: () => void,
  handleDelete: () => void,
  handleTagClick: () => void,
}

const PromptCard:React.FC<Props> = (props) => {

  const [copied, setCopied] = useState("");
  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(props.post.prompt)
    navigator.clipboard.writeText(props.post.prompt);
    setTimeout(() => setCopied("false"),3000);
  }

  const handleProfileClick = () => {

    console.log(props.post.creator._id);
    //@ts-ignore
    console.log(session?.user.id);
    //@ts-ignore
    if(props.post.creator._id === session?.user.id){
      router.push("/profile")
    }
    else{

      router.push(`/profile/${props.post.creator._id}?name=${props.post.creator.username}`)
    }

  }

  return (
    <div className = 'prompt_card'>
      <div className = 'flex justify-between items-start gap-5'>
        <div 
          className = 'flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick = {handleProfileClick}
        >
          <Image
            src = {props.post.creator.image}
            alt = "user_img"
            width = {40}
            height = {40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {props.post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {props.post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === props.post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === props.post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{props.post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick = {props.handleTagClick}
      >
        #{props.post.tag}
      </p>

        {/* @ts-ignore */}
      {session?.user.id === props.post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={props.handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={props.handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard