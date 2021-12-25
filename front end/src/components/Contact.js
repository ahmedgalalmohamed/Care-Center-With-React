import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'

function Contact(props) {
    const [show, setShow] = useState(true);
    let history = useNavigate();
    const handleClose = () => {
        setShow(false);
        history('/');
    };
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Table style={{ margin: '5px' }}>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Eng Ahmed Galal</td>
                        </tr>
                        <tr>
                            <td>Email </td>
                            <td>ahmed.galal226@yahoo.com </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>01280904213</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
export default Contact;