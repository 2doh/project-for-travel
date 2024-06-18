window.addEventListener("load", function () {
  // 입력 값 렌더링
  const listForm = document.querySelector(".list-form");
  const inputList = document.querySelector(".main-top-list");
  const checkList = document.querySelector(".check-list-contents");
  const checkBox = document.querySelector(".boxico");
  const xButton = document.querySelector(".x-ico");
  const checkListWrap = document.querySelector(".main-bottom-check-list");
  let arrList = [];
  listForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const list = inputList.value;
    if (list !== "") {
      checkList.innerHTML = list;
      inputList.value = "";
      arrList.push(list);
      console.log(arrList);
    }
  });

  // 체크박스
  let boxClick = false;
  checkBox.addEventListener("click", function (e) {
    e.preventDefault();
    if (boxClick) {
      checkBox.src = "./images/326558_blank_check_box_icon.svg";
      boxClick = false;
      checkList.style.color = "black";
      checkList.style.textDecoration = "none";
    } else {
      checkBox.src = "./images/326563_box_check_icon.svg";
      boxClick = true;
      checkList.style.color = "gray";
      checkList.style.textDecoration = "1px line-through"; // 취소선 추가
    }
  });

  xButton.addEventListener("click", function () {
    checkListWrap.style.display = "none";
  });
});
