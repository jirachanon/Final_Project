import React from "react";
import moment from 'moment'
function Card({bp}) {
    const formattedDate = moment(bp.createDate).add(543, 'YEAR').format('HH:mm:ss - DD/MM/YYYY')
        
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        {formattedDate}
      </div>
      <div className="collapse-content">
        <p>SYS: {bp.sys}</p>
        <p>DIA: {bp.dia}</p>
        <p>PUL: {bp.pul}</p>
      </div>
    </div>
  );
}

export default Card;
