import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    <div className='login-page'>
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
                <input
                  ref={register}
                  name='stayConnected'
                  id='stayConnected'
                  type='checkbox'
                  value={stayConnected}
                  onClick={() => setStayConnected(true)}
                />
                Rester connecté(e)
              </label>
            </div>
          </div>

          <div className='form-group'>
            <button type='submit' className='button'>
              connexion
            </button>
            <div className='infoCreation'>
              <p>
                La création de votre espace peut prendre jusqu'à 72h à compter
                de la réception de l'adhésion.
              </p>
            </div>
            <div className='forgotten-password'>
              Mot de passe oublié ?{' '}
              <a className='email-admin' href='mailto:contact@oufgarden.com'>
                Contacter Ouf!
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
