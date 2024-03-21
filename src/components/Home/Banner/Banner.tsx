import banner from "@/assets/images/headerBanner.png";
import ButtonShared from "@/components/Button/Button";
const Banner = () => {
  return (
    <div className=" flex flex-col md:flex-row items-center gap-5 justify-between bg-cWhite px-16 py-4">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold">We Build Your Dream</h1>
        <p className="text-xl font-medium">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
          alias dolorum culpa non quasi et!
        </p>
        <div>
          <ButtonShared title="BOOKING"></ButtonShared>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <img className="w-[30em]" src={banner} alt="Banner Image" />
      </div>
    </div>
  );
};

export default Banner;
