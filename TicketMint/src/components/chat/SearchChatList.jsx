import React, { Fragment, useContext, useState } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
// import ChatAppContext from '../../../../_helper/Chat';

const SearchChatList = () => {
    // const { searchMember } = useContext(ChatAppContext);
    // const [searchKeyword, setSearchKeyword] = useState('');
    // const handleSearchKeyword = (keyword) => {
    //     setSearchKeyword(keyword);
    //     searchMember(keyword);
    // };
    return (
        <>
            <div className="search">
                <Form className="theme-form">
                    <FormGroup className="form-group">
                        <Input
                            className="form-control"
                            type="text"
                            placeholder="search"
                            // defaultValue={searchKeyword}
                            // onChange={(e) =>
                            //     handleSearchKeyword(e.target.value)
                            // }
                        />
                        <i className="fa fa-search"></i>
                    </FormGroup>
                </Form>
            </div>
        </>
    );
};

export default SearchChatList;