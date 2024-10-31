import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Notifier from '../../Notifier';
import Axios from '../../../api/Axios';

const DrowList = () => {
    const [drowList, setDrowList] = useState([]);
    const [loading, setLoading] = useState(true);


    const getDrowList = async () => {
        try {
            const { data } = await Axios.get('/drow/list');
            setDrowList(data)
        } catch (err) {
            Notifier(err.meta.msg, 'Error')
        } finally {
            setLoading(false);
        }
    };


    const handleCheckboxChange = async (item) => {
        try {
            const res = await Axios.put(`/drow/status/${item._id}`, {
                status: item.status == 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE'
            });
            Notifier(res.meta.msg, 'Success')
            getDrowList()
        } catch (err) {
            Notifier(err.meta.msg, 'Error')
        }
    };
    const handleDelete = async (item) => {
        try {
            const res = await Axios.delete(`/drow/delete/${item._id}`);
            Notifier(res.meta.msg, 'Success')
            getDrowList()
        } catch (err) {
            Notifier(err.meta.msg, 'Error')
        }
    };


    useEffect(() => {
        getDrowList();
    }, []);

    return (
        <div className="row">

            <div className="col-12 col-md-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-center">
                            <h5 className="card-title mb-0">Kalyan</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="d-flex justify-content-between">
                                <span >03:15 PM</span>
                                <span >126 -98- 378</span>
                                <span >05:15 PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <div className='d-flex justify-content-center'>
                            <Link to={`./${1}`} className="btn btn-primary">Play Now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-center">
                            <h5 className="card-title mb-0">Yatra</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row ">
                            <div className="d-flex justify-content-between">
                                <span >03:15 PM</span>
                                <span >-XX-</span>
                                <span >05:15 PM</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className='d-flex justify-content-center'>
                            <Link to={`./${2}`} className="btn btn-primary">Play Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DrowList