import React from 'react';
import Axios from 'axios';
import ErrorNotice from '../Errornotice'


export default class Login extends React.Component {
    state = {
        email: "",
        password: "",
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
            const loginUser = {
                email: this.state.email,
                password: this.state.password
            };
            const loginRes = await Axios.post("https://aalyablogapp.herokuapp.com/auth/login/",
                loginUser
            )
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

            err.response.data.msg && this.setState({
                error: err.response.data.msg

            })
        }
    }



    render() {
        return (
            <div className="page-log">
                <h2>Login</h2>
                {this.state.error && (
                    <ErrorNotice message={this.state.error} clearError={() => this.setState({
                        error: undefined
                    })} />
                )}

                <form className="form" onSubmit={this.submit}>
                    <label>Email: </label>
                    <input
                        id="login-email"
                        type="email"
                        onChange={e => this.handleChange(e)}
                        name="email" value={this.state.email}
                    />

                    <label>Password: </label>
                    <input
                        id="login-password"
                        type="password"
                        name="password" value={this.state.password} onChange={e => this.handleChange(e)}
                    />

                    <input type="submit" value="Log in" />
                </form>
            </div>
        )



    }
}
