import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred. (from custom error page)</p>
      <p>
        <i>{error.status + " "}</i> <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
