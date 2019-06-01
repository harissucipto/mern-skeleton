import mongoose, { Schema } from 'mongoose';

const BarangSchema = new mongoose.Schema({
  nama: {
    type: String,
    trim: true,
    required: 'Nama di perlukan'
  },
  stok: {
    type: Number
  },
  satuan: {
    type: String
  },
  deskripsi: {
    type: String
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: 'Login terlebih dahulu'
  }
});

export default mongoose.model('Barang', BarangSchema);
