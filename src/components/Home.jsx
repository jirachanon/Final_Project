import React from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
function Home() {
  return (
    <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-lvh'>
      <div className='navbar'>
        <div className='flex-1'>
          <img src={circleLogo} alt="logo" className='w-[6rem]' />
        </div>
        <div className="flex-none gap-1">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-7 h-7 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home