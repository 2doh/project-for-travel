import { useState } from 'react';
import Item from './Item';

const ListItem = ({ items }) => {
  const [list, setList] = useState(items);
  return (
    <div className="main-bottom-check">
      {list.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

export default ListItem;