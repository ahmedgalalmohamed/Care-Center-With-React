import React, { Fragment, useEffect, useState } from "react"; //to use function to get information  and useState to store data
import { useNavigate, Link } from 'react-router-dom'
import './DoctInfo.css';//to css file
import axios from "axios";//to get data API
import { Card, Container, Row, Table, Button, Alert } from "react-bootstrap";//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';//bootstrap


function DoctInfo(props) {

    const [person, setperson] = useState(Array);//to store data from DataBase NodeJs
    let history = useNavigate();
    const countnotass = props.countalldoctor - props.countdrassignment;

    //#region to get data from DataBase NodeJs
    useEffect(() => {
        axios.get("http://localhost:4000/doctorNotAss", { withCredentials: true })
            .then(res => {
                setperson(res.data.dr);
            }).catch(err => console.log(err));
    }, [])
    //#endregion

    //#region to erase doctor from display
    function deletedoct(e) {
        e.preventDefault();
        const str = e.target.id;
        const id = str.split(',')[0];
        const name = str.split(',')[1];
        const email = str.split(',')[2];
        if (id != "" || name != "" || email != "") {
            axios.post('http://localhost:4000/doctorAdd', { id: id, name: name, email: email }, { withCredentials: true })
                .then(res => {
                    window.location.assign('/doctorNotAPP');
                }).catch(err => console.log(err));
        }
    }
    //#endregion

    function funcomponent() {
        if (countnotass > 0 && props.isauthenticated) {
            return (
                <Container>
                    {person.map((user) => (
                        <Row key={Math.random()} className="row">
                            {user.map((users) => (
                                <Card key={Math.random()} style={{ width: '25rem', padding: '0px' }}>
                                    <Card.Link as={Link} to={{pathname:'/doctorprofile',search:users._id}}><Card.Img variant="top" src={process.env.PUBLIC_URL + '/dr1.jpg'} /></Card.Link>
                                    <Table style={{ margin: '5px' }}>
                                        <tbody>
                                            <tr>
                                                <td>Dr.Name</td>
                                                <td>{users.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Dr.Specialised</td>
                                                <td>{users.specialised}</td>
                                            </tr>
                                            <tr>
                                                <td>Dr.Home Work</td>
                                                <td>{users.hourwork}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button title="Is You Want To Add Doctor" className={"btnadd"} id={[users._id, users.name, users.email]} onClick={deletedoct} variant="success"> Add </Button>
                                </Card>
                            ))}
                        </Row>
                    ))
                    }
                </Container >
            )
        }
        if (props.isauthenticated) {
            return (
                <Container style={{ marginTop: '10%' }}>
                    <Alert style={{ textAlign: 'center' }}>
                        <Alert.Heading>Doctor Not Appointment Is Empty</Alert.Heading>
                    </Alert>
                </Container>
            )
        }
    }

    return (
        <Fragment>
            {funcomponent()}
        </Fragment>
    )
}

export default DoctInfo;