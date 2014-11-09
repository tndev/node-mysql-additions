# mysql-additions

## Install

Currenlty this module is not listed in the npm repository.

```sh
$ npm install tndev/node-mysql-additions
```

## Introduction

This are additions to the [mysql module][].

To enable the regular feature you do:

```js
require('mysql-additions');
```

This will enable the Promise based functions that are suffixed with an `Async`.


[mysql module]: https://github.com/felixge/node-mysql


## Experimental Features

There are experimental features that are either not fully tested or with an API that might change.

You can enable those by using:

```js
require('mysql-additions').enableExperimentalFeatures();
```
