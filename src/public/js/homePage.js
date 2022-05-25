let deleteForm = document.forms["delete-question-form"];
let searchForm = document.forms["search-question-form"];
let idQuestion;
let valueSearch;

const deleteBtns = document.querySelectorAll(".btn-delete-question");
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.onclick = (e) => {
    e.preventDefault();
    let confirmDelete = confirm("Delete question?");
    if (confirmDelete === true) {
      idQuestion = deleteBtn.getAttribute("data-id");
      deleteForm.action = "delete/" + idQuestion + "?_method=DELETE";
      deleteForm.submit();
    }
  };
});

const searchBtn = document.querySelector("#search input");
searchBtn.addEventListener("keydown", searchEngine);
function searchEngine(e) {
  if (e.key === "Enter") {
    searchForm.submit();
  }
  searchBtn.addEventListener("keydown", searchEngine);
}
