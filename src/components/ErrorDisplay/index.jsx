import { ErrorPage } from "./styles";

export default function ErrorDisplay() {
  return (
    <ErrorPage>
      <img
        className="musical-note-error-page"
        src="/images/music-not-found.png"
        alt="musical note error"
      />
      <p className="text-error-page">
        Sorry,
        <br /> we had a problem to show this content.
        <br /> Please try again later!
      </p>
    </ErrorPage>
  );
}
