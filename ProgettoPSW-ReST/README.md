# Progetto per l'esame di Progetto di Sistemi Web - Backend ReST

## Introduzione
Questa è la parte backend del mio progetto, e si occupa di fornire un servizio ReST.\
Il servizio permette ai client di effettuare operazioni CRUD su una base dati di canzoni.\
Ciò è stato implementato tramite il framework SparkJava.
## Metodo per l'integrazione dei sistemi
Il backend fornisce output JSON, sia per le operazioni di GET che per le altre operazioni (in quest'ultimo
caso, il JSON conterrà informazioni sull'esito della richiesta). Il frontend consumerà il servizio ReST
tramite chiamate HTTP e permetterà la visualizzazione e la modifica dei dati in maniera intuitiva.
### Formato del JSON
Il formato del JSON scelto per rappresentare una risorsa di tipo "Music" è il seguente, e rispecchia
il formato dei record nella base dati:

    {
        "id"    : number,
        "title" : string,
        "author": string,
        "album" : string,
        "year"  : number,
        "genre" : string,
        "url"   : string
    }
    
Per quanto riguarda il JSON fornito come risposta, si è definito il seguente formato:

    {
        "httpStatus"    : number,
        "requestStatus" : "success"/"error",
        "message"   : string,
        "data"      : [{Music1}, {Music2}, ...]
    }

dove "message" è un messaggio o una descrizione dell'errore in caso si verificasse.\
"data" è un Array di oggetti JSON di tipo Music.
## Database
Per un primo esempio di base dati si è utilizzato SQLite, un database molto leggero. In un caso d'uso
reale, è facile modificare il codice per supportare altri tipi di database relazionali,
quali MySQL o PostgreSQL. La connessione alla base dati viene gestita con JDBC.\
La query corrispondente alla richiesta <code>GET /music</code> supporta la paginazione dei risultati, e
presuppone che la prima pagina sia indicata con '0' (che è anche il valore di default, nel caso non sia
specificata). La richiesta con specificazione della pagina avrà quindi la seguente forma:

    GET localhost:8080/music?page=<page>

## Richieste possibili

    GET  /music             --> Di default, la pagina è 0
    GET  /music/:id
    GET  /music?page=<page>
    GET  /music?[page=<page>][&title=<title>][&author=<author>]
               ↪[&album=<album>][&year=<year>][&genre=<genre>]
    GET  /music/<attributo> --> Non implementato, scelta di progetto
    PUT  /music             --> Aggiunge più musiche
    PUT  /music/:id         --> Modifica una musica
    POST /music             --> Aggiunge una musica
    POST /music/:id         --> Non implementato, generalmente non fatto
    DELETE /music           --> Restituisce sempre 403 Forbidden
    DELETE /music/:id       --> Elimina una musica

## Dipendenze

    SparkJava Framework --> Framework utilizzato
    SLF4J-API/-SIMPLE --> Per il logging
    Apache HttpComponents --> Per le costanti che rappresentano gli stati HTTP
    JAX WS-RS --> Per le costanti che rappresentano i Media Type
    Org.Json --> Per la manipolazione del JSON
    GSON --> Per la deserializzazione del JSON
    SQLite-JDBC --> Per il database
    Guava --> Metodi I/O per fornire l'iconcina "favicon.ico"
    
Per la versione delle dipendenze utilizzare consultare il file build.gradle.