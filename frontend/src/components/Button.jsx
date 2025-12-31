import React from 'react'

function Button({text,type}) {
  return (
    <button type={type} className='w-full h-9 cursor-pointer bg-[#3441AF] text-white rounded-lg text-center mt-4 mb-4'>
        {text}
    </button>
  )
}

export default Button