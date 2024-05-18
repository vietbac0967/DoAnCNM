import React, { useEffect, useRef, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import "./Home.scss";
import HomeListFrient from "./listfrient/HomeListFrient";
import Message from "./message/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCusttomClient,
  handlerefreshAccount,
  handlerefreshMessange,
  handlerefreshMessangeingroup,
  handlerefreshMessangesennder,
  handlerefreshinfoAll,
  handleuserjoingroup,
  handleuserleavegroup,
} from "../../socket/socket";
import { fechUserToken } from "../../redux/UserSlice";
import _ from "lodash";
import { getAllMessage, getMessagesGroup } from "../../service/MessageService";
import { getConverstations } from "../../service/ConverstationService";

const Home = (props) => {
  const { user, setuser } = props;
  const [page, setpage] = useState(1);

  const theme = useTheme();
  const mdup = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.userisaccess.account);

  const [showchat, setshowchat] = useState(false);
  // const [user, setuser] = useState({})

  useEffect(() => {
    if (mdup) {
      setshowchat(false);
    }
  }, [mdup]);

  useEffect(() => {
    if (dataredux) {
      handleCusttomClient({ customId: dataredux.phoneNumber });

      handlerefreshAccount(() => {
        dispatch(fechUserToken());
      });
    }
  }, [dataredux]);

  useEffect(() => {
    if (dataredux) {
      handleCusttomClient({ customId: dataredux.phoneNumber });

      handlerefreshAccount(() => {
        dispatch(fechUserToken());
      });

      if (user) {
        if (user.type === "group") {
          let data = {
            groupId: user._id._id,
            user: dataredux.phoneNumber,
            namegroup: user.name,
          };
          handleuserleavegroup(data);
        } else {
          if (!user.phoneNumber) {
            let data = {
              groupId: user._id,
              user: dataredux.phoneNumber,
              namegroup: user.name,
            };
            handleuserleavegroup(data);
          }
        }
      }
      setuser({});
    }
  }, []);

  return (
    <Grid className="home-container" container spacing={0} columns={12}>
      <Grid
        className="home-frient"
        item
        xs={12}
        sm={12}
        md={3}
        display={showchat ? "none" : { md: "block" }}
      >
        <HomeListFrient
          dataredux={dataredux}
          showchat={showchat}
          setshowchat={setshowchat}
          setuser={setuser}
          mdup={mdup}
          users={user}
          setpage={setpage}
        />
      </Grid>
      <Grid
        className="home-message"
        item
        xs={12}
        sm={12}
        md={9}
        display={showchat ? "block" : { sm: "none", md: "block", xs: "none" }}
      >
        {user && !_.isEmpty(user) ? (
          <Message
            showchat={showchat}
            setshowchat={setshowchat}
            mdup={mdup}
            users={user}
            setusers={setuser}
            setpage={setpage}
            page={page}
            dataredux={dataredux}
          />
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
