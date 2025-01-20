import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex items-center justify-center  w-full min-h-[300px] col-span-4">
      <ScaleLoader color="red" />
    </div>
  );
};

export default Loader;