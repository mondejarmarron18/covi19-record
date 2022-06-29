const baseUrl = "http://local-php.com/api/person.php";
const tableBody = document.querySelector(".table .tbody");
const closeModalBtn = document.getElementById("closeModalBtn");

function _byId(id) {
  return document.getElementById(id);
}

function _byName(name) {
  return document.getElementsByName(name);
}

const getPersons = async () => {
  try {
    const res = await fetch(`${baseUrl}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (id) => {
  try {
    const res = await fetch(`${baseUrl}?id=${id}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

const addPerson = async () => {
  if (_byId("saveBtn").innerText.toLocaleLowerCase() !== "save")
    return updatePerson();

  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    });
    const data = await res.json();

    alert(data);
  } catch (error) {
    alert("Saving Failed");
  }

  location.reload();
};

const updatePerson = async () => {
  try {
    const res = await fetch(baseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(getFormData()),
    });
    const data = await res.json();

    alert(data);
  } catch (error) {
    alert("Saving Failed");
  }

  location.reload();
};

const removePerson = async (id) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();

    alert(data);
  } catch (error) {
    alert("Deleting Failed");
  }

  location.reload();
};

const prepareUpdate = async (id) => {
  _byId("saveBtn").innerText = "Update";
  const person = await getPerson(id);

  _byId("id").value = id;
  _byId("name").value = person.name;
  _byName("gender")[0].checked = true;
  _byId("age").value = person.age;
  _byId("mobileNumber").value = person.mobileNumber;
  _byId("bodyTemp").value = person.bodyTemp;
  _byId("nationality").value = person.nationality;
  _byName("diagnosed")[0].checked = true;
  _byName("exposed")[0].checked = true;
  _byName("vaccinated")[0].checked = true;
};

const resetModal = () => {
  _byId("id").value = "";
  _byId("saveBtn").innerText = "Save";
  _byId("id").value = "";
  _byId("name").value = "";
  _byName("gender")[0].checked = true;
  _byId("age").value = "";
  _byId("mobileNumber").value = "";
  _byId("bodyTemp").value = "";
  _byId("nationality").value = "";
  _byName("diagnosed")[0].checked = true;
  _byName("exposed")[0].checked = true;
  _byName("vaccinated")[0].checked = true;
};

function getFormData() {
  const id = _byId("id").value;
  const name = _byId("name").value;
  const gender = _byName("gender")[0].checked;
  const age = _byId("age").value;
  const mobileNumber = _byId("mobileNumber").value;
  const bodyTemp = _byId("bodyTemp").value;
  const nationality = _byId("nationality").value;
  const diagnosed = _byName("diagnosed")[0].checked;
  const exposed = _byName("exposed")[0].checked;
  const vaccinated = _byName("vaccinated")[0].checked;

  return {
    id,
    name: name || "Juan Dela Cruz",
    gender: gender ? "Male" : "Female",
    age: age || 18,
    mobileNumber: mobileNumber || 09123456789,
    bodyTemp: bodyTemp || 36,
    nationality: nationality || "Filipino",
    covid19Diagnosed: diagnosed ? "Yes" : "No",
    covid19Exposure: exposed ? "Yes" : "No",
    vaccinated: vaccinated ? "Yes" : "No",
  };
}

async function renderTable() {
  const persons = await getPersons();

  persons?.forEach((person) => {
    const trow = document.createElement("tr");

    trow.innerHTML = `
    <td>${person.name}</td>
    <td>${person.gender}</td>
    <td>${person.mobileNumber}</td>
    <td>${person.bodyTemp}</td>
    <td>${person.nationality}</td>
    <td>${person.covid19Diagnosed}</td>
    <td>${person.covid19Exposure}</td>
    <td>${person.vaccinated}</td>
    <td>
      <button class="updateBtn" data-bs-toggle="modal" data-bs-target="#modal" onClick="prepareUpdate(${person.id})">Update</button>
      <button class="deleteBtn" onClick="removePerson(${person.id})">Delete</button>
    </td>
    `;

    tableBody.appendChild(trow);
  });
}

window.addEventListener("load", async () => {
  renderTable();
});
