import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Nav from "./Nav";

function Home() {
  const { user } = useSelector((state) => state.slices);
  const navigate = useNavigate();
  const param = useParams();

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
          }
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
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  });

  return (
    <div className="w-auto md:w-full lg:w-full bg-[#F2F1EC] mx-auto h-full">
      <Nav />
    </div>
  );
}

export default Home;
