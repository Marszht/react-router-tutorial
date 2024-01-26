import { useRouteError } from 'react-router-dom';
import type { ErrorResponse } from "react-router";

type ErrorType = ErrorResponse & Error; // 交叉类型

export default function ErrorPage() {
  const error = useRouteError() as ErrorType;
  console.error(error);
  
  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}


