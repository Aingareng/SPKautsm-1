import { insertResultPasien } from "../models/pasienResultsModels.js";

export async function insertControllerPasienResults(req, res) {
    const data = req.body;
    
    try {
        const result = await insertResultPasien(data);

        if (!result || !result.success) {
            return res.status(400).json({
                status: 400,
                message: result.error || 'Gagal menambahkan pasien',
                data: null
            });
        }

        return res.status(201).json({
            status: 201,
            message: 'Pasien berhasil ditambahkan',
            data: result.data
        });
    } catch (error) {
        console.error('Error in insertControllerPasienResults:', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            data: null
        });
    }
}