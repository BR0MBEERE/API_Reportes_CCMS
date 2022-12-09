import {getConnection} from '../database/connection';

export const getReporesByProfId =  async(req, res)=>{
    const profe = req.params;
    const q = `SELECT Id_Malfuncion as id_Reporte, Descripcion, Revisado FROM Malfuncion WHERE Id_Prof = ${profe.idProf}`;

    const pool = await getConnection();
    await pool.request().query(q,(err, row) =>{
        if(err){
            console.log(err);
        }
        console.log(row);
        const datos = row.recordsets[0];
        res.json({"Reporte":datos});
    });
}

export const getDetallesReporte = async(req, res)=>{
    const reporte = req.params;
    const q = `SELECT FORMAT (m.Fecha, 'dd/MM/yy') as Fecha, m.Descripcion as DescDet, concat(td.Descripcion,' ',d.Marca,' ', d.Modelo, ' que se encuentra en el aula ', a.NombreAula) as Dispositivo, m.Revisado as Rev from Dispositivo d
                inner join Malfuncion m on d.IdDispositivo = m.IdDispositivo
                left join Aula a on a.idAula = d.Id_Aula
                left join TipoDispositivo td on td.IdTipoDispositivo=d.IdTipoDispositivo
                where m.Id_Malfuncion = ${reporte.idReport}`;

    const pool = await getConnection();
    await pool.request().query(q,(err, row) =>{
        if(err){
            console.log(err);
        }
        console.log(row);
        const datos = row.recordsets[0];
        res.json(datos[0]);
    });
}


export const addReporte = async(req, res)=>{
    const Malfuncion = req.body;

    console.log(Malfuncion);

    const {descripcion, nombreProfesor, idProfesor, idDispositivo} = Malfuncion

    const q = `Insert into Malfuncion(Descripcion, nombreProfesor,Id_Prof,IdDispositivo) values ('${descripcion}','${nombreProfesor}','${idProfesor}', '${idDispositivo}')`;

    const pool = await getConnection();
    await pool.request().query(q,(err, row) =>{
    if(err){
    console.log(err);
    }
    else{
        if(row.rowsAffected[0] === 1){
            console.log(res.stat);
            res.status(200).json({"resultado":1, "msg":"El reporte fue dado de alta correctamente"});
        }
    }
    });

}