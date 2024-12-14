"use client";

const ErrorBoundary = ({ error, reset }) => {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reset} className="button button-red">
        Retry
      </button>
    </div>
  );
};

export default ErrorBoundary;
