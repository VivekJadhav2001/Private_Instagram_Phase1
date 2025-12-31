import React from 'react'

function Footer() {
    const options = ["Meta","About","Blog","Jobs","Help","API","Privacy","Terms","Locations","Instagram Lite","Meta AI","Meta AI articles","Threads","Contact uploading and non-users","Meta Verified"]

  return (
    <footer className="w-full h-[18vh] absolute bottom-0 flex justify-center items-center">
        <div className="">
            {options.map((item,index)=>{
                return <a href="" className='text-gray-400 m-2.5' key={index+1}>{item}</a>
            })}
        </div>
    </footer>
  )
}

export default Footer