import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCollection, makeEntityAdder } from '../services/API';

import './styles/CragRoutes.css';
/* const URL = process.env.REACT_APP_API_BASE_URL;
 */
const CragRoutes = () => {
  const { register, handleSubmit } = useForm();
  const [routes, setRoutes] = useState([]);
  const [crags, setCrags] = useState([]);
  const [showAddRoutes, setShowAddRoutes] = useState(false);
  const [
    flagToRenderAfterCreateRoute,
    setFlagToRenderAfterCreateRoute,
  ] = useState(true);

  useEffect(() => {
    getCollection('routes').then((data) => {
      setRoutes(data);
    });
  }, [flagToRenderAfterCreateRoute]);

  useEffect(() => {
    getCollection('crags').then((data) => {
      setCrags(data);
    });
  }, []);

  const onSubmit = async (data) => {
    await makeEntityAdder('routes')(data).then(() => {
      setRoutes([]);
      setCrags([]);
      setFlagToRenderAfterCreateRoute(!flagToRenderAfterCreateRoute);
    });
  };

  const handleShow = () => {
    setShowAddRoutes(!showAddRoutes);
  };

  return (
    <div className='routes-container'>
      <div className='create-routes-button'>
        <button type='button' onClick={handleShow}>
          One More Routes
        </button>

        <div
          className={
            showAddRoutes
              ? 'routes-form-container'
              : 'routes-form-container-disabled'
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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
      </div>
      {routes.length > 0 && (
        <div className='routelist'>
          {routes.map((myRoutes) => {
            return (
              <div className='routes-view'>
                <p>Name: {myRoutes.name}</p>
                <p>Multipitch: {myRoutes.multipitch === 0 ? 'No' : 'Yes'}</p>
                <p>Grade: {myRoutes.grade}</p>
                <p>Done: {myRoutes.done === 0 ? 'No' : 'Yes'}</p>
                <p>Picture: {myRoutes.picture}</p>
                <p>Length: {myRoutes.length} feet</p>
                <p>Notes: {myRoutes.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CragRoutes;
