import Banner from "@/components/Home/Banner/Banner";
import Projects from "@/components/Home/projects/Projects";
import Services from "@/components/Home/services/Services";
import HELMET from "@/components/shared/HELMET/HELMET.tsx";
const Home = () => {
  return (
    <div className="">
      <HELMET title="HOME" />
      <Banner />
      <Projects />
      <Services />
    </div>
  );
};

export default Home;
