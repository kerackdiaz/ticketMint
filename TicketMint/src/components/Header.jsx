import React from 'react'
import { LINKS_HEADER } from '../utils/links'
import Anchor from './Anchor'

const Header = () => {
    return (
        <header>
            <div className="flex fixed bottom-0 z-10 px-10 justify-between items-center w-full min-h-[58px] max-h-[58px] bg-[#0B0B1C]">

                {LINKS_HEADER.map((link) => {
                    return (<Anchor key={link.href} href={link.href} icon={link.icon} content={link.name} ></Anchor>)
                })
                }

            </div>
        </header>
    )
}

export default Header