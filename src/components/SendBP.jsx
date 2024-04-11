import React, { useState, useEffect } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
import { useSelector } from 'react-redux'

function SendBP() {
    const initValues = {
        sys: "",
        dia: "",
        pul: "",
    }
    var id = Math.floor(Math.random() * 10)

    const { user } = useSelector((state) => state.slices);
    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setisSubmit] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validation(formValues));
        setisSubmit(true);

        var myHeaders = new Headers();
        const authToken = user?.token;
        myHeaders.append("Authorization", "Bearer " + authToken);
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

        await fetch("https://hpm-backend.onrender.com/v1/bp/createBloodPressure", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])

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
        <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-lvh'>

            {/* <div className='navbar'>
                    <div className='w-[7.6rem] mx-auto mt-3'>
                        <div className='Logo'>
                            <img src={circleLogo} alt="Logo" />
                        </div>
                    </div>
                </div> */}

            <div className='w-[7.6rem] mx-auto'>
                <div className='Logo'>
                    <img src={circleLogo} alt="Logo" />
                </div>
            </div>

            <div className='text-[2.2rem] text-[#1B3B83] mt-5 text-center'>ส่งผลตรวจ</div>
            <form onSubmit={handleSubmit}>
                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
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

                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
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

                <div className='w-[16.125rem] mx-auto mt-[4rem]'>
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