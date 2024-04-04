import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CardMyTickets from '../../components/CardMyTickets'
import { BsQrCodeScan } from "react-icons/bs";
import { GiDonkey } from "react-icons/gi";
import QRCode from "react-qr-code";
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';



function QrScan() {
  const {id} = useParams();
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState(`unautorized access`);
  const events = useSelector((state) => state.authReducer.events)
  const MyTickets = useSelector((state) => state.authReducer.user.clientTicket)
  const Myticket = MyTickets?.find(ticket => ticket.id === id);
  const eventTicket = Object.values(events)?.find((event) => event.id === Myticket.eventId)



  const handleTap = () => {
    const eventDateTime = `${eventTicket.date}T${eventTicket.time}`;
    const eventDate = new Date(eventDateTime);
    console.log(eventDate)
    const nowDate = new Date();
    const diffTime = Math.abs(eventDate - nowDate);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); 
  
    if (diffHours <= 5) {
      setShowQR(true);
    } else {
      Swal.fire({
        title: 'The QR code will be available 5 hours before the event starts.',
        icon: 'warning',
      })
    }
  };

  useEffect(() => {
    setQrValue(`http://localhost:8080/api/access/verifyAccess?id=${id}`);
  }, [id]);

  return (
    <div className=' flex flex-1 p-3 gap-6 desktop:mt-20 flex-col items-center'>
                        <div
                className='absolute inset-0 w-full h-full opacity-50'
                style={{
                    backgroundImage: `url(${eventTicket.imageURL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    zIndex: 0,
                }}
            ></div>

       <div className='z-10 p-3 gap-6 flex flex-col justify-center items-center'>
        <h2 className='text-3xl dark:text-white font-bold text-[#0b0b1c] desktop:text-5xl'>QR Scan</h2>
        <CardMyTickets key={eventTicket.id} name={eventTicket.name} date={eventTicket.date} time={eventTicket.time} image={eventTicket.imageURL} id={eventTicket.id} ticketCount={eventTicket.ticketCount}/>
        <div className='flex flex-col items-center'>
            <BsQrCodeScan className='text-3xl dark:text-white text-[#0b0b1c]'/>
            <p className='dark:text-white text-[#0b0b1c] opacity-90'  onClick={handleTap}>Present QR on scanner</p>
        </div>
        {showQR && <div id='qr' className='w-[256px] h-[256px] p-4 bg-white flex justify-center items-center rounded-xl'>
           <QRCode value={qrValue} size={228} style={{ height: "auto", maxWidth: "100%", width: "100%" }}/>

        </div>}
        <div>
            <p className='dark:text-white text-[#0b0b1c] opacity-60 w-[185px] text-center'>This code is unique and will be deactivated once scanned.</p>
        </div>
        </div>
    </div>
  )
}

export default QrScan