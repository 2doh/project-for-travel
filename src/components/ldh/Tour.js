
const Tour = ({ tour, tourClick }) => {
  return (
    <li className="navbar-header">
      <a onClick={tourClick} >{tour}
      </a>
    </li>
  );
};

export default Tour;
