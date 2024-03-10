import React, { useState, useEffect } from 'react'
import Logo from '../assets/IMG/Logo.png'
import Line from '../assets/IMG/Line.png'
import lock from '../assets/icons/lock.svg'
import person from '../assets/icons/person.svg'

function Login() {

    const initValues = { email: '', password: "", }

    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormErrors(validation(formValues));
        setisSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])

    const validation = (validate) => {
        const error = {};
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!validate.email) {
            error.email = "กรุณากรอก ' อีเมล ' ของท่าน!";
        } else if (!regex.test(validate.email)) {
            error.email = "ข้อมูลที่กรอกไม่ใช่ ' อีเมล '!";
        }
        if (!validate.password) {
            error.password = "กรุณากรอก ' รหัสผ่าน ' ของท่าน!";
        } else if (validate.password.length < 4) {
            error.password = "รหัสผ่านสั้นเกินไป!";
        }
        return error;
    }


    return (
        <div className='w-[24.563rem] bg-[#F2F1EC] mx-auto min-h-[53.25rem]'>
            <div className='w-[22.875rem] mx-auto'>
                <div className='Logo'>
                    <img src={Logo} alt="Logo" />
                </div>
            </div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui massage success'>Logged in!</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}
            <form onSubmit={handleSubmit}>
                <div className='w-[16.125rem] mx-auto mt-[5.35rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">อีเมล</span>
                        </div>
                        <div className='flex justify-end items-center relative'>
                            <input type="text" placeholder="me@me.com" name='email' className="input input-bordered w-full max-w-xs" value={formValues.emil} onChange={handleChange} />
                            <img src={person} className="absolute mr-2 w-[1.3rem]" alt="Lock Icon" />
                        </div>
                        <div className='label'>
                            <span className='label-text text-red-700'>{formErrors.email}</span>
                        </div>
                    </label>
                </div>

                <div className='w-[16.125rem] mx-auto mt-[2.995rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">รหัสผ่าน</span>
                        </div>
                        <div className='flex justify-end items-center relative'>
                            <input type="text" placeholder="รหัสผ่าน" name='password' className="input input-bordered w-full max-w-xs" value={formValues.password} onChange={handleChange} />
                            <img src={lock} className="absolute mr-2 w-[1.2rem]" alt="Lock Icon" />
                        </div>
                        <div className='label'>
                            <span className='label-text text-red-700'>{formErrors.password}</span>
                        </div>

                        <div className="label place-content-center">
                            <a href="#" className='label-text text-gray-500 font-normal underline'>ลืมรหัสผ่าน?</a>
                        </div>
                    </label>
                </div>

                <div className='w-[13.563rem] mx-auto mt-[6.58rem]'>
                    <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>เข้าสู่ระบบ</button>
                    <div className="label place-content-center">
                        <a href="#" className='label-text text-gray-500 underline'>สมัครสมาชิก</a>
                    </div>
                </div>
            </form>

            <div className='w-[13.563rem] mx-auto mt-[2.5rem]'>
                <div className='flex justify-start items-center relative'>
                    <button className='btn btn-block bg-[#06C755] text-white pl-[3rem] font-normal text-[18px] '>เข้าสู่ระบบด้วย Line</button>
                    <img src={Line} alt="Line" className='absolute w-[2.5rem] ml-1' />
                </div>
            </div>
        </div>
    )
}

export default Login