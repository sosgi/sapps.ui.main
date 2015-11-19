import di from 'sosgi.cdi';
import UI from './ui';

@di('MainUI')
export class MainUI{

    $browser;

    constructor(){
        this._apps = {};
    }

    @di.activate
    activate(ctx) {
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
    @di.deactivate
    deactivate(ctx) {
        console.debug('MainUI::deactivate()');
        this.ui.remove();
        this.ui = null;
    }
    @di.bind('IApp', '0..n')
    addApp(ref, app){
        console.debug('MainUI::addApp('+ref.id +','+app.name+')');
        this._apps[ref.id] = {
            app:app,
            properties:ref.properties
        };
        if(this.ui){
            this.ui.addApp(ref.id, ref.properties);
        }
    }
    @di.unbind('IApp')
    removeApp(ref, app){
        debugger;
        var props = ref.properties
        console.debug('MainUI::removeApp('+ref.id +','+app.name+')');
        if(app === this._apps[ref.id].app){
            //var $browser = this.$browser;
            //setTimeout(function(){
            //    $browser.url('/');
            //    $browser = null;
            //});
        }
        delete this._apps[ref.id];
        if(this.ui){
            this.ui.removeApp(ref.id);
        }
        if(this.currentApp === app){
            this.currentApp = null;
        }
    }
    onSelectApp(id){
        if(id in this._apps){
            var app = this._apps[id].app;
            if(!this.currentApp || this.currentApp !== app){
                if(this.currentApp){
                    this.currentApp.hide();
                }
                this.ui.selectApp(id, this._apps[id].properties);
                app.show(this.ui.$container);
                this.currentApp = app;

            }
        }
    }
    onReloadApp(id){
        if(this.currentApp){
            this.currentApp.reload();
        }
    }

    toString(){
        return 'sapps.ui.main/main:MainUi';
    }
}
