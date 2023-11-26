import { Button, Form, Modal } from "react-bootstrap"

const ModalForm = ({ show, handleClose, data, clickEdit, activeForm, handleItemform, invalidEmail, submit, submitActive, messageError, deleteData }) => {
    const created_at = new Date(data?.created_at ?? Date.now())
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    User {data?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={data?.name} disabled={!activeForm} onChange={(e) => handleItemform('name', e.target.value)} />
                        {
                            messageError?.name?.map((errorMessage, index) => (
                                <>
                                    <Form.Text style={{ color: '#A14040' }}>
                                        {errorMessage === "The name field must be a string." ? 'Name can\'t be empty': errorMessage}
                                    </Form.Text>
                                    <br />
                                </>
                            ))
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={data?.email} disabled={!activeForm} onChange={(e) => handleItemform('email', e.target.value)} />
                        {(invalidEmail && submitActive) &&
                            <>
                                <Form.Text style={{ color: '#A14040' }}>
                                    Email format is invalid
                                </Form.Text>
                                <br />
                            </>
                        }
                        {
                            messageError?.email?.map((errorMessage, index) => (
                                <>
                                    <Form.Text style={{ color: '#A14040' }}>
                                    {errorMessage === "The email field must be a string." ? 'Email can\'t be empty': errorMessage}

                                    </Form.Text>
                                    <br />
                                </>
                            ))
                        }
                        {
                            messageError == "The email has already been taken." && 
                            <>
                                    <Form.Text style={{ color: '#A14040' }}>
                                    {messageError}
                                    </Form.Text>
                                    <br />
                                </>
                        }
                    </Form.Group>
                    {activeForm &&
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => handleItemform('password', e.target.value)} />
                            {
                                messageError?.password?.map((errorMessage, index) => (
                                    <>
                                        <Form.Text style={{ color: '#A14040' }}>
                                            {errorMessage}
                                        </Form.Text>
                                        <br />
                                    </>
                                ))
                            }
                        </Form.Group>
                    }
                    <Form.Group className="mb-3">
                        <Form.Label>Registered at</Form.Label>
                        <Form.Control type="text" value={created_at?.toLocaleDateString()} disabled />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                {
                    activeForm ?
                        <>
                            <Button onClick={handleClose} variant="danger">Cancel</Button>
                            <Button onClick={submit} variant="success">Submit</Button>
                        </>
                        :
                        <>
                            <Button onClick={deleteData} variant="danger">Delete</Button>
                            <Button onClick={() => clickEdit('edit')}>Edit</Button>
                        </>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default ModalForm