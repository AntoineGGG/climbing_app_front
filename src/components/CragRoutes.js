import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCollection, makeEntityAdder } from '../services/API';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { MdGrade, MdCallSplit } from 'react-icons/md';
import { GiCrags } from 'react-icons/gi';
import { AiOutlineCheck, AiOutlineColumnWidth } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';

import './styles/CragRoutes.css';
import './styles/AllCragRoutes.css';
const URL = process.env.REACT_APP_API_BASE_URL;

const CragRoutes = (props) => {
  const { register, handleSubmit } = useForm();
  const [routes, setRoutes] = useState([]);
  const [crags, setCrags] = useState([]);
  const [showAddRoutes, setShowAddRoutes] = useState(false);

  useEffect(() => {
    getCollection('routes').then((data) => {
      setRoutes(data);
    });
  }, [showAddRoutes]);

  useEffect(() => {
    getCollection('crags').then((data) => {
      setCrags(data);
    });
  }, []);
  const onSubmit = async (data) => {
    const newData = { ...data };
    const formData = new FormData();
    formData.append('picture', data.picture[0]);
    formData.append('data', JSON.stringify(newData));
    await makeEntityAdder('routes')(formData).then(() => {
      setShowAddRoutes(!showAddRoutes);
    });
  };

  const handleShow = () => {
    setShowAddRoutes(!showAddRoutes);
  };
  return (
    <div className='routes-container'>
      <div
        className='routes-container-infos'
        style={{
          backgroundImage: "url('/images/magnesie.png')",
        }}
      >
        <div className='routes-container-infos-text'>
          <h1>Your routes</h1>
          <p>
            You can find here all your recorded routes, create new ones and edit
            your notes for each of them.
          </p>
          <p>
            Remember that when your publish a route, everyone on the app can
            find it in the main routes list !
          </p>
        </div>
        <div className='create-routes-button'>
          <button type='button' onClick={handleShow}>
            One More Routes
          </button>
          <Link to='/routes/all'>
            <button type='button'>Show me the shared routes</button>
          </Link>
        </div>
      </div>
      <div
        className={
          showAddRoutes
            ? 'routes-form-container'
            : 'routes-form-container-disabled'
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='picture'>
            Put a pics of the routes:
            <input ref={register} type='file' name='picture' />
          </label>

          <label htmlFor='name'>
            Name:
            <input name='name' ref={register({ required: true })} />
          </label>

          <label htmlFor='multipich'>
            Multipitch:
            <select name='multipitch' ref={register({ required: true })}>
              <option value='1'>Yeaa</option>
              <option value='0'>Nop</option>
            </select>
          </label>
          <label htmlFor='grade'>
            Grade:
            <input name='grade' ref={register} />
          </label>
          <label htmlFor='done'>
            Done !
            <select name='done' ref={register}>
              <option value='1'>True</option>
              <option value='0'>Nop</option>
            </select>
          </label>

          {crags.length > 0 && (
            <label htmlFor='Crag_id'>
              Which Crag ?
              <select name='Crag_id' ref={register}>
                {crags.map((elem) => {
                  return <option value={elem.id}>{elem.name}</option>;
                })}
              </select>
            </label>
          )}
          <label htmlFor='length'>
            How long ?
            <input name='length' ref={register} />
          </label>
          <label htmlFor='comment'>
            Comment your ascent:
            <textarea
              defaultValue='Write your notes here...'
              name='comment'
              ref={register}
            ></textarea>
          </label>

          <input type='submit' />
        </form>
      </div>

      {routes.length > 0 && (
        <div className='routelist'>
          {routes.map((myRoutes, i) => {
            return (
              <div key={i} className='routes-view'>
                <IconContext.Provider value={{ className: 'react-icons' }}>
                  <div className='routes-img'>
                    <img
                      src={`${URL}/${myRoutes.picture}`}
                      alt='routes pictures'
                    />
                  </div>
                  <div className='routes-infos-container'>
                    <div className='routes-infos'>
                      <GiCrags size={25} style={{ marginRight: 10 }} />
                      <p>
                        <strong>Name:</strong> {myRoutes.name}
                      </p>
                    </div>
                    <div className='routes-infos'>
                      <MdCallSplit size={25} style={{ marginRight: 10 }} />
                      <p>
                        <strong>Multipitch:</strong>{' '}
                        {myRoutes.multipitch === 0 ? 'No' : 'Yes'}
                      </p>
                    </div>
                    <div className='routes-infos'>
                      <MdGrade size={25} style={{ marginRight: 10 }} />
                      <p>
                        <strong>Grade:</strong> {myRoutes.grade}
                      </p>
                    </div>
                    <div className='routes-infos'>
                      <AiOutlineCheck size={25} style={{ marginRight: 10 }} />
                      <p>
                        <strong>Done:</strong>{' '}
                        {myRoutes.done === 0 ? 'No' : 'Yes'}
                      </p>
                    </div>
                    <div className='routes-infos'>
                      <AiOutlineColumnWidth
                        size={25}
                        style={{ marginRight: 10 }}
                      />
                      <p>
                        <strong>Length:</strong> {myRoutes.length} feet
                      </p>
                    </div>
                    <div className='routes-infos'>
                      <CgNotes size={25} style={{ marginRight: 10 }} />
                      <p>
                        <strong>Notes:</strong> {myRoutes.comment}
                      </p>
                    </div>
                  </div>
                </IconContext.Provider>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CragRoutes;
