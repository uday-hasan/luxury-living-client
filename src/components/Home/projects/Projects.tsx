import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { IoLocationOutline } from "react-icons/io5";
import p1 from "@/assets/images/projects/p1.png";
import p2 from "@/assets/images/projects/p2.png";
import p3 from "@/assets/images/projects/p3.png";

interface projectsType {
  image: string;
  name: string;
  location: string;
}
const projects: projectsType[] = [
  {
    image: p1,
    name: "Villa on Washington Avenue",
    location: "Dhaka, Bangladesh",
  },
  {
    image: p2,
    name: "Luxury Villa in Rego Park",
    location: "Khulna, Bangladesh",
  },
  {
    image: p3,
    name: "Gorgeous Avenue",
    location: "Rajshahi, Bangladesh",
  },
];
const Projects = () => {
  return (
    <div className="mt-8 px-16">
      <div>
        <SectionTitle title="Discover the latest Interior Design available today" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {projects?.map((project) => (
          <div
            key={project.name}
            className="w-full flex flex-col justify-center items-center p-[0.4em] shadow-custom rounded-xl"
          >
            <img
              src={project.image}
              alt=""
              className="w-[20em] min-h-[20em] max-h-[20em]"
            />
            <p className="text-2xl font-semibold">{project.name}</p>
            <div className="flex items-center gap-2 py-4">
              <p>
                <IoLocationOutline />
              </p>
              <p className="font-medium">{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
