import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ReactTyped } from "react-typed";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const Login = () => {
  const navigator = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const check = () => {
    values.email === "" ? setEmail(true) : null;
    values.password === "" ? setPassword(true) : null;
  };

  useEffect(() => setEmail(false), [values.email]);
  useEffect(() => setPassword(false), [values.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (values.email !== "" && values.password !== "") {
      try {
        const response = await axios.post(
          "https://server-ut-ratchadaphon.vercel.app/user/login",
          values
        );
        const id = response.data.user_id;
        if (response.data.role === "admin") {
          localStorage.setItem("token", response.data.token);
          navigator(`/admin/dashboard`);
        } else {
          localStorage.setItem("token", response.data.token);
          navigator(`/user/home/${id}`);
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response.data.error === "Incorrect password") {
          Swal.fire({
            title: "รหัสผ่านไม่ถูกต้อง",
            icon: "error",
          });
        } else if (error.response.data.error === "User not found") {
          Swal.fire({
            title: "ยังไม่มีบัญชี",
            text: "กรุณาสร้างบัญชีก่อนลงชื่อเข้าใช้",
            icon: "error",
          });
        }
      }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-green-50 to-sky-50">
      <div className="w-full flex flex-col md:flex-row items-center">
        <div className="w-full h-1/3 flex items-center justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-500 md:text-5xl lg:text-6xl">
            <ReactTyped
              strings={[
                "จดบันทึกการปลูกข้าว",
                "ตรวจสอบผลผลิต",
                "เลือกพันธุ์ข้าว",
                "ดูรายงานแปลงนา",
                "ดูรายงานค่าใช้จ่าย",
              ]}
              typeSpeed={100}
              loop
              backSpeed={50}
              showCursor={false}
            />
          </h1>
        </div>
        <div className="w-full flex justify-center items-center bg-white h-screen">
          <div className="flex flex-col p-6 md:p-4 w-full md:w-2/3 h-96 justify-center">
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              ลงชื่อเข้าใช้
            </h3>
            <form
              className="space-y-10 flex flex-col justify-start"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  อีเมล
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-2.5 hover:border-green-700 hover:border-2"
                />
                {email ? (
                  <div className="text-sm text-red-500 flex items-center gap-1">
                    <RiErrorWarningLine />
                    <span>กรุณากรอกอีเมล</span>
                  </div>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                />
                {password ? (
                  <div className="text-sm text-red-500 flex items-center gap-1">
                    <RiErrorWarningLine />
                    <span>กรุณากรอกรหัสผ่าน</span>
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full md:w-full px-5 py-2.5 text-base font-medium text-center text-white bg-green-600 hover:bg-green-100 hover:text-green-700 hover:duration-500 rounded-full flex items-center justify-center gap-2 shadow"
              >
                <span>เข้าใช้งาน</span>
                <GoArrowRight />
              </button>
            </form>
            <div className="flex justify-end items-center pt-4">
              <div className="text-sm font-medium text-gray-900 flex space-x-2">
                <div>ยังไม่มีบัญชี? </div>
                <a
                  href="/register"
                  className="text-blue-600 hover:underline cursor:pointer animate-bounce"
                >
                  สร้างบัญชี
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Login;
