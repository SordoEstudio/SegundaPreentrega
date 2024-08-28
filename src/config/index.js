import 'dotenv/config'
export default {
NODE_ENV: process.env.NODE_ENV ,

PORT : process.env.PORT,

PERSISTENCE: process.env.PERSISTENCE ,

MONGO_URL: process.env.MONGO_URL ,

SECRET_KEY: process.env.SECRET_KEY ,

SECRET_KEY_JWT: process.env.SECRET_KEY_JWT ,

CLIENT_ID: process.env.CLIENT_ID ,

CLIENT_SECRET: process.env.CLIENT_SECRET,

CALLBACK_URL: process.env.CALLBACK_URL,

EMAIL_GMAIL: process.env.EMAIL_GMAIL,

PASSWORD_GMAIL: process.env.PASSWORD_GMAIL,

PORT_GMAIL: process.env.PORT_GMAIL,

}