# Table of Contents
- [TypeScript Compiler](#typescript-compiter)
- [Starting Server](#starting-server)
- [Supported Methods](#supported-methods)
- [TODOs](#todos)

<br>

# TypeScript Compiler
It is the command-line interface for the TypeScript compiler, which is responsible for transpiling TypeScript code (code written in TypeScript) into JavaScript code.

```
tsc
```

<br>

# Starting Server
```
node server.js
```

<br>

# Supported Methods
| HTTP Method | Endpoint           |
|-------------|--------------------|
| **GET**  (all)   | `/commands`        |
| **GET**  (specific command)   | `/commands/:id`    |
| **POST**    | `/commands`        |
| **PUT**     | `/commands/:id`    |
| **DELETE**  | `/commands/:id`    |

<br>

# TODOS
- Add tests
