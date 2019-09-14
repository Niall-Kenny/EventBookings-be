import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../context/auth-context";
import "./authPage.css";

class AuthPage extends Component {
  state = {
    email: "",
    password: "",
    displayIsLogin: true
  };

  LoginOrSignUp = () => {
    this.setState(({ displayIsLogin }) => {
      return { displayIsLogin: !displayIsLogin };
    });
  };

  handleChange = ({ target: { type, value } }) => {
    this.setState({ [type]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, displayIsLogin } = this.state;
    if (!email.trim().length || !password.trim().length) {
      return;
    }

    let requestBody = {
      query: `
                query{
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
    };
    if (!displayIsLogin) {
      requestBody = {
        query: `
                    mutation{
                        createUser(userInput: {email: "${email}", password: "${password}"}){
                            _id
                            email
                        }
                    }
                `
      };
    }

    axios
      .post("http://localhost:4000/graphql", requestBody)
      .then(res => {
        const { token, userId, tokenExpiration } = res.data.data.login;
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed!!");
        }
        if (token) {
          this.context.login(token, userId, tokenExpiration);
        }
      })
      .catch(err => console.log("in error!", err.message));
  };

  render() {
    const { email, password, displayIsLogin } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="auth-form">
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.LoginOrSignUp}>
            Switch to {displayIsLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}
AuthPage.contextType = AuthContext;
export default AuthPage;
