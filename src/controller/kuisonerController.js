import { getKuisoner } from "../models/modelsKuisoner.js";

export async function kuisonerControllers(req, res) {
    try {
        const kuisonerData = await getKuisoner();
        
        if (!kuisonerData || kuisonerData.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Data kuisoner tidak ditemukan',
                data: null
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Data kuisoner berhasil diambil',
            data: kuisonerData
        });
    } catch (error) {
        console.error('Error in kuisonerControllers:', error.message);
        return res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null
        });
    }
}