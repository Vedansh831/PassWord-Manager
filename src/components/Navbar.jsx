import React from 'react'

const Navbar = () => {
  return (
  <nav className='bg-slate-800 flex justify-around items-center m-auto p-2 text-white'>
    <div className="logo font-bold text-3xl">
      <span className="text-green-800">&lt;</span>
      Pass
      <span className="text-green-800">OP/&gt;</span>
      </div>
    <ul className='flex gap-5'>
        <a href="/" className='hover:font-bold hover:translate-x-2'>Home</a>
        <a href="#" className='hover:font-bold hover:translate-x-2'>About</a>
        <a href="#" className='hover:font-bold hover:translate-x-2'>Contact</a>
        <a href="#" className='hover:font-bold hover:translate-x-2'>Help</a>
    </ul>
    <button className='text-white bg-slate-800 rounded-xl'>
      <img className='invert object-cover' src="/github.jpg" width={40} alt="" />
    </button>
  </nav>    
  )
}           
export default Navbar
