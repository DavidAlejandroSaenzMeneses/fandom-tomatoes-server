import mongoose from 'mongoose';
// FormatToObjectId contiene los metodos encargados de recibir los id y retornarlos en formato ObjectId compatibles con mongo
class FormatToObjectId {
    public fromArray(stringOfArrayOfId: string | undefined | null) {
        //recibe un arreglo y transforma cara elemento a un objectId
        if (stringOfArrayOfId == undefined && stringOfArrayOfId == null) { return null; }
        try {
            //Valida si es un string para transformarlo a un objeto iterable (pensado para el manejo de from-data, el cual enviar arreglos como strings)
            const baseArray: string[] = typeof stringOfArrayOfId == 'string' ? JSON.parse(stringOfArrayOfId) : stringOfArrayOfId;
            return baseArray.map(id => new mongoose.Types.ObjectId(id));
        } catch {
            return [];
        }
    }

    public fromOneString(idString: string | undefined | null) {
        //recibe un string de id y devuelve un ObjectId
        if (idString == undefined && idString == null) { return null; }
        return new mongoose.Types.ObjectId(idString);
    }
}

export const formatToObjectId = new FormatToObjectId();