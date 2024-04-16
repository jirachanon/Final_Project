import React from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
import { useParams, useNavigate } from 'react-router-dom'

function Nav() {
    const navigate = useNavigate();
    const param = useParams();

    const listNav = () => {
        navigate(`/SendBP/${param.param1}`)
    }
    return (
        <div className="navbar bg-[#F2F1EC] w-auto md:w-full lg:w-full">
            <div className="flex-1">
                <img src={circleLogo} alt="Logo" className='w-14' />
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between" onClick={listNav}>
                                ส่งผลวัดคสามดันโลหิต
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Nav