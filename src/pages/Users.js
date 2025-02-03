import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getUsers()
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getUsers = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    return await axios.get("http://localhost:3001/api/users");
  };

  handleCreate = () => {
    window.location.href = "/user/add";
  };

  render() {
    const { loading, users } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <div key={user.id}>
            <Link to={`/user/${user.id}`}> {user.name} </Link>
          </div>
        ))}
        <button type="button" onClick={this.handleCreate}>
          Create
        </button>
      </div>
    );
  }
}

export default Users;
