import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";

class SignIn extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            password: '',
            errorSingin: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const phone = e.target.phone.value;
        const password = e.target.password.value;
        if (isNaN(phone)) {
            this.setState({ errorSingin: 'this is not number' })
        }
        else {
            axios.post("http://localhost:4000/signin", { phone: phone, password: password }, { withCredentials: true })
                .then(res => {
                    if (res.data == 'Success') {
                        window.location.assign('/');
                    }
                    else {
                        this.setState({ errorSingin: res.data })
                    }
                })
                .catch(error => console.log(error));
        }
        this.render();
    }

    render() {
        if (true) {
            return (
                <div class="col-md-4 offset-md-4 con">
                    {this.state.errorSingin !== '' ?
                        <Alert variant="danger">
                            {this.state.errorSingin}
                            <Alert.Link as={Link} to="/signup"> Please Sign Up </Alert.Link>
                        </Alert>
                        :
                        <div></div>
                    }
                    <h1>Sign In</h1>
                    <form method="post" onSubmit={this.onSubmit}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Phone</label>
                            <input type="text" class="form-control" placeholder="Enter Your Phone Or Email" name="phone" minlLength="11" maxLength="11" required />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" placeholder="Enter Your Password" name="password" minlength="10" required />
                        </div>
                        <button type="submit" class="btn btn-primary btn1">Sign In</button>
                    </form>
                </div>
            )
        }
    }
}
export default SignIn;