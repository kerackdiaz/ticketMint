import React, { useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { LINKS_HEADER } from '../utils/links'
import Anchor from './Anchor'
import { useSelector, useDispatch } from 'react-redux'
import { getNotify } from "../redux/actions/auth.actions";

const Header = () => {
    const notify = useSelector((state) => state.authReducer.user.notifications);
    const [notificationReceived, setNotificationReceived] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/alert');

        ws.onopen = () => {
        };

        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            const eventId = notification.event.id;
            if (!notify === undefined || !notify === undefined || !notify === null || !notify === null || notify.length != 0) {
                const events = notify ? Object.values(notify).filter(event => eventId === event.eventId) : [];
                if (events.length > 0) {
                    dispatch(getNotify(events));
                    setNotificationReceived(true);
                    const notisElement = document.getElementById('Notis');
                    notisElement.classList.add('notificationReceived');
                    localStorage.setItem('notifications', 'newAlert');
                }
            }};
        ws.onerror = (error) => {
        };

        ws.onclose = () => {
            
        };

        return () => { ws.close(); };
    }, []);

    useEffect(() => {
        if (location.pathname === '/notis' && notificationReceived) {
                notisElement.classList.remove('notificationReceived');
                localStorage.removeItem('notifications');
                setNotificationReceived(false);
        }
    }, [notificationReceived]);


    return (
        <header>
            <div className="flex desktop:fixed desktop:z-50 desktop:top-0 desktop:border-b-2 desktop:px-96 fixed bottom-0 z-10 px-10 justify-between lg:px-28 items-center w-full min-h-[58px] max-h-[58px] bg-[#0B0B1C]">
                <div className="bg-logo w-20 h-20 bg-cover bg-[#0b0b1c] absolute translate-x-[-200px] translate-y-3 "></div>
                {LINKS_HEADER.map((link) => {
                    const isActive = location.pathname === link.href;
                    return (<Anchor key={link.href} href={link.href} iconSelect={link.iconSelect}  icon={link.icon} content={link.name} isActive={isActive} ></Anchor>)
                })
                }

            </div>
        </header>
    )
}

export default Header