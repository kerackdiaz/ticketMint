import React from 'react';
import { Link } from 'react-router-dom';


const CurrentUser = () => {
    const { currentUserr } = useContext(ChatAppContext);
    var images = require.context('../../../../assets/images', true);
    const dynamicImage = (image) => {
        return images(`./${image}`);
    };

    return (
        <>
            {/* {currentUserr && <div className="media">
                <Image attrImage={{
                    src: `${dynamicImage(currentUserr.thumb)}`
                    , className: 'rounded-circle user-image'
                    , alt: ''
                }}
                />
                <div className="about">
                    <Link to={`${process.env.PUBLIC_URL}/app/users/userprofile`}>
                        <div className="name f-w-600">{currentUserr.name}</div></Link>
                    <div className="status">{currentUserr.status}</div>
                </div>
            </div>} */}
        </>
    );
};

export default CurrentUser;