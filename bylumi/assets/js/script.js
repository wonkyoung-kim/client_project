document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const moBtn = document.querySelector(".mo-btn");
  const nav = document.querySelector(".gnb");

  // 모바일경우 nav열고닫기
  if (moBtn && nav && header) {
    // 스크롤시 헤더 흐림처리
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.backgroundColor = "#000";
        header.style.backdropFilter = "none";
      }
    });

    moBtn.addEventListener("click", () => {
      if (window.innerWidth < 721) {
        const isOpen = nav.style.transform === "translateX(0px)";

        nav.style.transform = isOpen ? "translateX(-100%)" : "translateX(0px)";
        nav.style.maxHeight = isOpen ? "0" : "100%";

        if (!isOpen) {
          header.style.backgroundColor = "rgba(0, 0, 0, 1)";
          header.style.backdropFilter = "none";
          document.documentElement.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "";

          if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
          ) {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            header.style.backdropFilter = "blur(10px)";
          } else {
            header.style.backgroundColor = "#000";
            header.style.backdropFilter = "none";
          }
        }
      }
    });

    // 화면 크기 변경 시 nav 초기화
    window.addEventListener("resize", () => {
      if (window.innerWidth > 721) {
        nav.style.transform = "translateX(0px)";
        nav.style.maxHeight = "100%";
      } else {
        nav.style.transform = "translateX(-100%)";
        nav.style.maxHeight = 0;
      }
    });
  }

  const topBtn = document.querySelector(".btn-top");

  // 스크롤 위치에 따라 버튼 표시/숨김
  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        topBtn.style.display = "flex";
      } else {
        topBtn.style.display = "none";
      }
    });

    // 버튼 클릭 시 최상단으로 이동
    topBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
