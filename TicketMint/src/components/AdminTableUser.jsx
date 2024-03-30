import React from 'react'
import { FaUserAstronaut } from "react-icons/fa";

const AdminTableUser = () => {
    return (

        <div className='bg--red-900 flex flex-wrap justify-around items-center gap-y-5 lg:gap-10'>
            <table className='font-medium border-1 w-full'>
                <thead>
                    <tr className='bg--green-500'>
                        <th className='border-b py-5 border-gray-600 text-start bg--blue-500'>Name</th>
                        <th className='border-b border-gray-600 text-start'>Status</th>
                        <th className='border-b border-gray-600 text-start'>Role</th>
                        <th className='border-b border-gray-600 text-start'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='flex items-center py-5 border-b' >
                            <div>
                                <FaUserAstronaut className='w-10 h-10' />
                            </div>
                            <div className='ml-3'>
                                <p className='text-sm font-medium text-gray-900'>John Doe</p>
                                <p className='text-sm text-gray-500'>john.doe@gmail.com</p>
                            </div>
                        </td>
                        <td className='border-b '> <span className='bg-green-500 text-center rounded-full py-1 px-2'>active</span> </td>
                        <td className='border-b'>Client</td>
                        <td className='border-b text-blue-500'>EDIT</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default AdminTableUser