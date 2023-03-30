import React, { useState, useRef, useEffect } from 'react';
import bddService from '../../api/bddService';

const Donnees = (props) => {
    
    const [formValues, setFormValues] = useState({});
    const [rulesVisible, setRulesVisible]=  useState(true)
    const [toggle, setToggle] = useState(false);
    const [currentTable] = useState(props.table)
    const [prevTable, setPrevTable] = useState('')
    const [rules, setRules] = useState({})
  
    const inputRef = useRef();
    const selectRef = useRef();
  
    const handleAddField = (e) => {
      e.preventDefault();
      const newRule = inputRef.current.value
      const values = {...formValues};
      values[newRule] = selectRef.current.value
      setFormValues(values)
      setToggle(false);
    };
  
    const addBtnClick = (e) => {
      e.preventDefault();
      setToggle(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(props.base);
        console.log(props.table);
        console.log(formValues);
        bddService.createRule(props.base, props.table, formValues).then(res => console.log(formValues))
        setRulesVisible(false)
    }

    useEffect(() => {
        if (currentTable !== prevTable) {
            setFormValues([])
            setPrevTable(currentTable)
        }
        //bddService.getRule(props.base, props.table).then(res => setRules(res.data))
        ///Object.keys(rules).length === 0 ? setRulesVisible(true) : setRulesVisible(false)
      }, [currentTable, prevTable, props.base, props.table, rules, rulesVisible])

    return (
    <div>
        {JSON.stringify(formValues)}
      <form onSubmit={handleSubmit}>
        {!toggle ? (
          <div>
            <button onClick={addBtnClick}>
              Add new
            </button>
          </div>
        ) : (
          <div>
            <input type="text" placeholder="label" ref={inputRef} />
            <select ref={selectRef}>
              <option value="text">Text</option>
              <option value="number">Number</option>
            </select>
            <button onClick={handleAddField}>
              Add
            </button>
          </div>
        )}
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
    );
};

export default Donnees;