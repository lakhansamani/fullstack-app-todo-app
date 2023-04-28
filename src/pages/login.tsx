import { Authorizer } from "@authorizerdev/authorizer-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Authorizer
      onLogin={() => {
        navigate("/");
      }}
    />
  );
}
