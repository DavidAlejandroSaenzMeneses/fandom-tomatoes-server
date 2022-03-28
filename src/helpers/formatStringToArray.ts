//stringToArray recibe un string y lo formatea para ser manejado como array (util cuando la informacion llega de from-data)
export const stringToArray = (stringFromArray: string | undefined | null) => {
    if (stringFromArray == undefined && stringFromArray == null) { return null; }
    return stringFromArray
        .replace('[', '')
        .replace(']', '')
        .split(',');
};