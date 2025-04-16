import { insertPasien } from "../models/insertPasienModels.js";

export async function insertControllerPasien(req,res) {
    const {name, age, sex, juandice, familyAsd} = req.body;

    const result = await insertPasien(name, age, sex, juandice, familyAsd);

    if(!result){
        return res.status(200).json({
            success: false,
            message: result.error,
            data: null
        });
    }

    return res.status(201).json({
        success: true,
        message: 'Pasien berhasil ditambahkan!',
        data: result.data
    })


}