export function importTemplate(id) {
    const template = document.getElementById(id);
    return document.importNode(template.content, true);
}

export function bindTemplate(template, data) {
    const regex = /\#{([^}]+)}/g;
    const matches = template.matchAll(regex);
    const captures = [...matches].map(m => m[1]);
    for (const key of captures) {
        if (data.hasOwnProperty(key)) {
            template = template.replaceAll('#{'+key+'}', data[key]);
        }
    }
    return template;
}

export function bindTemplates(template, arr) {
    return arr.map(data => bindTemplate(template, data)).join('\n');
}