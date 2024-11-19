import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title = "Default TiTle", width }) => {
  return (
    <header className="Header">
        <h1>{title}</h1>
        {width < 738 ? <FaMobileAlt />
          : width < 992 ? <FaTabletAlt />
            : <FaLaptop />}
    </header>
  )
}

export default Header