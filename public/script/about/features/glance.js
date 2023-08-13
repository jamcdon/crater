let editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");
    editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
    });


editor.setValue(`#Code at a Glance
version: "3"

services:
  ace.js:
      frontend: visualizations
      for:
        - yaml
        - helm
        - docker-compose`);

editor.moveCursorTo(0,0);