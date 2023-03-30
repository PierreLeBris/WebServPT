import React, { useState, useEffect } from 'react';
import bddService from "../../api/bddService";
import Dialog from '@mui/material/Dialog';
import styled from 'styled-components'

const Table = (props) => {

    const [data, setData] = useState([])
    const [open, setOpen] = useState(false); 
    const [newTable, setNewTable] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }
    
    const handleSubmit = e => {
    e.preventDefault()
    bddService.createTable(props.dataTable, newTable).then(res => console.log(newTable))
    setOpen(false)
    }

    useEffect(() => {
        bddService.getTable(props.dataTable).then(res => setData(res.data))
      }, [data, props.dataTable])

    return (
        <div>
            <h1>Table</h1>
            <StyledDiv>
            {data.map((post) => (
                <ButtonTable value={post}>
                    {post}
                </ButtonTable>
            ))}
             </StyledDiv>
            <button variant="contained" color="primary" onClick={handleClickOpen}>
            +
            </button>
            <Dialog open={open} onClose={handleClose}>
            <Form onSubmit={handleSubmit}>
                <FormField
                value={newTable}
                onChange={e => setNewTable(e.target.value)}
                name='bdd'
                type='text' />
                <StyledButton type="submit" color="primary">
                Save
                </StyledButton>
            </Form>
            </Dialog>
        </div>
    );
};

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
margin: 0 1vh;
justify-content: center;
`;

const ButtonTable = styled.button`
background-color: #f2f2f2;
padding: 8px;
text-align: left;
font-weight: bold;
width: 100%;
cursor: pointer;
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

export default Table;