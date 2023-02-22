import React from 'react'
import Table from 'react-bootstrap/Table';
import Edit from '../assets/images/edit.png';
import Delete from '../assets/images/delete.png';
import Button from 'react-bootstrap/Button';

const UserList = (props) => {
    const filteredData = props.users.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else {
            return el.name.toLowerCase().includes(props.input) || el.email.toLowerCase().includes(props.input) || el.role.toLowerCase().includes(props.input)
        }
    })

    return(
        <div style={{marginTop:'10px'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    id={user.id}
                                    checked={user.value}
                                    onChange={props.handleChange}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className='action' style={{display: 'flex', justifyContent: 'space-around'}}>
                            <div onClick={() => props.editRow(user)}>
                                <img src={Edit} style={{width:'20px'}}/>
                            </div>
                            <div onClick={() => props.deleteUser(user.id)}>
                                <img src={Delete} style={{width:'20px'}}/>
                            </div>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan={3}>No users</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button variant="danger" onClick={props.multiDetete}>Delete Selected</Button>
        </div>
    )
}

export default UserList;