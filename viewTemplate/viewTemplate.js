class Tmpl {
    constructor(strings, values) {
        this.strings = strings;
        this.values = values;
    }

    _merge = (value) => Array.isArray(value) ? value.reduce((a,b) => html`${a}${b}`) : value;

    _escapeHtml(text) {
        if(text instanceof Tmpl) return text.toHtml();
        else if(!Number.isNaN(text)) return text;
        else return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    }

    toHtml() {
        this.values.push('');
        const newValues = this.values.map(v => this._escapeHtml(this._merge(v)));    
        return this.strings.reduce((result, str, i) => result + str + newValues[i], []);
    }
}

function html(strings, ...values) {    
    return new Tmpl(strings, values);
}

class View {
    constructor(data) {
        this.data = data;
        this.element = null;
    }

    /** override 필요 */
    _template() {
        return html`<div>${this.data}</div>`;
    }

    onRender() {
        //렌더링 후 이벤트 정의
    }

    delegate(eventType, selector, listener) {
        const selectors = [...this.element.querySelectorAll(selector)];
        this.element.addEventListener(eventType, e => {
            console.log(selectors.some(s => s.contains(e.target)) );
            
            listener(e);
        })
    }

    render() {
        const wrapEl = document.createElement('div');
        wrapEl.innerHTML = this._template().toHtml();
        this.element = wrapEl.children[0];
        this.onRender();
        return this.element;
    }    
}

export { View, html };