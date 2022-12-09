import sql from 'mssql';

const dbSettings = {
    user:"root",
    password:"root",
    server:"localhost",
    instance:"ALONSO\SQLEXPRESS",
    database:"ProyectoSemestralNew",
    options:{
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

export const getConnection = async ()=>{
    try{
        const pool = await sql.connect(dbSettings);
        return pool;
    }catch(e){
        console.log(e);
    }

}

getConnection();