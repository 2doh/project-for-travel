import { useRef, useState } from "react";

const Item = ({ item, onRemove}) => {
  const [checkBox, setCheckBox] = useState(
    "/ldh/images/326558_blank_check_box_icon.svg",
  );
  const [isChecked, setIsChecked] = useState(false);

  const checkClick = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setCheckBox("/ldh/images/326558_blank_check_box_icon.svg");
    } else {
      setCheckBox("/ldh/images/326563_box_check_icon.svg");
    }
  };

  return (
    <div className="main-bottom-check-list">
      <img src={checkBox} className="boxico" onClick={() => checkClick()} />
      <div className="check-list-contents">
        {item}
      </div>
      <img
        src="/ldh/images/10758948_x_circle_icon.svg"
        className="x-ico"
        onClick={onRemove}
      />
    </div>
  );
};

export default Item;