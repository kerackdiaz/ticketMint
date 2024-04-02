import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CardMyTickets from '../../components/CardMyTickets'
import { BsQrCodeScan } from "react-icons/bs";
import { GiDonkey } from "react-icons/gi";
import QRCode from "react-qr-code";


function QrScan() {
  const {id} = useParams();
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState(`unautorized access`);

  const handleTap = () => {
    setShowQR(true);
  };

  useEffect(() => {
    setQrValue(`http://localhost:8080/api/access/verifyAccess?id=${id}`);
  }, [id]);

  return (
    <div className=' flex flex-1 p-3 gap-6 desktop:mt-20 flex-col items-center'>
        <h2 className='text-3xl dark:text-white text-[#0b0b1c] desktop:text-5xl'>Qr Scan</h2>
        <CardMyTickets/>
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
  )
}

export default QrScan