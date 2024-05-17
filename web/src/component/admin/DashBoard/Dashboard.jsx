import { useTheme } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import './index.scss'
import { getAllUser, getAllDetailAboutChatApp, logOutUser } from "../../../service/UserService";
import Month from "../Month/Month";
import AllDetail from "../AllDetail/AllDetail";
import User from "../User/User";
const Dashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [allDetail, setAllDetail] = useState({});
    const [choose, setChoose] = useState('all-detail');
    const [error, setError] = useState('');
    const [selectUser, setSelectUser] = useState('');
    const [dataFromChild, setDataFromChild] = useState('');

    const handleDataFromChild = (data) => {
        setChoose(data);
    };

    console.log(choose);
    useEffect(() => {

        const fetchData = async () => {
            try {

                const userList = await getAllUser();
                const allDetail = await getAllDetailAboutChatApp();
                setAllDetail(allDetail.DT)
                setData(userList.DT);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setError(error);
            } finally {
            }
        };

        fetchData();
    }, []);
    // console.log(allDetail);
    const handleLogOut = async () => {
        const logOut = await logOutUser()
        if (logOut.EC === 0) {
            navigate('/admin/login')
        }
        console.log(logOut);
    }
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
                            <Link href="#" onClick={() => setChoose('all-detail')}>
                                <i className="ph-browsers"></i>
                                <span style={{ marginTop: ' 50px ' }}>Dashboard</span>
                            </Link>
                            <Link href="#" onClick={() => setChoose('all')}>
                                <i className="ph-check-square"></i>
                                <span>Danh sách người dùng</span>
                            </Link>
                            <Link href="#" onClick={() => setChoose('month')}>
                                <i className="ph-file-text"></i>
                                <span>Thống kê theo tháng </span>
                            </Link>
                            <Link href="#" onClick={() => handleLogOut()}>
                                <i className="ph-file-text"></i>
                                <span>Đăng xuất</span>
                            </Link>
                        </nav>
                        <footer className="footer">
                            <div>HUY ©<br />
                                All Rights Reserved 2024
                            </div>
                        </footer>
                    </div>
                    <div className="app-body-main-content">
                        <section className="transfer-section">
                            {choose == 'all-detail' && <AllDetail allDetail={allDetail} />}
                            {choose == 'all' && <div className="transfers">
                                <div className="transfer">
                                    Ảnh đại diện
                                    <dl className="transfer-details">
                                        <div>
                                            <dt>Tên</dt>
                                        </div>
                                        <div>
                                            <dt>Số điện thoại</dt>
                                        </div>
                                        <div>
                                            <dt>Tổng số tin nhắn đã gửi</dt>
                                        </div>
                                        <div>
                                            <dt>Tổng số hình ảnh đã gửi</dt>
                                        </div>
                                        <div>
                                            <dt>Dung lượng đã sử dụng</dt>
                                        </div>
                                    </dl>
                                </div>
                                {data.map((item) => {
                                    return (
                                        <User key={item._id} onData={setChoose} data={item} />
                                    )
                                })
                                }
                            </div>}
                            {
                                choose == 'month' && <Month />
                            }
                        </section>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Dashboard;
