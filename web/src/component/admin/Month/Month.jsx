import React, { useEffect, useState } from 'react'
import { getNewRegisterUsers } from '../../../service/UserService';

function Month() {
    const [dataUser, setDataUser] = useState([])
    const [user, setUser] = useState()
    const [error, setError] = useState('');
    const currentMonth = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Cộng thêm 1 vì tháng được đánh số từ 0
        return parseInt(currentMonth, 10);
    }
    const currentYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); // Cộng thêm 1 vì tháng được đánh số từ 0
        return parseInt(currentYear, 10);
    }
    const monthChange = (e) => {
        setMonth(e.target.value)
    }
    const yearChange = (e) => {
        setYear(e.target.value)
    }
    const [month, setMonth] = useState(currentMonth());
    const [year, setYear] = useState(currentYear());
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNewRegisterUsers(month, year);
                console.log(data);
                // console.log(123);
                setDataUser(data.DT)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error);
            } finally {
            }
        };

        fetchData();
    }, [month, year]);
    console.log(dataUser);
    let arrlength = dataUser?.length
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '500px ' }} s>
                    <p style={{ color: '#fff' }}> Chọn tháng</p>
                    <input type='number' onChange={monthChange} value={month} />
                </div>
                <div>
                    <p style={{ color: '#fff' }}>Chọn năm</p>
                    <input type='number' onChange={yearChange} value={year} />
                </div>

            </div>
            <div className="transfer">
                <dl className="transfer-details">
                    <div>
                        <dt style={{ marginTop: '20px' }}>Số lượng người dùng mới trong tháng:{arrlength}</dt>
                    </div>
                </dl>
            </div>

        </div>
    )
}

export default Month