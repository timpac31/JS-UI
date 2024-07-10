export class AltInfo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        const text = this.getAttribute('data-text');
        const imgUrl = this.hasAttribute('img') ? this.getAttribute('img') : 'info_icon.png';
        
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);

        const infoWindow = document.createElement('span');
        infoWindow.setAttribute('class', 'info');
        infoWindow.textContent = text;
        
        const img = document.createElement("img");
        img.src = imgUrl;

        const style = document.createElement("style");
        style.textContent = this.#styleContent();

        icon.appendChild(img);        
        wrapper.appendChild(icon);
        wrapper.appendChild(infoWindow);
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
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
