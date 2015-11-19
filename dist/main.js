System.register(['sosgi.cdi', './ui'], function (_export) {
    'use strict';

    var di, UI, MainUI;

    var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_sosgiCdi) {
            di = _sosgiCdi['default'];
        }, function (_ui) {
            UI = _ui['default'];
        }],
        execute: function () {
            MainUI = (function () {
                function MainUI() {
                    _classCallCheck(this, _MainUI);

                    this._apps = {};
                }

                _createDecoratedClass(MainUI, [{
                    key: 'activate',
                    decorators: [di.activate.bind(di)],
                    value: function activate(ctx) {
                        console.log('MainUI::activate()');
                        this.ui = new UI();

                        this.ui.on.select.add(this.onSelectApp, this);
                        this.ui.on.reload.add(this.onReloadApp, this);

                        //this.$users.getUser().done(function(user){
                        this.ui.create();
                        //}, this);
                        //var self = this;

                        //ctx.services.register($api.ui.Route, function(){
                        //            self.$users.logout();
                        //            self.$browser.url('/login');
                        //        },{
                        //            match:'/logout'
                        //        });
                    }
                }, {
                    key: 'deactivate',
                    decorators: [di.deactivate.bind(di)],
                    value: function deactivate(ctx) {
                        console.debug('MainUI::deactivate()');
                        this.ui.remove();
                        this.ui = null;
                    }
                }, {
                    key: 'addApp',
                    decorators: [di.bind('IApp', '0..n')],
                    value: function addApp(ref, app) {
                        console.debug('MainUI::addApp(' + ref.id + ',' + app.name + ')');
                        this._apps[ref.id] = {
                            app: app,
                            properties: ref.properties
                        };
                        if (this.ui) {
                            this.ui.addApp(ref.id, ref.properties);
                        }
                    }
                }, {
                    key: 'removeApp',
                    decorators: [di.unbind('IApp')],
                    value: function removeApp(ref, app) {
                        debugger;
                        var props = ref.properties;
                        console.debug('MainUI::removeApp(' + ref.id + ',' + app.name + ')');
                        if (app === this._apps[ref.id].app) {
                            //var $browser = this.$browser;
                            //setTimeout(function(){
                            //    $browser.url('/');
                            //    $browser = null;
                            //});
                        }
                        delete this._apps[ref.id];
                        if (this.ui) {
                            this.ui.removeApp(ref.id);
                        }
                        if (this.currentApp === app) {
                            this.currentApp = null;
                        }
                    }
                }, {
                    key: 'onSelectApp',
                    value: function onSelectApp(id) {
                        if (id in this._apps) {
                            var app = this._apps[id].app;
                            if (!this.currentApp || this.currentApp !== app) {
                                if (this.currentApp) {
                                    this.currentApp.hide();
                                }
                                this.ui.selectApp(id, this._apps[id].properties);
                                app.show(this.ui.$container);
                                this.currentApp = app;
                            }
                        }
                    }
                }, {
                    key: 'onReloadApp',
                    value: function onReloadApp(id) {
                        if (this.currentApp) {
                            this.currentApp.reload();
                        }
                    }
                }, {
                    key: 'toString',
                    value: function toString() {
                        return 'sapps.ui.main/main:MainUi';
                    }
                }]);

                var _MainUI = MainUI;
                MainUI = di('MainUI')(MainUI) || MainUI;
                return MainUI;
            })();

            _export('MainUI', MainUI);
        }
    };
});