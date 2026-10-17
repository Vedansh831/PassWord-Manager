import React from 'react'

const Footer = () => {
  return (
    <div className='font-bold text-center flex flex-col items-center justify-center bg-slate-800 text-white'>
        <div className='logo font-bold text-white text-2xl'>
            <span className="text-green-500">&lt;</span>
          <span className=" text-white">Pass</span>
          <span className=" text-green-500">OP/&gt;</span>
        </div>
        <div className='flex'>
      Created with the help of CWH lots of <img className='invert mx-2 rounded-full fill-red-800' width={40} src="/heart.png" alt="dggaa" /> 
        </div>
    </div>
  )
}

export default Footer
