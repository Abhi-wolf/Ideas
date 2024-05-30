/* eslint-disable react/prop-types */
function NoDataMessage({ message }) {
  return (
    <div className="w-1/2 h-[30vh] flex justify-center items-center">
      <div>
        <h1 className="text-2xl text-red-400 italic">
          {message ? message : "No data"}🥺️
        </h1>
      </div>
    </div>
  );
}

export default NoDataMessage;
