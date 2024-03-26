import React, { useState } from 'react'
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { CgAdd } from "react-icons/cg";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function Details() {
  const [onFav, setOnFav] = useState(false)

    const handleFav = () => {
        setOnFav(!onFav)
    }

    const handleBuy = (e) => {
      e.preventDefault()
    }

  return (
    <div className='bg-[url(/prueba.png)] flex w-screen h-screen bg-top items-end'>
      <div className='bg-[#55347b]  w-full bg-opacity-95 rounded-t-2xl'>
        <div className='border-b-2 border-[#8468fb] p-3'>
          <div className='flex justify-between items-center'>
            <h2 className='text-white text-3xl font-bold'>Arch Enemy</h2>
            {
                !onFav ? <CiStar className='text-4xl text-white mt-2 mr-2 cursor-pointer' onClick={handleFav}/> : <TiStarFullOutline className=' cursor-pointer text-4xl text-white mt-2 mr-2' onClick={handleFav}/>
            }
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col items-start opacity-90'>
              <p className='text-white py-3'>Domingo, Noviembre 27, 2024</p>
              <p className='text-white pb-3'>Solo quedan 10 tickets</p>
              <p className='text-white'>9:00 PM - 10:00 PM</p>
            </div>
            <div className='flex flex-col items-end opacity-90'>
              <h3 className='font-semibold text-white'>Tickets desde</h3>
              <p className='text-sm text-white'>140.000 COP</p>
              <p className='text-sm text-white'>30.72 USDT</p>
              <p className='text-sm text-white'>1.80 SOL</p>
              <p className='text-sm text-white'>0.0016 ETH</p>
          </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between border-b-2 border-[#8468fb] p-3'>
          <div className='flex flex-col items-start opacity-90'>
            <p className='text-white py-3'>Tu pago se realizara en </p>
            <select className='text-white bg-[#55347b] border py-1 px-3'>
              <option value="COP" >COP</option>
            </select>
          </div>
          <p className='text-white p-3'>Solo quedan 40 tickets </p>
          <div className='w-screen flex justify-between items-center'>
            <div>
              <p className='text-white text-center'>Cantidad</p>
              <div className='flex'>
              <IoMdRemoveCircleOutline className='text-white text-2xl' />
              <input type='number' className='text-white w-8 text-center bg-[#55347b]' min={1} max={10} placeholder='1'></input>
              <CgAdd className='text-white text-2xl'/>
              </div>
            </div>
            
            <select className='text-white bg-[#55347b]  border py-1 px-1'>
              <option value="">General</option>
            </select>
            <div>
              <p className='text-white'>Total con impuestos</p>
              <p className='text-white text-center'>$150.000</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleBuy} className='flex justify-center gap-2 p-3'>
          <button type="submit" className='text-white bg-[#8468fb] py-2 w-[50%]  rounded-xl'>Comprar</button>
          <button type="button" className='text-white border-2 border-[#8468fb] py-2 w-[50%] rounded-xl'>Cancelar</button>
        </form>
      </div>

    </div>
  )
}

export default Details