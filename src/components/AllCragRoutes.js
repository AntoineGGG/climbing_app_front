import React, { useEffect, useState } from 'react';
import { getCollection } from '../services/API';
import { IconContext } from 'react-icons';
import { MdGrade, MdCallSplit, MdInsertEmoticon } from 'react-icons/md';
import { GiCrags } from 'react-icons/gi';
import { AiOutlineCheck, AiOutlineColumnWidth } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';
import { SiCodeclimate } from 'react-icons/si';
import { GrMapLocation } from 'react-icons/gr';

import './styles/AllCragRoutes.css';

const URL = process.env.REACT_APP_API_BASE_URL;

const AllCragRoutes = () => {
  const [allRoutes, setAllRoutes] = useState([]);
  useEffect(() => {
    getCollection('routes/all').then((data) => {
      setAllRoutes(data);
    });
  }, []);
  return (
    <div className='all-crag-routes-container'>
      <div
        className='all-crag-infos'
        style={{ backgroundImage: "url('/images/allcrag.jpeg')" }}
      >
        <div className='all-crag-infos-text'>
          <h1>Shared Routes List</h1>
          <p>
            Here you can find all the climbing routes shared by climbers for
            climbers, feel free to discover them...
          </p>
        </div>
      </div>
      <div className='routes-list'>
        {allRoutes.map((routes, i) => {
          return (
            <div key={i} className='routes-view'>
              <IconContext.Provider value={{ className: 'react-icons' }}>
                <div className='routes-img'>
                  <img src={`${URL}/${routes.picture}`} alt='routes pictures' />
                </div>
                <div className='routes-infos-container'>
                  <div className='routes-infos'>
                    <GiCrags size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Route Name:</strong> {routes.routes_name}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <SiCodeclimate size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Crag Name:</strong> {routes.crags_name}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <GrMapLocation size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Loation:</strong> {routes.city}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <MdCallSplit size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Multipitch:</strong>{' '}
                      {routes.multipitch === 0 ? 'No' : 'Yes'}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <MdGrade size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Grade:</strong> {routes.grade}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <AiOutlineCheck size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Done:</strong> {routes.done === 0 ? 'No' : 'Yes'}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <AiOutlineColumnWidth
                      size={25}
                      style={{ marginRight: 10 }}
                    />
                    <p>
                      <strong>Length:</strong> {routes.length} feet
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <MdInsertEmoticon size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Author:</strong> {routes.firstname}{' '}
                      {routes.lastname}
                    </p>
                  </div>
                  <div className='routes-infos'>
                    <CgNotes size={25} style={{ marginRight: 10 }} />
                    <p>
                      <strong>Notes:</strong> {routes.comment}
                    </p>
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCragRoutes;
