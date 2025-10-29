const ErrorDisplay = ({ message }) => {
  !message ? (message = "This field is required") : message;
  return <div className="text-red-500 text-sm mt-1">{message}</div>;
};

export default ErrorDisplay;
