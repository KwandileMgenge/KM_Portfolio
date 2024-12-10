const toggleMenu = () => {
  const menu = document.querySelector(".menu-links")
  const hamburgerIcon = document.querySelector(".hamburger-svg")
  const xIcon = document.querySelector(".x-svg")

  menu.classList.toggle("open")
  hamburgerIcon.classList.toggle("open")
  xIcon.classList.toggle("open")
}