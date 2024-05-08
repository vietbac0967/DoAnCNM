import { useState } from "react";

const FileViewer = (props) => {

    const { open, setopen, handleCloseFile } = props;

    return (
        <div>
            {open ? (
                <FullScreenViewer fileUrl={"https://res.cloudinary.com/dujylxkra/raw/upload/v1715007482/files/DataGrid.xlsx"} onClose={handleCloseFile} />
            ) : (
                <iframe src={"https://res.cloudinary.com/dujylxkra/raw/upload/v1715007482/files/DataGrid.xlsx"} width="600" height="400" frameBorder="0"></iframe>
            )}
        </div>
    );
};

const FullScreenViewer = (props) => {

    const { open, setopen, handleCloseFile } = props;


    return (
        <div className="fullscreen-overlay">
            <button onClick={handleCloseFile} className="close-button">
                Close
            </button>
            <iframe src={fileUrl} width="100%" height="100%" frameBorder="0"></iframe>
        </div>
    );
};

export default FileViewer;