import { Helmet } from "react-helmet-async";

const HELMET = ({ title }: { title: string }) => {
  return (
    <div>
      <Helmet>
        <title>CREATIVE AGENCY - {title}</title>
      </Helmet>
    </div>
  );
};

export default HELMET;
