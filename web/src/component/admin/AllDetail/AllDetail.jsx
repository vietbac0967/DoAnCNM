import './AllDetail.scss'
import 'font-awesome/css/font-awesome.min.css';
function AllDetail(props) {
    // console.log(props.allDetail.countUser);
    return (
        // <div className="transfers">
        //     <div className="transfer">
        //         <dl className="transfer-details">
        //             <div>
        //                 <dt>Tổng số người dùng</dt>
        //             </div>
        //             <div>
        //                 <dt>Tổng số tin nhắn đã gửi</dt>
        //             </div>
        //             <div>
        //                 <dt>Tổng cuộc hội thoại</dt>
        //             </div>
        //             <div>
        //                 <dt>Tổng Số nhóm được tạo</dt>
        //             </div>
        //         </dl>
        //     </div>
        //     <div className="transfer">
        //         <dl className="transfer-details">
        //             <div>
        //                 <dt>{props.allDetail.countUser}</dt>
        //             </div>
        //             <div>
        //                 <dt>{props.allDetail.countMessage}</dt>
        //             </div>
        //             <div>
        //                 <dt>{props.allDetail.countConversation}</dt>
        //             </div>
        //             <div>
        //                 <dt>{props.allDetail.countGroup}</dt>
        //             </div>

        //         </dl>
        //     </div>
        // </div>
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="card-box bg-blue">
                        <div className="inner">
                            <h3>{props.allDetail.countUser}</h3>
                            <p>Tổng số người dùng</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card-box bg-green">
                        <div className="inner">
                            <h3>{props.allDetail.countMessage}</h3>
                            <p>Tổng số tin nhắn đã gửi</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-comments-o" aria-hidden="true"></i>
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card-box bg-orange">
                        <div className="inner">
                            <h3>{props.allDetail.countConversation}</h3>
                            <p>Tổng cuộc hội thoại</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-comments" aria-hidden="true"></i>
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>

                <div className="col-3">
                    <div className="card-box bg-red">
                        <div className="inner">
                            <h3>{props.allDetail.countGroup}</h3>
                            <p>Tổng Số nhóm được tạo</p>
                        </div>
                        <div className="icon">
                            <i className="fa fa-users"></i>
                        </div>
                        <a href="#" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDetail