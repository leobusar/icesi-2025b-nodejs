import express, {Express, Request, Response } from  'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { readFile } from 'fs/promises';

import {db} from './config/connectionDB';
import {userRouter} from './routes/index';
import { resolvers } from './graphql/resolvers';


const app: Express = express();

process.loadEnvFile();

//console.log(process.env.PORT);
const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**  Define schema
const typeDefs = `#graphql 
    type Query {
        hello: String
    }
`;

// Define resolvers
const resolvers =  {
    Query: {
        hello: () => 'Hello, world',
    },
};
*/
let typeDefs = await readFile('./src/graphql/schema.graphql', 'utf-8');

const  apolloServer  =  new ApolloServer({
    typeDefs,
    resolvers
})

await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

app.use('/api/users', userRouter.router);

app.get("/", (req: Request, res: Response) => {
    res.send('Hola Mundo');
}); 

db.then ( () => 
    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}`); 
    }) 
)
