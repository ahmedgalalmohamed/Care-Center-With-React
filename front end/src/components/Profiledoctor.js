import axios from "axios";
import { Card, Table, Container ,Alert} from "react-bootstrap";
import { useEffect, useState } from "react"; //to use function to get information  and useState to store data
import { useLocation, useParams } from "react-router-dom";

function Profiledoctor() {
    const [doctor, setdoctor] = useState({});
    const location  = useLocation();
    const doctorid = location.search.substring(1,location.search.length);
    //#region to get data from DataBase NodeJs
    useEffect(() => {
        axios.post("http://localhost:4000/doctorprofile", { doctorid: doctorid }, { withCredentials: true })
            .then(res => {
                setdoctor(res.data.doctor);
            }).catch(err => console.log(err));
    }, [])
    //#endregion   
    if (doctor !== null) {
        return (
            <Container>
                <Card style={{ flexDirection: 'row' }}>
                    <Card.Img variant="top" src={process.env.PUBLIC_URL + '/dr1.jpg'} />
                    <Card.Body>
                        <Card.Header>Pernaol</Card.Header>
                        <Table>
                            <tbody>
                                <tr>
                                    <td>Dr.Phone</td>
                                    <td>{doctor._id}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Name</td>
                                    <td>{doctor.name}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Email</td>
                                    <td>{doctor.email}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Experience</td>
                                    <td>{doctor.experience}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Specialised</td>
                                    <td>{doctor.specialised}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Degree</td>
                                    <td>{doctor.degree}</td>
                                </tr>
                                <tr>
                                    <td>Dr.HourWork</td>
                                    <td>{doctor.hourwork}</td>
                                </tr>
                                <tr>
                                    <td>Dr.Location</td>
                                    <td>{doctor.location}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
    else {
        return (
            <Container style={{ marginTop: '10%' }}>
                <Alert style={{ textAlign: 'center' }}>
                    <Alert.Heading>Doctor Not Found</Alert.Heading>
                </Alert>
            </Container>
        )
    }
}

export default Profiledoctor;