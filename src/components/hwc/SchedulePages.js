import React from "react";

const SchedulePages = ({ details, onChange, isEditing }) => (
  <div className="index-right-selection">
    <div className="index-travel-schedule-right">
      <p className="index-travelday-right-input">
        {isEditing ? (
          <textarea name="details" value={details} onChange={onChange}>
            상세 스케줄을 입력해주십시오.
          </textarea>
        ) : (
          <p>{details}</p>
        )}
      </p>
    </div>
  </div>
);

export default SchedulePages;
