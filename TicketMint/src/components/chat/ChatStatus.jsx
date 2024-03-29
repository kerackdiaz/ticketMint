import React, { Fragment, useContext } from 'react';
// import ChatAppContext from '../../../../_helper/Chat';
// import { Image, LI, UL } from '../../../../AbstractElements';
// import errorImg from '../../../../assets/images/search-not-found.png';
import SearchChatList from './SearchChatList';
import CurrentUser from './CurrentUser';

const ChatStatus = () => {
    // const { selectedUserr, memberss, currentUserr, chatss, changeChat, createNewChatAsyn } = useContext(ChatAppContext);
    // var images = require.context('../../../../assets/images', true);
    // const dynamicImage = (image) => {
    //     return images(`./${image}`);
    // };
    // const changeChatClick = (e, selectedUserId) => {
    //     const currentUserId = currentUserr.id;
    //     const currentChat = chatss.find(
    //         (x) =>
    //             x.users.includes(currentUserr.id) && x.users.includes(selectedUserId)
    //     );
    //     if (currentChat) {
    //         changeChat(selectedUserId);
    //     } else {
    //         createNewChatAsyn(currentUserId, selectedUserId, chatss);
    //     }
    // };

    // var activeChat = 0;
    // if (selectedUserr != null) activeChat = selectedUserr.id;

    return 
    // (
    //     <Fragment>
    //         <div className="chat-box">
    //             <div className="chat-left-aside">
    //                 <CurrentUser />
    //                 <div className="people-list" id="people-list">
    //                     <SearchChatList />
    //                     {memberss && memberss.length > 0 ? (
    //                         <UL attrUL={{ className: 'list custom-scrollbar' }} >
    //                             {memberss
    //                                 .filter((x) => x.id !== currentUserr.id)
    //                                 .map((item) => {
    //                                     return (
    //                                         <LI attrLI={{
    //                                             className: `clearfix ${activeChat === item.id ? 'active' : ''}`,
    //                                             onClick: (e) => changeChatClick(e, item.id)
    //                                         }} key={item.id}>
    //                                             <Image attrImage={{
    //                                                 src: `${dynamicImage(item.thumb)}`,
    //                                                 className: 'rounded-circle user-image'
    //                                                 , alt: ''
    //                                             }} />
    //                                             <div
    //                                                 className={`status-circle ${item.online === true
    //                                                     ? 'online'
    //                                                     : 'offline'
    //                                                     }`}
    //                                             ></div>
    //                                             <div className="about">
    //                                                 <div className="name">{item.name}</div>
    //                                                 <div className="status">{item.status}</div>
    //                                             </div>
    //                                         </LI>
    //                                     );
    //                                 })}
    //                         </UL>
    //                     ) : (
    //                         <Image attrImage={{
    //                             className: 'img-fluid m-auto',
    //                             src: { errorImg },
    //                             alt: ''
    //                         }} />
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     </Fragment >
    // );
};
export default ChatStatus;