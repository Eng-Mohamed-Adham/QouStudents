import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';
import usePersist from '../hooks/usePersist';
import { MdLock } from 'react-icons/md'; // React icon for lock
import './animation.css'

import sound1 from './2022.mp3'

const Copyright = () => {
    return (
        <div className="text-center text-gray-500 text-sm mt-8">
            {'Copyright © '}
            <a className="text-blue-500" href="https://goldentech.onrender.com/">
                Golden Tech Associates
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </div>
    );
};

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [name, password]);

    const playSound = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ name, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setName('');
            setPassword('');
            playSound(sound1)


           
             
              navigate('/dash');


        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setName(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const errClass = errMsg ? 'errmsg' : 'offscreen';

    if (isLoading) return<div className="bear">
    <div className="ears">
      <div className="ear left"></div>
      <div className="ear right"></div>
    </div>
    <div className="face">
      <div className="eyes">
        <div className="eye left"></div>
        <div className="eye right"></div>
      </div>
      <div className="hands">
        <div className="hand left"></div>
        <div className="hand right"></div>
      </div>
    </div>
  </div>
  ;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <MdLock className="text-4xl text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            ref={userRef}
                            value={name}
                            onChange={handleUserInput}
                            required
                            autoFocus
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePwdInput}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={persist}
                            onChange={handleToggle}
                            className="mr-2"
                        />
                        <label className="text-sm text-gray-700">Trust This Device</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-4 flex justify-between ">
                    <a href="https://alkbeerAwy.onrender.com/" className="text-blue-500 hover:underline">
                        Go To Home Page
                    </a>
                    <a href="#" className="text-blue-500 hover:underline">
                        {"Contact at +970599086824"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
