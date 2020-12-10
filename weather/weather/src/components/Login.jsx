import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    var name 
    await axios.get("/getUsername",
    {
        params:
        {
            email: emailRef.current.value
        }
    }).then(response =>
    {
        name = response.data[0].username
    });
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push({pathname:"/home", state:{username: name}})
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}> 
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Giriş</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                        Giriş Yap
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Şifrenizi mi unuttunuz?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Hesaba mı ihtiyacınız var? <Link to="/signup">Hesap oluştur</Link>
            </div>
        </div>
    </Container>
      
    </>
  )
}
