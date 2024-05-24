/* eslint-disable react/prop-types */
function ErrorMessage({ errorMessage }) {
  return (
    <div className="w-1/2 h-[30vh] flex justify-center items-center">
      <div>
        <h1 className="text-2xl text-red-400 italic">
          {errorMessage ? errorMessage : "Error"}🥺️
        </h1>
      </div>
    </div>
  );
}

export default ErrorMessage;
