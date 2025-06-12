const { 
    CLOUDINARY_CLOUD_NAME, 
    CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET, 
    PORT ,
    API_KEY
} = process.env;


export const enviroments = {
    CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY: CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET: CLOUDINARY_API_SECRET || '',
    PORT: PORT || 3000,
    API_KEY: API_KEY || '661sdf4sdf45234234@!$#$%!$%!@#%$#^@!@#!@#%gfasdDsghasdfSDfHDVSDSAAER//*-///-*/*-11234-=++13'
}