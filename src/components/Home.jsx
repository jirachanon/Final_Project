import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import liff from "@line/liff";
import Nav from "./Nav";
import { setBp } from "./slices";
import BpListing from "./BpListing";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { BloodPressureChart } from "./BpChart";

function Home() {
  const { user } = useSelector((state) => state.slices);
  const [isLoading, setIsLoading] = useState(true);
  const [showGraph, setShowGraph] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = Cookies.get('user_name')
  const liffID = '2004489610-dq14p1vw'

  const handleShowGraph = () => {
    setShowGraph(!showGraph);
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
          title: "กรุณาเข้าสู่ระบบอีกครั้ง",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.href = 'https://liff.line.me/2004489610-aP6ng65X';
        });
      }
    })

    

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + Cookies.get('user_token'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      requestId: "1",
      page: "0",
      size: "10",
      sortBy: [
        {
          direction: "Desc",
          property: "createDate",
        },
      ],
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://hpm-backend.onrender.com/v1/bp/u/getBloodPressurePagingByUserId",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setBp(result || {}));
      })
      .catch((error) => console.log("error", error));

  }, [Cookies.get("user_token"), liffID]);

  return (
    <>
      <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto min-h-screen md:min-h-screen lg:min-h-screen">
        <Nav />
        <div className="flex justify-end mb-4 mr-5">
          <button className="btn outline outline-1 outline-[#1B3B83] btn-xs sm:btn-sm md:btn-md lg:btn-lg text-[#1B3B83]"
            onClick={handleShowGraph}
          >
            {showGraph ? 'แสดงเป็นรายการ' : 'แสดงเป็นกราฟ'}
          </button>
        </div>
        <div className="w-64 mx-auto text-center">
          <p className="font-bold">ประวัติผลวัดความดันโลหิต</p>
          <p className="font-bold">ของ</p>
          <p className="text-[#1B3B83] font-bold">คุณ {userName}</p>
        </div>
        {showGraph ?
          <div className="w-auto mx-auto mt-4">
            <BloodPressureChart />
          </div>
          :
          <div className="w-64 min-h-screen mx-auto mt-4">
            <BpListing />
          </div>
        }
      </div>
    </>
  );
}

export default Home;
