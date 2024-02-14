import { useEffect } from "react";
import CustomDrawer from "../../Components/Appbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  let Navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("Token");
     if(!token){
        Navigate("/login")
     }(token);
  }, []);

  return (
    <>
      <div>
        <CustomDrawer />
      </div>
    </>
  );
}
