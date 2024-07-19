import { View, html } from './viewTemplate.js';

export class BoardListView extends View {
    _template() {
        return html`
            <div>
                <table class="board">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                    </tr>
                    ${this.data.map(board => html`
                        <tr>
                            <td ${board.isNew ? 'class="new"': ''}>${board.boardNo}</td>
                            <td class="view-link" data-board-no="${board.boardNo}">${board.title}</td>
                            <td>${board.writer}</td>
                            <td>${board.regDate}</td>
                        </tr>                    
                    `)}  
                </table>
            </div>
        `;
    }

    onRender() {
        this.delegate('click', '.view-link', e => {
            alert(e.target.dataset.boardNo);
        })
    }
}

export class SwitchView extends View {
    _template() {
        return html`<input type="checkbox" ${this.data.on ? 'checked': ''}>`;
    }

    onRender() {
        this.element.addEventListener('click', () => this.setOn(!this.data.on))
    }

    setOn(bool) {
        console.log(bool);
        this.data.on = bool;
        this.element.checked = bool;
    }
}

export class SettingItemView extends View {
    _template() {
        return html`
            <div>
                <span class="title">${this.data.title}</span>
                ${new SwitchView(this.data)}
            </div>
        `;
    }
}

export class SettingListView extends View {
    #checkAll = false;
    #switchView = new SwitchView({on: this.#checkAll});

    _template() {
        return html`            
            <div class="setting-list">
                <div>전체선택 ${new SwitchView({on: this.#checkAll})}</div>
                ${this.data.map(setting => new SettingItemView(setting))}                
            </div>
        `;
    }

    onRender() {
        this.element.querySelector('input')
    }
}