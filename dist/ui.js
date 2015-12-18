System.register(['sjs-dom', './res/main.html!text'], function (_export) {
    'use strict';

    var dom, MAIN_TPL, Event;

    function UI() {
        this.on = {
            select: new Event(),
            reload: new Event()
        };
    }return {
        setters: [function (_sjsDom) {
            dom = _sjsDom['default'];
        }, function (_resMainHtmlText) {
            MAIN_TPL = _resMainHtmlText['default'];
        }],
        execute: function () {
            Event = function Event() {
                this._listeners = [];
            };

            Event.prototype = {
                add: function add(callback, bind) {
                    bind = bind || null;
                    this._listeners.push([callback, bind]);
                },
                remove: function remove(callback, bind) {
                    bind = bind || null;
                    for (var i = this._listeners.length - 1; i >= 0; i -= 1) {
                        var listener = this._listeners[i];
                        if (listener[0] === callback && (!bind || bind === listener[1])) {
                            this._listeners.splice(i, 1);
                        }
                    }
                },
                fire: function fire(args) {
                    for (var i = 0, l = this._listeners.length; i < l; i += 1) {
                        var listener = this._listeners[i];
                        listener[0].apply(listener[1], args || []);
                    }
                }
            };;

            UI.prototype = {
                create: function create(user) {
                    document.body.classList.add('main');

                    var div = document.createElement('div');
                    div.innerHTML = MAIN_TPL.trim();
                    this.$div = div.firstChild;

                    document.body.appendChild(this.$div);
                    this.$showMore = document.querySelector('#sapps-nav-apps-more');
                    this.$appList = document.querySelector('#sapps-apps-list');
                    this.$container = document.querySelector('#sapps-container');
                    this.$currentAppLabel = document.querySelector('#sapps-nav-apps-current');

                    dom.on(this.$currentAppLabel, 'click', this.onReloadApp, this);
                    dom.on(this.$showMore, 'click', this.onShowAppList, this);
                    dom.on(this.$appList, 'click', this.onSelectApp, this);
                    div = null;
                },
                updateUser: function updateUser(user) {
                    document.querySelector('#x-sapps-usernav-name').innerHTML = user.name;
                },
                remove: function remove() {
                    if (this.$div) {
                        this.$div.parentNode.removeChild(this.$div);
                    }

                    dom.off(this.$currentAppLabel, 'click', this.onReloadApp, this);
                    dom.off(this.$showMore, 'click', this.onShowAppList, this);
                    dom.off(this.$appList, 'click', this.onSelectApp, this);

                    this.$showMore = null;
                    this.$appList = null;
                    this.$div = null;
                    this.$container = null;
                    this.$currentAppLabel = null;

                    document.body.classList.remove('main');
                },
                addApp: function addApp(id, props) {
                    var $div = dom('<a href="' + props.url + '" class="app app-sid-' + id + '" data-sid=' + id + '">' + props.label + '</a>');
                    this.$appList.appendChild($div);
                },
                removeApp: function removeApp(id) {
                    var $div = this.$appList.querySelector('.app-sid-' + id);
                    this.$appList.removeChild($div);
                },
                selectApp: function selectApp(id, props) {
                    this.$currentAppLabel.innerHTML = props.label;
                    var $div = this.$appList.querySelector('.selected');
                    if ($div) {
                        $div.classList.remove('selected');
                    }
                    $div = this.$appList.querySelector('.app-sid-' + id);
                    $div.classList.add('selected');
                },
                onShowAppList: function onShowAppList(e) {
                    e.stop();
                    if (this.$div.classList.contains('show-list')) {
                        this.$div.classList.remove('show-list');
                    } else {
                        this.$div.classList.add('show-list');
                    }
                },
                onSelectApp: function onSelectApp(e) {
                    e.stop();
                    this.$div.classList.remove('show-list');
                    var id = parseInt(e.target.dataset.sid, 10);
                    this.on.select.fire([id]);
                },
                onReloadApp: function onReloadApp() {
                    this.on.reload.fire();
                }
            };

            _export('default', UI);
        }
    };
});