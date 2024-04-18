import React from "react";
import moment from 'moment'
function Card({bp}) {
    const formattedDate = moment(bp.createDate).add(543, 'YEAR').format('วันที่ DD/MM/YYYY')
    const formattedTime = moment(bp.createDate).format('kk:mm')
        
  return (
    <div className="collapse bg-white mt-4">
      <input type="checkbox" />
      <div className="collapse-title text-base">
        {formattedDate}
      </div>
      <div className="collapse-content">
        <p>SYS: {bp.sys}</p>
        <p>DIA: {bp.dia}</p>
        <p>PUL: {bp.pul}</p>
        <p>เวลา : {formattedTime}</p>
      </div>
    </div>
  );
}

export default Card;
