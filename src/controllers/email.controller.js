export const sendGmail = async(req,res)=>{
    try {
        const response = await transporter.sendMail()
    } catch (error) {
        
    }
}