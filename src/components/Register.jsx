import React, { useState, useEffect } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
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
        gender: "",
        age: ""
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
                "age": formValues.age,
                "gender": formValues.gender
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
        const { email, pws, HN, tel, name, surname, gender, age } = formValues
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
        if (!gender) {
            error.gender = "กรุณาเลือก ' เพศ ' ของท่าน!"
        }
        if (!age) {
            error.age = "กรุณากรอก ' อายุ ' ของท่าน!"
        } else if (age < 1 || age > 150 ) {
            error.age = "กรุณาตรวจสอบความถูกต้อง"
        }
        return error;
    }



    return (
        <div className="sm:contianer">
            <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-auto lg:h-screen min-h-screen'>
                <div className='w-[80px] md:w-[10rem] lg:w-[22.875rem] mx-auto pt-5'>
                    <div className='Logo'>
                        <img src={circleLogo} alt="Logo"/>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500 text-xl'>อีเมล</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='email' placeholder='me@me.com' className='input input-bordered w-full max-w-xs' value={formValues.email} onChange={handleChange} />
                                    <img src={person} className="absolute mr-2 w-[1.3rem]" alt="email" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700 text-lg'>{formErrors.email}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500 text-xl'>รหัสผ่าน</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type={type} name='pws' placeholder='ความยาว 9 ตัวขึ้นไป' className='input input-bordered w-full max-w-xs' value={formValues.pws} onChange={handleChange} />
                                    <img src={eyeIcon} onClick={showPassword} className="absolute mr-2 w-[1.6rem]" alt="password" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700 text-lg'>{formErrors.pws}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500 text-xl'>หมายเลขผู้ป่วย</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='HN' placeholder='หมายเลขผู้ป่วย' className='input input-bordered w-full max-w-xs' value={formValues.HN} onChange={handleChange} />
                                    <img src={vector} className="absolute mr-2 w-[1.3rem]" alt="หมายเลขผู้ป่วย" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700 text-lg'>{formErrors.HN}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.125rem] mx-auto mt-[1rem]'>
                            <label htmlFor="" className='form-control w-full max-w-xs'>
                                <div className='label'>
                                    <span className='label-text text-gray-500 text-xl'>เบอร์โทรศัพท์</span>
                                </div>
                                <div className='flex justify-end items-center relative'>
                                    <input type="text" name='tel' placeholder='0xx-xxx-xxxx' className='input input-bordered w-full max-w-xs' value={formValues.tel} onChange={handleChange} />
                                    <img src={phone} className="absolute mr-2 w-[1.3rem]" alt="email" />
                                </div>
                                <div className='label'>
                                    <span className='label-text text-red-700 text-lg'>{formErrors.tel}</span>
                                </div>
                            </label>
                        </div>

                        <div className='w-[16.5rem] mx-auto flex justify-start mt-3'>
                            <div className='w-[8rem]'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500 text-xl'>ชื่อ</span>
                                    </div>
                                    <input type="text" name='name' placeholder='ถมทราย' className='input input-bordered w-full max-w-xs' value={formValues.name} onChange={handleChange} />
                                </label>
                            </div>
                            <div className='w-[8rem] ml-4'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500 text-xl'>สกุล</span>
                                    </div>
                                    <input type="text" name='surname' placeholder='เข็มหมุด' className='input input-bordered w-full max-w-xs' value={formValues.surname} onChange={handleChange} />
                                </label>
                            </div>
                        </div>
                        <div className='w-[17rem] mx-auto'>
                            <p className='label-text text-red-700 text-center text-lg'>{formErrors.name}</p>
                        </div>

                        <div className='w-[16.5rem] mx-auto flex justify-start mt-3'>
                            <div className='w-[8rem]'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500 text-xl'>เพศ</span>
                                    </div>
                                    <select className='select' name='gender' value={formValues.gender} onChange={handleChange}>
                                        <option>เลือก</option>
                                        <option value="male" className='text-lg'>ชาย</option>
                                        <option value="female" className='text-lg'>หญิง</option>
                                    </select>
                                    <div className='w-[8rem] mx-auto'>
                                        <p className='label-text text-red-700 text-center text-lg mt-3'>{formErrors.gender}</p>
                                    </div>
                                </label>
                            </div>
                            <div className='w-[8rem] ml-4'>
                                <label htmlFor="" className='form-control w-full max-w-xs'>
                                    <div className='label'>
                                        <span className='label-text text-gray-500 text-xl'>อายุ</span>
                                    </div>
                                    <input type="number" placeholder='อายุ' name='age' className='input input-bordered w-full max-w-xs'
                                        value={formValues.age} onChange={handleChange}
                                    />
                                    <div className='w-[8rem] mx-auto mt-3'>
                                        <p className='label-text text-red-700 text-center text-lg'>{formErrors.age}</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className='w-[13.563rem] mx-auto mt-[2.33rem] pb-[2rem]'>
                            <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]' >
                                {isSubmit ? <span className="loading loading-spinner loading-md"></span> : <span>สมัครสมาชิก</span>}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register