import React, { useState, useEffect } from 'react'
import Logo from '../assets/IMG/Logo.png'
import person from '../assets/icons/person.svg'
import eye from '../assets/icons/Eye.svg'
import vector from '../assets/icons/Vector.svg'
import phone from '../assets/icons/phone.svg'

function Register() {

    const initValues = {
        email: "",
        password: "",
        HN: "",
        tel: "",
        name: "",
        surname: "",
    }

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
            error.email = "ข้อมูลที่กรอกไม่ใช่ ' อีเมล '!"
        }
        if (!validate.password) {
            error.password = "กรุณากรอก ' รหัสผ่าน ' ของท่าน!";
        }else if (validate.password.length < 4) {
            error.password = "รหัสผ่านสั้นเกินไป!"
        }
        if (!validate.HN) {
            error.HN = "กรุณากรอก ' หมายเลข ' ของท่าน!";
        }
        if (!validate.tel) {
            error.tel = "กรุณากรอก ' เบอร์โทร ' ของท่าน!";
        }else if (validate.tel.length < 10) {
            error.tel = "กรุณากรอก ' เบอร์โทร ' ให้ครบ!"
        }
        if (!validate.name) {
            error.name = "กรุณากรอก ' ชื่อ ' หรือ ' นามสกุล ' ของท่าน!";
        } else if (!validate.surname) {
            error.name = "กรุณากรอก ' ชื่อ ' หรือ ' นามสกุล ' ของท่าน!";
        }

        return error;
    }

    return (
        <div className="sm:contianer">
            <div className='w-[24.563rem] bg-[#F2F1EC] mx-auto min-h-[53.25rem]'>
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui massage success'>Register Success!</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}
                <div className='w-[22.875rem] mx-auto'>
                    <div className='Logo'>
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500'>อีเมล</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='email' placeholder='me@me.com' className='input input-bordered w-full max-w-xs' value={formValues.email} onChange={handleChange} />
                                    <img src={person} className="absolute mr-2 w-[1.3rem]" alt="email" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700'>{formErrors.email}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500'>รหัสผ่าน</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='password' placeholder='รหัสผ่าน' className='input input-bordered w-full max-w-xs' value={formValues.password} onChange={handleChange} />
                                    <img src={eye} className="absolute mr-2 w-[1.3rem]" alt="password" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700'>{formErrors.password}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500'>Hospital Number</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='HN' placeholder='Hospital Number' className='input input-bordered w-full max-w-xs' value={formValues.HN} onChange={handleChange} />
                                    <img src={vector} className="absolute mr-2 w-[1.3rem]" alt="Hospital Number" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700'>{formErrors.HN}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500'>เบอร์โทรศัพท์</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='tel' placeholder='0xx-xxx-xxxx' className='input input-bordered w-full max-w-xs' value={formValues.tel} onChange={handleChange} />
                                    <img src={phone} className="absolute mr-2 w-[1.3rem]" alt="email" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700'>{formErrors.tel}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.5rem] mx-auto flex justify-start mt-3'>
                            <div className='w-[8rem]'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500'>ชื่อ</span>
                                    </div>
                                    <input type="text" name='name' placeholder='ถมทราย' className='input input-bordered w-full max-w-xs' value={formValues.name} onChange={handleChange} />
                                </label>
                            </div>
                            <div className='w-[8rem] ml-4'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500'>สกุล</span>
                                    </div>
                                    <input type="text" name='surname' placeholder='เข็มหมุด' className='input input-bordered w-full max-w-xs' value={formValues.surname} onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className='w-[17rem] mx-auto'>
                            <p className='label-text text-red-700 text-center'>{formErrors.name}</p>
                        </div>

                        <div className='w-[13.563rem] mx-auto mt-[2.33rem]'>
                            <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]' >สมัครสมาชิก</button>
                            <div className="label place-content-center">
                                <a href="#" className='label-text text-gray-500 underline'>เข้าสู่ระบบ</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>        
        </div>

    )
}

export default Register