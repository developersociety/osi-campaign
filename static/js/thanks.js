function load() {
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

    // build an SVG
    const nameAsSlug = slugify(name)
    const pattern = GeoPattern.generate(nameAsSlug)
    const svgContainer = document.querySelector('.svg-container')

    svgContainer.innerHTML = pattern.toSvg()
  }
}

window.onload = load