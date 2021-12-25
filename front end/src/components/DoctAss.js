import axios from "axios";
import { Fragment, useEffect, useState } from "react"; //to use function to get information  and useState to store data
import { Table, Button, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
function DoctAss() {
    const [doctors, setdoctor] = useState([]);
    var count = 1;
    useEffect(() => {
        axios.get("http://localhost:4000/doctorAss", { withCredentials: true })
            .then(res => {
                setdoctor(res.data.drassigmnent.dr);
            }).catch(err => console.log(err));
    }, [])

    function DeleteDoctor(e) {
        e.preventDefault();
        const id = e.target.id;
        axios.post('http://localhost:4000/doctorDelete', { id: id }, { withCredentials: true })
            .then(res => {
                window.location.assign('/doctorAPP');
            }).catch(err => console.log(err));
    }
    function funcomponent() {
        if (doctors.length > 0) {
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Time Booking</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={Math.random()}>
                                <td>{count++}</td>
                                <td><Link style={{textDecoration:'none'}} to={{pathname:'/doctorprofile',search:doctor._id}}>{doctor.name}</Link></td>
                                <td>{doctor._id}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.datenow}</td>
                                <td><Button id={doctor._id} onClick={DeleteDoctor} variant="danger"> Delete <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        } if (doctors.length <= 0) {
            return (
                <Container style={{ marginTop: '10%' }}>
                    <Alert style={{ textAlign: 'center' }}>
                        <Alert.Heading>Doctor Appointment Is Empty</Alert.Heading>
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

export default DoctAss;