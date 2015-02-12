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

var net = require('net'),

    NETWORK_PROTOCOLS = ['UDP', 'TCP', 'TLS', 'WS', 'WSS'],
    // http://www.openssl.org/docs/ssl/ssl.html#DEALING_WITH_PROTOCOL_METHODS
    TLS_TYPES = ['TLSv1', 'SSLv2', 'SSLv3'];


function isPositiveInt(value) {
    return (value === '0' || (value || 0) > 0 && value % 1 === 0);
}

function isPort(value) {
    return (isPositiveInt(value) && (0 <= parseInt(value)) && (parseInt(value) <= 65535));
}

function isIpBlock(value, version) {
    var raddix, min, max, finalValue;

    if (version === 4) {
        raddix = 10;
        min = 0;
        max = 255;
    } else {
        raddix = 16;
        min = parseInt('0000', 16);
        max = parseInt('ffff', 16);
    }

    finalValue = parseInt(value, raddix);

    if ((min <= finalValue) && (finalValue <= max)) {
        return true;
    } else {
        return false;
    }
}

function isCidrMask(value, version) {
    var finalValue = parseInt(value, 10),
        min, max;

    if (version === 4) {
        min = 0;
        max = 32;
    } else {
        min = 8;
        max = 128;
    }

    if ((min <= finalValue) && (finalValue <= max)) {
        return true;
    } else {
        return false;
    }
}


// Public stuff

// From here:
// - Receive a string
// - Return the final params needed by the module
// - Should throw an error if not passing the check
//      - TODO: Better a callback here?
// - The error must include hints about a correct input

module.exports.positiveInt = function (value) {
    if (isPositiveInt(value)) {
        return parseInt(value);
    } else {
        throw new Error('Any positive integer');
    }
};

module.exports.port = function (value) {
    if (isPort(value)) {
        return parseInt(value);
    } else {
        throw new Error('Any valid port (0..65535)');
    }
};

module.exports.ip = function (value) {
    if (net.isIP(value)) {
        return value;
    } else {
        throw new Error('Any valid IPv4/IPv6 single address');
    }
};

module.exports.networkProtocol = function (value) {
    var protocols = NETWORK_PROTOCOLS,
        finalValue = value.toUpperCase();

    if (protocols.indexOf(finalValue) !== -1) {
        return finalValue;
    } else {
        throw new Error(protocols.toString());
    }
};

module.exports.tlsType = function (value) {
    if (TLS_TYPES.indexOf(value) !== -1) {
        return value;
    } else {
        throw new Error('ie: ' + TLS_TYPES.toString());
    }
};

// To use with https://github.com/jas-/node-libnmap
module.exports.nmapTargets = function (value) {
    var split0 = value.split('/'),
        split1 = value.split('-');

    if ((split0.length === 2 && net.isIP(split0[0])) && isCidrMask(split0[1]) ||
       (split1.length === 2 && isIpBlock(split1[1])) || net.isIP(value)) {
        return value;
    } else {
        throw new Error('Single hostname ipv4 (still not ipv6), a CIDR or a' +
                        'numerical range (ie: 192.168.0.0/24, 192.168.1.1-5');
    }
};

module.exports.nmapPorts = function (value) {
    var split0    = value.split(','),
        split1    = value.split('-'),
        allFine   = false;

    if (split0.length > 1) {
        return value;
    } else if (split1.length === 2) {
        return value;
    } else if (isPort(value)) {
        return value;
    } else {
        throw new Error('ie: 21,22,80,443,3306,60000-65535');
    }
};

// To avoid problems using falsy values
module.exports.allValid = function (value) {
    return value;
};

module.exports.yesNo = function (value) {
    if (value === 'yes' || value === 'no') {
        if (value === 'yes') {
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error('valid: yes | no');
    }
};