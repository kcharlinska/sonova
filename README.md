# FrontBox Static

Static WWW builder tool. Use prepared html templates, include necessary element style and javascript behaviors, write own code using helpful functions, speed up work with snippets.

## Table of contents

-   [FrontBox Static](#frontbox-static)
    -   [Table of contents](#table-of-contents)
    -   [Preview/Status](#previewstatus)
    -   [Information](#information)
    -   [Requirements](#requirements)
        -   [Visual Studio Code addons](#visual-studio-code-addons)
    -   [Gulp](#gulp)
        -   [Terminal tasks](#terminal-tasks)
    -   [Projekt Tree](#projekt-tree)
    -   [Bugs](#bugs)

## Preview/Status

[Development](https://quirky-perlman-434ce5.netlify.app/):

![Netlify Status](https://api.netlify.com/api/v1/badges/ad028d61-7253-4819-a571-350e3acd37a5/deploy-status)

[Productive](https://tender-pasteur-b2164f.netlify.app/):

![Netlify Status](https://api.netlify.com/api/v1/badges/7bf6c2d1-2d28-42b2-86d2-2c04fe70d4a1/deploy-status)

[Documentation](https://festive-meitner-bb09bc.netlify.app/):

![Netlify Status](https://api.netlify.com/api/v1/badges/b492ef35-2480-45e6-8420-b7926e588f1f/deploy-status)

## Information

Project contain [FrontBox-Style](https://github.com/BartoszPiwek/FrontBox-Style) package.

|             |                                              |
| ----------- | -------------------------------------------- |
| Author      | Bartosz Piwek                                |
| Version     | 0.0.2                                        |
| HTML        | [Pug](https://pugjs.org/)                    |
| CSS         | [SCSS](https://sass-lang.com)                |
| JavaScript  | [TypeScript](https://www.typescriptlang.org) |
| Task runner | [Gulp](https://gulpjs.com)                   |

## Requirements

|                                                     |                                       |
| --------------------------------------------------- | ------------------------------------- |
| [Node.js](https://nodejs.org/en)                    | JavaScript run-time environment       |
| [Gulp](https://gulpjs.com)                          | The streaming build system            |
| [Yarn](https://yarnpkg.com)                         | Fast, reliable, and secure dependency |
| [Visual Studio Code](https://code.visualstudio.com) | IDE                                   |

### Visual Studio Code addons

|                                                                                               |                             |
| --------------------------------------------------------------------------------------------- | --------------------------- |
| [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)   | Modern CSS/SCSS/Less linter |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)        | Code formatter              |
| [Pug beautify](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-pugbeautify) | Simple Pug/Jade beautify    |

## Gulp

### Terminal tasks

| Task            | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| yarn start      | Generate website with server and automatic update after modifying files |
| yarn favicon    | Generate favicons                                                       |
| yarn build      | Generate prod website                                                   |
| yarn build-prod | Generate prod website with optizied assets                              |
| --prod          | Change version to productive                                            |
| --watch         | Watch files                                                             |
| --server        | Create server                                                           |

## Projekt Tree

```
└─── public/                              | Generated website
    ├─── prod/
    └─── dev/
└─── src/
    ├─── audio/
    ├─── fonts/
    ├─── favicons/                        | Generated favicons
    └─── images/
        ├─── svg/                         | SVG files
        ├─── favicon.png                  | Site favicon
        └~~~ other image files
    └─── scripts/
        ├─── bootstrap/                   | FrontBox modules folder
        ├─── plugins/                     | Custom js/ts plugins folder
        ├─── app.ts                       | Main script file
        └~~~ other TS/JS files
    └─── style/
        ├─── bootstrap/                   | FrontBox style folder
        ├─── modules/                     | Addon functions & style folder
        ├─── plugins/                     | Custom plugins style folder
        ├─── utilities/                   | Utilities style folder
        ├─── variables/                   | Folder with SCSS variables
        ├─── style.scss                   | Page style concat
        ├─── grid.scss                    | Grid style concat
        ├─── utilities.scss               | Utilities style concat
        └~~~ other SCSS files
    └─── template/
        ├─── includes/                    | Pug includes folder
        ├─── partials/                    | Separated Pug code
        └~~~ other PUG files
    └─── video/
└─── config.js                            | Main config
```

## Bugs

Feel free to [create bug issues](https://github.com/BartoszPiwek/FrontBox-Static/issues/new?labels=bug).
