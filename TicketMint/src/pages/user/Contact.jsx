import React from 'react'

const Contact = () => {
    return (
        <main className='w-[80%] m-auto'>
            <h1 className='text-3xl font-thin text-center'>Transactions</h1>
            <form className='flex flex-col gap-3 py-5 w-11/12 m-auto rounded-xl'>
                <label className='text-xl'>
                    <span>source account:</span>
                    <div>
                        <select onInput name='accountOrigin' defaultValue="EJEMPLO" className='w-full p-2 rounded-md'>
                            <option value="EJEMPLO" disabled>Selected</option>
                        </select>
                    </div>
                </label>
                <label className='text-xl'>
                    <span>Account Destination</span>
                    <div>
                        <input type="text" onChange name='' className='w-full p-2 pl-3 rounded-md' placeholder='' />
                    </div>
                </label>
                <label className='text-xl'>
                    <span>Amount:</span>
                    <div>
                        <input type="number" onChange name='' className='w-full p-2 pl-3 rounded-md' placeholder='' />
                    </div>
                </label>
                <label className='text-xl'>
                    <span>Descriptions:</span>
                    <input type="text" onChange name='' className='w-full p-2 pl-3 rounded-md' placeholder='' />
                </label>
                <p className='text-red-500'>errorMessage</p>
                <input type="submit" value="Confirm" className='w-full py-2 pl-3 text-white text-xl cursor-pointer rounded-md bg-green-500' />
            </form>
        </main>
    )
}

export default Contact