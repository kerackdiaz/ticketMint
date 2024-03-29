import React, {  useState } from 'react';
import { Col, Form, FormGroup, Input, Media, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
// import { NavLink, Nav, } from 'react-router-dom';


const ChatMenu = () => {
    // const { allMemberss } = useContext(ChatAppContext);
    const [activeTab, setActiveTab] = useState('1');
    return (
        <>

            {/* <Nav tabs className="border-tab nav-primary">
                <NavItem id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}> {CALL}</NavLink>
                </NavItem>
                <NavItem id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
                        {STATUS}
                    </NavLink>
                </NavItem>
                <NavItem id="myTab" role="tablist">
                    <NavLink tag="a" className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>{PROFILE}</NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="people-list">
                        <UL attrUL={{ className: 'list digits custom-scrollbar' }} >
                            {allMemberss.map((member, i) => {
                                return (
                                    <LI attrLI={{ className: 'clearfix' }} key={i}>
                                        <Image attrImage={{
                                            className: 'rounded-circle user-image'
                                            , src: `${require(`../../../../assets/images/${member.thumb}`)}`, alt: ''
                                        }} />
                                        <div className="about"><div className="name">{member.name}</div>
                                            <div className="status"> <i className={member.reply}></i>{member.time}</div>
                                        </div>
                                    </LI>
                                );
                            }
                            )}
                        </UL>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="people-list">
                        <div className="search">
                            <Form className="theme-form"><FormGroup> <Input className="form-control" type="text" placeholder="Write Status..." /><i className="fa fa-pencil"></i> </FormGroup> </Form></div>
                    </div>
                    <div className="status">
                        <P attrPara={{ className: 'font-primary f-w-600' }} >{Active}</P> <hr /><P>{ChataApp_p1}&nbsp;&nbsp;
                            <i className="icofont icofont-emo-heart-eyes font-danger f-20"></i>
                            <i className="icofont icofont-emo-heart-eyes font-danger f-20 m-l-5"></i> </P> <hr />
                        <P>{ChataApp_p2} &nbsp;<i className="icofont icofont-emo-rolling-eyes font-success f-20"></i></P>
                        <hr />
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div className="user-profile">
                        <div className="image">
                            <div className="avatar text-center"><Media body alt="" src={two} /></div>
                            <div className="icon-wrapper"><i className="icofont icofont-pencil-alt-5"></i></div>
                        </div>
                        <div className="user-content text-center"><H5 attrH5={{ className: 'text-center text-uppercase' }} >{MarkJecno}</H5>
                            <div className="social-list">
                                <UL>
                                    <LI><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></LI>
                                    <LI><a href="https://accounts.google.com/"><i className="fa fa-google-plus"></i></a></LI>
                                    <LI><a href="https://twitter.com/"><i className="fa fa-twitter"></i></a></LI>
                                    <LI><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></LI>
                                    <LI><a href="https://dashboard.rss.com/auth/sign-in/"><i className="fa fa-rss"></i></a></LI>
                                </UL>
                            </div>
                            <div className="follow text-center">
                                <Row>
                                    <Col className="border-right"><span>{Following}</span><div className="follow-num">{'236k'}</div> </Col>
                                    <Col><span>{Follower}</span> <div className="follow-num">{'3691k'}</div>
                                    </Col>
                                </Row>
                            </div>
                            <div className="text-center digits">
                                <P>{'Mark.jecno23@gmail.com'}</P>
                                <P>{'+91 365 - 658 - 1236'}</P>
                                <P>{'Fax: 123-4560'}</P>
                            </div>
                        </div>
                    </div>
                </TabPane>
            </TabContent> */}

        </>
    );
};
export default ChatMenu;