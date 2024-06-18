window.addEventListener("load", function () {
  // placeholder 없애기
  const uId = document.querySelector(".uid");
  const uPass = document.querySelector(".password");

  uId.addEventListener("focus", function () {
    uId.placeholder = "";
  });
  uId.addEventListener("blur", function () {
    uId.placeholder = "아이디";
  });
  uPass.addEventListener("focus", function () {
    uPass.placeholder = "";
  });
  uPass.addEventListener("blur", function () {
    uPass.placeholder = "비밀번호";
  });

  // 아이디 또는 비번 입력 없이 로그인버튼 클릭
  const clickBt = document.querySelector(".button");
  const noneId = document.querySelector(".none-id");
  const nonePass = document.querySelector(".none-password");
  clickBt.addEventListener("click", function () {
    if (uId.value === "") {
      noneId.style.display = "block";
    } else if (uId.value !== "") {
      noneId.style.display = "none";
    }
    if (uPass.value === "" && uId.value !== "") {
      nonePass.style.display = "block";
    } else if (uPass.value !== "") {
      nonePass.style.display = "none";
    }
  });
  // x 버튼 누르면 input 비우기
  const cleanIconId = document.querySelector(".cleanupico-id");
  const cleanIconPass = document.querySelector(".cleanupico-pass");
  uId.addEventListener("keyup", function (e) {
    if (e.target.value === "") {
      cleanIconId.style.display = "none";
    } else if (e.target.value !== "") {
      cleanIconId.style.display = "block";
    }
  });
  uPass.addEventListener("keyup", function (e) {
    if (e.target.value === "") {
      cleanIconPass.style.display = "none";
    } else if (e.target.value !== "") {
      cleanIconPass.style.display = "block";
    }
  });
  cleanIconId.addEventListener("click", function () {
    uId.value = "";
    cleanIconId.style.display = "none";
  });
  cleanIconPass.addEventListener("click", function () {
    uPass.value = "";
    cleanIconPass.style.display = "none";
  });
  //   회원이 아니라면 회원가입해주세요, 맞다면 알람
  // const noneUser = document.querySelector(".none-user");
  // const userInfo = "./apis/login.json";
  // const idForm = document.querySelector(".idform");
  // const passForm = document.querySelector(".passform");
  // idForm.addEventListener("submit", function () {
  //   fetch(userInfo)
  //     .then(res => {
  //       const result = res.json();
  //       return result;
  //     })
  //     .then(result => {
  //       const inputId = uId.value;
  //       const inputPass = uPass.value;
  //       const user = result.find(
  //         result => result.userid === inputId && result.userpass === inputPass,
  //       );
  //       if (user) {
  //         alert("로그인성공");
  //       } else {
  //         noneUser.style.display = "block";
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
});
