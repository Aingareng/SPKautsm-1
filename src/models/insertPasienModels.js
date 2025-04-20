import pool from '../config/database.js'

export async function insertPasien(name,age,sex,juandice,familyAsd) {
    if(!name || !age || !sex || juandice== undefined || familyAsd === undefined){
        return{
            success: false,
            error: 'Semua field (name, age, sex, juandice, familyAsd) wajib diisi!',
            data: null
        };
    }
    try{
        const [result] = await pool.query('INSERT INTO pasien(name,age,sex,juandice,family_ASD) VALUE(?,?,?,?,?)',[name,age,sex,juandice,familyAsd]);
        
        if(result.affectedRows === 0){
            return{
                success: false,
                error: 'Gagal menambahkan pasien: Tidak ada baris yang terpengaruh.',
                data: null
            }
        }

        return{
            success: true,
            error: null,
            data: {
                id: result.insertId, // ID baru yang ter-generate
                name,
                age,
                sex,
                juandice,
                familyAsd
            }
        }


    }
    catch(error){
        console.error('Error Menambahkan pasien:', error)

        if(error.code === 'ER_DUP_ENTRY'){
            return{
                success: false,
                error: 'Pasien dengan data yang sama sudah ada!',
                data: null
            }
        }

        return{
            success: false,
            error: 'Terjadi kesalahan server saat menambahkan pasien.',
            data: null
        }
    }
}