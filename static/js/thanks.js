async function fetchBadge() {
    const fetchBadge = await fetch('../static/img/osi-badge-base.svg');
    const svgTemplate = await fetchBadge.text();
    return svgTemplate;
}


async function load() {
  const greeting = document.querySelector('.js-greeting')
  const params = new URLSearchParams(window.location.search)
  const name = params.get('name')

  function slugify(str) {
    str = str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');

    return str;
  }

  if (name) {
    // Personalise the greeting
    greeting.innerText = `${greeting.innerText.slice(0, -1)} ${name}!`

    // build an SVG patter
    const nameAsSlug = slugify(name)
    const pattern = GeoPattern.generate(nameAsSlug)
    const svgContainer = document.querySelector('.svg-container')

    const badge = await fetchBadge()
    svgContainer.innerHTML = badge;
  }

}

window.onload = load