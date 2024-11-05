import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Notifier from '../Notifier';
import Axios from '../../api/Axios';
import { convertTimeTo12HourFormat } from '../../helper/Helper';


const DrowList = () => {
    const [drowList, setDrowList] = useState([]);
    const [loading, setLoading] = useState(true);


    const getDrowList = async () => {

        try {
            
            const { data } = await Axios.get('/drow/list', {
                params: {
                    status: "ACTIVE"
                }
            });

            setDrowList(data)
        } catch (err) {
            Notifier(err.meta.msg, 'Error')
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getDrowList();
    }, []);

    return (
        <div className="row">
            {
                loading ? (<p>Loading..</p>) : (
                    drowList.map((item) => (
                        <div className="col-12 col-md-4" key={item._id}>
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-center">
                                        <h5 className="card-title mb-0">{item.name}</h5>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row ">
                                        <div className="d-flex justify-content-between h4">
                                            <span >{convertTimeTo12HourFormat(item.openTime)}</span>
                                            <span > -XX-</span>
                                            <span >{convertTimeTo12HourFormat(item.closeTime)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer ">
                                    <div className='d-flex justify-content-center'>
                                        <Link to={`./${item._id}`} className="btn btn-primary">Play Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
}

export default DrowList