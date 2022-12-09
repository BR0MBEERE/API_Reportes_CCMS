import {getConnection} from '../database/connection';

export const getProfesores = async (req, res)=>{
    const q = "SELECT * FROM Profesor";
    const pool = await getConnection();
    await pool.request().query(q, (err, row)=>{
        if(err){
            console.error(err);
        }
        const datos = row.recordsets[0];
        res.json(datos);
    });
}


export const getProfesor = async (req, res)=>{
    console.log(req.params);
    const profe = req.params;
    const q = `SELECT p.Nombre, p.Apellidos, pl.Username FROM Profesor_login pl left join Profesor p on p.Id_Profesor = pl.idProfesor where idProfesor = ${profe.id}`;

    const pool = await getConnection();
    await pool.request().query(q,(err, row) =>{
        if(err){
            console.log(err);
        }
        // console.log(row);
        const datos = row.recordsets[0];
        res.json(datos);
    });
}

export const loginProfesor = async (req, res)=>{
    const {user , pass} = req.body
    console.log(user, pass);
    const q = `SELECT p.Nombre, p.Apellidos, pl.Username FROM Profesor_login pl left join Profesor p on p.Id_Profesor = pl.idProfesor where pl.Username = ${user} and pl.Contra = ${pass}`;

    const pool = await getConnection();
    await pool.request().query(q,(err, row) =>{
        if(err){
            console.log(err);
        }
        const rowsAq = row.rowsAffected[0];
        const datos = row.recordsets[0];
        // console.log(row.recordsets);
        if  (rowsAq == 0)
        {
            res.json({"resultado": 0});
        }
        else{
            res.json({"resultado": 1, "Profesor":datos[0]});
        }
    });
}