import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddNewService = () => {
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    name: "",
    content: "",
  });

  const [name, setName] = useState(false);
  const [content, setContent] = useState(false);

  useEffect(() => setName(false), [values.name]);
  useEffect(() => setContent(false), [values.content]);

  const check = () => {
    values.name === "" ? setName(true) : null;
    values.content === "" ? setContent(true) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    try {
      if (values.name !== "" && values.content !== "") {
        await axios
          .post(`https://server-ut-ratchadaphon.vercel.app/newsService`, values)
          .then((result) => console.log(result.data));
        Swal.fire({
          title: `เพิ่มสำเร็จ`,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <div>
      <button
        className="text-white bg-green-600 px-4 py-2 text-sm hover:text-green-700 hover:bg-green-100 hover:duration-200 rounded-lg"
        onClick={() => setModal(!modal)}
      >
        เพิ่มข่าวสาร
      </button>

      {modal ? (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 max-h-full flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-md max-h-full ">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  เพิ่มข่าวสาร
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => setModal(!modal)}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      หัวข้อ
                    </label>
                    <select
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                    >
                      <option value="">เลือกหัวข้อ</option>
                      <option value="ราคาข้าว">ราคาข้าว</option>
                      <option value="สถานการณ์น้ำ">สถานการณ์น้ำ</option>
                      <option value="ข่าวราคาข้าว">ข่าวราคาข้าว</option>
                      <option value="พยากรณ์อากาศ">พยากรณ์อากาศ</option>
                    </select>
                    {name ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกหัวข้อ</span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-sm text-gray-900 font-medium block mb-2">
                      ลิงค์ไปยังข้อมูล
                    </label>

                    <textarea
                      type="text"
                      name="content"
                      id="content"
                      value={values.content}
                      onChange={(e) =>
                        setValues({ ...values, content: e.target.value })
                      }
                      className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full h-40"
                    />
                    {content ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกเนื้อหา</span>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-x-2 flex justify-end items-center">
                    <button
                      type="submit"
                      className="text-sm bg-green-600 py-3 px-4 rounded-md text-white hover:bg-green-100 hover:text-green-700 hover:duration-200"
                    >
                      บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal(!modal)}
                      className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddNewService;
