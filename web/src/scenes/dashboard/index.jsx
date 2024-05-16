import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import './index.scss'
import User from "./User";
import axios from "axios";
import { getAllUser, getAllDetailAboutChatApp } from "../../service/UserService";
import AllDetail from "./AllDetail/AllDetail";
import Month from "./Month/Month";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [allDetail, setAllDetail] = useState({});
  const [choose, setChoose] = useState('all-detail');
  const [error, setError] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [dataFromChild, setDataFromChild] = useState('');

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // console.log(choose);
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
  console.log(allDetail);
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
              <a href="#" onClick={() => setChoose('all-detail')}>
                <i className="ph-browsers"></i>
                <span>Dashboard</span>
              </a>
              <a href="#" onClick={() => setChoose('all')}>
                <i className="ph-check-square"></i>
                <span>Danh sách người dùng</span>
              </a>
              <a href="#" onClick={() => setChoose('month')}>
                <i className="ph-file-text"></i>
                <span>Thống kê theo tháng </span>
              </a>
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
                    <User onData={setChoose} data={item} />
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
