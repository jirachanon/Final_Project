import React from 'react'
import Logo from '../assets/IMG/Logo.png'
import Line from '../assets/IMG/Line.png'
import lock from '../assets/icons/lock.svg'
import person from '../assets/icons/person.svg'

function Login() {
    return (
        <div className='w-[24.563rem] bg-[#F2F1EC] mx-auto min-h-[53.25rem]'>
            <div className='w-[22.875rem] mx-auto'>
                <div className='Logo'>
                    <img src={Logo} alt="Logo" />
                </div>
            </div>

            <div className='w-[16.125rem] mx-auto mt-[5.35rem]'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">อีเมล</span>
                    </div>
                    <div className='flex justify-end items-center relative'>
                        <input type="text" placeholder="me@me.com" className="input input-bordered w-full max-w-xs" />
                        <img src={person} className="absolute mr-2 w-[1.3rem]" alt="Lock Icon" />
                    </div>
                </label>
            </div>

            <div className='w-[16.125rem] mx-auto mt-[2.995rem]'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">รหัสผ่าน</span>
                    </div>
                    <div className='flex justify-end items-center relative'>
                        <input type="text" placeholder="รหัสผ่าน" className="input input-bordered w-full max-w-xs" />
                        <img src={lock} className="absolute mr-2 w-[1.2rem]" alt="Lock Icon" />
                    </div>

                    <div className="label place-content-center">
                        <a href="#" className='label-text '>ลืมรหัสผ่าน?</a>
                    </div>
                </label>
            </div>

            <div className='w-[13.563rem] mx-auto mt-[6.58rem]'>
                <div className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white'>เข้าสู่ระบบ</div>
                <div className="label place-content-center">
                    <a href="#" className='label-text'>สมัครสมาชิก</a>
                </div>
            </div>

            <div className='w-[13.563rem] mx-auto mt-[2.5rem]'>
                <div className='flex justify-start items-center relative'>
                    <div className='btn btn-block bg-[#06C755] text-white pl-[3rem]'>เข้าสู่ระบบด้วย Line</div>
                    <img src={Line} alt="Line" className='absolute w-[2.5rem] ml-3' />
                </div>
            </div>
        </div>
    )
}

export default Login