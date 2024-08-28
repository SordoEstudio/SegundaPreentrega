export const info = {
    definition:{
        openapi: '3.0.0',
        info:{
            title:'API e-comerce Backend Coderhouse',
            version:'1.0.0',
            description:'API e-comerce desarrollada durante el curson de backend de Coderhouse, tramo final de la carrera Full Stack.'
        },
        servers:[
            {
                url:'http://localhost:8080',
                description:'API de e-commerce'
            },
        ]
    },
    apis:['src/docs/*.yml']
}