const getDev = document.querySelector("#developers");

getDev.addEventListener("change", handleOptionChangeDev);

function handleOptionChangeDev(event) {
  const selectedValue = this.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}
const getGenre = document.querySelector("#genres");

getGenre.addEventListener("change", handleOptionChangeGenre);

function handleOptionChangeGenre(event) {
  const selectedValue = this.value;

  if (selectedValue) {
    window.location.href = selectedValue;
  }
}

const updateBtns = document.querySelectorAll(".updateBtn");

async function handleUpdateBtn(event) {
  const elementId = event.currentTarget.id;

  try {
    window.location.href = `edtGamePg/${elementId}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

updateBtns.forEach((button) => {
  button.addEventListener("click", handleUpdateBtn);
});
