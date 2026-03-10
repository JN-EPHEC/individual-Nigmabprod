import { useState, useEffect } from 'react'
import './App.css'
import type { User } from './types/User'

function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then((data: User[]) => setUsers(data))
      .catch(err => console.error('Erreur fetch users:', err))
  }, [])

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.prenom} {user.nom}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
