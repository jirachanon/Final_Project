import React, { useState, useEffect } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import Cookies from 'js-cookie'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import Modal from 'react-modal'
import cross from '../assets/icons/cross.svg'

Modal.setAppElement('#root');

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
    const [imgSrc, setImgSrc] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [crop, setCrop] = useState()
    const liffID = '2004489610-MOpXKpry'

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormErrors(validation(formValues));

        if (isSubmit) {
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
    }

    useEffect(() => {
        const liffInit = async () => {
            await liff.init({ liffId: liffID })
        }
        liffInit().then(() => {
            if (!liff.isLoggedIn()) {
                liff.login();
            }

            if (!Cookies.get("user_token")) {
                Swal.fire({
                    title: 'กรุณาเข้าสู่ระบบอีกครั้ง',
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    window.location.href = "https://liff.line.me/2004489610-EbYDJY9K"
                })
            }
        });

        if (Object.keys(formErrors).length === 0 && Object.keys(formValues).length != 2) {
            setisSubmit(true)
        }
    }, [Cookies.get('user_token'), formErrors])

    const onSelectedFile = (e) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imgUrl = reader.result?.toString() || " ";
            setImgSrc(imgUrl);
            setShowModal(true)
        })
        reader.readAsDataURL(file)
    }

    function closeModal() {
        setShowModal(false)
    }

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 50
                },
                1,
                width,
                height
            ),
            width,
            height
        );
        setCrop(crop);
    }

    const sbpPhoto = () => {
        Swal.fire({
            icon: 'success',
            title: 'Yeah!!!!',
            confirmButtonText: 'ตกลง'
        }).then(() => {
            liff.closeWindow()
        })
    }

    const validation = (validate) => {
        const error = {};
        if (!validate.sys) {
            error.sys = "กรุณากรอกข้อมูล!";
            setisSubmit(false)
        }
        if (!validate.dia) {
            error.dia = "กรุณากรอกข้อมูล!";
            setisSubmit(false)
        }
        if (!validate.pul) {
            error.pul = "กรุณากรอกข้อมูล!";
            setisSubmit(false)
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

                <div className='w-[13.625rem] mx-auto mt-[3rem]'>
                    <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>ส่งผลตรวจ</button>
                </div>

            </form>

            <div className='w-[13.625rem] mx-auto mt-[4rem]'>
                <label htmlFor='img_upload' className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>ถ่ายรูปเครื่องวัด</label>
                <input
                    type="file"
                    accept="image/*,video/*"
                    capture
                    hidden
                    id='img_upload'
                    onChange={onSelectedFile}
                />
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        left: '0',
                        bottom: '0'
                    }
                }}
            >
                <div className='flex flex-col justify-center'>
                    <div className='flex justify-end'><img src={cross} className='btn btn-ghost btn-xs' onClick={closeModal} /></div>
                    <div className='mt-2 text-[18px] text-error'>***คำแนะนำ : กรุณาตัดรูปภาพให้เห็นเฉพาะหน้าจอเครื่องวัดความดัน</div>
                    <div className='w-auto mt-2'>
                        <ReactCrop
                            crop={crop}
                            keepSelection
                            onChange={
                                (pixelCrop, percentCrop) => setCrop(percentCrop)
                            }
                            aspect={1}
                            minWidth={150}
                        >
                            <img
                                src={imgSrc}
                                alt="404_NOT_FOUND"
                                onLoad={onImageLoad}
                                className='mx-auto'
                            />
                        </ReactCrop>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <button className='btn bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px] mr-1' onClick={sbpPhoto}>ตกลง</button>
                        <label htmlFor='img_upload_retry' className='btn bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px] ml-1'>ถ่ายอีกครั้ง</label>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            capture
                            hidden
                            id='img_upload_retry'
                            onChange={onSelectedFile}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SendBP