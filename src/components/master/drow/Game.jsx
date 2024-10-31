import React from 'react'
import { Link } from 'react-router-dom';

const Game = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-4">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-center">
              <Link to={`./${1}`} className="btn btn-primary">Open Round</Link>
            </div>
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="d-flex justify-content-center mb-4">
                <h4>Kalyan</h4>
              </div>
              <div className="d-flex justify-content-between">
                <span >03:15 PM</span>
                <span >126 -98- 378</span>
                <span >05:15 PM</span>
              </div>
            </div>
          </div>
          <div className="card-footer ">
            <div className='d-flex justify-content-center'>
              <Link to={`./${1}`} className="btn btn-primary">Close Round</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game