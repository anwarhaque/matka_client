import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Axios from '../../api/Axios';
import { convertTimeTo12HourFormat } from '../../helper/Helper';
import Notifier from '../Notifier';


const Game = () => {

  const [drow, setDrow] = useState({})
  const [loading, setLoading] = useState(true)
  const { drowId } = useParams()

  const getPattiToNum = (patti) => {
    const sum = patti.split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    return sum % 10;
  }

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

            <div className="card drow-card">
              <div className="card-header">
                <div className="d-flex justify-content-center">
                  <span className='play-btn'>
                    <Link to={`./OPEN`} className="text-white">Open Round</Link>
                  </span>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="row text-white content-fixed">
                  <div className="d-flex justify-content-center mb-4">
                    <span>{drow.name}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span >{convertTimeTo12HourFormat(drow.openTime)}</span>
                    {!drow?.todaysGameResults && (
                      <span className="result-patti">
                        <span className="dash">---</span>
                        <span className="result-number">XX</span>
                        <span className="dash">---</span>
                      </span>
                    )}
                    {drow?.todaysGameResults && (

                      <span className="result-patti">
                        <span className="dash">{drow?.todaysGameResults?.openPatti || '---'}</span>
                        <span className="result-number">
                          {drow?.todaysGameResults?.openPatti ? getPattiToNum(drow?.todaysGameResults?.openPatti) : 'X'}
                          {drow?.todaysGameResults?.closePatti ? getPattiToNum(drow?.todaysGameResults?.closePatti) : 'X'}
                        </span>

                        <span className="dash">{drow?.todaysGameResults?.closePatti ? drow?.todaysGameResults?.closePatti : '---'}</span>
                      </span>

                    )}
                    <span >{convertTimeTo12HourFormat(drow.closeTime)}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer ">
                <div className='d-flex justify-content-center'>
                  <span className='play-btn'>
                    <Link to={`./CLOSE`} className="text-white">Close Round</Link>
                  </span>
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