# Assaultjs

Pentesting and exploiting stuff in Node. Please visit the page of the project to know more about it.
- **Site**: https://assaultjs.github.io/
- **GitHub repo**: https://github.com/assaultjs/assaultjs
- **IRC(Freenode)**: #assaultjs

## Install
- Tested with [iojs](https://iojs.org/) and [node.js™](http://nodejs.org/): `npm i -g assaultjs`
- [Nmap](http://nmap.org/) optional.

## Use
- Console client:
 - Installed from npm: `assaultjs`
 - Source code: `npm start`
- As a library:
```javascript
var Assault = require('assaultjs'),
    assault = new Assault({}),
    moduleOptions = { target : '8.8.8.8' };

console.log('Modules info:');
console.log(JSON.stringify(assault.getModulesInfo(), null, 2));

assault.runModule('geoLocate', moduleOptions, function (err, result) {
    if (err) {
        console.log('ERROR:');
        console.log(err);
    } else {
        console.log('RESULT:');
        console.log(result);
    }
});
```

## Issues
- Please use GitHub web (https://github.com/assaultjs/assaultjs/issues). If you have doubts playing with the software label the issue as "question".

## Developer guide
- To contribute we use [GitHub pull requests](https://help.github.com/articles/using-pull-requests).
- Conventions:
 - We use [JSHint](http://jshint.com/) and [Crockford's Styleguide](http://javascript.crockford.com/code.html).
 - Please run `grunt contribute` to be sure your code fits with them.

## License
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

## Copyright
Each source code file should include the name of every developer which touches it.