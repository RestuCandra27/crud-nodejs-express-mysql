let mysql = require('mysql');

let connetion = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'db_express_mysql'
});

connetion.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Koneksi Berhasil');
    }
})

module.exports = connetion;
