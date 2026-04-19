import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function OAuthFailure() {
  const [searchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
        setErrorMsg(decodeURIComponent(error));
    }
}, [searchParams]);

  return (
    <div className="p-10 flex justify-center items-center">
      {errorMsg}
    </div>
  );
}

export default OAuthFailure
