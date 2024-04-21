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
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const initValues = { email: "", password: "" };
  var id = Math.floor(Math.random() * 10);

  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [type, setType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(closeEye);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const destinationURL = `https://main.d3ri0kgpziqudg.amplifyapp.com/Login/${params.from}`

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
  };

  useEffect(() => {
    liff
      .init({
        liffId: "2004489610-aP6ng65X",
      }).then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: destinationURL})
        }
      });
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validation(formValues));
    setisSubmit(true);
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
        if (result?.roles[0] === "ROLE_USER") {
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ",
            text: "สวัสดีคุณ " + result?.name,
            confirmButtonText: "ตกลง",
          }).then(() => {
            dispatch(setUser(result || {}));
            Cookies.set('user_token', result?.token, { expires: 1/48 })
            localStorage.setItem("userName", result?.name)
            if (params.from === 'home') {
              navigate(`/`);
            }else if (params.from === 'sendbp') {
              navigate(`/SendBp`)
            }
          });
        } else if (result?.status?.code === "400") {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: result?.status?.details[0]?.value,
            confirmButtonText: "ตกลง",
          });
        }
        return result;
      })
      .catch((error) => console.error(error));
  };

  const lineHandleSubmit = async (event) => {
    event.preventDefault();

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

    await fetch(
      "https://hpm-backend.onrender.com/v1/system/signIn",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result?.roles[0] === "ROLE_USER") {
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ",
            text: "สวัสดีคุณ " + result?.name,
            confirmButtonText: "ตกลง",
          }).then(() => {
            dispatch(setUser(result || {}));
            localStorage.setItem("token", result?.token)
            localStorage.setItem("userName", result?.name)
            if (params.from === 'home') {
              navigate(`/`);
            }else if (params.from === 'sendbp') {
              navigate(`/SendBp`)
            }
          });
        } else if (result?.status?.code === "400") {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: result?.status?.details[0]?.value,
            confirmButtonText: "ตกลง",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const validation = (validate) => {
    const error = {};
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
  };

  return (
    <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto min-h-screen lg:h-screen">
      <div className="w-[22.875rem] mx-auto">
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

        <div className="w-[16.125rem] mx-auto mt-[2.995rem]">
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

            <div className="label place-content-center">
              <a
                href="#"
                className="label-text text-gray-500 font-normal underline"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
          </label>
        </div>

        <div className="w-[13.563rem] mx-auto mt-[6.58rem]">
          <button className="btn btn-block bg-[#1B3B83] border-[#AC8218] text-white font-normal text-[18px]">
            เข้าสู่ระบบ
          </button>
          <div className="label place-content-center">
            <a href="/Register" className="label-text text-gray-500 underline">
              สมัครสมาชิก
            </a>
          </div>
        </div>
      </form>

      <div className="w-[13.563rem] mx-auto mt-[2.5rem]">
        <div className="flex justify-start items-center relative">
          <button
            className="btn btn-block bg-[#06C755] text-white pl-[3rem] font-normal text-[18px]"
            onClick={lineHandleSubmit}
          >
            เข้าสู่ระบบด้วย Line
          </button>
          <img src={Line} alt="Line" className="absolute w-[2.5rem] ml-1" />
        </div>
      </div>
    </div>
  );
}

export default Login;
