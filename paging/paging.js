const Pagination = class {    
    constructor(totalCount, pageSize=10, recordSize=10) {
        this._validate(totalCount, pageSize, recordSize);
        this.pageSize = pageSize;
        this.recordSize = recordSize;
        this.totalCount = totalCount;            
        this.totalPageSize = Math.ceil(totalCount / recordSize);
        this.template = new PaginationTemplate();
    }

    _validate(totalCount, pageSize, recordSize) {
        if(typeof totalCount !== 'number' || totalCount < 0) {
            throw `totalCount must positive number: [${totalCount}]`;
        }
        if(typeof pageSize !== 'number' || pageSize < 0) {
            throw `pageSize must positive number: [${pageSize}]`;
        }
        if(typeof recordSize !== 'number' || recordSize < 0) {
            throw `recordSize must positive number: [${recordSize}]`;
        }
    }

    html(currentPageNo) {
        if(typeof currentPageNo !== 'number' || currentPageNo < 1 || this.totalCount < 1) return '';

        this.setUp(currentPageNo);

        const html = [];   
        const {prevTag, currentPageTag, otherPageTag, nextTag} = this.template;
        if(this.hasPrev) {
            const prevPageNo = this.firstPageNo - 1;
            html.push(this._replace(prevTag, prevPageNo));
        }
        for(let i=this.firstPageNo; i<=this.lastPageNo; i++) {
            if(i === currentPageNo) {
                html.push(this._replace(currentPageTag, i));
            } else {
                html.push(this._replace(otherPageTag, i));
            }
        }
        if(this.hasNext) {
            const lastPageNo = this.lastPageNo + 1;
            html.push(this._replace(nextTag, lastPageNo));
        }

        return html.join('');        
    }

    setUp(currentPageNo) {
        this.firstPageNo = this.calcFirstPageNo(currentPageNo);
        this.lastPageNo = this.calcLastPageNo(currentPageNo);
        this.hasPrev = this.calcHasPrev(currentPageNo);
        this.hasNext = this.calcHasNext(currentPageNo);
    }

    calcFirstPageNo(pageNo) {            
        return (Math.ceil(pageNo / this.pageSize) - 1) * this.pageSize + 1;                  
    }

    calcLastPageNo(pageNo) {
        return Math.min((this.calcFirstPageNo(pageNo) + this.pageSize -1), this.totalPageSize);
    }

    calcHasPrev(pageNo) {
        return pageNo > this.pageSize;
    }

    calcHasNext(pageNo) {
        return this.totalPageSize > this.calcLastPageNo(pageNo);
    }

    setTemplate(template) {
        if(!(template instanceof PaginationTemplate)) throw new TypeError('only PaginationTemplate Type is available');
        this.template = template;
    }

    _replace(originalFormat, replaceValue) {
        return originalFormat.replaceAll(/\{pageNo\}/g, replaceValue);
    }
}

const PaginationTemplate = class {
    constructor() {
        this.prevTag = '<a href="javascript:void(0);" onclick="goPage({pageNo});return false;" title="이전페이지로 이동">&lt;</a>\n';
        this.currentPageTag = '<span>{pageNo}</span>\n';
        this.otherPageTag = '<a href="javascript:void(0);" onclick="goPage({pageNo});return false;">{pageNo}</a>\n';
        this.nextTag = '<a href="javascript:void(0);" onclick="goPage({pageNo});return false;" title="다음페이지로 이동">&gt;</a>\n';
    }

    prev(prevTag) {
        this.prevTag = prevTag;
    }
    current(currentPageTag) {
        this.currentPageTag = currentPageTag;
    }
    other(otherPageTag) {
        this.otherPageTag = otherPageTag;
    }
    next(nextTag) {
        this.nextTag = nextTag;
    }    
}
