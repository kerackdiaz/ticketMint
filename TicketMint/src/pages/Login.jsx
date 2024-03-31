import React, { useEffect, useState } from 'react';
import { postAgency, postLogin, postRegister } from '../utils/Db';
import SingIn from '../components/SingIn';
import SingUp from '../components/SingUp';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';


import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoadingScreen from '../components/LoadingScreen';





const Login = ({ onLogin }) => {
    useEffect(() => {
        document.title = 'Login - TicketMint';
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [menssageError, setMenssageError] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);
    const [isAgency, setIsAgency] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setMenssageError("");
    }, [isRegistering]);

    const dispatch = useDispatch();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await postLogin({ email, password }, dispatch);
        if (response.success === true) {
            const rememberUser = localStorage.setItem('userData', JSON.stringify({ email, password }));
            setTimeout(() => {
                onLogin();
                setIsLoading(false);
            }, 3000);
        }
        setMenssageError(response.message);
    };

    const handleAgency = async (e) => {
        setIsAgency(true);
        setIsRegistering(!isRegistering);
    }

    const handleLogin = async (e) => {
        setIsAgency(false);
        setIsRegistering(!isRegistering);
    }


    const handleRegister = async (e) => {
        setIsAgency(false);
        setIsRegistering(!isRegistering);
    }

    const handleSignUp = async (e) => { 
        e.preventDefault();
        if(isAgency && !isRegistering){
            const resgisterResponse = await postAgency({ firstName, lastName, email, password }, dispatch);
            if (resgisterResponse.success) {
                alert('agency created successfully');
            } setMenssageError(resgisterResponse.message);
        }
        if(!isAgency && !isRegistering){
            const registerResponse = await postRegister({ firstName, lastName, email, password }, dispatch);
            if (registerResponse.success) {
                alert('User created successfully');
            } setMenssageError(registerResponse.message);
        }


    }

    const settings = {
        dots: true,
        infinite: false,
        arrow: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    console.log(isAgency, isRegistering);

    return (
        <>  
            {
            isLoading ? (<LoadingScreen />) : (
            <div className="flex flex-row w-full min-h-screen bg-[#0B0B1C] justify-center">
                <div className="laptop:w-1/2 movil:w-full flex flex-col justify-start h-screen bg-bg-login p-10">
                    <div className='flex justify-center'>
                        <img className="w-48 mb-20" src="/logo.png" alt="Logo TicketMint" />
                    </div>
                    <Slider {...settings}>
                        <div className='w-full h-full'>
                            <div className='flex flex-col items-center laptop:text-2xl movil:text-xl text-center'>
                                <img className='w-48 mb-10' src="/pana.png" alt="" />
                                <p className='text-white'>Buy your tickets with TickMint</p>
                                <p className='text-[#CA67F5]'>paying with your favorite payment method or cashbank</p>
                            </div>
                        </div>
                        <div className='w-full h-full'>
                            <div className='flex flex-col items-center text-2xl'>
                                <img className='w-48 mb-10' src="/cuate.png" alt="" />
                                <p className='text-white '>Transfer or sell your tickets</p>
                                <p className='text-[#CA67F5]'>easily and safely</p>
                            </div>
                        </div>
                        <div className='w-full h-full .test'>
                            {   
                                !isRegistering ? (
                                    <SingUp handleSubmit={handleSignUp} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPassword={setPassword} setIsRegistering={setIsRegistering} message={menssageError} handleLogin={handleLogin} />
                                ) : (
                                    <SingIn handleSubmit={handleSignIn} setEmail={setEmail} setPassword={setPassword} setIsRegistering={setIsRegistering} message={menssageError} setIsChecked={setIsChecked} email={email} password={password} isChecked={isChecked} handleRegister={handleRegister} />
                                )
                            }
                        </div>
                    </Slider>
                    <div className='absolute bottom-10 right-10'>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Are you an event organizer?
                            <a href="#" className="font-medium  hover:underline dark:text-primary-500" onClick={handleAgency}> Register me </a>
                        </p>
                    </div>
                </div>
                
            </div>)
            }
        </>
    )
}

export default Login