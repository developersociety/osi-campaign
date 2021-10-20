class memberList extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    // Get the dummy data
    const members = await this.getMembers();

    // Get the template from a seperate html file
    const template = await this.getTemplate();

    // Create a shadow dom for appending elements to
    this.attachShadow({mode: 'open'})

    // create the parent list element
    const parentList = document.createElement('ul')
    parentList.classList.add('member-list')

    // Populate members
    members.forEach(member => this.addListItem(member, template, parentList))

    // append the created elements to the shadow dom
    this.shadowRoot.append(parentList);

  }

  async getMembers() {
    const response = await fetch('/static/js/components/member-list/members.json');
    return response.json().then(data => data)
  }

  async getTemplate() {
    const response = await fetch('/static/js/components/member-list/member-list.html');
    let template = await response.text().then(data => data)
    template = new DOMParser().parseFromString(template, 'text/html')
    .querySelector('template')
    return template.content
  }

  addListItem(obj, srcTemplate, parentElement) {
    const memberTemplate = srcTemplate.cloneNode(true)
    const formattedTime = this.formatTimestamp(obj.time_stamp)

    // populate template
    memberTemplate.querySelector('a').href = `https://twitter.com/${obj.twitter_handle}`
    memberTemplate.querySelector('#name').innerText = obj.name
    memberTemplate.querySelector('#twitter').innerText = `@${obj.twitter_handle}`
    memberTemplate.querySelector('#message').innerText = `"${obj.message}"`
    memberTemplate.querySelector('#time-stamp').innerText = formattedTime

    parentElement.appendChild(memberTemplate)
    return
  }

  formatTimestamp(pastTime) {
    const now = new Date();
    const past = new Date(pastTime);
    const diffTime = Math.abs(past - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  }
}

customElements.define('member-list', memberList);
