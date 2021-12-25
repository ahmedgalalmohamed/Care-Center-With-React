import axios from "axios";
import { Tabs, Tab, Table, Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react"; //to use function to get information  and useState to store data

function Profileusers() {
    const [user, setuser] = useState({});
    const [oldpassword, setoldpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [newusername, setnewusername] = useState('');
    const [conpassword, setconpassword] = useState('');
    const [err1, seterr1] = useState('');
    const [err2, seterr2] = useState('');

    //#region to get data from DataBase NodeJs
    useEffect(() => {
        axios.get("http://localhost:4000/userprofile", { withCredentials: true })
            .then(res => {
                setuser(res.data.user);
            }).catch(err => console.log(err));
    }, [])
    //#endregion
    function ChangePassword(e) {
        e.preventDefault();
        if (newpassword !== conpassword) {
            seterr1('Not Match');
        }
        else if (oldpassword !== user.password) {
            seterr1('Old Password Is Not Correct');
        }
        else if (newpassword == user.password) {
            seterr1('Old Password And New Password Is Match');
        }
        else {
            axios.post("http://localhost:4000/updatePassword", { password: newpassword }, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                window.location.assign('/userprofile');
            }).catch(err => console.log(err));
        }
    }
    function ChangeUsername(e) {
        e.preventDefault();
        if (newusername.toLowerCase() == user.name.toLowerCase()) {
            seterr2('This Is Old Username');
        }
        else {
            axios.post("http://localhost:4000/updateusername", { username: newusername }, { withCredentials: true })
                .then(res => {
                    window.location.assign('/userprofile');
                }).catch(err => console.log(err));
        }
    }
    return (
        <Container>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <Table variant="light" striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Phone</th>
                                <td>{user._id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>************</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="updatepassword" title="Update Password">
                    <Form style={{ backgroundColor: 'white' }} onSubmit={ChangePassword}>
                        <Form.Group className="mb-3" controlId="formnewPassword">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter New Password" onChange={(e) => setnewpassword(e.target.value)} minLength={10} required={true} autoComplete="new-password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formconPassword">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm New Password" onChange={(e) => setconpassword(e.target.value)} required={true} autoComplete="new-password" />
                            <Form.Text style={{ color: 'red' }}>
                                {err1}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formoldPassword">
                            <Form.Label> Enter Old Password </Form.Label>
                            <Form.Control type="password" placeholder="Enter Old Password " onChange={(e) => setoldpassword(e.target.value)} required={true} autoComplete="new-password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Change Password
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="updateusername" title="Update Username">
                    <Form style={{ backgroundColor: 'white' }} onSubmit={ChangeUsername}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Enter New UserName</Form.Label>
                            <Form.Control type="text" placeholder="Enter New UserName" onChange={(e) => setnewusername(e.target.value)} required={true} />
                            <Form.Text style={{ color: 'red' }}>
                                {err2}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Change Username
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Profileusers;