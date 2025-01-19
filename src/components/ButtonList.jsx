import React from 'react'
import Button from './Button'

const list = ["All", "Live", "Gaming"]

const ButtonList = () => {
  return (
    <div className='flex'>
      <Button name='All'/>
      <Button name='Gaming'/>
      <Button name='Songs'/>
      <Button name='Cricket'/>
      <Button name='Soccer'/>
      <Button name='Live' />
      <Button name='Cooking' />
      <Button name='javascript' />




    </div>
  )
}

export default ButtonList
