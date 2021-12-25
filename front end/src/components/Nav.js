import { NavLink } from "react-router-dom";
import './Nav.css';
import { Nav, NavDropdown, Navbar, Container, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarMinus, faCalendarPlus, faUserCog, faClinicMedical, faIdCard, faSignInAlt, faSignOutAlt, faUserCircle, faUserNurse, faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
function Navigation(props) {

    const drnotass = props.countalldoctor - props.countdrassignment;
    //#region NavLinkS
    function NavLinkDoctorsNotAppointment() {
        if (props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to="/doctorNotAPP"><FontAwesomeIcon icon={faCalendarMinus}></FontAwesomeIcon> Doctors Not Appointment<Badge pill bg="primary">{drnotass}</Badge></NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkDoctorsAppointment() {
        if (props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to="/doctorAPP"><FontAwesomeIcon icon={faCalendarPlus}></FontAwesomeIcon> Doctors Appointment<Badge pill bg="primary">{props.countdrassignment}</Badge></NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkDropDownDoctors() {
        if (props.isauthenticated) {
            return (
                <NavDropdown title={doctor} id="collasible-nav-dropdown">
                    {NavLinkDoctorsNotAppointment()}
                    {NavLinkDoctorsAppointment()}
                </NavDropdown>
            )
        }
        else {
            return (
                null
            )
        }
    }
    function NavLinkSignUp() {
        if (!props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to="/signup"><FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon> SignUp</NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkSignIn() {
        if (!props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to="/signin"><FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon> SignIn</NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkLogout() {
        if (props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to='/logout' ><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Logout</NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkProfile() {
        if (props.isauthenticated) {
            return (
                <NavDropdown.Item as={NavLink} to="/userprofile"><FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon> Profile</NavDropdown.Item>
            )
        }
        else {
            return (null)
        }
    }
    function NavLinkNameUser() {
        if (props.isauthenticated) {
            return (
                <Nav.Link as={NavLink} to="/userprofile" className="Navusername">{props.username}<Badge className="Badgepill" pill bg="success">.</Badge></Nav.Link>
            )
        }
        else {
            return (null)
        }
    }
    // function NavLinkdoctorprofile() {
    //     if (props.isauthenticated) {
    //         return (
    //             <Nav.Link as={NavLink} to="/doctorprofile" className="Navusername">Link</Nav.Link>
    //         )
    //     }
    //     else {
    //         return (null)
    //     }
    // }
    //#endregion

    const doctor = <span><FontAwesomeIcon icon={faUserNurse}></FontAwesomeIcon> Doctors</span>;
    const setting = <span><FontAwesomeIcon icon={faUserCog}></FontAwesomeIcon> Settings</span>;
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container style={{ marginRight: '0px' }}>
                <Navbar.Brand>Care Center</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/"><FontAwesomeIcon icon={faClinicMedical}></FontAwesomeIcon> Home</Nav.Link>
                        {NavLinkDropDownDoctors()}
                        <NavDropdown title={setting} id="collasible-nav-dropdown">
                            {NavLinkSignUp()}
                            {NavLinkSignIn()}
                            {NavLinkLogout()}
                            {NavLinkProfile()}
                        </NavDropdown>
                        <Nav.Link as={NavLink} to="/contact"><FontAwesomeIcon icon={faPhoneSquareAlt} spin ></FontAwesomeIcon> Contact Us</Nav.Link>
                        {NavLinkNameUser()}
                        {/* {NavLinkdoctorprofile()} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Navigation;