import React from "react";
import moment from 'moment'
function Card({ bp }) {
  const formattedDate = moment.utc(bp.createDate).add(543, 'YEAR').utcOffset('+0700').format('วันที่ DD/MM/YYYY')
  const formattedTime = moment.utc(bp.createDate).utcOffset('+0700').format('kk นาฬิกา mm นาที')

  return (
    <>
      <div className="collapse bg-white mt-3">
        <input type="checkbox" />
        <div className="collapse-title text-base">
          {formattedDate}
        </div>
        <div className="collapse-content">
          <p>ค่าบน/ค่าล่าง: {bp.systolicPressure}/{bp.diastolicPressure}</p>
          <p>ชีพจร: {bp.pulseRate}</p>
          <p>เวลา : {formattedTime}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
