System.register(['./main'], function (_export) {
    'use strict';

    var CDI, styles, components;
    return {
        setters: [function (_main) {
            _export('MainUI', _main.MainUI);
        }],
        execute: function () {
            CDI = true;

            _export('CDI', CDI);

            styles = ['res/reset.css', 'res/main.css', 'res/fa.min.css'];

            _export('styles', styles);

            components = [{
                "name": "MainUI",
                "class": "sapps.ui.main/main:default",
                "interfaces": [],
                "references": [{
                    "name": "sapps.ui.core:Browser",
                    "assign": "$browser",
                    "interface": "IBrowser"
                },
                // {
                //     "name":"User",
                //     "assign":"$users",
                //     "interface":"IUserManager"
                // },
                {
                    "name": "App",
                    "cardinality": "0..n",
                    "policy": "",
                    "interface": "IApp",
                    "bind": "addApp",
                    "unbind": "removeApp"
                }]
            }];

            _export('components', components);
        }
    };
});