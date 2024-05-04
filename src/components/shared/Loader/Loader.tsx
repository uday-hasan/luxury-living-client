import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <FadeLoader className="scale-150" color="#251d18" />
    </div>
  );
};

export default Loader;
