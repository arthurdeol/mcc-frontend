import { Container } from "./styles";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuType, LuListMusic, LuMusic, LuVolume1 } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  let [isHome, setUrlCheckIsHome] = useState(true);
  const location = useLocation();
  //const { id, iconName } = location.state;
  //const activeTab = iconName;

  useEffect(() => {
    const isHomecheck =
      window.location.href.toString().indexOf("/praise") !== -1;
    if (isHomecheck) {
      setUrlCheckIsHome(true);
    } else {
      setUrlCheckIsHome(false);
    }
  }, []);

  return (
    <Container>
      <img
        className="logo"
        src="/images/logomcc.jpeg"
        alt="mcc logo"
        onClick={() => navigate("/")}
      />

      {!isHome && <button className="login-button">Login</button>}

      {isHome && (
        <div className="icons-container">
          <Link
            to={"/praise"}
            className="icon-container"
            // state={{ id: id, iconName: "LuType" }}
          >
            <LuType color="black" size={17} />
          </Link>

          <Link
            to={"/praise"}
            className="icon-container"
            // state={{ id: id, iconName: "LuListMusic" }}
          >
            <LuListMusic color="black" size={17} />
          </Link>

          <Link
            to={"/praise"}
            className="icon-container"
            // state={{ id: id, iconName: "LuMusic" }}
          >
            <LuMusic color="black" size={16} />
          </Link>

          <Link
            to={"/praise"}
            className="icon-container"
            // state={{ id: id, iconName: "LuVolume1" }}
          >
            <LuVolume1 color="black" size={18} />
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Header;
