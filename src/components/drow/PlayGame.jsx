import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Notifier from '../Notifier'
import Axios from '../../api/Axios'
import { useAuth } from '../../context/AuthContext'

const PlayGame = () => {

  const [seconds, setSeconds] = useState(0);
  const [remainingHours, setRemainingHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [remainingSec, setRemainingSec] = useState(0);
  const [gameList, setGameList] = useState([])
  const [drow, setDrow] = useState({})
  const [loading, setLoading] = useState(true)
  const { drowId, roundType } = useParams()

  const [num, setNum] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedField, setSelectedField] = useState('')

  const { currentUser, setCurrentUser } = useAuth()
  const navigate = useNavigate()


  const getListGame = async () => {

    try {

      const { data } = await Axios.get(`/game/list`, {
        params: {
          drowId,
          roundType: roundType.toUpperCase()
        }
      });
      setGameList(data)

    } catch (err) {
      Notifier(err.meta.msg, 'Error')
    } finally {
      setLoading(false);
    }
  };

  const isTimePassed = (hour, minute) => {
    // debugger
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hour, minute, 0, 0); // Set target time (hours, minutes, seconds, ms)
    // Compare the current time with the target time
    if (now > targetTime) {

      return true; // Time has passed
    } else {

      return false; // Time hasn't passed
    }
  }
  const handleOk = async () => {

    if (seconds <= 0) {
      Notifier('Round is Lock', 'Error')
      return  // Time has passed
    }

    const createData = {
      num: num,
      amount: Number(amount),
      roundType,
      drowId
    }

    if (amount == 0)
      return

    try {


      const { client } = await Axios.post(`/game/add`, createData);
      setCurrentUser((pre) => ({ ...pre, limit: client.limit }))
      getListGame()
      setNum('')
      setAmount('')
    } catch (err) {
      console.log(err);

      Notifier(err?.meta?.msg, 'Error')
    }

  }


  const calculateTimeRemaining = (targetHour, targetMinute) => {
    const now = new Date();
    const targetTime = new Date();

    // Set target time to today at the specified hour and minute
    targetTime.setHours(targetHour, targetMinute, 0, 0);

    // If the target time has already passed for today, set it to the same time tomorrow
    if (targetTime <= now) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    return Math.floor((targetTime - now) / 1000); // Time difference in seconds
  };


  const getDrow = async () => {

    try {

      const { data } = await Axios.get(`/drow/details/${drowId}`);
      setDrow(data)

      if (roundType?.toUpperCase() == 'OPEN') {
        const [hour, minute] = data.openTime.split(':')
        if (isTimePassed(hour, minute)) {
          return  // Time has passed
        }

        const remainingSec = calculateTimeRemaining(hour, minute)
        setSeconds(remainingSec)

      }
      else if (roundType?.toUpperCase() == 'CLOSE') {
        const [hour, minute] = data.closeTime.split(':')
        if (isTimePassed(hour, minute)) {
          return  // Time has passed
        }
        const remainingSec = calculateTimeRemaining(hour, minute)
        setSeconds(remainingSec)
      }

    } catch (err) {
      Notifier(err.meta.msg, 'Error')
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");

    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
    // const date = new Date(dateString);
    // return date.toLocaleDateString('en-GB'); // en-GB formats the date as "dd/mm/yyyy"
  };



  useEffect(() => {
    getDrow();
    getListGame()
    if (roundType.toUpperCase() != 'OPEN' && roundType?.toUpperCase() != 'CLOSE') {
      navigate('../')
    }
  }, [drowId]);

  useEffect(() => {
    if (seconds >= 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      setRemainingHours(Math.floor(seconds / 3600));
      setRemainingMinutes(Math.floor((seconds % 3600) / 60));
      setRemainingSec(seconds % 60);
      return () => clearTimeout(timerId);
    }
  }, [seconds]);


  const handleDelete = async (gameId) => {
    try {
      const { meta, client } = await Axios.delete(`/game/delete/${gameId}`);
      setCurrentUser((pre) => ({ ...pre, limit: client.limit }))
      Notifier(meta?.msg, 'Success')
      getListGame()
    } catch (err) {
      Notifier(err?.meta?.msg, 'Error')
    }

  }

  return (
    <>
      {
        loading ? (<p>Loading...</p>) : (
          <div>
            <h3 className='keypad-h3'>{drow.name} ({roundType})</h3>
            <h3 className='keypad-h3'>
              Lock Time
              <div>
                <span id="demo">
                  <span className="hours">{remainingHours}</span>
                  <span className="blink_black">:</span>
                  <span className="min">{remainingMinutes}</span>
                  <span className="blink_black">:</span>
                  <span className="second">{remainingSec}</span>
                </span>
              </div>
            </h3>
            <table className='keypad-table' style={{ margin: "0 auto" }}>
              <tbody>
                <tr>
                  <td>
                    <input type="text" className="inputnumber keypad-num-input hover-input" name="number"
                      value={num}
                      onFocus={() => setSelectedField('num')}
                      readOnly
                      min="0" placeholder="Num" id="number" />
                  </td>
                  <td colSpan="2">
                    <input type="number" className="inputamount keypad-amount-input hover-input" min="0" name="amount"
                      value={amount}
                      onFocus={() => setSelectedField('amount')}
                      readOnly
                      placeholder="Amount" id="amount" />
                  </td>
                </tr>
                <tr>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 1);
                    if (selectedField === 'amount') setAmount((prev) => prev + 1);
                  }}>1</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 2);
                    if (selectedField === 'amount') setAmount((prev) => prev + 2);
                  }}>2</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 3);
                    if (selectedField === 'amount') setAmount((prev) => prev + 3);
                  }}>3</td>
                </tr>
                <tr>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 4);
                    if (selectedField === 'amount') setAmount((prev) => prev + 4);
                  }}>4</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 5);
                    if (selectedField === 'amount') setAmount((prev) => prev + 5);
                  }}>5</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 6);
                    if (selectedField === 'amount') setAmount((prev) => prev + 6);
                  }}>6</td>
                </tr>
                <tr>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 7);
                    if (selectedField === 'amount') setAmount((prev) => prev + 7);
                  }}>7</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 8);
                    if (selectedField === 'amount') setAmount((prev) => prev + 8);
                  }}>8</td>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 9);
                    if (selectedField === 'amount') setAmount((prev) => prev + 9);
                  }}>9</td>
                </tr>
                <tr>
                  <td className="keypad" id="input1" onClick={() => {
                    if (selectedField === 'num') setNum((prev) => prev + 0);
                    if (selectedField === 'amount') setAmount((prev) => prev + 0);
                  }}> 0 </td>
                  <td className='keypad-clear' onClick={() => {
                    if (selectedField === 'num') setNum('');
                    if (selectedField === 'amount') setAmount('');
                  }}>  CLEAR</td>
                  <td className='keypad-ok' onClick={handleOk}> OK </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      }

      <div className="row d-flex mt-4">
        <span> <b>Total:{gameList.reduce((acc, item) => acc + item.amount, 0)}</b></span>
        <table className="table my-0">
          <thead>
            <tr className='bg-cadetblue'>
              <th className='text-white'>S.N.</th>
              <th className='text-white'>Number</th>
              <th className='text-white'>Amount</th>
              <th className='text-white'>Type</th>
              <th className='text-white'>Details</th>
              <th className='text-white'>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              loading ? (<tr><td calpan="4">Loading...</td></tr>) : (
                gameList.map((item, index) => (
                  <tr key={item._id}>
                    <td>{gameList.length - index}</td>
                    <td>{item.num} </td>
                    <td>{item.amount}</td>
                    <td>{item.gameType}</td>
                    <td>{formatDate(item.lockTime)}</td>
                    <td>
                      <div style={{ display: "inline-flex" }}>
                      <Link to={`#`} onClick={() => handleDelete(item._id)} className="btn btn-danger">Remove</Link>
                        {/* <Link to={`#`} onClick={() => handleDelete(item._id)}><i className="fa fa-trash" style={{ color: 'red' }}></i></Link> */}
                      </div>
                    </td>
                  </tr>
                ))
              )
            }

          </tbody>
        </table>
      </div >
    </>
  )
}

export default PlayGame