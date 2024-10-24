import React, { useState, useEffect } from 'react'
import Logo from '../assets/IMG/Logo.png'
import person from '../assets/icons/person.svg'
import Eye from '../assets/icons/Eye.svg'
import closeEye from '../assets/icons/closeEye.svg'
import vector from '../assets/icons/Vector.svg'
import phone from '../assets/icons/phone.svg'
import liff from '@line/liff'
import Swal from 'sweetalert2'

function Register() {

    const initValues = {
        email: "",
        pws: "",
        HN: "",
        tel: "",
        name: "",
        surname: "",
    }

    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [type, setType] = useState("password");
    const [isSubmit, setIsSubmit] = useState(false);
    const [eyeIcon, setEyeIcon] = useState(closeEye)
    const liffID = '2004489610-01vWBvVK'

    const showPassword = () => {
        if (type === "password") {
            setType("text")
            setEyeIcon(Eye)
        } else {
            setType("password")
            setEyeIcon(closeEye)
        }
    }

    useEffect(() => {
        const liffInit = async () => {
            await liff.init({ liffId: liffID })
        }

        liffInit().then(() => {
            if (!liff.isLoggedIn()) {
                liff.login();
            }
        })
    }, [liffID, formErrors, formValues])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        if (!!formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: null })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const Error = validation()
        if (Object.keys(Error).length > 0) {
            setFormErrors(Error)
            setIsSubmit(false)
        } else {
            setIsSubmit(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "*/*");

            const raw = JSON.stringify({
                "email": formValues.email,
                "firstName": formValues.name,
                "hospitalNumber": formValues.HN,
                "lastName": formValues.surname,
                "password": formValues.pws,
                "phoneNumber": formValues.tel,
                "requestId": "",
                "lineToken": liff.getIDToken(),
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch("https://hpm-backend.onrender.com/v1/system/signUp", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result?.status?.code === '200') {
                        setIsSubmit(false)
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: result?.status?.details[0]?.value,
                            confirmButtonText: 'ตกลง'
                        }).then(() => {
                            liff.closeWindow();
                        })
                    }
                    if (result?.status?.code === '400') {
                        setIsSubmit(false)
                        Swal.fire({
                            title: 'เกิดข้อผิดพลาด',
                            text: result?.status?.details[0]?.value,
                            confirmButtonText: 'ตกลง'
                        })
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    const validation = () => {
        const { email, pws, HN, tel, name, surname } = formValues
        const error = {};
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email) {
            error.email = "กรุณากรอก ' อีเมล ' ของท่าน!";
        } else if (!regex.test(email)) {
            error.email = "ข้อมูลที่กรอกไม่ใช่ ' อีเมล '!"
        }
        if (!pws) {
            error.pws = "กรุณากรอก ' รหัสผ่าน ' ของท่าน!";
        } else if (pws.length < 9) {
            error.pws = "รหัสผ่านสั้นเกินไป!"
        }
        if (!HN) {
            error.HN = "กรุณากรอก ' หมายเลข ' ของท่าน!";
        }
        if (!tel) {
            error.tel = "กรุณากรอก ' เบอร์โทร ' ของท่าน!";
        } else if (tel.length < 10) {
            error.tel = "กรุณากรอก ' เบอร์โทร ' ให้ครบ!"
        }
        if (!name) {
            error.name = "กรุณากรอก ' ชื่อ ' หรือ ' นามสกุล ' ของท่าน!";
        } else if (!surname) {
            error.name = "กรุณากรอก ' ชื่อ ' หรือ ' นามสกุล ' ของท่าน!";
        }
        return error;
    }



    return (
        <div className="sm:contianer">
            <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-auto lg:h-screen min-h-screen'>
                <div className='w-4/5 md:w-[22.875rem] lg:w-[22.875rem] mx-auto'>
                    <div className='Logo'>
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
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

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500'>รหัสผ่าน</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type={type} name='pws' placeholder='ความยาว 9 ตัวขึ้นไป' className='input input-bordered w-full max-w-xs' value={formValues.pws} onChange={handleChange} />
                                    <img src={eyeIcon} onClick={showPassword} className="absolute mr-2 w-[1.6rem]" alt="password" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700'>{formErrors.pws}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
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

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
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
                            <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]' >
                                {isSubmit? <span className="loading loading-spinner loading-md"></span> : <span>สมัครสมาชิก</span>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register