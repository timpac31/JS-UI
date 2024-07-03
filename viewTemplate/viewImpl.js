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
            console.log(e.target);
        })

        // [...this.element.querySelectorAll('.view-link')].forEach(td => 
        //     td.addEventListener('click', e => {
        //         alert(e.target.dataset.boardNo);
        //     })
        // );
    }
}