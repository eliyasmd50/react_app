import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Header = ({ title = "Default TiTle" }) => {
  const { width } = useWindowSize();
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