import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import { Helmet } from "react-helmet";
import { listUsers } from "../../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, history]);

  // useEffect(() => {
  //   if (userInfo && userInfo.isAdmin) {
  //     dispatch(listUsers());
  //   } else {
  //     history.push("/login");
  //   }
  // }, [dispatch, history, userInfo]);

  return (
    <>
      <HeaderAdmin />
      <Helmet>
        <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="admin/assets/css/feathericon.min.css" />
        <link rel="stylesheet" href="admin/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="admin/assets/css/style.css" />
      </Helmet>
      <Sidebar />
      <div class="main-wrapper">
        <div class="page-wrapper">
          <div class="content container-fluid">
            <div class="page-header">
              <div class="row">
                <div class="col-sm-12">
                  <h3 class="page-title">User List</h3>
                  <ul class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboard</a>
                    </li>
                    <li class="breadcrumb-item active">User List</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12">
                <div class="card">
                  <div class="card-header">
                    <h4 class="card-title">Hover Rows</h4>
                  </div>
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover mb-0">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, i) => (
                            <tr>
                              <td>{i + 1}</td>
                              {/* <td>{user._id}</td> */}

                              <td>{user.name}</td>

                              <td>{user.email}</td>
                              <td>
                                {" "}
                                {user.isAdmin ? (
                                  <i
                                    className="fas fa-check"
                                    style={{ color: "green" }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-times"
                                    style={{ color: "red" }}
                                  ></i>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListScreen;
