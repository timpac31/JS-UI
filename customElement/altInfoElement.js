export class AltInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        const text = this.getAttribute('data-text');
        const imgUrl = this.hasAttribute('img') ? this.getAttribute('img') : 'info_icon.png';
        
        const html = `
            <span class="wrapper">
                <span class="icon">
                    <img src="${imgUrl}" />
                </span>
                <span class="info">${text}</span>
            </span>
        `;

        shadow.innerHTML = html;
        const style = document.createElement("style");
        style.textContent = this.#styleContent();
        shadow.appendChild(style);
    }

    #styleContent() {
        return `
            .wrapper {position: relative;}
            .info {
                font-size: 0.8rem; width: 200px; display: inline-block; border: 1px solid black; padding: 10px; white-space: pre-line;
                background: white; border-radius: 10px; opacity: 0; transition: 0.3s all; position: absolute; bottom: 20px; left: 10px; z-index: 3;
            }
            img {width: 1rem;}
            .icon:hover + .info, .icon:focus + .info { opacity: 1; }
        `;
    }
}
