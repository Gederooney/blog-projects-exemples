function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
}

window.onload = () => {
  const links = Array.from(document.querySelectorAll('a[href^="#"]'));
  links.forEach((link) => {
    const id = link.getAttribute('href').trim().slice(1);
    if (id !== '') {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        scrollTo(id);
      });
    }
  });
};
