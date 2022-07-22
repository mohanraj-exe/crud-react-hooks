import React,{useEffect, useState} from "react";
import axios from "axios";

function CrudOperations() {

  const [value, setValue] = useState({
    name:'',
    age:'',
    email:'',
    id:'',
    user:[]
  })

  // Read
  useEffect(() =>{
    async function fetchData(){
      var response = await axios.get('https://620fad6fec8b2ee2834903e1.mockapi.io/users')
      setValue({ user: response.data})
      console.log(response.data)
    }
    fetchData()
  },[])

  const handleChange = (e) =>{
    setValue({...value,[e.target.name]:e.target.value})
  }

  const populateData = (id) =>{
    const selectedData = value.user.filter(row => row.id === id)[0]
    setValue({
      ...value,
      name: selectedData.name,
      age: selectedData.age,
      email: selectedData.email,
      id: selectedData.id
    })
    console.log(selectedData)
  }

  //Create
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(value.id){

      //Update
      var response = await axios.put(`https://620fad6fec8b2ee2834903e1.mockapi.io/users/${value.id}`,{
        name:value.name,
        age:value.age,
        email:value.email
      })
  
      var index = value.user.findIndex(row => row.id === response.data.id)
      var user = [...value.user]
      user[index] = response.data
      setValue({user, name:'', age:'', email:'',id:''})
    }

    else{
      // Create
      var response = await axios.post('https://620fad6fec8b2ee2834903e1.mockapi.io/users',{
        name:value.name,
        age:value.age,
        email:value.email
      })
  
      var user = [...value.user]
      user.push(response.data)
      setValue({user, name:'', age:'', email:''})
    }
  }

  const handleDelete = (id) => {
    axios.delete(`https://620fad6fec8b2ee2834903e1.mockapi.io/users/${id}`)

    var user = value.user.filter(row => row.id !== id)
    setValue({user})
  }

  return (  

    <div>
      <div style={{border:"5px coral outset",padding:"15px", width:"250px",position: "absolute", left:"900px",top:"100px"}}>
      <h2 style={{textAlign:"center"}}>CRUD Operations</h2>

        <form onSubmit={(e) => handleSubmit(e)}>

          <label>Name:</label> &nbsp;
          <input type="text" name="name" 
          value={value.name} onChange={(e)=> handleChange(e)}></input><br /><br />

          <label>Age:</label> &nbsp;
          <input type="text" name="age" 
          value={value.age} onChange={(e)=> handleChange(e)}></input><br /><br />

          <label>Email:</label> &nbsp;
          <input type="text" name="email"
          value={value.email} onChange={(e)=> handleChange(e)}></input><br /><br />

          <button type="submit">Submit</button>&nbsp; &nbsp;
          <button>Reset</button>

        </form>
      </div>

      <div style={{position: "absolute",left:"75px",top:"100px"}}>
      <table border={2} style={{width:"600px"}}>
        <thead style={{textAlign:"center", fontWeight:"bold"}}>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Age</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {value.user.map(row =>
            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.email}</td>
              <td><button onClick={() => populateData(row.id)}>Edit</button>&nbsp;&nbsp;&nbsp;
                  <button onClick={() => handleDelete(row.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export {CrudOperations};
