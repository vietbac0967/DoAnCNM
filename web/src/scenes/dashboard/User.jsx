import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getNumberOfSendImage, getNumberOfSendMessaages, getTotalDataSizeOfUser } from '../../service/UserService';

function User(props) {
    // console.log(props.data)
    const [numberOfSendMessaages, setNumberOfSendMessaages] = useState();
    const [numberOfSendImg, setNumberOfSendImg] = useState();
    const [numberOfNewFriends, setNumberOfNewFriends] = useState();
    const [totalDataSizeOfUser, setTotalDataSizeOfUser] = useState();
    const [error, setError] = useState('');
    const userId = props.data._id;
    function bytesToMB(bytes, decimalPlaces = 2) {
        const MB = bytes / 1048576; // 1 MB = 1,048,576 bytes
        return MB.toFixed(decimalPlaces);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const numberOfSendMessaages = await getNumberOfSendMessaages(userId);
                const numberOfSendImg = await getNumberOfSendImage(userId);
                const totalDataSizeOfUser = await getTotalDataSizeOfUser(userId);
                // setUserDetail(userDetail.DT);
                setNumberOfSendMessaages(numberOfSendMessaages.DT)
                setNumberOfSendImg(numberOfSendImg.DT)
                setTotalDataSizeOfUser(totalDataSizeOfUser.DT)
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
    return (
        <div className="transfer">
            <div className="transfer-logo">
                <img src={props.data.avatar} />
            </div>
            <dl className="transfer-details">
                <div>
                    <a href={`/admin/selectUser/${props.data._id}`} >
                        <dt>{props.data.name}</dt>
                    </a>
                </div>
                <div>
                    <dt>{props.data.phoneNumber}</dt>
                </div>
                <div>
                    <dt>{numberOfSendMessaages}</dt>
                </div>
                <div>
                    <dt>{numberOfSendImg}</dt>
                </div>
                <div>
                    <dt>{bytesToMB(totalDataSizeOfUser)}Mb</dt>
                </div>

            </dl >
        </div >
    )
}

export default User