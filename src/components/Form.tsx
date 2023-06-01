import React from 'react'

interface Props {
    type: string,
    post: any,
    setPost: any,
    submitting: any,
    handleSubmit: any
}

const Form:React.FC<Props> = (props) => {
  return (
    <section className = "w-full max-w-full flex-start flex-col">
      <h1 className = "head_text text-left">
        <span className = "blue_gradient">{props.type} Post</span>
      </h1>
      <p className = "">

      </p>
    </section>
  )
}

export default Form