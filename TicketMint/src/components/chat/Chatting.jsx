import React, { Fragment } from 'react';
import { Col, Row, } from 'reactstrap';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';
import SendChat from './SendChat';

const Chatting = () => {

    return (
        <>
            <Row className="chat-box">
                <Col className="chat-right-aside">
                    <div className="chat">
                        <ChatHeader />
                        <ChatMessage />
                        <SendChat />
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default Chatting;