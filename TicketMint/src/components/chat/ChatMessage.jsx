import React, { useContext, useEffect } from 'react';
// import { Image, LI } from '../../../../AbstractElements';
// import ChatAppContext from '../../../../_helper/Chat';
// import start_conversion from '../../../../assets/images/start-conversion.jpg';

const ChatMessage = () => {
    // const {
    //     allMemberss,
    //     chatss,
    //     selectedUserr,
    //     currentUserr,
    //     fetchChatMemberAsyn,
    //     fetchChatAsyn,
    // } = useContext(ChatAppContext);
    // // var images = require.context('../../../../assets/images', true);

    // useEffect(() => {
    //     // eslint-disable-next-line
    //     fetchChatMemberAsyn();
    //     // eslint-disable-next-line
    //     fetchChatAsyn();
    //     // eslint-disable-next-line
    // }, [allMemberss.length === 0, chatss.length === 0]);

    // const dynamicImage = (image) => {
    //     return images(`./${image}`);
    // };

    // const selectedChat =
    //     allMemberss && chatss && selectedUserr
    //         ? chatss.find(
    //             (x) =>
    //                 x.users.includes(currentUserr.id) &&
    //                 x.users.includes(selectedUserr.id)
    //         )
    //         : null;
    // // eslint-disable-next-line
    // var activeChat = 0;
    // if (selectedUserr != null) activeChat = selectedUserr.id;

    // return (
    //     <Fragment>
    //         {allMemberss && chatss && selectedUserr ?
    //             <div className="chat-history chat-msg-box custom-scrollbar">
    //                 <ul>
    //                     {selectedChat && selectedChat.messages.length > 0 ? (
    //                         selectedChat.messages.map((item, index) => {
    //                             const participators = allMemberss.find(
    //                                 (x) => x.id === item.sender
    //                             );
    //                             return (
    //                                 <LI attrLI={{ className: 'clearfix' }} key={index}>
    //                                     <div
    //                                         className={`message my-message ${item.sender !== currentUserr.id
    //                                             ? ''
    //                                             : 'pull-right'
    //                                             }`}
    //                                     >
    //                                         <Image attrImage={{
    //                                             src: `${dynamicImage(participators.thumb)}`,
    //                                             className: `rounded-circle ${item.sender !== currentUserr.id
    //                                                 ? 'float-left'
    //                                                 : 'float-right'
    //                                                 } chat-user-img img-30`
    //                                             , alt: ''
    //                                         }} />
    //                                         <div className="message-data text-end">
    //                                             <span className="message-data-time">
    //                                                 {item.time}
    //                                             </span>
    //                                         </div>
    //                                         {item.text}
    //                                     </div>
    //                                 </LI>
    //                             );
    //                         })
    //                     ) : (
    //                         <div>
    //                             <Image attrImage={{
    //                                 className: 'img-fluid',
    //                                 src: `${start_conversion}`,
    //                                 alt: 'start conversion '
    //                             }} />
    //                         </div>
    //                     )}
    //                 </ul>
    //             </div>
    //             : (
    //                 <div className="loading"></div>
    //             )
    //         }

    //     </Fragment>
    // );
};
export default ChatMessage;