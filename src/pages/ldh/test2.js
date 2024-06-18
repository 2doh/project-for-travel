const Item = ({ item, onRemove, onCheck }) => {
  const checkBox = item.cheched
    ? "/ldh/images/326563_box_check_icon.svg"
    : "/ldh/images/326558_blank_check_box_icon.svg";
  const lineDeco = {
    color: item.cheched ? "gray" : "black",
    textDecoration: item.cheched ? "line-through" : "none",
  };
  return (
    <div className="main-bottom-check-list">
      <img src={checkBox} className="boxico" onClick={onCheck} />
      <div className="check-list-contents" style={lineDeco}>
        {item.title}
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
