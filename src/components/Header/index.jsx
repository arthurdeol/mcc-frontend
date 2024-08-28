import { Container } from "./styles";
import { useNavigate, Link } from "react-router-dom";
import { LuType, LuListMusic, LuMusic, LuUser2 } from "react-icons/lu";

const Header = ({ louvor = {}, setActiveTab = "" }) => {
  const navigate = useNavigate();
  const navPath = window.location.pathname?.toString();

  return (
    <Container>
      <img
        className="logo"
        src="/images/logomcc.jpeg"
        alt="mcc logo"
        onClick={() =>
          navPath === "/praise-settings" || navPath === "/praises-admin"
            ? navigate("/praises-admin")
            : navigate("/")
        }
      />

      {navPath === "/" && (
        <button className="login-button">
          <Link to={"/login-admin"}>
            <LuUser2 size={22} />
          </Link>
        </button>
      )}

      {navPath === "/praise" && (
        <div className="icons-container">
          {louvor.linkPdfLyrics ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuType", louvor)}
            >
              <LuType color={"black"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuType color={"#9ca3af"} size={17} />
            </div>
          )}

          {louvor.linkChords ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuListMusic", louvor)}
            >
              <LuListMusic color={"black"} size={19} />
            </div>
          ) : (
            <div className="icon-container">
              <LuListMusic color={"#9ca3af"} size={19} />
            </div>
          )}

          {louvor.linkSheetMusic ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuMusic", louvor)}
            >
              <LuMusic color={"black"} size={17} />
            </div>
          ) : (
            <div className="icon-container">
              <LuMusic color={"#9ca3af"} size={17} />
            </div>
          )}

          {/* {louvor.linkAudioFile ? (
            <div
              className="icon-container"
              onClick={() => setActiveTab("LuVolume1", louvor)}
            >
              <LuVolume1 color={"black"} size={20} />
            </div>
          ) : (
            <div className="icon-container">
              <LuVolume1 color={"#9ca3af"} size={20} />
            </div>
          )} */}
        </div>
      )}
    </Container>
  );
};

export default Header;
