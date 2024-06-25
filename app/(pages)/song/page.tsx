import NavBar from "../../components/NavBar";

export default function Song() {
  return (
    <div className="w-screen h-screen">
      <NavBar></NavBar>
      <iframe
        src="https://drive.google.com/file/d/13aLz_bL0oNE3g5B5cxfJFNeEvO0mmPOx/preview"
        width="100%"
        height="100%"
        allow="autoplay"
      ></iframe>
    </div>
  );
}
