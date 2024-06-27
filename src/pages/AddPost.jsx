import React, { useState } from 'react'
import { Container, PostForm } from '../components'

function AddPost() {

  return (
    <div className='py-8 bg-gray-200'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost