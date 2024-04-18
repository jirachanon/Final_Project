import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { setBp } from "./slices";
import BpListing from "./bpListing";

function Home() {
  const { user } = useSelector((state) => state.slices);
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(param.param1 === user?.token)) {
      Swal.fire({
        title: "กรุณาเข้าสู่ระบบอีกครั้ง",
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/");
      });
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + param.param1);
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
          console.log(result);
          dispatch(setBp(result || {}));
        })
        .catch((error) => console.log("error", error));
    }
  });

  return (
    <>
      <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-dvh md:h-full lg:h-screen">
        <Nav />
        <div className="w-1/2 mx-auto">
          <BpListing />
        </div>
      </div>
    </>
  );
}

export default Home;
