import "./css/error.css";

const Error = () => {
  return (
    <div className="error-container">
      <h1>
        <span id="err-code">404</span>
        <br />
        Page Not Found!
      </h1>
      <p className="err-text">
        Requested resource could not be found on this server...
      </p>
    </div>
  );
};

export default Error;
