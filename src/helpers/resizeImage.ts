import sharp from 'sharp';

export const resizeImage = async (filePath: string | undefined, fileName: string | undefined, width = 300, height:number|null = null) => {
    if (filePath == undefined || fileName == undefined) {
        return null;
    }
    const finalFileName = `resize-${fileName}`;
    const resizing = await sharp(filePath).resize(width, height).toFile(`src/assets/image/optimize/${finalFileName}`);
    return resizing ? finalFileName : null;
};