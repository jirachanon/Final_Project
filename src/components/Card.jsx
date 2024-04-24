import React from "react";
import moment from 'moment'
function Card({ bp }) {
  const formattedDate = moment(bp.createDate).add(543, 'YEAR').format('วันที่ DD/MM/YYYY')
  const formattedTime = moment.utc(bp.createDate).utcOffset('+0700').format('kk นาฬิกา mm นาที')

  return (
    <>
      <div className="collapse bg-white mt-3">
        <input type="checkbox" />
        <div className="collapse-title text-base">
          {formattedDate}
        </div>
        <div className="collapse-content">
          <p>ค่าบน/ค่าล่าง: {bp.sys}/{bp.dia}</p>
          <p>ชีพจร: {bp.pul}</p>
          <p>เวลา : {formattedTime}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
