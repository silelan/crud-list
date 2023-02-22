import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserList from './components/UserList';
import EditUserForm from './components/EditUserForm';
import ReactPaginate from 'react-paginate';

function App() {
  const usersData = [
  {
     "id": 1,
     "name": "Aaron Miles",
     "email": "aaron@tekkiwebsolutions.com",
    "role": "member",
    "value": false
  },
  {
    "id": 2,
    "name": "Aishwarya Naik",
    "email": "aishwarya@tekkiwebsolutions.com",
    "role": "member",
    "value": false
  },
  {
    "id": 3,
    "name": "Arvind Kumar",
    "email": "arvind@tekkiwebsolutions.com",
    "role": "admin",
    "value": false
  },
  {
    "id": 4,
    "name": "Aaron Miles",
    "email": "aaron@tekkiwebsolutions.com",
   "role": "member",
   "value": false
 },
 {
   "id": 5,
   "name": "Aishwarya Naik",
   "email": "aishwarya@tekkiwebsolutions.com",
   "role": "member",
   "value": false
 },
 {
   "id": 6,
   "name": "Arvind Kumar",
   "email": "arvind@tekkiwebsolutions.com",
   "role": "admin",
   "value": false
 },
 {
  "id": 7,
  "name": "Aaron Miles",
  "email": "aaron@tekkiwebsolutions.com",
 "role": "member",
 "value": false
},
{
 "id": 8,
 "name": "Aishwarya Naik",
 "email": "aishwarya@tekkiwebsolutions.com",
 "role": "member",
 "value": false
},
{
 "id": 9,
 "name": "Arvind Kumar",
 "email": "arvind@tekkiwebsolutions.com",
 "role": "admin",
 "value": false
},
{
  "id": 10,
  "name": "Aaron Miles",
  "email": "aaron@tekkiwebsolutions.com",
 "role": "member",
 "value": false
},
{
 "id": 11,
 "name": "Aishwarya Naik",
 "email": "aishwarya@gmail.com",
 "role": "member",
 "value": false
},
{
 "id": 12,
 "name": "Arvind Kumar",
 "email": "arvind@yopmail.com",
 "role": "admin",
 "value": false
}
] 
  const [editing, setEditing] = useState(false)
  const [itemOffset, setItemOffset] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);

  const endOffset = itemOffset + itemPerPage;

  const [users, setUsers] = useState(usersData)
  const initialFormState = { id: null, name: '', email: '', role:'' }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [inputText, setInputText] = useState("");


  const editRow = (user) => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, email: user.email, role:user.role })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
  }

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value
    setInputText(lowerCase.toLowerCase());
  };

  const handleChange = e => {
    const id = e.target.id;
    setUsers(prevState => {
      return (
        prevState.map(
          li => {
            return(li.id === +id ? { ...li,
            value: !li.value
          } : li)}
        )
      )
    });
  };

  const multiDetete = () => {
    setUsers(prevState => {
      return(prevState.filter(li => {
        if(li.value == false){
          return li
        }
        })
      )
    });
  };

  const pageCount = Math.ceil(usersData.length / itemPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemPerPage) % usersData.length;
    setItemOffset(newOffset);
  };

  useEffect(()=>{
    setUsers(usersData.slice(0, 5))
  },[])
  
  useEffect(()=>{
    setUsers(usersData.slice(itemOffset, endOffset))
  },[itemOffset])

  return (
    <div className="App">
      <input
        type="text"
        value={inputText}
        onChange={(e)=> inputHandler(e)}
        style={{width:'100%', padding: '12px 20px', margin: '8px 0'}}
        placeholder="Search by name, email or role"
      />{'  '}<br/>

      <UserList 
        users={users} 
        input={inputText} 
        editRow={editRow} 
        deleteUser={deleteUser} 
        handleChange={handleChange} 
        usersData = {usersData}
        multiDetete={multiDetete}/>

      {editing && (
        <div className='edit'>
          <h2>Edit user</h2>
          <EditUserForm
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        </div>
      )}

      <div className='pagination'>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default App;
