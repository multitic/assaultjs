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

var requireDir = require('require-directory'),

    assaultUtils = require('./utils/common');


// Constructor

function Assault(options) {
    this.shodanKey = options.shodanKey || null;
    this.modulesInfo = requireDir(module, './modules');
}


// Public stuff

Assault.prototype.getModulesInfo = function () {
    return this.modulesInfo;
};

Assault.prototype.setShodanKey = function (value) {
    this.shodanKey = value;
};

Assault.prototype.runModule = function (moduleName, config, callback) {
    var self = this,
        assaultModule;

    if (!this.modulesInfo[moduleName]) {
        callback({
            message: 'Module not found',
            error: null
        });

        return;
    }
    assaultModule = require('./modules/' + moduleName);
    // Parsing the paremeters passed by the client
    assaultUtils.parseOptions(
        config,
        this.modulesInfo[moduleName].help.options,
        function (err, finalConfig) {
            if (err) {
                callback({
                    message: 'Parsing the options',
                    error: err
                });

                return;
            }
            if (moduleName.substr(0, 6) === 'shodan') {
                finalConfig.key = self.shodanKey;
            }
            assaultModule.run(finalConfig, callback);
        }
    );
};

module.exports = Assault;
