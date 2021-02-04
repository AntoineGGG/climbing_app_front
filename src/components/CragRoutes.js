import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCollection, makeEntityAdder } from '../services/API';
import { Link } from 'react-router-dom';

import './styles/CragRoutes.css';
const URL = process.env.REACT_APP_API_BASE_URL;

const CragRoutes = () => {
  const { register, handleSubmit } = useForm();
  const [routes, setRoutes] = useState([]);
  const [crags, setCrags] = useState([]);
  const [showAddRoutes, setShowAddRoutes] = useState(false);
  const [
    flagToRenderAfterCreateRoute,
    setFlagToRenderAfterCreateRoute,
  ] = useState(true);
  console.log(routes);
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
  console.log(crags);
  const onSubmit = async (data) => {
    const newData = { ...data };
    const formData = new FormData();
    formData.append('picture', data.picture[0]);
    formData.append('data', JSON.stringify(newData));
    await makeEntityAdder('routes')(formData).then(() => {
      setRoutes([]);
      setCrags([]);
      if (showAddRoutes === false) {
        setFlagToRenderAfterCreateRoute(!flagToRenderAfterCreateRoute);
      }
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
            <textarea name='comment' ref={register}>
              Writte your notes here...
            </textarea>
          </label>

          <input type='submit' />
        </form>
      </div>

      {routes.length > 0 && (
        <div className='routelist'>
          {routes.map((myRoutes) => {
            return (
              <div className='routes-view'>
                <div className='routes-img'>
                  <img
                    src={`${URL}/${myRoutes.picture}`}
                    alt='routes pictures'
                  />
                </div>
                <p>
                  <strong>Name:</strong> {myRoutes.name}
                </p>
                <p>
                  <strong>Multipitch:</strong>{' '}
                  {myRoutes.multipitch === 0 ? 'No' : 'Yes'}
                </p>
                <p>
                  <strong>Grade:</strong> {myRoutes.grade}
                </p>
                <p>
                  <strong>Done:</strong> {myRoutes.done === 0 ? 'No' : 'Yes'}
                </p>
                <p>
                  <strong>Length:</strong> {myRoutes.length} feet
                </p>
                <p>
                  <strong>Notes:</strong> {myRoutes.comment}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CragRoutes;
