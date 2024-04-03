import React, { useState } from 'react';
import Acordion from '../../components/acordion';
import Questions from '../../../public/help.png';

const Help = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className='w-full min-h-screen desktop:mt-[58px] gap-10 text-white flex flex-col m-auto bg-[#0B0B1C]'>
            <h1 className='text-lg font-medium text-center md:text-3xl desktop:text-5xl desktop:mt-6'>Help</h1>
            <div className='w-full '>
                <p className='text-center desktop:text-lg w-[90%] m-auto'>
                    Welcome to the TicketMint Help Center! We are here to help you with any questions or concerns you may have about our platform.
                </p>
            </div>

            <div className='desktop:bg-slate-800 w-full flex flex-col desktop:flex-row-reverse justify-center '>
                <div className='self-center flex flex-col gap-5 w-10/12 desktop:w-1/3 p-5 bg-slate-800 rounded-lg'>
                    <Acordion
                        title='Who We Are?'
                        answer='At TicketMint, we are your premier destination for event tickets. As a team passionate about delivering unforgettable experiences, we pride ourselves on providing seamless access to the most exciting events.'
                        isOpen={openIndex === 0}
                        onToggle={() => handleToggle(0)}
                    />
                    <Acordion
                        title='Buying Tickets'
                        answer={`Browse Events: Explore our wide range of events.
                    Select Event: Choose your preferred event, date, and time.
                    Choose Tickets: Select your desired seating or ticket options.
                    Add to Cart: Place your selected tickets in the cart and proceed to checkout.
                    Complete Payment: Enter your payment and billing information securely.
                    Receive Confirmation: After successful payment, you'll receive a confirmation email.
                    Enjoy the Event: Arrive at the venue with your tickets ready and enjoy the event hassle-free.`}
                        isOpen={openIndex === 1}
                        onToggle={() => handleToggle(1)}
                    />
                    <Acordion
                        title='How Do I Buy Tickets?'
                        answer={`Browse Events: Explore our wide range of events.
                    Select Event: Choose your preferred event, date, and time.
                    Choose Tickets: Select your desired seating or ticket options.
                    Add to Cart: Place your selected tickets in the cart and proceed to checkout.
                    Complete Payment: Enter your payment and billing information securely.
                    Receive Confirmation: After successful payment, you'll receive a confirmation email.
                    Enjoy the Event: Arrive at the venue with your tickets ready and enjoy the event hassle-free.`}
                        isOpen={openIndex === 2}
                        onToggle={() => handleToggle(2)}
                    />
                    <Acordion
                        title='How Do I Contact Us?'
                        answer={`Browse Events: Explore our wide range of events.
                    Select Event: Choose your preferred event, date, and time.
                    Choose Tickets: Select your desired seating or ticket options.
                    Add to Cart: Place your selected tickets in the cart and proceed to checkout.
                    Complete Payment: Enter your payment and billing information securely.
                    Receive Confirmation: After successful payment, you'll receive a confirmation email.
                    Enjoy the Event: Arrive at the venue with your tickets ready and enjoy the event hassle-free.`}
                        isOpen={openIndex === 3}
                        onToggle={() => handleToggle(3)}
                    />
                    <Acordion
                        title='What Are My Rights?'
                        answer={`Browse Events: Explore our wide range of events.
                    Select Event: Choose your preferred event, date, and time.
                    Choose Tickets: Select your desired seating or ticket options.
                    Add to Cart: Place your selected tickets in the cart and proceed to checkout.
                    Complete Payment: Enter your payment and billing information securely.
                    Receive Confirmation: After successful payment, you'll receive a confirmation email.
                    Enjoy the Event: Arrive at the venue with your tickets ready and enjoy the event hassle-free.`}
                        isOpen={openIndex === 4}
                        onToggle={() => handleToggle(4)}
                    />
                </div>
                <div className='self-center movil:w-[70%] md:w-[50%] desktop:w-[40%]'>
                    <img src={Questions} className='w-full h-full' alt="" />
                </div>
            </div>
        </main>
    );
};

export default Help;
