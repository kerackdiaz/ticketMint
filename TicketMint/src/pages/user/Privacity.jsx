import React from 'react'
import { PRIVACY_LIST } from '../../utils/privacy-list'
import Privacy from '../../../public/privacy.png'

const Privacity = () => {
    return (
        <main className='w-full min-h-screen desktop:mt-1 gap-10 text-white flex flex-col m-auto dark:bg-[#0B0B1C]'>
            <h1 className='text-lg dark:text-white text-black font-medium md:text-3xl text-center desktop:text-5xl desktop:mt-20'>Privacy</h1>
            <div className='dark:desktop:bg-slate-800 desktop:bg-slate-100 flex flex-col justify-center w-full items-center desktop:flex-row-reverse'>
                <div className='self-center movil:w-[90%] desktop:w-1/3 text-base p-5 md:text-lg dark:bg-slate-900 bg-[#6651c3] desktop:p-5 rounded-3xl'>
                    <ul className='flex flex-col gap-5'>
                        {
                            PRIVACY_LIST.map((list) => {
                                return (
                                    <li key={list.title} className=''>
                                        <h3 className='text-lg font-medium'>{list.title}</h3>
                                        <p className='text-sm'>{list.content}</p>
                                    </li>
                                    
                                )
                            })
                        }
                    </ul>

                </div>
                <div className='self-center rounded-3xl movil:w-[80%] movil:pb-20 md:w-[60%] desktop:w-[50%]'>
                    <img src={Privacy} className='w-[80%] m-auto' alt="privacy" />
                </div>
            </div>
        </main>
    )
}

export default Privacity