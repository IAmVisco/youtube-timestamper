const container = document.getElementById('fieldsContainer');

const generateRandomId = () => Math.random().toString(36).slice(-6);

const insertNewFieldGroup = (offset) => {
  const id = generateRandomId();
  container.insertAdjacentHTML('beforeend', `
<div id="${id}">
    <input type="number" class="form-input" value="${offset}">
    <button>x</button>
</div>`);
  document.getElementById(id).children[1].onclick = () => removeField(id);
};

const loadSettings = async () => {
  const { offsets } = await getFromStorageAsync({ offsets: [-1, -15] });
  for (const offset of offsets) {
    insertNewFieldGroup(offset);
  }
};

const removeField = (id) => {
  document.getElementById(id).remove();
}

const addNewField = () => {
  insertNewFieldGroup(0);
};

const saveSettings = async () => {
  const offsets = [...new Set(
    Array.from(container.children)
      .map((fieldGroup) => fieldGroup.children[0].value)
      .filter((x) => x)
  )];
  console.log(offsets);
  await saveToStorageAsync({ offsets });
  window.close();
};

document.addEventListener('DOMContentLoaded', loadSettings);
document.getElementById('addButton').addEventListener('click', addNewField);
document.getElementById('saveButton').addEventListener('click', saveSettings);
