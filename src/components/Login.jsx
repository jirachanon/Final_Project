import React, { useState, useEffect } from "react";
import Logo from "../assets/IMG/Logo.png";
import Line from "../assets/IMG/Line.png";
import person from "../assets/icons/person.svg";
import Eye from "../assets/icons/Eye.svg";
import closeEye from "../assets/icons/closeEye.svg";
import liff from "@line/liff";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "./slices";
import Cookies from "js-cookie";

function Login() {
  const initValues = { email: "", password: "" };
  var id = Math.floor(Math.random() * 10);

  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [lineIsSubmit, setLineIsSubmit] = useState(false);
  const [type, setType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(closeEye);
  const dispatch = useDispatch();
  const liffID = '2004489610-aP6ng65X'

  const showPassword = () => {
    if (type === "password") {
      setType("text");
      setEyeIcon(Eye);
    } else {
      setType("password");
      setEyeIcon(closeEye);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    if (!!formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null })
    }
  };

  useEffect(() => {
    const liffInit = async () => {
      await liff
        .init({
          liffId: liffID,
        })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login()
          }
        });
    }

    liffInit();

  }, [liffID, formErrors, formValues]);

  const handleSubmit = async (event) => {
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
        type: "email",
        requestId: id,
        email: formValues.email,
        password: formValues.password,
        lineToken: liff.getIDToken(),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://hpm-backend.onrender.com/v1/system/signIn", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.token) {
            setIsSubmit(false)
            Swal.fire({
              title: "เข้าสู่ระบบสำเร็จ",
              text: "สวัสดีคุณ " + result?.name,
              confirmButtonText: "ตกลง",
            }).then(() => {
              dispatch(setUser(result || {}));
              Cookies.set('user_token', result?.token, { expires: 365 })
              Cookies.set("user_name", result?.name, {expires: 365})
              window.location.href = "https://liff.line.me/2004489610-dq14p1vw"
            });
          }
          if (result?.status?.code === "400") {
            setIsSubmit(false)
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: result?.status?.details[0]?.value,
              confirmButtonText: "ตกลง",
            })
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const lineHandleSubmit = async (event) => {
    event.preventDefault();
    setLineIsSubmit(true)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");

    const raw = JSON.stringify({
      type: "line",
      requestId: id,
      lineToken: liff.getIDToken(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://hpm-backend.onrender.com/v1/system/signIn",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.token) {
          setLineIsSubmit(false)
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ",
            text: "สวัสดีคุณ " + result?.name,
            confirmButtonText: "ตกลง",
          }).then(() => {
            dispatch(setUser(result || {}));
            Cookies.set('user_token', result?.token, { expires: 365 })
            Cookies.set("user_name", result?.name, { expires: 365 })
            window.location.href = "https://liff.line.me/2004489610-dq14p1vw"
          });
        } else if (result?.status?.code === "400") {
          setLineIsSubmit(false)
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: result?.status?.details[0]?.value,
            confirmButtonText: "ตกลง",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const validation = () => {
    const { email, password } = formValues
    const error = {};
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email || email === "") {
      error.email = "กรุณากรอก ' อีเมล ' ของท่าน!";
    } else if (!regex.test(email)) {
      error.email = "ข้อมูลที่กรอกไม่ใช่ ' อีเมล '!";
    }
    if (!password || password === "") {
      error.password = "กรุณากรอก ' รหัสผ่าน ' ของท่าน!";
    } else if (password.length < 9) {
      error.password = "รหัสผ่านสั้นเกินไป!";
    }

    return error;
  };

  return (
    <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto min-h-screen lg:h-screen">
      <div className="w-10/12 md:w-[22.875rem] lg:w-[22.875rem] mx-auto pt-4">
        <div className="Logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-[16.125rem] mx-auto mt-[4rem]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-500">อีเมล</span>
            </div>
            <div className="flex justify-end items-center relative">
              <input
                type="text"
                placeholder="me@me.com"
                name="email"
                className="input input-bordered w-full max-w-xs"
                value={formValues.email}
                onChange={handleChange}
              />
              <img
                src={person}
                className="absolute mr-2 w-[1.3rem]"
                alt="Lock Icon"
              />
            </div>
            <div className="label">
              <span className="label-text text-red-700">
                {formErrors.email}
              </span>
            </div>
          </label>
        </div>

        <div className="w-[16.125rem] mx-auto mt-[2.5rem]">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-gray-500">รหัสผ่าน</span>
            </div>
            <div className="flex justify-end items-center relative">
              <input
                type={type}
                placeholder="รหัสผ่าน"
                name="password"
                className="input input-bordered w-full max-w-xs"
                value={formValues.password}
                onChange={handleChange}
              />
              <img
                src={eyeIcon}
                onClick={showPassword}
                className="absolute mr-2 w-[1.6rem]"
                alt="Lock Icon"
              />
            </div>
            <div className="label">
              <span className="label-text text-red-700">
                {formErrors.password}
              </span>
            </div>
          </label>
        </div>

        <div className="w-[13.563rem] mx-auto mt-[6rem]">
          <button className="btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]">
            { isSubmit? <span className="loading loading-spinner loading-md"></span> : <span>เข้าสู่ระบบ</span>}
          </button>
        </div>
      </form>

      <div className="w-[13.563rem] mx-auto text-center mt-4">
        <div class="inline-flex items-center justify-center w-full">
          <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
          <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 bg-[#F2F1EC]">หรือ</span>
        </div>
      </div>

      <div className="w-[13.563rem] mx-auto mt-4">
        <div className="flex justify-start items-center relative">
          <button
            className="btn btn-block bg-[#06C755] text-white pl-[3rem] font-normal text-[18px]"
            onClick={lineHandleSubmit}
          >
            {lineIsSubmit? <span className="loading loading-spinner loading-md"></span> : <span>เข้าสู่ระบบด้วย Line</span>}
          </button>
          <img src={Line} alt="Line" className="absolute w-[2.5rem] ml-1" />
        </div>
      </div>
    </div>
  );
}

export default Login;
