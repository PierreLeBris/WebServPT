import React, { useState, useEffect } from "react";
import bddService from "./api/bddService";
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components'
import Table from "./components/table";

function App() {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newBdd, setNewBdd] = useState('')
  const [bddSelected, setBddSelected] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const bddTable = (e) => {
    setBddSelected(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    bddService.createBDD(newBdd).then(res => console.log(newBdd))
    setOpen(false)
  }

  useEffect(() => {
    bddService.getBDD().then(res => setData(res.data))
  }, [data])

  return (
    <Main>
      <StyledDiv>
        <h1>WebServPT</h1>
          {data.map((post) => (
            <div>
              <Button onClick={e => bddTable(e, "value")} value={post}>
                {post}
              </Button>
            </div>
          ))}
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add database
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <Form onSubmit={handleSubmit}>
            <FormField
              value={newBdd}
              onChange={e => setNewBdd(e.target.value)}
              name='bdd'
              type='text' />
            <StyledButton type="submit" color="primary">
              Save
            </StyledButton>
          </Form>
        </Dialog>
      </StyledDiv>
      <Content>
        {bddSelected ?
          <Table dataTable={bddSelected} />
          :
          <p>no table</p>
        }
      </Content>
    </Main>
  );
}

const Button = styled.button`
  background-color: #4285f4;
  color: white;
  padding: 8px 16px;
  margin: 4px 8px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2e5da8;
  }

  &:active {
    background-color: #1c3d73;
  }

  &:focus {
    background-color: #1c3d73;
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.5);
  }
`;

const Main = styled.div`
width: 100vh;
height: 100vh;
display: flex;
flex-direction: row;
`;

const StyledDiv = styled.div`
background-color: red;
justify-content: left;
margin: 1vh;
padding: 0 1vh;
flex: 1;
border-radius: 5px;
`;

const Content = styled.div`
background-color: blue;
justify-content: right;
margin: 1vh;
padding: 0 1vh;
flex: 2;
border-radius: 5px;
`;

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
