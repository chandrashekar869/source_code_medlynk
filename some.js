const mysql=require('mysql');
var connection=mysql.createPool(
    {
        connectionLimit:100,
        user:"root",
        host:"localhost",
        password:"root",
        database:"data_logger_db",
        debug:false
    }
    );
function gen7digitrand(){
    var returnreq_id=Math.floor(Math.random()*8999999+1000000);
    return returnreq_id;
}
    var query;
    connection.getConnection(function(err,connection_callback){
        if(err){
            connection_callback.release();
        }
    //console.log("device_id :"+userNmae+"solenoid : "+password);
    for(var i=0;i<265;i++){
    connection_callback.query("update device_log_historical set meter1='"+gen7digitrand()+"',meter2='"+gen7digitrand()+"',meter3='"+gen7digitrand()+"',meter4='"+gen7digitrand()+"' where _id='"+i+"'", function (err, result, fields){

    });
}
     connection_callback.end();     
    });

