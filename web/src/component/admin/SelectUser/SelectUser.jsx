import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getFriendsFollowMonthAndYear, getUserById, } from '../../../service/UserService';

function SelectUser() {
    const { id } = useParams()
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
    const [month, setMonth] = useState(currentMonth());
    const [year, setYear] = useState(currentYear());

    const monthChange = (e) => {
        setMonth(parseInt(e.target.value, 10))
    }
    const yearChange = (e) => {
        setYear(parseInt(e.target.value, 10))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFriendsFollowMonthAndYear(id, month, year);
                const userData = await getUserById(id)
                setUser(userData.DT);
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
    }, [id, month, year]);
    console.log(user);
    return (
        <div className="body-dashboard">
            <div className="app-dashboard">
                <header className="app-header">
                    <div className="app-header-logo">
                        <div className="logo">
                            <h1 className="logo-title">
                                <span>SurpriseMessage</span>
                                <span>Dashboard</span>
                            </h1>
                        </div>
                    </div>
                    <div className="app-header-navigation">

                    </div>
                    <div className="app-header-actions">
                        <button className="user-profile">
                            <span>Admin</span>
                            <span>
                                <img src="https://avatar.iran.liara.run/public/boy?username=admin" />
                            </span>
                        </button>
                    </div>
                    <div className="app-header-mobile">
                        <button className="icon-button large">
                            <i className="ph-list"></i>
                        </button>
                    </div>

                </header>
                <div className="app-body">
                    <div className="app-body-navigation">
                        <nav className="navigation">
                            <Link to="/admin" >
                                <i className="ph-browsers"></i>
                                <span style={{ marginTop: ' 50px ' }}>Dashboard</span>
                            </Link>
                            {/* <Link to="/admin">
                                <i className="ph-check-square"></i>
                                <span>Danh sách người dùng</span>
                            </Link>
                            <Link to="/admin" >
                                <i className="ph-file-text"></i>
                                <span>Thống kê theo tháng </span>
                            </Link> */}
                        </nav>
                        <footer className="footer">
                            <div>HUY ©<br />
                                All Rights Reserved 2024
                            </div>
                        </footer>
                    </div>

                    <div className="app-body-main-content">
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '500px ' }}>
                                <p style={{ color: '#fff' }}>Chọn tháng</p>
                                <input type='number' onChange={monthChange} value={month} />
                            </div>

                            <div>
                                <p style={{ color: '#fff' }}>Chọn năm</p>
                                <input type='number' onChange={yearChange} value={year} />
                            </div>

                        </div>
                        <section className="transfer-section">
                            <div className="transfer">
                                Ảnh đại diện
                                <dl className="transfer-details">
                                    <div>
                                        <dt>Tên</dt>
                                    </div>
                                    <div>
                                        <dt>Số tin nhắn đã gửi</dt>
                                    </div>
                                    <div>
                                        <dt>Bạn mới</dt>
                                    </div>
                                    <div>
                                        <dt>Nhóm mới</dt>
                                    </div>
                                </dl>
                            </div>
                            {dataUser.length > 0 && (
                                <div className="transfer">
                                    <div className="transfer-logo">
                                        <img src={user.avatar} />
                                    </div>
                                    <dl className="transfer-details">
                                        <div>
                                            <dt>{user.name}</dt>
                                        </div>
                                        <div>
                                            <dt>{dataUser[0].messages.length}</dt>
                                        </div>
                                        <div>
                                            <dt>{dataUser[0].participants.length}</dt>
                                        </div>
                                        <div>
                                            <dt>{dataUser[0].participantsGroup.length}</dt>
                                        </div>
                                    </dl>
                                </div>
                            )}
                        </section>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SelectUser