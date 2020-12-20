import React from 'react';
import { useForm } from 'react-hook-form';
import AdminSidebar from '../../Shared/Sidebar/AdminSidebar';

const MakeAdmin = () => {
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
                <div className="col-md-3">
                    <AdminSidebar></AdminSidebar>
                </div>
                <div className="col-md-7">
                    <nav className="navbar mr-auto d-flex justify-content-between">
                        <p className="orderTitle font-weight-bold">Make Admin</p>
                        <p className="customerName">Customer Name</p>
                    </nav>

                    <div className="order-form">
                        <div className="pb-5">
                            <div className="row p-5">
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
                </div>
            </div>
        </div >
    );
};

export default MakeAdmin;