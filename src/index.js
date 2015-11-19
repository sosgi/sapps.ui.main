export {MainUI} from './main';

export const CDI = true;

export const styles = ['res/reset.css', 'res/main.css', 'res/fa.min.css'];

export var components = [
        {
            "name":"MainUI",
            "class":"sapps.ui.main/main:default",
            "interfaces":[],
            "references":[{
                "name":"sapps.ui.core:Browser",
                "assign":"$browser",
                "interface":"IBrowser"
            },
            // {
            //     "name":"User",
            //     "assign":"$users",
            //     "interface":"IUserManager"
            // },
            {
                "name":"App",
                "cardinality":"0..n",
                "policy":"",
                "interface":"IApp",
                "bind":"addApp",
                "unbind":"removeApp"
            }]
        }
    ]
