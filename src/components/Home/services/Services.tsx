import ButtonShared from "@/components/Button/Button";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { serviceType } from "@/types/serviceType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigates = useNavigate();
  const navigate = () => navigates("/services");
  const [data, setData] = useState<serviceType[]>([]);
  useEffect(() => {
    const services = async () => {
      const response = await fetch(
        `https://luxury-living-server-o99b.onrender.com/services`
      );
      const res = await response.json();
      setData(res);
    };
    services();
  }, []);
  return (
    <div className="px-16 flex flex-col items-center justify-center gap-6">
      <div>
        <SectionTitle title="We're an agency tailored to all client's needs that always delivers" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((service) => (
          <div
            key={service.title}
            className="flex flex-col items-center justify-center p-6  shadow-custom"
          >
            <div>
              <img src={service.image} alt="" className="w-[5em]" />
            </div>
            <p className="font-bold text-base text-center">{service.title}</p>
            <p className="font-medium text-base text-center">
              ${service.price}
            </p>
            <p className="font-medium text-base text-center">{service.desc}</p>
          </div>
        ))}
      </div>
      <div>
        <ButtonShared title="Explore More" onclick={navigate} />
      </div>
    </div>
  );
};

export default Services;
