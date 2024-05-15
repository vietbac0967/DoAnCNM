import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {
    getNumberOfSendMessaages,
    getNumberOfSendImage, getNumberOfNewFriends,
    getTotalDataSizeOfUser
} from "../../service/UserService";
import BasicTable from './components/BasicTable';

function UserDetail() {
    const location = useLocation();
    const userId = location.state;
    const [numberOfSendMessaages, setNumberOfSendMessaages] = useState();
    const [numberOfSendImg, setNumberOfSendImg] = useState();
    const [numberOfNewFriends, setNumberOfNewFriends] = useState();
    const [totalDataSizeOfUser, setTotalDataSizeOfUser] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const numberOfSendMessaages = await getNumberOfSendMessaages(userId);
                const numberOfSendImg = await getNumberOfSendImage(userId);
                const totalDataSizeOfUser = await getTotalDataSizeOfUser(userId);
                // setUserDetail(userDetail.DT);
                console.log(numberOfSendMessaages, numberOfSendImg, totalDataSizeOfUser)
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
    console.log(numberOfSendMessaages,)
    return (
        <BasicTable />
    )
}

export default UserDetail