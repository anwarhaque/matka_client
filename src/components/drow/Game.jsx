import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Axios from '../../api/Axios';
import { convertTimeTo12HourFormat } from '../../helper/Helper';
import Notifier from '../Notifier';


const Game = () => {

  const [drow, setDrow] = useState({})
  const [loading, setLoading] = useState(true)
  const { drowId } = useParams()

  const getDrow = async () => {

    try {

      const { data } = await Axios.get(`/drow/details/${drowId}`);
      setDrow(data)
    } catch (err) {
      Notifier(err.meta.msg, 'Error')
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getDrow();
  }, [drowId]);

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        {
          loading ? (<p>Loading...</p>) : (
           
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-center">
                  <Link to={`./OPEN`} className="btn btn-primary">Open Round</Link>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="row">
                  <div className="d-flex justify-content-center mb-4 h4">
                    <h4>{drow.name}</h4>
                  </div>
                  <div className="d-flex justify-content-between h3">
                    <span >{convertTimeTo12HourFormat(drow.openTime)}</span>
                    <span >-XX-</span>
                    <span >{convertTimeTo12HourFormat(drow.closeTime)}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <div className='d-flex justify-content-center'>
                  <Link to={`./CLOSE`} className="btn btn-primary">Close Round</Link>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Game