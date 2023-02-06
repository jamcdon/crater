let editor = ace.edit("yaml");
    editor.session.setMode("ace/mode/yaml");
    editor.setOptions({
        readOnly: true,
        highlightActiveLine: false,
    });


editor.setValue(`#Minecraft Docker-Compose
version: "3"

services:
  mc:
    image: itzg/minecraft-server
    ports:
      - 25565:25565
    environment:
      EULA: "TRUE"
      MOTD: "Welcome to minecraft!"
      DIFFICULTY: "hard"
      #INIT_MEMORY: "1G"
      MAX_MEMORY: "2G"
      ENABLE_RCON: "true"
      RCON_PASSWORD: "\${password}"
      RCON_PORT: 28016
      OPS: \${ops}
      SNOOPER_ENABLED: "FALSE"
      SERVER_NAME: "example.minecraft.net"
      VIEW_DISTANCE: 10
    tty: true
    stdin_open: true
    volumes:
      - /raid/minecraft/data:/data
      - /etc/timezone:/etc/timezone:ro
    restart: unless-stopped`);

editor.moveCursorTo(0,0);