import mongoose from 'mongoose';
// FormatToObjectId contiene los metodos encargados de recibir los id y retornarlos en formato ObjectId compatibles con mongo
class FormatToObjectId {
    public fromArray(arrayOfId: string[] | undefined | null) {
        //este metodo recibe un arreglo de id's de tipo string y devuelve un arreglo de ObjetId
        if (arrayOfId == undefined && arrayOfId == null) { return null; }
        try {
            return arrayOfId.map(id => new mongoose.Types.ObjectId(id));
        } catch {
            return [];
        }
    }

    public fromString(stringOfArrayOfId: string | undefined | null) {
        //recibe un arreglo en string y lo formatea para ser manejado como array (creado para el manejo de from-data, el cual enviar arreglos como strings)
        if (stringOfArrayOfId == undefined && stringOfArrayOfId == null) { return null; }
        try {
            //eliminar los elementos inutiles y genera el array base
            const baseArray: string[] = stringOfArrayOfId
                .replace('[', '')
                .replace(']', '')
                .replace(/['"]+/g, '')
                .split(',');
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