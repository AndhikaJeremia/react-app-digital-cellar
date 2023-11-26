import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import HeadTable from './component/table/head';
import BodyTable from './component/table/body';
import ModalForm from './component/modal/modal';
import React from 'react';
import { validateEmail } from './helper/utils';
import axios from 'axios';

function App() {
    const [data, setData] = React.useState([])
    console.log(data)
    const [modalForm, setModalForm] = React.useState(false);
    const [modalFormData, setModalFormData] = React.useState(null);
    const [formActive, setFormActive] = React.useState(null)
    const [submitActive, setSubmitActive] = React.useState(false)
    const [msgError, setMessageError] = React.useState(null)
    const modalFormOpenClose = (data) => {
        setModalForm(!modalForm)
        setModalFormData(data)
        activateForm(null)
        setSubmitActive(false)
    }
    const activateForm = (type) => setFormActive({ type })
    const [invalidEmail, setInvalidEmail] = React.useState(false)


    const handleItemform = (key, value) => {
        if (key === 'email') {
            let test = validateEmail(value)
            setInvalidEmail(test)
        }
        setModalFormData(prevState => ({
            ...prevState,
            [key]: value
        }))
    }
    const submit = () => {
        setSubmitActive(true)
        if(formActive?.type == 'edit') {
            const input = {...modalFormData}
            delete input.created_at
            delete input.updated_at
            delete input.id
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `laravel-api-1.andhikajeremia.com/api/user/${modalFormData.id}`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : input
            };
            // config = {...config, data:modalFormData}
              
            axios.request(config).then(() => {
                modalFormOpenClose()
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'laravel-api-1.andhikajeremia.com/api/user',
                    headers: { }
                  };
                  
                  axios.request(config)
                  .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    setData(response.data.data)
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            }).catch((err) => {
                setMessageError(err.response.data.info)
                console.log(msgError)
                // console.log
                // modalFormOpenClose()
            })
            // console.log(modalFormData);
        }
        if(formActive?.type == 'create'){
            const input = {...modalFormData}
            console.log(input)
            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: 'laravel-api-1.andhikajeremia.com/api/user',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : input
              };
              
              axios.request(config)
              .then((response) => {
                modalFormOpenClose()
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'laravel-api-1.andhikajeremia.com/api/user',
                    headers: { }
                  };
                  
                  axios.request(config)
                  .then((response) => {
                    // console.log(JSON.stringify(response.data));
                    setData(response.data.data)
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                // console.log(JSON.stringify(response.data));
              })
              .catch((error) => {
                setMessageError(error.response.data.info)
              });
        }
    }
    const deleteData = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `laravel-api-1.andhikajeremia.com/api/user/${modalFormData.id}`,
            headers: { }
          };
          
          axios.request(config)
          .then((response) => {
            modalFormOpenClose()
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'laravel-api-1.andhikajeremia.com/api/user',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                // console.log(JSON.stringify(response.data));
                setData(response.data.data)
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            alert('error while deleting data',error)
          });
    }

    React.useEffect(() => {
        if(submitActive === false) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'laravel-api-1.andhikajeremia.com/api/user',
                headers: { }
              };
              
              axios.request(config)
              .then((response) => {
                // console.log(JSON.stringify(response.data));
                setData(response.data.data)
              })
              .catch((error) => {
                console.log(error);
              });
        }
          
    }, [submitActive])
    // console.log(invalidEmail, modalFormData)
    const datadummy = [
        {
            "id": 1,
            "name": "Keely Doyle",
            "email": "eichmann.magnus@example.com",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 2,
            "name": "Rosella Heaney",
            "email": "ralph23@example.com",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 3,
            "name": "Ms. Ashtyn Adams",
            "email": "drosenbaum@example.net",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 4,
            "name": "Dr. Lesley Kassulke",
            "email": "mackenzie.windler@example.net",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 5,
            "name": "Kayla Legros",
            "email": "arnulfo90@example.net",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 6,
            "name": "Prof. Lester Kessler",
            "email": "nbosco@example.org",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 7,
            "name": "Dr. Darrion Kerluke",
            "email": "bruce69@example.net",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 8,
            "name": "Branson Parisian",
            "email": "wfriesen@example.com",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 9,
            "name": "Ms. Nova Skiles",
            "email": "heathcote.braeden@example.com",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        },
        {
            "id": 10,
            "name": "Dr. Immanuel Casper DVM",
            "email": "herminia.reilly@example.org",
            "created_at": "2023-11-26T03:45:00.000000Z",
            "updated_at": "2023-11-26T03:45:00.000000Z"
        }
    ]
    return (
        <div style={{ margin: 20 }}>
            <Button style={{marginBottom:20}} onClick={() => {
                modalFormOpenClose()
                activateForm('create')
            }}>Create new user</Button>
            <Table striped bordered hover>
                <HeadTable />
                <BodyTable data={data} handleModalForm={modalFormOpenClose} />
            </Table>

            <ModalForm show={modalForm} handleClose={modalFormOpenClose} deleteData={deleteData} data={modalFormData} clickEdit={activateForm} submitActive={submitActive} activeForm={formActive?.type !== null} handleItemform={handleItemform} invalidEmail={invalidEmail} submit={submit} messageError={msgError} />
        </div>
    );
}

export default App;
