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
    // this.setState({ loading: true });
    // this.getUsers()
    //   .then((res) => {
    //     this.setState({ users: res.data });
    //   })
    //   .catch((err) => {
    //     throw err;
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //   });
    const getUsers = axios.get("http://localhost:3001/api/users");
    const getArticles = axios.get("http://localhost:3001/api/articles");
    axios
      .all([getUsers, getArticles])
      .then(
        axios.spread((result1, result2) => {
          const users = result1.data.map((user) => {
            return {
              ...user,
              article: result2.data.filter((item) => {
                return item.user_id === user.id;
              }),
            };
          });
          this.setState({ users: users });
        })
      )
      .catch((err) => {
        throw err;
      });
  }

  //   getUsers = async () => {
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 2000);
  //     });
  //     return await axios.get("http://localhost:3001/api/users");
  //   };

  handleCreate = () => {
    window.location.href = "/user/add";
  };

  render() {
    const { loading, users } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <>
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of articles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user/${user.id}`}> {user.name} </Link>
                </td>
                <td> {user.article.length} </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={this.handleCreate}>
          Create new user
        </button>
      </>
    );
  }
}

export default Users;
