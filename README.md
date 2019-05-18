# @ircv/modify-cra

A node CLI for modifying create react apps using the oclif.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->

# Usage

`ircv_modify-cra --default`

`ircv_modify-cra -d`

`ircv_modify-cra`

# Commands

--default: Choose all default modifications

<br/>

## Modifications

| name              | info                                          | has dependency?     |
| ----------------- | --------------------------------------------- | ------------------- |
| styled-components | use styled-components and create GlobalStyle  | `styled-components` |
| context-store     | use React.Context as global store             | null                |
| react-router-dom  | create Routes component with react-router-dom | `react-router-dom`  |

# Prompt Questions

1. Project Title ?
2. Project Description ?
