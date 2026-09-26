import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Input from "../../components/input/Input";
import apiClient from "../../hooks/useAxios";

function Login({ back }) {
  const [show, setSHow] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function Pose(e) {
    e.preventDefault();

    try {
      const res = await apiClient.get("/users");

      const user = res.data.find(
        (u) =>
          u.name.toLowerCase() === name.toLowerCase() &&
          u.password.toLowerCase() === password.toLowerCase(),
      );

      if (user) {
        toast.success("Tizimga Hush Kelibsiz");

        navigate("/dashboard");
      } else {
        toast.error("Ism Yoki Parol Hato");
      }
    } catch (error) {
      toast.error("server hatosi iltmos keynroq urnib koring");
    }
  }
  gsap.registerPlugin(useGSAP);

  {
    useGSAP(() => {
      gsap.from("#Login", {
        y: 100,
        opacity: 0,
        duration: 1.5,
      });
    });
  }

  return (
    <>
      <div
        className="flex w-screen h-screen flex justify-center items-center"
        id="Login"
      >
        <div className="w-[100%] h-[100%] rounded-2xl xl:w-[300px flex flex-col justify-center items-center">
          <div className="flex justify-center p-[30px] flex-col items-center w-[90%] gap-[30px] h-[550px]  bg-blue-100 rounded-2xl 2xl:w-[25%]">
            <div className="flex  bg-linear-[-25deg,_#4ade80,_#60a5fa]  rounded-[50%] justify-center items-center p-[20px] ">
              <Wallet color="white" size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-medium text-gray-900">
                Xush Kelibsiz
              </h3>
              <p className="text-gray-500">Hisobingizga kiring</p>
            </div>

            <form onSubmit={Pose} className="flex gap-[20px] flex-col w-[100%]">
              <div className="flex flex-col gap-[10px]">
                <Input
                  text={"Ism"}
                  Label={"Foydalanuvchi nomi"}
                  back={back}
                  onchage={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <Input
                  text={"Parol"}
                  type={show ? "text" : "password"}
                  Label={"Foydalanuvchi Paroli"}
                  onchage={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-[100%]">
                <button
                  className="block text-center text-white bg-black rounded-[10px] w-[100%] p-[15px]"
                  to={"/dashboard"}
                >
                  Kirish
                </button>
              </div>
              <div className="w-[100%] flex justify-center">
                <p className="text-gray-600">
                  Hisobingiz yo'qmi?{" "}
                  <NavLink to={"/royhat"} className="text-black font-bold">
                    Ro'yxatdan o'tish
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
