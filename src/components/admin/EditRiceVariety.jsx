import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const EditRiceVariety = ({ id }) => {
  const [modal, setModal] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const [resImg, setResImg] = useState("");

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [yield_rice, setYield] = useState("");
  const [height, setHeight] = useState("");
  const [photosensitivity, setPhotosensitivity] = useState("");
  const [stability, setStability] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [type, setType] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://server-ut-ratchadaphon.vercel.app/riceVariety/${id}`);
        setResImg(res.data.image);

        setName(res.data.name);
        setAge(res.data.age);
        setHeight(res.data.height);
        setPhotosensitivity(res.data.photosensitivity);
        setPrecautions(res.data.precautions);
        setStability(res.data.stability);
        setYield(res.data.yield);
        setImage(res.data.image);
        setType(res.data.type);
      } catch (error) {
        console.log("Error" + error);
      }
    };
    fetchData();
  }, [id]);

  const clickChangeImg = (e) => {
    setImage(e.target.files[0]);
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("yield", yield_rice);
    formData.append("height", height);
    formData.append("photosensitivity", photosensitivity);
    formData.append("stability", stability);
    formData.append("precautions", precautions);
    formData.append("type", type);

    const values = {
      name: name,
      age: age,
      yield: yield_rice,
      height: height,
      photosensitivity: photosensitivity,
      stability: stability,
      precautions: precautions,
      type: type,
    };

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    if (image === resImg) {
      await axios
        .put(`https://server-ut-ratchadaphon.vercel.app/riceVariety/edit2/${id}`, values)
        .then((response) => console.log(response.data));
    } else {
      await axios
        .put(`https://server-ut-ratchadaphon.vercel.app/riceVariety/edit1/${id}`, formData, config)
        .then((response) => {
          console.log(response.data);
        });
    }

    Swal.fire({
      title: "แก้ไขสำเสร็จ",
      icon: "success",
    }).then((result) => {
      result.isConfirmed ? window.location.reload() : null;
    });
  };

  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={handleModal}
      >
        <div className="hover:bg-orange-400 rounded-md bg-orange-100 text-orange-500 hover:text-white w-8 h-8 flex justify-center items-center border border-orange-200">
          <FaRegEdit className="w-5 h-5" />
        </div>
      </button>

      {modal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-3xl max-h-full">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  แก้ไขพันธุ์ข้าว
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleModal}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>
              <form
                className="p-4 md:p-5 flex flex-col space-y-4"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-900 text-sm">
                    <label
                      htmlFor="name"
                      className="font-medium mb-2 w-1/4 text-start"
                    >
                      ชื่อพันธุ์
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                    />
                  </div>
                  <div className="flex items-center text-gray-900 text-sm">
                    <label
                      htmlFor="yield"
                      className="font-medium mb-2 w-1/4 text-start"
                    >
                      ผลผลิต
                    </label>
                    <input
                      type="text"
                      name="yield"
                      id="yield"
                      value={yield_rice}
                      onChange={(e) => setYield(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                    />
                    กก./ไร่
                  </div>
                  <div className="flex items-center text-gray-900 text-sm">
                    <label
                      htmlFor="type"
                      className="font-medium mb-2 w-1/4 text-start"
                    >
                      ชนิด
                    </label>
                    <select
                      name="type"
                      id="type"
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                      required
                    >
                      <option value="">เลือกชนิด</option>
                      <option value="ข้าวเจ้า">ข้าวเจ้า</option>
                      <option value="ข้าวเหนียว">ข้าวเหนียว</option>
                    </select>
                  </div>
                  <div className="flex items-center text-gray-900 text-sm text-start">
                    <label
                      htmlFor="photosensitivity"
                      className="font-medium mb-2 w-1/4"
                    >
                      ความไวแสง
                    </label>
                    <select
                      name="photosensitivity"
                      id="photosensitivity"
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                      onChange={(e) => setPhotosensitivity(e.target.value)}
                      value={photosensitivity}
                      required
                    >
                      <option value="">เลือกความไวแสง</option>
                      <option value="ไวต่อช่วงแสง">ไวต่อช่วงแสง</option>
                      <option value="ไม่ไวต่อช่วงแสง">ไม่ไวต่อช่วงแสง</option>
                    </select>
                  </div>
                  <div className="flex items-center text-gray-900 text-sm">
                    <label
                      htmlFor="age"
                      className="font-medium  mb-2 w-1/4 text-start"
                    >
                      อายุเก็บเกี่ยว
                    </label>
                    <input
                      type="text"
                      name="age"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                    />
                  </div>
                  
                  <div className="flex items-center text-gray-900 text-sm">
                    <label
                      htmlFor="height"
                      className="font-medium  mb-2 w-1/4 text-start"
                    >
                      ความสูงเฉลี่ย
                    </label>
                    <input
                      type="text"
                      name="height"
                      id="height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 w-1/3 md:w-2/4"
                    />
                    ซม.
                  </div>
                  <div className="flex text-sm text-gray-900">
                    <label
                      htmlFor="stability"
                      className="font-medium  mb-2 w-1/4 text-start"
                    >
                      ลักษณะเด่น
                    </label>
                    <textarea
                      type="text"
                      name="stability"
                      id="stability"
                      value={stability}
                      onChange={(e) => setStability(e.target.value)}
                      required
                      className="bg-gray-50 border border-gray-300 rounded-lg p-2.5 mr-2 h-24 w-1/3 md:w-2/4"
                    ></textarea>
                  </div>
                  <div className="flex text-gray-900 text-sm">
                    <label
                      htmlFor="precautions"
                      className="font-medium w-1/4 text-start"
                    >
                      ข้อควรระวัง
                    </label>
                    <textarea
                      type="text"
                      name="precautions"
                      id="precautions"
                      required
                      value={precautions}
                      onChange={(e) => setPrecautions(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 h-24 w-1/3 md:w-2/4"
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <label
                      htmlFor="image"
                      className="text-sm font-medium text-gray-900 w-1/4 mr-2 text-start"
                    >
                      รูปภาพใหม่
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={clickChangeImg}
                      className="rounded-lg p-2.5"
                    />
                  </div>
                </div>

                <div className="flex justify-center text-gray-900">
                  {imageURL ? (
                    <div>
                      แสดงรูปภาพใหม่
                      <img src={`${imageURL}`} className="w-72 h-48 pt-2" />
                    </div>
                  ) : (
                    <div>
                      แสดงรูปภาพเดิม
                      <img
                        src={`https://server-ut-ratchadaphon.vercel.app/${image}`}
                        className="w-72 h-48 pt-2"
                      />
                    </div>
                  )}
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
                    className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                    onClick={handleModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

EditRiceVariety.propTypes = {
  id: PropTypes.number,
};

export default EditRiceVariety;
