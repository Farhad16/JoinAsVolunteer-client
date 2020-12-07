import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../images/logos/logo.png'

const AccessPurposeAdmin = () => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = (data, e) => {

        fetch('https://dry-bastion-62808.herokuapp.com/makeAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        }).then(res => res.json())
            .then(result => {
                if (result) {
                    alert("Admin added successfully");
                    e.target.reset();
                }
            })
    }
    return (
        <div className="rightSide">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <div className="order-form p-5 m-5">
                        <Link to="/" className="my-3"><img src={logo} alt="" width="150px" /></Link>
                        <h5 className="font-weight-bold text-center text-success my-3">Make an admin using a valid email</h5>
                        <div className="col-md-10 text-white bg-white m-3 p-5">
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <span className="text-dark">Email</span><br />
                                <input type="text" placeholder="@gmail.com" name="email" ref={register({ required: true })} className="input-field titleInput pl-3 my-3" />
                                {errors.email && <small className="text-danger">This field is required</small>}
                                <button className="btn btn-success" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AccessPurposeAdmin;