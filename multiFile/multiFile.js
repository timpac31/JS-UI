export default class MultiFile {
    constructor(inputFileId, divId) {
        this.fileIn = document.getElementById(inputFileId);
        this.fileDiv = document.getElementById(divId);        
        if(this.fileIn === null) throw `input id : ${inputFileId} 를 찾을 수 없습니다.`;
        if(this.fileDiv === null) throw `file display id : ${divId} 를 찾을 수 없습니다.`;
        
        this.uploadFileList = [];
        this.fileIndex = 0;        
        this.fileIn.addEventListener('change', e => this.fileHandler(e));
    }

    fileHandler(e) {
        if(this.validateFile(e.target.files)) {
            [...e.target.files].forEach(file => {     
                file.idx = ++this.fileIndex;
                this.uploadFileList.push(file);
                this.fileDiv.appendChild(this.createListElement(file.name, file.idx));            
            });    
        }
        
        this.updateFiles();
    }

    validateFile(files) {        
        if(this.limitFileCount !== undefined) {
            if(this.limitFileCount < files.length + this.uploadFileList.length) {
                alert('파일 제한 수('+this.limitFileCount+')를 초과하였습니다.');               
                return false;
            }
        }

        if(this.limitFileSize !== undefined) {            
            const currentFileSize = this.uploadFileList.reduce((sum, f) => sum + f.size, 0);
            const addFileSize = [...files].reduce((sum, f) => sum + f.size, 0);
            const totalSize = currentFileSize + addFileSize;

            if(this.limitFileSize < totalSize) {
                alert('파일 용량 제한('+this.limitFileSize+')을 초과하였습니다.');
                return false;
            }
        }

        if(this.allowFileList !== undefined) {
            const existNotAllowedExtension = [...files].some(f => !this.allowFileList.includes(this.getExtension(f.name)));
            if(existNotAllowedExtension) {
                alert('허용하지 않는 파일형식입니다.');
                return false;
            }
        }
        
        return true;
    }

    createListElement(fileName, fileIdx) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.addEventListener('click', e => this.deleteFile(fileIdx, btn));
        btn.textContent = 'X';
        li.textContent = fileName;
        li.appendChild(btn);
        return li;
    }

    deleteFile(fileIdx, obj) {
        obj.parentElement.remove();
        for(let i=0; i<this.uploadFileList.length; i++) {
            const file = this.uploadFileList[i];
            if(file.idx == fileIdx) {
                this.uploadFileList.splice(i, 1);
                break;                
            }
        }
        this.updateFiles();
    }

    getExtension(fileName) {
        return fileName.split('.').pop().toLowerCase();
    }

    updateFiles() {
        const dataTransfer = new DataTransfer();
        const transferItems = dataTransfer.items;
        this.uploadFileList.forEach(f => transferItems.add(f));
        fileIn.files = dataTransfer.files;
    }

    setLimitFileCount(size) {
        if(typeof size !== 'number') throw '숫자만 가능합니다.';
        this.limitFileCount = size;
    }
    setLimitFileSize(byteSize) {
        if(typeof byteSize !== 'number') throw '숫자만 가능합니다.';
        this.limitFileSize = byteSize;
    }
    setAllowFileList(allowFiles) {
        if(!Array.isArray(allowFiles)) throw 'array 타입만 가능합니다.';
        this.allowFileList = allowFiles;
    }
}