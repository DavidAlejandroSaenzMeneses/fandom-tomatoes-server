import multer from 'multer';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/assets/image/uploads');
    },
    filename:(req,file,cb)=>{
        const extension = file.originalname.split('.').pop();
        cb(null,`image${Date.now()}.${extension}`);
    }
});
export const uploadMiddleware = multer({storage});