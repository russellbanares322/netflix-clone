import { useEffect, useState } from "react"
const data = [
    {   id: 1,
        name: 'TEST',
        salary: 3000
    }, {
        id:2,
        name: 'ROCK',
        salary:1000
    }, {
        id: 3,
        name: 'SOLID',
        salary: 300
    },{
        id: 4,
        name: 'SOLID',
        salary: 20
    },{
        id: 5,
        name: 'SOLID',
        salary: 10
    }
]

const Projects = () => {
    const [userData, setUserData] = useState(data)
    const [optionValue, setOptionValue] = useState('')
    const [input, setInput] = useState('');
    const [userForm, setUserForm] = useState({
        id:Math.floor(Math.random() * 100),
        name: '',
        salary:''
    })

    const handleSearch = (e) => {
        setInput(e.target.value);
    }
    const handleOptionChange = (e) => {
        setOptionValue(e.target.value)

        const filteredData = userData.filter(val => val.name === optionValue);
        setUserData(filteredData)
    }

    const handleChange = (e) => {
        setUserForm({...userForm, [e.target.name] : e.target.value})
    }
   
    //Adding of user
    const handleAdd = () => {
        if(!userForm.name || !userForm.salary) {
            alert('Fields cannot be left empty')
        } else {
            const newUser = {
                ...userForm
             }
             
             setUserData([newUser, ...userData ])

             console.log(userData)
            setUserForm({
                name: '',
                salary:''
            })
        }
    }
    //Deleting of user

    const handleDelete = (userID) => {
        const newUser = userData.filter(val => val.id !== userID);
        setUserData(newUser)
    }

    //Filtering of data
    const handleClear = () => {
        setUserData(data)
    }

    const totalSalary = userData.reduce((total, currValue) =>  total + currValue.salary, 0)
    return (
        <div >
            <div style={{paddingTop:'6rem'}}>
            {optionValue}
            <select onChange={handleOptionChange}>
                <option></option>
                <option value="SOLID">SOLID</option>
                <option value="ROCK">ROCK</option>
                <option value="TEST">TEST</option>
            </select>
            </div>
            <br />
            <input type="text" placeholder="Search here..." onChange={handleSearch}/>
            <br />
            <button onClick={handleClear}>Clear</button>
            <input name="name" value={userForm.name} onChange={handleChange} type="text" placeholder="name"/>
            <input name="salary" value={userForm.salary} onChange={handleChange} type="number" placeholder="salary"/>
            <button onClick={handleAdd} style={{marginTop:'5rem'}}>Add</button>
            <h1>Total number of users: {userData.length}</h1>
            <h1>Total number of salary: {totalSalary.toLocaleString()}</h1>
            <div style={{display:'flex', justifyContent:'center', flexDirection:'row', flexWrap:'wrap'}}>
            {userData.filter((val) => {
                if(input === "") {
                    return val
                } else if (val.name.toLowerCase().includes(input.toLowerCase()) || val.salary.toLocaleString().includes(input.toLocaleString())) {
                    return val;
                }
            }).map((val) => (
                    <div key={val.id} style={{border:'1px solid black', width:'8rem', height:'8rem', margin:'2rem'}}>
                    <h3>{val.name}</h3>
                    <h3>{val.salary.toLocaleString()}</h3>
                    <button onClick={() => handleDelete(val.id)}>Delete</button>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default Projects;