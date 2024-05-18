import React, { useEffect, useState } from "react";
import {
  getNumberOfSendImage,
  getNumberOfSendMessaages,
  getTotalDataSizeOfUser,
} from "../../../service/UserService";

function User(props) {
  return (
    <>
      <div className="transfers">
        <div className="transfer">
          Ảnh đại diện
          <dl className="transfer-details">
            <div>
              <dt>Tên</dt>
            </div>
            <div>
              <dt>Số điện thoại</dt>
            </div>
          </dl>
        </div>
        {props.data.map((item) => {
          return (
            <>
              <div className="transfer">
                <div className="transfer-logo">
                  <img src={item.avatar} />
                </div>
                <dl className="transfer-details">
                  <div>
                    <a href={`/admin/selectUser/${item._id}`}>
                      <dt>{item.name}</dt>
                    </a>
                  </div>
                  <div>
                    <dt>{item.phoneNumber}</dt>
                  </div>
                </dl>
              </div>
            </>
          );
        })}
        {/* {data.map((item) => {
                    return (
                      <User key={item._id} onData={setChoose} data={item} />
                    );
                  })} */}
      </div>
    </>
  );
}

export default User;
