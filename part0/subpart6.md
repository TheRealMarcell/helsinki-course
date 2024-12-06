```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created - note created
    deactivate server

    Note right of browser: Note is added dynamically to the page without needing to refresh the page.
