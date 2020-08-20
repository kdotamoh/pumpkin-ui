const extensionMapper = {
    png: 'image/png',
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    pdf: 'application/pdf',
    csv: 'text/csv',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}

export const downloadFile = (url, fileName, fileType) => {
    const showFile = (blob) => {
        const newBlob = new Blob([blob], {type: extensionMapper[fileType.toLowerCase()]});
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
        const data = window.URL.createObjectURL(newBlob);
        const link = document.createElement('a');
        link.href = data;
        link.download = fileName + "." + fileType;
        link.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
        }, 100);
    }
    fetch(url)
        .then(res => {
            return res.blob()
        })
        .then(showFile);
}

