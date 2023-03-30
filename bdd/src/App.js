import React, { useState, useEffect } from "react";
import bddService from "./api/bddService";
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components'

function App() {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBdd, setNewBdd] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault()
    bddService.createBDD(newBdd).then(res => console.log(newBdd))
    setOpen(false)
  }

  useEffect(() => {
    bddService.getBDD().then(res => setData(res.data))
  }, [data])

  return (
    <div>
      <h1>Base de Données</h1>
      <ul>
        {data.map((post) => (
         <p>{post}</p>
        ))}
      </ul>
      <button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Form
      </button>
      <Dialog open={open} onClose={handleClose}>
        <Form onSubmit={handleSubmit}>
          <FormField
            value={newBdd}
            onChange={e => setNewBdd(e.target.value)}
            name='bdd'
            type='text'
          />
          <StyledButton type="submit" color="primary">
            Save
          </StyledButton>
        </Form>
      </Dialog>
    </div>
  );
}

const Form = styled.form`
display: flex;
flex-direction: column;
padding: 20px;
background-color: #fff;
`;

const FormField = styled.input`
margin: 10px 0;
padding: 10px;
border: none;
border-radius: 5px;
background-color: #f1f1f1;
font-size: 16px;
`;

const StyledButton = styled.button`
margin-top: 10px;
`;

export default App;
