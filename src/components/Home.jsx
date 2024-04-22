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

function Home() {
  const { user } = useSelector((state) => state.slices);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = localStorage.getItem('userName')


  useEffect(() => {
    liff
      .init({
        liffId: '2004489610-dq14p1vw'
      }).then(() => {
        if (!liff.isLoggedIn) {
          liff.login();
        }

        if (!Cookies.get("user_token")) {
          liff.logout();
          Swal.fire({
            title: "กรุณาเข้าสู่ระบบอีกครั้ง",
            confirmButtonText: "ตกลง",
          }).then(() => {
            navigate('/Login/home')
          });
        }
      }, [Cookies.get('user_token')])

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
        setTimeout(() => { setIsLoading(false) }, 1800)
      })
      .catch((error) => console.log("error", error));

  }, [Cookies.get("user_token")]);

  return (
    <>
      <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto max-h-full min-h-screen md:min-h-screen lg:h-screen">
        <Nav />
        <div className="w-64 mx-auto text-center">
          <p className="font-bold">ประวัติผลวัดความดันโลหิต</p>
          <p className="font-bold">ของ</p>
          <p className="text-[#1B3B83] font-bold">คุณ {userName}</p>
        </div>
        <div className="w-64 mx-auto mt-4">
          {isLoading ? <Loading /> : <BpListing />}
        </div>
      </div>
    </>
  );
}

export default Home;
