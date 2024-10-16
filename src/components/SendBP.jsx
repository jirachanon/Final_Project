import React, { useState, useEffect, useRef } from 'react'
import circleLogo from '../assets/IMG/circleLogo.png'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import liff from '@line/liff'
import Cookies from 'js-cookie'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import Modal from 'react-modal'
import cross from '../assets/icons/cross.svg'
import setCanvasPreview from './setCanvasPreview'
import imageCompression from 'browser-image-compression';
import ex1 from '../assets/IMG/ex1.jpg'

Modal.setAppElement('#root');

function SendBP() {
    const initValues = {
        sys: "",
        dia: "",
        pul: "",
    }
    var id = Math.floor(Math.random() * 10)

    const imgRef = useRef(null)
    const canvasPreviewRef = useRef(null)

    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [imgSrc, setImgSrc] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [crop, setCrop] = useState()
    const liffID = '2004489610-MOpXKpry'
    const MIN_DIMENSION = 150;
    const ASPECT_RATIO = 1;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        if (!!formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: null })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const Error = validation()
        if (Object.keys(Error).length > 0) {
            setFormErrors(Error)
            setIsSubmit(false)
        } else {
            setIsSubmit(true)
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
                        setIsSubmit(false)
                        Swal.fire({
                            title: 'สำเร็จ',
                            text: result?.status?.details[0]?.value,
                            confirmButtonText: 'ตกลง'
                        }).then(() => {
                            liff.closeWindow();
                        })
                    } else if (result.status.code === "400") {
                        setIsSubmit(false)
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
                    title: 'กรุณาเข้าสู่ระบบ',
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    window.location.href = "https://liff.line.me/2004489610-EbYDJY9K"
                })
            }
        });
    }, [Cookies.get('user_token'), formErrors, formValues,])

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
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: cropWidthInPercent
                },
                ASPECT_RATIO,
                width,
                height
            ),
            width,
            height
        );
        setCrop(crop);
    }

    const sbpPhoto = async (file) => {
        setIsSubmit(true)
        const compressOptions = {
            maxSizeMB: 1,
            maxWidthOrHeight: 512,
            useWebWorker: true,
        }

        file = await imageCompression(file, compressOptions);

        const fileURL = await imageCompression.getDataUrlFromFile(file)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + Cookies.get('user_token'));
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "*/*");

        const raw = JSON.stringify({
            requestId: fileURL.toString(),
          });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://hpm-backend.onrender.com/v1/bp/upload", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.status?.code === "200") {
                setIsSubmit(false)
                Swal.fire({
                    icon: "success",
                    title: result.status?.details[0]?.value,
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    liff.closeWindow();
                })
            }
            if (result.status?.code === "400") {
                setIsSubmit(false)
                Swal.fire({
                    title: 'เกิดข้อผิดพลาด',
                    text: result.status?.details[0]?.value,
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    liff.closeWindow();
                })
            }
        })
        .catch((error) => console.error(error));
    }

    const validation = () => {
        const { sys, dia, pul } = formValues
        const error = {};
        if (!sys || sys === " ") {
            error.sys = "กรุณากรอกข้อมูล!";
        }
        if (!dia || dia === " ") {
            error.dia = "กรุณากรอกข้อมูล!";
        }
        if (!pul || pul === " ") {
            error.pul = "กรุณากรอกข้อมูล!";
        }
        return error;
    }

    function base64ToFile(base64String, fileName) {
        // Split the base64 string to get the mime type and the actual base64 data
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]); // Decode the base64 string
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
      
        // Convert base64 to binary data
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        // Create a Blob object with the binary data
        const file = new Blob([u8arr], { type: mime });
      
        // Optionally, convert Blob to a File object
        return new File([file], fileName, { type: mime });
    }

    return (
        <div className='w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-auto lg:h-auto min-h-screen pb-4'>

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
                    <button className='btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]'>
                        {isSubmit ? <span className="loading loading-spinner loading-md"></span> : <span>ส่งผลตรวจ</span>}
                    </button>
                </div>

            </form>

            <div className="w-[13.625rem] mx-auto mt-[2rem] divider">หรือ</div>

            <div className="w-[14rem] mx-auto mt-1">
                <span
                    className='btn btn-ghost font-normal underline text-red-700'
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                >
                    คำแนะนำการส่งผลวัดด้วยรูปถ่าย
                </span>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">รูปถ่ายต้องเห็นตัวเลข ค่าบน ค่าล่าง และ ชีพจร อย่างชัดเจน และ ไม่ควรมีภาพสะท้อนหรือแสงสะท้อน ในรูปถ่ายจอเครื่องวัดความดัน ดังตัวอย่างภาพที่แสดง</h3>
                        <div>
                            <img src={ex1} alt="" />
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn bg-red-600 border-0 text-white">ปิด</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <div className='w-[13.625rem] mx-auto mt-[1rem]'>
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
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                alt="404_NOT_FOUND"
                                onLoad={onImageLoad}
                                className='mx-auto'
                            />
                        </ReactCrop>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <button 
                            className='btn bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px] mr-1' 
                            onClick={() => {
                                setCanvasPreview(
                                    imgRef.current,
                                    canvasPreviewRef.current,
                                    convertToPixelCrop(
                                        crop,
                                        imgRef.current.width,
                                        imgRef.current.height
                                    )
                                )
                                sbpPhoto(
                                    base64ToFile(
                                        canvasPreviewRef.current.toDataURL(), 
                                        'bp.png'
                                    )
                                )
                            }}
                        >
                            {isSubmit ? <span className="loading loading-spinner loading-md"></span> : <span>ตกลง</span>}
                        </button>
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
                {crop && (
                    <canvas 
                        ref={canvasPreviewRef}
                        style={{
                            display: 'none',
                            objectFit: 'contain',
                            width: 150,
                            height: 150,
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}

export default SendBP