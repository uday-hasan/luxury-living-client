import { Button } from "../ui/button";

const ButtonShared = ({
  title,
  type,
  onclick,
  disabled,
}: {
  title: string;
  type?: "submit" | undefined;
  onclick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button disabled={disabled} type={type} onClick={onclick}>
      {title}
    </Button>
  );
};

export default ButtonShared;
