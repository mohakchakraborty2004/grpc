import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";

const packageDef = protoloader.loadSync("../src/a.proto");
const personproto = grpc.loadPackageDefinition(packageDef);

const PERSON : any[] = [];

// call is like req 
// calback is like res
function addPerson(call : any, callback: any){

    let person = {
        name : call.request.name,
        age : call.request.age
    }

    PERSON.push(person);

    callback(null, person);
}

const server = new grpc.Server();

//@ts-ignore
server.addService(personproto.AddressbookService.service, {
    addPerson : addPerson
})

// this is like app.listen(port) of express 
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
} )