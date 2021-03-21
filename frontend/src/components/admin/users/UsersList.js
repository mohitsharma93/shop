import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../layout/Sidebar';
import {
	getAllUsers ,
	clearErrors,
  deleteUser
} from '../../../redux/actions/authActions';

const UsersList = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { allUsersInProcess, users, error } = useSelector(state => state.allUsers);
  const { updateUserInProcess, error: updateUserError, isDeleted } = useSelector(state => state.updateUser);

  useEffect(() => {
    dispatch(getAllUsers());

    if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

    if (updateUserError) {
      alert.error(error);
			dispatch(clearErrors());
    }

  }, [dispatch, alert, error, updateUserInProcess, updateUserError]);

  const deleteProductHandler = (id) => {
    dispatch(deleteUser(id))
  }
  

  const setUsers = () => {
    const data = { 
      columns: [
        {
            label: 'User ID',
            field: 'id',
            sort: 'asc'
        },
        {
            label: 'Name',
            field: 'name',
            sort: 'asc'
        },
        {
            label: 'Email',
            field: 'email',
            sort: 'asc'
        },
        {
            label: 'Role',
            field: 'role',
            sort: 'asc'
        },
        {
            label: 'Actions',
            field: 'actions',
        },
    ],
    rows: []
    }
    users && users.map(user => {
      data.rows.push({
				id: user._id,
				name : user.name,
				email: user.email,
        role: user.role,
				actions: <Fragment>
					<Link to={`/admin/user/${user._id}`} className="btn btn-primary">
						<i className="fa fa-pencil"></i>
					</Link>
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(user._id)}>
          <i className="fa fa-trash"></i>
          </button>
        </Fragment>
			});
      return user ;
    })
    return data;
  }
  
  return (
    <Fragment>
      <MetaData title={'All Users'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />

        </div>
        <div className="col-12 col-md-10">
          <Fragment >
            <h1 className="my-5" >All Orders</h1>
            {allUsersInProcess ? <Loader /> : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                striped
                bordered
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  )
}

export default UsersList
