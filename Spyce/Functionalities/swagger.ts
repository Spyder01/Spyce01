import type { Express,Request, Response } from 'express';
import swaggerDoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';


const addSwagger = (app:Express, path:string='/docs')=>{
    const options = {
        swaggerDefinition: {
            info: {
                title: 'Spyce',
                version: '1.0.0',
                description: 'Spyce is a simple API documentation tool',
                contact: {
                    name: 'Spyce',
                },
            }
        },
        apis: ['*.ts, *.js', 'src/*.ts', 'src/*.js, index.ts'],
    };
    const specs = swaggerDoc(options);
    app.use(path, swagger.serve, swagger.setup(specs, {explorer: true}));
    app.get("/docs.json", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(specs);
      });
}


export default addSwagger;