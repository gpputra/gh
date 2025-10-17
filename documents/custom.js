function updateWidgetTime() {
  const dayElement = document.querySelector(".widget-display-current-day2");
  const timeElement = document.querySelector(".widget-display-current-time2");

  function updateTime() {
    const now = new Date();

    const optionsDay = { weekday: "long", timeZone: "Asia/Jakarta" };
    const currentDay = now.toLocaleDateString("us-Us", optionsDay);

    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "Asia/Jakarta",
    };
    const currentTime = now.toLocaleTimeString("id-ID", optionsTime);

    if (dayElement) dayElement.textContent = currentDay;
    if (timeElement) timeElement.textContent = `${currentTime} WIB`;
  }

  updateTime();

  setInterval(updateTime, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  updateWidgetTime();
});

function addCornerIcons() {
  console.log("Function called");

  const container = document.createElement("div");
  container.className = "decorative-icons";
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // =============================
  // 🔹 CONFIG UNTUK DESKTOP
  // =============================
  const desktopConfig = [
    {
      class: "top-right",
      image: "../images/three_garberas.png",
      rotate: "-50deg",
      width: "190px",
      height: "190px",
      position: { top: "4%", right: "-2%" },
      opacity: 0.25,
    },
    {
      class: "bottom-left",
      image: "../images/5garberas.png",
      rotate: "12deg",
      width: "190px",
      height: "190px",
      position: { bottom: "3%", left: "10%" },
      opacity: 0.25,
    },
    {
      class: "middle-right",
      image: "../images/6garberas.png",
      rotate: "0deg",
      width: "190px",
      height: "190px",
      position: { top: "72%", right: "12%" },
      opacity: 0.25,
    },
  ];

  // =============================
  // 🔹 CONFIG UNTUK MOBILE
  // =============================
  const mobileConfig = [
    {
      class: "top-right",
      image: "../images/three_garberas.png",
      rotate: "-55deg",
      width: "100px",
      height: "100px",
      position: { top: "2%", right: "-6%" },
      opacity: 0.3,
    },
    {
      class: "bottom-left",
      image: "../images/5garberas.png",
      rotate: "10deg",
      width: "130px",
      height: "130px",
      position: { bottom: "3%", left: "1%" },
      opacity: 0.3,
    },
    {
      class: "middle-right",
      image: "../images/6garberas.png",
      rotate: "15deg",
      width: "130px",
      height: "130px",
      position: { top: "55%", right: "3%" },
      opacity: 0.3,
    },
  ];

  // Pilih konfigurasi sesuai device
  const activeConfig = isMobile ? mobileConfig : desktopConfig;

  activeConfig.forEach((cfg) => {
    const icon = document.createElement("img");
    icon.src = cfg.image;
    icon.className = cfg.class;
    icon.style.cssText = `
      position: absolute;
      object-fit: contain;
      filter: blur(0.4px);
      opacity: ${cfg.opacity};
      transform: rotate(${cfg.rotate});
      width: ${cfg.width};
      height: ${cfg.height};
      transition: all 0.3s ease;
    `;

    // Atur posisi (top/right/bottom/left)
    Object.entries(cfg.position).forEach(([key, value]) => {
      icon.style[key] = value;
    });

    // Fallback emoji jika gagal load
    icon.onerror = function () {
      console.warn(`Image not found: ${cfg.image}`);
      const fallback = document.createElement("div");
      fallback.textContent = "🌸";
      fallback.style.cssText = `
        position: absolute;
        font-size: ${isMobile ? "28px" : "40px"};
        transform: rotate(${cfg.rotate});
        opacity: ${cfg.opacity};
      `;
      Object.entries(cfg.position).forEach(([key, value]) => {
        fallback.style[key] = value;
      });
      container.appendChild(fallback);
    };

    container.appendChild(icon);
  });

  document.body.appendChild(container);
}

// agar bisa realtime saat resize (misal rotate device)
window.addEventListener("resize", () => {
  const existing = document.querySelector(".decorative-icons");
  if (existing) existing.remove();
  addCornerIcons();
});

document.addEventListener("DOMContentLoaded", addCornerIcons);
