import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AccessAdminPanel = () => {
  const { handleSubmit, register, errors } = useForm();


  const onSubmit = (data, e) => {
    axios.post('https://mighty-shelf-41443.herokuapp.com/makeAdmin', {
      adminEmail: data
    }).then(response => {
      console.log(response);
      if (response.data === false) {
        alert("Admin already exists");
        e.target.reset()
      } else {
        alert('You added an admin successfully');
        e.target.reset()
      }
    })
      .catch(function (error) {
        console.log(error);
      })
  }


  return (
    <div className="rightSide">
      <div className="row">
        <div className="col-md-5">
          <h4 className="ml-5 pl-3 mt-3">Please add an email for access Admin panel</h4>
          <div className="col-md-10 text-white bg-white m-3 p-5">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <span className="text-dark">Email</span><br />
              <input type="text" placeholder="@gmail.com" name="email" ref={register({ required: true })} className="form-control pl-3 my-3" />
              {errors.email && <small className="text-danger">This field is required</small>}
              <button className="btn btn-success" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessAdminPanel;