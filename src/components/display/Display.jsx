import React, { useState, useEffect } from 'react'
import Notifier from '../Notifier';
import Axios from '../../api/Axios';




const Display = () => {


    const [gameList, setGameList] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const [drowList, setDrowList] = useState([]);
    const [drowId, setDrowId] = useState('');
    const [roundType, setRoundType] = useState('');


    const getDrowList = async () => {
        try {
            const { data } = await Axios.get('/drow/list?status=ACTIVE');
            setDrowList(data)
        } catch (err) {
            Notifier(err?.meta?.msg, 'Error')
        }
    };


    const getDisplay = async (event) => {
        event.preventDefault();
        let query = {
            selectedDate,
            drowId,
            roundType
        }
       
        try {
            setLoading(true);
            const { data } = await Axios.get(`/game/list`, {
                params: query
            });
            setGameList(data)

        } catch (err) {
            Notifier(err.meta.msg, 'Error')
        } finally {
            setLoading(false);
        }

    }


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
        getDrowList();
    }, []);


    return (
        <div className="row">
            <div className="col-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="h3 card-title mb-0">Game List</h5>
                        <div className="row mt-4">
                            <form onSubmit={getDisplay} >
                                <div className="row">
                                    <div className="col">
                                        <input type="date" id="selectedDate" className="form-control"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col">
                                        <select className="form-select" onChange={(event) => setDrowId(event.target.value)} required>
                                            <option value="" >Select Drow</option>
                                            {
                                                drowList.map((item) => (
                                                    <option key={item._id} value={item._id}>{`${item.name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <select className="form-select" onChange={(event) => setRoundType(event.target.value)} required>
                                            <option value="" >Select Round</option>
                                            <option value="OPEN" >OPEN</option>
                                            <option value="CLOSE" >CLOSE</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover my-0">
                            <thead>
                                <tr>
                                    <th>S.N.</th>
                                    <th>Number</th>
                                    <th className="d-none d-xl-table-cell">Amount</th>
                                    <th className="d-none d-xl-table-cell">Type</th>
                                    <th className="d-none d-xl-table-cell">Details</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? (<tr><td calpan="4">Loading...</td></tr>) : (
                                        gameList.map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.num} </td>
                                                <td className="d-none d-xl-table-cell">{item.amount}</td>
                                                <td className="d-none d-xl-table-cell">{item.gameType}</td>
                                                <td className="d-none d-md-table-cell">{formatDate(item.lockTime)}</td>
                                            </tr>
                                        ))
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display