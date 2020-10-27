import React from 'react';
import Axios from 'axios';
import ErrorNotice from '../Errornotice'


export default class Register extends React.Component {
    state = {
        email: "",
        password: "",
        passwordCheck: "",
        displayName: "",
        error: ""
    }

    componentDidMount() {
        if (sessionStorage.getItem("isLoggedIn") === "true") {
            window.history.back()
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                passwordCheck: this.state.passwordCheck,
                displayName: this.state.displayName,
            };
            await Axios.post(
                "https://aalyablogapp.herokuapp.com/auth/register/",
                newUser
            );
            const loginRes = await Axios.post(
                "https://aalyablogapp.herokuapp.com/auth/login/",
                {
                    email: this.state.email,
                    password: this.state.password,
                }
            );
            let count = 0;
            if (loginRes) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("user", loginRes.data.user.displayName);
                count++;
                this.setState({
                    token: loginRes.data.token,
                    user: loginRes.data.user,
                })
                if (count === 1) {
                    window.location.reload();
                }
            } else {
                window.location = "/login"
            }

        } catch (err) {
            console.log(err.response.data.msg)
            err.response.data.msg && this.setState({
                error: err.response.data.msg

            })
        }
    }

    render() {
        return (
            <div className="page-log" >
                <h2>Register</h2>
                { this.state.error && (
                    <ErrorNotice message={this.state.error} clearError={() => this.setState({
                        error: undefined
                    })} />
                )}
                <form className="form" onSubmit={this.submit}>
                    <label>Email: </label>
                    <input
                        id="register-email"
                        type="email"
                        onChange={e => this.handleChange(e)}
                        name="email" value={this.state.email}
                    />

                    <label>Password: </label>
                    <input
                        id="register-password"
                        type="password"
                        name="password" value={this.state.password} onChange={e => this.handleChange(e)}
                    />

                    <input
                        id="register-password-check"
                        type="password"
                        name="passwordCheck"
                        placeholder="Verify password"
                        onChange={e => this.handleChange(e)} />

                    <label>Display name: </label>
                    <input
                        id="display-name"
                        type="text"
                        name="displayName" value={this.state.displayName} onChange={e => this.handleChange(e)}
                    />

                    < input type="submit" value="Register" />
                </form>
            </div >
        );
    }
}