import { Link } from "react-router-dom";
import NProgress from "nprogress";

function NavLinkWithProgress({ to, children }) {
  const handleClick = () => {
    NProgress.start();
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default NavLinkWithProgress