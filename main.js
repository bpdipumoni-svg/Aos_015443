let data = JSON.parse(localStorage.getItem('crudData')) || [];
let editIndex = null;

function render() {
    const list = document.getElementById('list');
    list.innerHTML = '';

    data.forEach((item, index) => {
        list.innerHTML += `
      <div class="item">
        <div>
          <strong>${item.name}</strong><br>
          <small>${item.email}</small><br>
          <small>${item.phone}</small>
        </div>
        <div class="actions">
          <button class="edit" onclick="editData(${index})">Edit</button>
          <button class="delete" onclick="deleteData(${index})">Delete</button>
        </div>
      </div>
    `;
    });

    localStorage.setItem('crudData', JSON.stringify(data));
}

function addData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert('Please fill all fields');
        return;
    }

    if (editIndex === null) {
        data.push({ name, email, phone});
    } else {
        data[editIndex] = { name, email, phone};
        editIndex = null;
    }



    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    render();
}



function editData(index) {
    document.getElementById('name').value = data[index].name;
    document.getElementById('email').value = data[index].email;
    document.getElementById('phone').value = data[index].phone;
    editIndex = index;

    render()
}

function deleteData(index) {
    if (confirm('Are you sure?')) {
        data.splice(index, 1);
        render();
    }
}

render();