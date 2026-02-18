async function loadGroups() {
  try {
    const response = await fetch('/api/groups');
    const groups = await response.json();
    
    const groupSelect = document.getElementById('groupSelect');
    const filterGroup = document.getElementById('filterGroup');
    
    groupSelect.innerHTML = '<option value="">Aucun groupe</option>';
    filterGroup.innerHTML = '<option value="">Tous les groupes</option>';
    
    groups.forEach(group => {
      const option1 = document.createElement('option');
      option1.value = group.id;
      option1.textContent = group.name;
      groupSelect.appendChild(option1);
      
      const option2 = document.createElement('option');
      option2.value = group.id;
      option2.textContent = group.name;
      filterGroup.appendChild(option2);
    });
  } catch (error) {
    console.error('Erreur chargement groupes:', error);
  }
}

async function loadUsers(groupId = '') {
  try {
    const url = groupId ? `/api/users?groupId=${groupId}` : '/api/users';
    const response = await fetch(url);
    const users = await response.json();
    
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    if (users.length === 0) {
      userList.innerHTML = '<li class="list-group-item text-muted text-center">Aucun utilisateur</li>';
      return;
    }
    
    users.forEach(user => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      const div = document.createElement('div');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `${user.prenom} ${user.nom}`;
      div.appendChild(nameSpan);
      
      if (user.group) {
        const badge = document.createElement('span');
        badge.className = 'badge bg-info ms-2';
        badge.textContent = user.group.name;
        div.appendChild(badge);
      }
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'X';
      deleteBtn.onclick = () => deleteUser(user.id);
      
      li.appendChild(div);
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
      const groupId = document.getElementById('filterGroup').value;
      await loadUsers(groupId);
    }
  } catch (error) {
    console.error('Erreur suppression utilisateur:', error);
  }
}

document.getElementById('groupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('groupName').value;
  
  try {
    const response = await fetch('/api/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    
    if (response.ok) {
      document.getElementById('groupName').value = '';
      await loadGroups();
    }
  } catch (error) {
    console.error('Erreur création groupe:', error);
  }
});

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const groupId = document.getElementById('groupSelect').value;
  
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        nom, 
        prenom, 
        groupId: groupId && groupId !== '' ? groupId : null 
      })
    });
    
    if (response.ok) {
      document.getElementById('nom').value = '';
      document.getElementById('prenom').value = '';
      document.getElementById('groupSelect').value = '';
      const filterGroupId = document.getElementById('filterGroup').value;
      await loadUsers(filterGroupId);
    } else {
      const error = await response.json();
      console.error('Erreur serveur:', error);
      alert('Erreur: ' + (error.error || 'Impossible d\'ajouter l\'utilisateur'));
    }
  } catch (error) {
    console.error('Erreur ajout utilisateur:', error);
    alert('Erreur réseau');
  }
});

document.getElementById('filterGroup').addEventListener('change', async (e) => {
  await loadUsers(e.target.value);
});

document.addEventListener('DOMContentLoaded', async () => {
  await loadGroups();
  await loadUsers();
});
