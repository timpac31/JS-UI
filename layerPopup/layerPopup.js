export default class LayerPopup {
    constructor(id, option) {
        this.popupLayerEl = this._el(id);
        if(option) {
            this.startDate = option['startDate'];
            this.endDate = option['endDate'];
            this.closeButtonEl = document.getElementById(option['closeButtonId']);
            this.closeCheckEl = document.getElementById(option['closeCheckId']);
            this.cookieName = option['cookieName'] ?? id;
            this.closeButtonEl?.addEventListener("click", e => this._closePopup(e));
        }
    }

    pop() {
        if(this._isShow()) {
            this._on()
        } else {
            this._off();
        }
    }

    _isShow() {
        if(this.startDate === undefined || this.endDate === undefined) return true;

        const startDate= new Date(this.startDate);
        const endDate= new Date(this.endDate);
        const now = new Date().getTime();

        return now >= startDate && now <= endDate && document.cookie.indexOf(this.cookieName) === -1;
    }

    _el(id) {
        const el = document.getElementById(id);
        if(el === null) {
            throw `${id} 요소를 찾을 수 없습니다.`;
        }
        return el;
    }

    _closePopup(e) {
        if (this.closeCheckEl && this.closeCheckEl.checked) {
            this._setCookie('done', '1');	//하루동안 열지않음
        }
        this._off();
    }

    _setCookie(value, expireDays) {
        const todayDate = new Date();
        todayDate.setTime( todayDate.getTime() + (expireDays * 24 * 60 * 60 * 1000) );
        document.cookie = this.cookieName + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    }

    _on() {
        this.popupLayerEl.style.display = "block";
    }
    _off() {
        this.popupLayerEl.style.display = "none";
    }
}