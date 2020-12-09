function showImage(name, type) {
    if(type === 'image/png' || type === 'image/jpeg') {
        var file = '<img src="/fileStore/' + name + '" width="80%" />'
    } else {
        var file = '<p>' + name + ', ' + type + '</p>'
    }

    let fileObj = $(`
        <div class="w3-row w3-marin">
            <div class="w3-col s6">
                ${file}
            </div>
            <div class="w3-col s6 w3-border">
                <div class="w3-row w3-margin">
                    <p>Filename: ${name}</p>
                    <p>Mimetype: ${type}</p>                    
                </div>
            </div>
        </div>
    `)

    let download = $('<div><a href="/files/download/' + name + '">Download</a></div>')

    let $display = $('#display')
    $display.empty()
    $display.append(fileObj, download)
    $display.modal()
}
