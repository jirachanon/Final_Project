import React, { useState, useEffect } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
function SendBP() {
    const initValues = {
        sys: "",
        dia: "",
        pul: "",
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
                {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui massage success'>Inforamtion Sent!</div>) : (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>)}
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

                    <div className='w-[13.625rem] mx-auto mt-[5rem] mb-[5rem]'>
                        <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>ส่งผลตรวจ</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SendBP