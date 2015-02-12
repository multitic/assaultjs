/*
    Copyright Jesus Perez <jesusprubio gmail com>

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
*/

'use strict';


// Private stuff

var Netmask = require('netmask').Netmask,
    lodash = require('lodash');


// Public stuff

// We export the full Object: https://github.com/rs/node-netmask
// TODO: review this, maybe better to encapsulate what we need ...
module.exports.Netmask = Netmask;

module.exports.randomIp = function () {
    var array = [],
        i;

    for (i = 0; i <= 3; i += 1) {
        array.push(lodash.random(1, 255));
    }
    return array.join('.');
};

module.exports.randomIp6 = function () {
    var array = [],
        i;

    for (i = 0; i <= 7; i += 1) {
        array.push(this.randomString(4, 16));
    }

    return array.join(':');
};

module.exports.randomPort = function () {
    return lodash.random(1025, 65535);
};

module.exports.isReservedIp = function (address) {
    return /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)/.test(address);
};