import { Container } from "./styles";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuType, LuListMusic, LuMusic, LuVolume1 } from "react-icons/lu";

const Header = ({ louvor = {}, setActiveTab = "" }) => {
  const navigate = useNavigate();
  let [isHome, setUrlCheckIsHome] = useState(true);

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
          <div className="icon-container">
            {louvor.linkPdfLyrics ? (
              <LuType
                color={"black"}
                size={17}
                onClick={() => setActiveTab("LuType", louvor)}
              />
            ) : (
              <LuType color={"#9ca3af"} size={17} />
            )}
          </div>

          <div className="icon-container">
            {louvor.linkChords ? (
              <LuListMusic
                color={"black"}
                size={19}
                onClick={() => setActiveTab("LuListMusic", louvor)}
              />
            ) : (
              <LuListMusic color={"#9ca3af"} size={19} />
            )}
          </div>

          <div className="icon-container">
            {louvor.linkSheetMusic ? (
              <LuMusic
                color={"black"}
                size={17}
                onClick={() => setActiveTab("LuMusic", louvor)}
              />
            ) : (
              <LuMusic color={"#9ca3af"} size={17} />
            )}
          </div>

          <div className="icon-container">
            {louvor.linkAudioFile ? (
              <LuVolume1
                color={"black"}
                size={20}
                onClick={() => setActiveTab("LuVolume1", louvor)}
              />
            ) : (
              <LuVolume1 color={"#9ca3af"} size={20} />
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Header;
