import React from 'react'
import AdminTableUser from '../../components/AdminTableUser'

const AllUser = () => {
    return (
        <main className='latptop:w-[65%] relative latptop:left-[15%] tablet:left-[25%] tablet:w-1/2 w-[80%] h-[80%] top-32 right-8 rounded-xl border border-gray-200 bg-white mt-10 flex flex-wrap gap-10'>
            
            <section className=' bg-red-100 w-full h-[80%]  shadow-lg rounded-md latptop:w-[55%] latptop:ml-44'>
            <h1 className='text-3xl font-thin'>Users</h1>
                <AdminTableUser />
            </section>

        </main>
    )
}

export default AllUser