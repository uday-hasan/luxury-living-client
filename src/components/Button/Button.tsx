import { Button } from "../ui/button";

const ButtonShared = ({
  title,
  type,
  onclick,
}: {
  title: string;
  type?: "submit" | undefined;
  onclick?: () => void;
}) => {
  return (
    <Button type={type} onClick={onclick}>
      {title}
    </Button>
  );
};

export default ButtonShared;
