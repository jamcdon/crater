var editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");
/* for use when in 'preview mode'
    editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
        highlightGutterLine: false
    })
editor.renderer.$cursorLayer.element.style.opacity=0;
*/