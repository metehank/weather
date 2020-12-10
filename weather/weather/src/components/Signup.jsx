import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios'

export default function Signup() {
  const emailRef = useRef()
  const uidRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    var check = 0
    await axios.post("/addUser", null, 
    { 
        params: 
        {
            username: uidRef.current.value,
            email: emailRef.current.value
        }
    }).then(response =>
    {   
        check = 1;
    });
    if(check===1)
    {
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            console.log("1-1")
            
            history.push({pathname:"/home", state:{username: uidRef.current.value}})
        } catch {
          setError("Failed to create an account")
        }
    
        setLoading(false)
    }
    
  }

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}> 
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Hesap Oluştur</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="uid">
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control type="uid" ref={uidRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Şifre Onayı</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Hesap oluştur
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Zaten bir hesabınız mı var? <Link to="/login">Giriş yap</Link>
                </div>
            </div>
        </Container>
    </>
  )
}
