import { useState } from 'react'
import axios from 'axios'
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const [data, setData] = useState({ email: "saravana@gmail.com", password: "saravanan" })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/login`, data)
            alert("login successfull")
            navigate("/master")
            // setData({ email: "", password: '' })
        } catch (error) {
            alert("login error")
            console.log("login failed")
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Card style={{ width: "24rem" }} className="shadow-lg p-4 rounded">
                <Card.Body>
                    <h3 className="text-center mb-4 text-primary">Login</h3>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>

    );
}

export default Login;
