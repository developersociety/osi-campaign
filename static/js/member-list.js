

class memberList extends HTMLElement {
  constructor() {
    super()
    this.init()
  }

  async init () {
    const members = await this.getMembers();
    console.log(members);

    // Create a shadow dom for appending elements to
    this.attachShadow({mode: 'open'})

    // create the parent list element
    const parentList = document.createElement('ul')

    // create a list item
    members.forEach(member => {
      const listItem = document.createElement('li')
      listItem.innerText = member.message;
      parentList.appendChild(listItem);
    })

    // append the created elements to the shadow dom
    this.shadowRoot.append(parentList);

  }

  async getMembers() {
    const response = await fetch('/static/js/members.json');
    return response.json().then(data => data)
  }
}

customElements.define('member-list', memberList);
