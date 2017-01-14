// localStorage helper function
const storage = {
    set: function(key, value) {
        window.localStorage.setItem( key, JSON.stringify(value) );
    },
    get: function(key) {
        try {
            return JSON.parse( window.localStorage.getItem(key) );
        } catch(e){
            return null;
        }
    },
    delete: function(key){
        try{
            localStorage.removeItem(key);
        } catch(e){
            return null;
        }
    }
}
