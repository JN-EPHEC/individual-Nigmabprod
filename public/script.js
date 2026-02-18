async function loadUsers() {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    users.forEach(user => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      const span = document.createElement('span');
      span.textContent = `${user.prenom} ${user.nom}`;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'X';
      deleteBtn.onclick = () => deleteUser(user.id);
      
      li.appendChild(span);
      li.appendChild(deleteBtn);
      userList.appendChild(li);
    });
  } catch (error) {
    console.error('Erreur chargement utilisateurs:', error);
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await loadUsers();
    }
  } catch (error) {
    console.error('Erreur suppression utilisateur:', error);
  }
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nom, prenom })
    });
    
    if (response.ok) {
      document.getElementById('nom').value = '';
      document.getElementById('prenom').value = '';
      await loadUsers();
    }
  } catch (error) {
    console.error('Erreur ajout utilisateur:', error);
  }
});

document.addEventListener('DOMContentLoaded', loadUsers);
