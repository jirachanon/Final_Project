import React from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
function SendBP() {
    return (
        <div className='sm:container'>
            <div className='w-[24.563rem] bg-[#F2F1EC] mx-auto min-h-[53.25rem]'>

                <div className='navbar'>
                    <div className='w-[7.6rem] mx-auto mt-3'>
                        <div className='Logo'>
                            <img src={circleLogo} alt="Logo" />
                        </div>
                    </div>
                </div>

                <div className='text-[2.2rem] text-[#1B3B83] mt-5 ml-[110px] mr-[110px]'>ส่งผลตรวจ</div>

                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ค่าความดันขณะหัวใจบีบตัว (SYS)</span>
                        </div>
                        <input type="text" placeholder="120" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ค่าความดันขณะหัวใจคลายตัว (DIA)</span>
                        </div>
                        <input type="text" placeholder="80" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ชีพจร (PUL)</span>
                        </div>
                        <input type="text" placeholder="75" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <div className='w-[13.625rem] mx-auto mt-[5rem]'>
                    <div className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>เข้าสู่ระบบ</div>
                </div>
            </div>
        </div>
    )
}

export default SendBP