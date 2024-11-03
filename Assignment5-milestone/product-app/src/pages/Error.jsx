import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();

  let message = "something went wrong.";
  let title = "An error occured!";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }
  return (
    <>
      <MainNavigation />
      <h2>{title}</h2>
      <p>{message}</p>
    </>
  );
}
export default ErrorPage;
