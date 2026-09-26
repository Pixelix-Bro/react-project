import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import { Wallet } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import Input from "../../components/input/Input";
import apiClient from "../../hooks/useAxios";
function Royhat() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const idRef = useRef(1);

  const createUser = () => {
    const id = idRef.current;
    idRef.current += 1;

    console.log(id);
  };

  async function Pose(e) {
    e.preventDefault();

    try {
      const res = await apiClient.post("/users", {
        name,
        email,
        password,
        confirmPassword,
      });

      toast.success("Ro'yhatan otingiz");

      console.log(res.data);
    } catch (error) {
      toast.error("server hatosi");
    }
  }

  {
    useGSAP(() => {
      gsap.from("#Royhat", {
        y: 100,
        opacity: 0,
        duration: 1.5,
      });
    });
  }

  return (
    <>
      <div
        className="flex w-screen h-screen justify-center items-center"
        id="Royhat"
      >
        <div className="w-[100%] h-[700px] bg-blue-100 rounded-2xl  flex flex-col justify-center items-center 2xl:w-[25%]">
          <div className="flex justify-center p-[30px] flex-col items-center w-[100%] gap-[30px]">
            <div className="flex  bg-linear-[-25deg,_#4ade80,_#60a5fa]  rounded-[50%] justify-center items-center p-[20px] ">
              <Wallet color="white" size={30} />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-medium text-gray-900">
                Xush Kelibsiz
              </h3>
              <p className="text-gray-500">M'lumot Kiriting</p>
            </div>

            <div className="flex gap-[20px] flex-col w-[100%]">
              <form onSubmit={Pose}>
                <div className="">
                  <Input
                    text={"Ismigiz"}
                    Label={"Ism"}
                    onchage={(e) => {
                      setName(e.target.value.toLowerCase());
                    }}
                  />
                </div>
                <div className="">
                  <Input
                    text={"Email"}
                    type={"email"}
                    Label={"Email"}
                    onchage={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="">
                  <Input
                    text={"***** "}
                    type={"password"}
                    Label={"Parol kiriting"}
                    onchage={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="">
                  <Input
                    text={"*****  "}
                    type={"password"}
                    Label={"Parolni tasdiqlang"}
                    onchage={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[100%]">
                  <button className="block text-center text-white bg-black rounded-[10px] w-[100%] p-[15px]">
                    Kirish
                  </button>
                </div>
              </form>

              <div className="w-[100%] flex justify-center">
                <p className="text-gray-600">
                  Hisobingiz bormi ?{" "}
                  <NavLink to={"/"} className="text-black font-bold">
                    Ortga qaytish
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Royhat;
