import HELMET from "@/components/shared/HELMET/HELMET";
import { useAuth } from "@/contexts/auth-context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <HELMET title="PROFILE" />

      <div className="text-xl font-semibold  flex flex-col gap-4">
        <h1>
          <span className="text-cBlue">Name:</span>{" "}
          <span className="italic">{user?.name}</span>
        </h1>
        <h1>
          <span className="text-cBlue">Email:</span>{" "}
          <span className="italic">{user?.email}</span>
        </h1>
        <h1>
          <span className="text-cBlue">Mobile:</span>{" "}
          <span className="italic">{user?.mobile || "Not Added"}</span>
        </h1>
      </div>
    </div>
  );
};

export default Profile;
