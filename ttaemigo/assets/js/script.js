document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const moBtn = document.querySelector(".mo-btn");
  const nav = document.querySelector(".gnb");

  // 모바일경우 nav열고닫기
  if (moBtn && nav && header) {
    // CSS 미디어쿼리(max-width:720px)와 동일한 기준
    const mobileMQ = window.matchMedia("(max-width: 720px)");

    const isScrolled = () =>
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;

    // 헤더 배경: nav가 열려 있으면 항상 불투명
    const syncHeaderBg = () => {
      if (header.classList.contains("nav-open")) {
        header.style.backgroundColor = "rgba(0, 0, 0, 1)";
        header.style.backdropFilter = "none";
      } else if (isScrolled()) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.backgroundColor = "#000";
        header.style.backdropFilter = "none";
      }
    };

    // 열림 상태의 단일 기준은 .nav-open 클래스 하나뿐
    const setNav = (open) => {
      header.classList.toggle("nav-open", open);
      moBtn.setAttribute("aria-expanded", String(open));
      document.documentElement.style.overflow = open ? "hidden" : "";
      syncHeaderBg();
    };

    moBtn.setAttribute("aria-expanded", "false");
    moBtn.setAttribute("aria-label", "메뉴 열기");

    // 스크롤시 헤더 흐림처리
    window.addEventListener("scroll", syncHeaderBg);

    moBtn.addEventListener("click", () => {
      if (!mobileMQ.matches) return;
      setNav(!header.classList.contains("nav-open"));
    });

    // 메뉴 안 링크를 누르면 닫기
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && header.classList.contains("nav-open"))
        setNav(false);
    });

    // 브레이크포인트를 실제로 넘을 때만 초기화한다.
    // resize는 모바일 주소창이 접힐 때도 발생해서 열린 nav를 닫아버린다.
    mobileMQ.addEventListener("change", () => setNav(false));
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
