import React, { useState, useEffect } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

function SendBP() {
    const initValues = {
        sys: "",
        dia: "",
        pul: "",
    }
    var id = Math.floor(Math.random() * 10)

    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validation(formValues));
        setisSubmit(true);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Cookies.get('user_token'));
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "dia": formValues.dia,
            "pul": formValues.pul,
            "sys": formValues.sys,
            "requestId": id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://hpm-backend.onrender.com/v1/bp/createBloodPressure", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.status.code === "200") {
                    Swal.fire({
                        title: 'สำเร็จ',
                        text: result?.status?.details[0]?.value,
                        confirmButtonText: 'ตกลง'
                    }).then(() => {
                        liff.closeWindow();
                    })
                } else if (result.status.code === "400") {
                    Swal.fire({
                        title: 'เกิดข้อผิดพลาด',
                        text: result.status?.details[0]?.value,
                        confirmButtonText: 'ตกลง'
                    }).then(() => {
                        liff.closeWindow();
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        liff
            .init({
                liffId: '2004489610-MOpXKpry'
            }).then(() => {
                if (!Cookies.get("user_token")) {
                    Swal.fire({
                        title: 'กรุณาเข้าสู่ระบบอีกครั้ง',
                        confirmButtonText: 'ตกลง'
                    }).then(() => {
                        liff.logout();
                        navigate('/Login/sendbp')
                    })
                }
            });
    },)

    const validation = (validate) => {
        const error = {};
        if (!validate.sys) {
            error.sys = "กรุณากรอกข้อมูล!";
        }
        if (!validate.dia) {
            error.dia = "กรุณากรอกข้อมูล!";
        }
        if (!validate.pul) {
            error.pul = "กรุณากรอกข้อมูล!";
        }
        return error;
    }
    return (
        <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-auto lg:h-screen min-h-screen'>

            <div className='w-[7.6rem] mx-auto'>
                <div className='Logo'>
                    <img src={circleLogo} alt="Logo" />
                </div>
            </div>

            <div className='text-[2.2rem] text-[#1B3B83] mt-5 text-center'>ส่งผลตรวจ</div>
            <form onSubmit={handleSubmit}>
                <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ค่าความดันขณะหัวใจบีบตัว (SYS)</span>
                        </div>
                        <input type="text" placeholder="120" name='sys' className="input input-bordered w-full max-w-xs" value={formValues.sys} onChange={handleChange} />
                        <div className='label'>
                            <span className='label-text text-red-700'>{formErrors.sys}</span>
                        </div>
                    </label>
                </div>

                <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ค่าความดันขณะหัวใจคลายตัว (DIA)</span>
                        </div>
                        <input type="text" placeholder="80" name='dia' className="input input-bordered w-full max-w-xs" value={formValues.dia} onChange={handleChange} />
                        <div className='label'>
                            <span className='label-text text-red-700'>{formErrors.dia}</span>
                        </div>
                    </label>
                </div>

                <div className='w-[16.125rem] mx-auto mt-[2rem]'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-gray-500">ชีพจร (PUL)</span>
                        </div>
                        <input type="text" placeholder="75" name='pul' className="input input-bordered w-full max-w-xs" value={formValues.pul} onChange={handleChange} />
                        <div className='label'>
                            <span className='label-text text-red-700'>{formErrors.pul}</span>
                        </div>
                    </label>
                </div>

                <div className='w-[13.625rem] mx-auto mt-[5rem]'>
                    <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>ส่งผลตรวจ</button>
                </div>
            </form>

        </div>
    )
}

export default SendBP