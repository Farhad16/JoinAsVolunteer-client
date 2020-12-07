import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Program.css'


const Program = ({ program }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const setId = (title) => {
        loggedInUser.title = title;
    }

    const { name, title, img, image } = program;
    return (
        <div className="col-md-4 col-sm-6 col-12 col-lg-4">
            <Link to="volunteer/register" onClick={() => setId(title)}>
                <div className="service p-3 h-100 mb-3">
                    <div className="m-3">
                        {
                            image ? <img className="img-style" src={`data:image/png;base64,${image.img}`} alt="" />
                                :
                                <img className="img-style" src={require(`../../images/${img}`)} alt="" />
                        }
                    </div>
                    <div className="m-3">
                        <h3 className="my-2 text-success">{name}</h3>
                        <h6 className="my-2 text-dark">{title}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Program;