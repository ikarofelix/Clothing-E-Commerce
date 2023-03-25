import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

// import { ReactComponent as CronwLogo } from "../../assets/crown.svg";
import CrownLogo from "../../assets/crown.svg";
import "./navigation.styles.scss";

const NavigationBar = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={CrownLogo} className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavigationBar;
