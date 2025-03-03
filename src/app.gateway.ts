import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;

  notifyTransactionUpdate(content:string) {
    this.server.emit('transactionUpdated', {type: "transaction notification", message: content} );
  }
}
