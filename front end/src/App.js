import axios from "axios";
import React from "react"; //to use function to get information  and useState to store data
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Navigation, Home, Contact, SignUp, SignIn, DoctInfo, Logout, DoctAss, Profileusers, Profiledoctor } from "./components";
class App extends React.Component {

  constructor() {
    super();
    this.GetInfo = this.GetInfo.bind(this);
    this.state = {
      isauthenticated: true,
      username: '',
      countdrassignment: 0,
      countalldoctor: 0
    }
    this.GetInfo();
  }

  GetInfo() {
    axios.get("http://localhost:4000/signin", { withCredentials: true })
      .then(res => {
        this.setState({ isauthenticated: res.data.isauthenticated });
        this.setState({ username: res.data.username });
        this.setState({ countdrassignment: res.data.countdrassignment });
        this.setState({ countalldoctor: res.data.countalldoctor });
      }).catch(error => console.log(error));
  }






  //#region  Routers
  RouterProfiledoctor() {
    if (this.state.isauthenticated) {
      return (
        <Route exact path="/doctorprofile" element={<Profiledoctor />} />
      )
    }
  }
  RouterDocAss() {
    if (this.state.isauthenticated) {
      return (
        <Route exact path="/doctorAPP" element={<DoctAss />} />
      )
    }
    else {
      return (
        <Route path="/doctorAPP" element={<Navigate replace to="/" />} />
      )
    }
  }
  RouterProfileusers() {
    if (this.state.isauthenticated) {
      return (
        <Route exact path="/userprofile" element={<Profileusers />} />
      )
    } else {
      return (
        <Route path="/userprofile" element={<Navigate replace to="/" />} />
      )
    }
  }
  RouterHome() {
    if (true) {
      return (
        <Route exact path="/" element={<Home />} />
      )
    }
  }
  RouterLogout() {
    if (this.state.isauthenticated) {
      return (
        <Route exact path="/logout" element={<Logout />} />
      )
    }
    else {
      return (
        <Route path="/logout" element={<Navigate replace to="/" />} />
      )
    }
  }
  RouterSignUp() {
    if (!this.state.isauthenticated) {
      return (
        <Route path="/signup" element={<SignUp />} />
      )
    }
    else {
      return (
        <Route path="/signup" element={<Navigate replace to="/doctorAPP" />} />
      )
    }
  }
  RouterSignIn() {
    if (!this.state.isauthenticated) {
      return (
        <Route path="/signin" element={<SignIn />} />
      )
    }
    else {
      return (
        <Route path="/signin" element={<Navigate replace to="/doctorAPP" />} />
      )
    }
  }
  RouterContact() {
    if (this.state.isauthenticated) {
      return (
        <Route path="/contact" element={<Contact />} />
      )
    }
  }
  RouterDoctInfo() {
    switch (this.state.isauthenticated) {
      case true:
        return (
          <Route path="/doctorNotAPP" element={<DoctInfo countalldoctor={this.state.countalldoctor} countdrassignment={this.state.countdrassignment} isauthenticated={this.state.isauthenticated} />} />
        );

      case false:
        return (
          <Route path="/doctorNotAPP" element={<Navigate replace to="/" />} />
        );
    }
  }
  //#endregion
  render() {
    return (
      <div className="App">
        <Router>
          <Navigation countalldoctor={this.state.countalldoctor} countdrassignment={this.state.countdrassignment} isauthenticated={this.state.isauthenticated} username={this.state.username} />
          <Routes>
            {this.RouterHome()}
            {this.RouterSignUp()}
            {this.RouterContact()}
            {this.RouterDoctInfo()}
            {this.RouterSignIn()}
            {this.RouterLogout()}
            {this.RouterDocAss()}
            {this.RouterProfileusers()}
            {this.RouterProfiledoctor()}
          </Routes>
        </Router>
      </div>
    );
  }
}
export default App;
