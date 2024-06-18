import Item from "./Item";
import ListInput from "./ListInput";

const List = ({
  isTourIdSelected,
  list,
  message,
  onAdd,
  setOnAdd,
  handleOnSubmit,
  handleRemove,
  handleCheck,
}) => {
  return isTourIdSelected ? (
    <div className="main-wrap">
      <div className="main-top-title text-danger">{message}</div>
      <div className="main-checklist-top">
        <div className="main-top-wrap">
          <form
            name="list-form"
            className="list-form"
            onSubmit={e => {
              handleOnSubmit(e);
            }}
          >
            <ListInput value={onAdd} onChange={setOnAdd} />
          </form>
        </div>
      </div>
      <div className="main-bottom">
        <div className="main-bottom-wrap">
          <div className="main-bottom-check">
            {list.map((item, index) => (
              <Item
                key={index}
                item={item}
                index={index}
                onRemove={() => handleRemove(index)}
                onCheck={() => handleCheck(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default List;
