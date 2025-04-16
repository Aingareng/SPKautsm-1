import { insertResultPasien } from "../models/pasienResultsModels.js";

export async function insertControllerPasienResults(req,res) {
    const data = req.body;

        const result =await insertResultPasien(data);

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