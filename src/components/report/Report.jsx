import { useState, useEffect } from 'react'
import Notifier from '../Notifier';
import Axios from '../../api/Axios';


const Report = () => {


  const [drowList, setDrowList] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [drow, setDrow] = useState('');


  const getDrowList = async () => {
    try {
      const { data } = await Axios.get('/drow/list?status=ACTIVE');
      setDrowList(data)
    } catch (err) {

      Notifier(err?.meta?.msg, 'Error')
    }
  };

  const getReport = async (event) => {
    event.preventDefault();

    const query = {
      startDate,
      endDate,
      drow
    }

    console.log(query);

    try {

      const { data } = await Axios.get('/report/list', { params: query });
      console.log(data);

    } catch (err) {
      Notifier(err?.meta?.msg, 'Error')
    }
  }


  useEffect(() => {
    getDrowList();
  }, []);


  return (
    <div className="row">
      <div className="col-12 col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="h3 card-title mb-0">Report</h5>
            <div className="row mt-4">
              <form onSubmit={getReport} >
                <div className="row">
                  <div className="col">
                    <input type="date" id="startDate" className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <input type="date" id="endDate" className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required />
                  </div>
                  <div className="col">
                    <select className="form-select" onChange={(event) => setDrow(event.target.value)} >
                      <option value="" >Drow</option>
                      {
                        drowList.map((item) => (
                          <option key={item._id} value={item._id}>{`${item.name}`}</option>
                        ))
                      }
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



            <table class="table table-sm table-bordered table-responsive">
              

                <tbody>
                  <>
                    <tr>
                      <th scope="col" colspan="4">Drow Name</th>
                      <th scope="col" colspan="5">Single</th>
                      <th scope="col" colspan="3">Jodi</th>
                      <th scope="col" colspan="5">Patti</th>
                      <th scope="col" colspan="3">Net</th>
                    </tr>
                    <tr>
                      <td scope="col">Dt.</td>
                      <td scope="col">Op.</td>
                      <td scope="col">Cl.</td>
                      <td scope="col">T.</td>
                      <td scope="col">Op Amt</td>
                      <td scope="col">Op</td>
                      <td scope="col">Cl Amt</td>
                      <td scope="col">Cl</td>
                      <td scope="col">T</td>
                      <td scope="col">Jd Amt</td>
                      <td scope="col">Jd</td>
                      <td scope="col">T</td>
                      <td scope="col">Op Amt</td>
                      <td scope="col">Op</td>
                      <td scope="col">Cl Amt</td>
                      <td scope="col">Cl</td>
                      <td scope="col">T</td>
                      <td scope="col">Payout</td>
                      <td scope="col">Comm</td>
                      <td scope="col">Bal</td>
                    </tr>
                    <tr>
                      <td scope="col">11-12-2024</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">20</td>
                      <td scope="col">180</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                    </tr>
                    <tr>
                      <td scope="col">Total</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">20</td>
                      <td scope="col">180</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                    </tr>
                    <tr>
                      <th scope="col" colspan="4">Drow Name</th>
                      <th scope="col" colspan="5">Single</th>
                      <th scope="col" colspan="3">Jodi</th>
                      <th scope="col" colspan="5">Patti</th>
                      <th scope="col" colspan="3">Net</th>
                    </tr>
                    <tr>
                      <td scope="col">Dt.</td>
                      <td scope="col">Op.</td>
                      <td scope="col">Cl.</td>
                      <td scope="col">T.</td>
                      <td scope="col">Op Amt</td>
                      <td scope="col">Op</td>
                      <td scope="col">Cl Amt</td>
                      <td scope="col">Cl</td>
                      <td scope="col">T</td>
                      <td scope="col">Jd Amt</td>
                      <td scope="col">Jd</td>
                      <td scope="col">T</td>
                      <td scope="col">Op Amt</td>
                      <td scope="col">Op</td>
                      <td scope="col">Cl Amt</td>
                      <td scope="col">Cl</td>
                      <td scope="col">T</td>
                      <td scope="col">Payout</td>
                      <td scope="col">Comm</td>
                      <td scope="col">Bal</td>
                    </tr>
                    <tr>
                      <td scope="col">11-12-2024</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">20</td>
                      <td scope="col">180</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                    </tr>
                    <tr>
                      <td scope="col">Total</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">20</td>
                      <td scope="col">180</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">90</td>
                      <td scope="col">90</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">10</td>
                      <td scope="col">10</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                      <td scope="col">100</td>
                    </tr>
                  </>

                  <tr>
                    <td scope='col' colspan="20">&nbsp;</td>
                  </tr>
                  <tr>
                    <td scope="col">Total</td>
                    <td scope="col">10</td>
                    <td scope="col">90</td>
                    <td scope="col">90</td>
                    <td scope="col">10</td>
                    <td scope="col">90</td>
                    <td scope="col">20</td>
                    <td scope="col">180</td>
                    <td scope="col">100</td>
                    <td scope="col">10</td>
                    <td scope="col">90</td>
                    <td scope="col">90</td>
                    <td scope="col">10</td>
                    <td scope="col">100</td>
                    <td scope="col">100</td>
                    <td scope="col">10</td>
                    <td scope="col">10</td>
                    <td scope="col">100</td>
                    <td scope="col">100</td>
                    <td scope="col">100</td>
                  </tr>
                </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Report