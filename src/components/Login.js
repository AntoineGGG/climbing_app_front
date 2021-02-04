import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles/Login.css';

import API from '../services/API';

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [stayConnected, setStayConnected] = useState(false);
  const required = 'Veuillez saisir une adresse e-mail valide';
  const requiredPassword = 'Veuillez saisir votre mot de passe';
  const errorMessage = (error) => {
    return <div className='invalid-feedback'>{error}</div>;
  };

  const onSubmit = (data) => {
    API.post('/login', data)
      .then(() => {
        props.history.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
    setPassword('');
  };
  return (
    <div
      className='login-page'
      style={{
        backgroundImage: "url('/images/crag.jpeg')",
        backgroundSize: 'cover',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <input
            onChange={(event) => setMail(event.target.value)}
            value={mail}
            className='form-control'
            type='email'
            placeholder='Email'
            name='mail'
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email &&
            errors.email.type === 'required' &&
            errorMessage(required)}

          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            className='form-control'
            type='password'
            placeholder='Mot de passe'
            name='password'
            ref={register({ required: true })}
          />
          {errors.password &&
            errors.password.type === 'required' &&
            errorMessage(requiredPassword)}
          <div className='stay-connected-container'>
            <div className='stay-connected'>
              <label htmlFor='stayConnected'>
                <div className='stay-connected-text'>Rester connecté(e)</div>
                <input
                  ref={register}
                  name='stayConnected'
                  id='stayConnected'
                  type='checkbox'
                  value={stayConnected}
                  onClick={() => setStayConnected(true)}
                />
              </label>
            </div>
          </div>

          <div className='form-group'>
            <button type='submit' className='button'>
              connexion
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
