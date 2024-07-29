import axios from 'axios';
import { useState, useEffect } from 'react';

const TestCors = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ฟังก์ชันที่ใช้ในการดึงข้อมูล
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-ut-ratchadaphon.vercel.app/riceVariety');
        console.log(response.data[0]);
        setUser(response.data[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    // fetch("/api/user").then(res=> res.json()).then((result) => {
    //     setUser(result)
    // })
  }, []);
  if (!user) {
    return <p>กำลังโหลด...</p>
  }

  return (
    <div>
      <h1>Hello World</h1>
      <h2>{user.name}</h2>
      <img src={`https://server-ut-ratchadaphon.vercel.app/${user.image}`} alt="" />
    </div>
  );
};

export default TestCors;
