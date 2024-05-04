import ButtonShared from "@/components/Button/Button";
import HELMET from "@/components/shared/HELMET/HELMET";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import useServices from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const Navigate = (id: string) => navigate(`/services/${id}`);
  const { services: data } = useServices();
  return (
    <div className="px-16 flex flex-col items-center justify-center gap-6">
      <div>
        <SectionTitle title="We're an agency tailored to all client's needs that always delivers" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((service) => (
          <div
            key={service.title}
            className="flex flex-col items-center justify-center p-6 border gap-4 shadow-custom"
          >
            <div>
              <img src={service.image} alt="" className="w-[5em]" />
            </div>
            <p className="font-bold text-base text-center">{service.title}</p>
            <p className="font-medium text-base text-center">
              ${service.price}
            </p>
            <p className="font-medium text-base text-center">{service.desc}</p>
            <div>
              <ButtonShared
                title={"ADD CART"}
                onclick={() => Navigate(service._id)}
              />
            </div>
          </div>
        ))}
      </div>
      <HELMET title="SERVICES" />
    </div>
  );
};

export default Services;
