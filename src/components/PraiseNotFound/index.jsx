import { ErrorPage } from "./styles";

export default function PraiseNotFound() {
  return (
    <ErrorPage>
      <img
        className="img-praise-not-found"
        src="/images/music-not-found.png"
        alt="musical note error"
      />
      <p className="text-error-page">
        Sorry...
        <br />
        The praise song that you are looking for does not exists in our data
        base!
      </p>
    </ErrorPage>
  );
}
