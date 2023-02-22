import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
const EditUserForm = (props) => {

  const [user, setUser] = useState(props.currentUser);
  const handleInputChange = (event) => {
    const { name, email, role, value } = event.target

    setUser({ ...user, [name]: value, [email]: value, [role]: value })
  }

  useEffect(() => {
    setUser(props.currentUser)
  }, [props])
  
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        props.updateUser(user.id, user)
      }}
      className="form"
    >
      <label>Name{' : '}</label>
      <input
        type="text"
        name="name"
        value={user.name}
        style={{width:'100%', padding: '6px 20px', margin: '8px 0'}}
        onChange={handleInputChange}
      />{'  '}
      <label>Email{' : '}</label>
      <input
        type="text"
        name="email"
        value={user.email}
        style={{width:'100%', padding: '6px 20px', margin: '8px 0'}}
        onChange={handleInputChange}
      />{'  '}
      <label>Role{' : '}</label>
      <input
        type="text"
        name="role"
        value={user.role}
        style={{width:'100%', padding: '6px 20px', margin: '8px 0'}}
        onChange={handleInputChange}
      />{'  '}
      <Button variant="primary" type='submit' className='update'>Update User</Button>{' '}
      <Button variant="danger"  className='cancel' onClick={() => props.setEditing(false)}>Cancel</Button>{' '}
    </form>
  )
}

export default EditUserForm