import React from "react";
import './signup.css';
import EmailJS from "emailjs-com";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
    constructor() {
        super();
        this.SendEmail = this.SendEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            fromName: 'Ahmed Galal',
            fromEmail: '',
            message: Math.floor((Math.random() * 1000000000000) + 1000),
            messageerror: '',
            variant: 'danger',
            sendemailverifiy:''
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.messageerror !== this.state.messageerror) {
            this.render();
        }
        if (prevState.sendemailverifiy !== this.state.sendemailverifiy) {
            this.render();
        }
    }
    SendEmail(e) {
        e.preventDefault();
        if (this.state.fromEmail.indexOf('@gmail.com') != -1) {
            EmailJS.send(
                'service_mz4n60i',
                'template_ucsfkhq',
                this.state,
                'user_Sn6vz41QrsTNh2oLz7PKv'
            ).then(res => this.setState({sendemailverifiy:res.text})).catch(error => console.log(error));
        }
        else {
            alert("Please Enter You Email Correct" + "\n" + "E.g:*******@gmail.com");
        }
    }
    onSubmit(e) {
        e.preventDefault();
        const confirmcodeuser = e.target.confirm_email.value;
        const confirmcodestate = this.state.message;
        const phone = e.target.phone.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (confirmcodeuser == confirmcodestate) {
            axios.post("http://localhost:4000/signup", { phone: phone, name: name, email: email, password: password })
                .then((res) => {
                    if (res.data.message == 'Success') {
                        this.setState({ variant: 'success' });
                    }
                    else {
                        this.setState({ variant: 'danger' });
                    }
                    this.setState({ messageerror: res.data.message });
                }
                )
                .catch(err => console.log(err));
        }
        else {
            alert("notequal");
        }
    }
    render() {
        return (
            < div className="col-md-4 offset-md-4 con" >
                {this.state.messageerror !== '' ?
                    <Alert variant={this.state.variant}>
                        {this.state.messageerror}
                        {this.state.messageerror === 'Success' ?
                            <Alert.Link as={Link} to="/signin" > Sign In </Alert.Link>
                            :
                            <div></div>
                        }
                    </Alert>
                    :
                    <div></div>
                }
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label for="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" name="phone" maxlength="11" minlength="11" required />
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" onChange={(e) => this.setState({ fromName: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={(e) => this.setState({ fromEmail: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" onClick={this.SendEmail} className="btn btn-primary btn1">Verify Email</button>
                        <span> {this.state.sendemailverifiy} </span>
                    </div>
                    <div className="mb-3">
                        <label for="name" className="form-label">Verify Code Email</label>
                        <input type="text" className="form-control" name="confirm_email" placeholder="Confirm Code Email" required />
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" minlength="10" required />
                    </div>
                    <button type="submit" id="ss" className="btn btn-primary btn1">Create Account</button>
                </form>
            </div >
        )
    }
}
export default SignUp;