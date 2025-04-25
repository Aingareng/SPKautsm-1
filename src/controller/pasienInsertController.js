import { insertPasien } from "../models/insertPasienModels.js";

export async function insertControllerPasien(req, res) {
    const { name, age, sex, juandice, familyAsd } = req.body;

    // Validate required fields
    if (!name || age === undefined || !sex) {
        return res.status(400).json({
            status: 400,
            message: 'Nama, usia, dan jenis kelamin harus diisi',
            data: null
        });
    }

    try {
        const result = await insertPasien(name, age, sex, juandice, familyAsd);

        if (!result || !result.success) {
            return res.status(400).json({
                status: 400,
                message: result.error || 'Gagal menambahkan data pasien',
                data: null
            });
        }

        return res.status(201).json({
            status: 201,
            message: 'Data pasien berhasil ditambahkan',
            data: result.data
        });

    } catch (error) {
        console.error('Error in insertControllerPasien:', error);
        return res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server saat menambahkan pasien',
            data: null
        });
    }
}