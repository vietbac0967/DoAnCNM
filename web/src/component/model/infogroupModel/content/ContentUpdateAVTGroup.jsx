import { Box, Button, CircularProgress, Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import './ContentUpdateAVTGroup.scss'
import ImageIcon from '@mui/icons-material/Image';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../../redux/UserSlice';
import { updateAVTGroup } from '../../../../service/GroupService';

const ContentUpdateAVTGroup = (props) => {

    const { handleCloseModel, user } = props;

    const [image, setImage] = useState(null);
    const [fileupdate, setfileupdate] = useState(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setfileupdate(file);
            let ObjectURL = URL.createObjectURL(file);
            setImage(ObjectURL)
        }
    };

    const handleUpdateAVT = async (e) => {
        if (fileupdate) {
            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }
            const formData = new FormData();
            formData.append("image", fileupdate);
            if (user && user.type === "group") {
                formData.append("groupId", user._id._id);
            } else {
                formData.append("groupId", user._id);
            }
            let res = await updateAVTGroup(formData)
            if (res && res.EC === 0) {
                setSuccess(true);
                setLoading(false);
                toast.success("Cập nhật avatar thành công")
                handleCloseModel();
                dispatch(fechUserToken())
            } else {
                toast.success("Cập nhật avatar thất bại")
            }
        } else {
            toast.error("Vui lòng chọn ảnh để thực hiện update");
        }
    }


    return (
        <Box
            className="info-body-update-img"
        >
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <Box className="btn-update-img">
                    <input id='previewImg' type='file' hidden onChange={(e) => handleImageChange(e)} />
                    <label className='action-update-img-parent' htmlFor="previewImg">
                        <Box className='action-update-img'>
                            <span className='text-upload-img'>
                                <ImageIcon /> Tải ảnh lên
                            </span>
                        </Box>
                    </label>
                </Box>
                <Box className="div-img-update">
                    <span className='text-img-avt'>
                        Ảnh đại diện của tôi
                    </span>
                    <Box className="div-img">
                        <Box className="bg-img"
                            style={{ backgroundImage: `url(${image})` }}
                        >

                        </Box>
                    </Box>
                </Box>
                <Divider />
                <Box className="btn-save-action">
                    <Button
                        variant='outlined'
                        sx={{ marginRight: "5px" }}
                        disabled={loading}
                        onClick={handleUpdateAVT}
                    >
                        Lưu
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: 'green',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>

            </Scrollbars>
        </Box>
    );
};

export default ContentUpdateAVTGroup;