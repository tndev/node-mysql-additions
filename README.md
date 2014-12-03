# mysql-additions

## Install

Currenlty this module is not listed in the npm repository.

```sh
$ npm install tndev/node-mysql-additions
```

## Introduction

This are additions to the [mysql module][] I used in my project. 

To enable the regular feature just need to include the module.

```js
require('mysql-additions');
```

Experimental Features needs ne be explicitly enabled using:

```js
require('mysql-additions').enableExperimentalFeatures();
```


##Regular features

The API of regular features most likely will not change in future releases:

* Promisified functions (suffixed with `Async`)
* Shortcuts for: `DELETE`, `UPDATE`, `INSERT`, `USE`
* Experimental-Features:
	* test
	


[mysql module]: https://github.com/felixge/node-mysql


## Experimental Features

There are experimental features that are either not fully tested or with an API that might change.

You can enable those by using:


