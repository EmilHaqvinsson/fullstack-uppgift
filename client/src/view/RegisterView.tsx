import React, { useState } from 'react'

type Props = { 
  saveUser: (e: React.FormEvent, formData: | any) => void 
}

const RegisterView: React.FC<Props> = ({ saveUser }) => {
  const [formData, setFormData] = useState< | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveUser(e, formData)}>
      <div>
        <div>
          <label htmlFor='userName'>Name</label>
          <input onChange={handleForm} type='text' id='name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Todo</button>
    </form>
  )
}

export default RegisterView
