import { MySignals } from 'src/app/shared/services/my-signals';
import { UserService } from 'src/app/shared/services/model-service/user.service';


import { Injectable, NgModule, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SOCKET_ROOT_URL } from '../../config';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';



@Injectable()
export class PushSocket extends Socket {
    user: User;

    constructor(
        private userService: UserService
    ) {
        super({
            url: SOCKET_ROOT_URL, options: {
                withCredentials: true,
                auth: userService?.token?.token, // authenticate with the user token
                polling: {
                    extraHeaders: {
                        'x-clientid': 'abc', // TODO: set client id with phone id
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            }
        });
    }

}


@Injectable()
export class PushSocketService {

    private pushSource = new Subject<string>();
    pushSource$ = this.pushSource.asObservable();

    user: User;
    channels = ['announcement', 'update'];

    currentSocketId = '';
    retry: any;

    /**
     *
     */
    constructor(
        private socket: PushSocket,
        private userService: UserService,
        private signals: MySignals) {

        this.userService.getUserLocal().then(user => {
            this.user = user;
            this.init();
        }, error => {
            this.init();
        });


    }

    // sendMessage(msg: string) {
    //     this.socket.emit('message', msg);
    // }

    // getMessage() {
    //     return this.socket
    //         .fromEvent<any>('message').pipe(map(data => {
    //             this.pushSource.next(data.message); // broadcast the message for subscription
    //             console.log(data);
    //             return data.msg;
    //         }));
    // }


    init() {

        /****
         * HANDLING EVENTS
         */

        /**
         * CONNECTION SUCCESSFUL
         */
        this.socket.on('connect', () => {
            this.socket.removeListener(`verification${this.currentSocketId}`); // prevent duplication
            this.socket.removeListener(`channels${this.currentSocketId}`); // prevent duplication

            this.currentSocketId = this.socket.ioSocket.id;
            // Wait for verification | authentication
            this.socket.on(`verification${this.currentSocketId}`, (remoteId) => {
                console.log('Verification remote:', remoteId);
                console.log('Verification local:', this.currentSocketId);
                setTimeout(() => {
                    if (this.currentSocketId === remoteId) {
                        // alert('Testing');
                        // send user token
                        this.socket.emit(`verification${this.currentSocketId}`, { token: this.userService?.token?.token });
                    } else {
                        this.currentSocketId = '';
                        this.socket.disconnect();
                    }
                }, 2000);
            });

            // this.socket.on(`channels${this.currentSocketId}`, (channels) => {
            //     // console.log(channels);
            //     this.channels = channels;
            //     if (this.channels.length > 0) {
            //         if (this.channels !== channels) { // new incoming channels
            //             // remove all previous channels subscriptions
            //             this.clearChannelsSubscription();
            //         }
            //         this.subscribeToChannels(); // subscribing to the new channels;
            //     }
            // });

            this.socket.on(`channels-reload${this.currentSocketId}`, (chnls) => {
                // console.log(channels);
                const channels = [...this.channels];
                if (channels.length > 0) {
                    if (this.channels !== channels) { // new incoming channels
                        // remove all previous channels subscriptions
                        this.clearChannelsSubscription();
                        this.subscribeToChannels(); // subscribing to the new channels;
                    } else {
                        this.subscribeToChannels();
                    }
                }
            });

            clearInterval(this.retry);
        });






        /*****
         * CONNECTION ERROR
         */
        this.socket.on('connect_error', (erro) => {
            console.log('Retrying');
            // console.log(erro);
            setTimeout(() => {
                this.socket.connect(); // wait for 1 second and retry
            }, 1000);
        });



        /**
         * CONNECTION TERMINATED
         */
        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
            this.socket.disconnect(true);
            this.retry = setInterval(() => {
                this.socket.connect();
            }, 5000); // retry after every 5seconds
        });

        this.socket.connect(); // Triggers first connection
    }



    subscribeToChannels() {
        const retry = setInterval(() => {
            console.log('Retrying to establish connection');
            if (this.socket.ioSocket.readyState !== 'open') {
                this.channels.forEach(ch => {
                    this.socket.ioSocket.on(ch, (message) => {
                        console.log('Listening on channel: ', ch);
                        this.signals.announceNewSocketPushMessage(message);
                    });
                });
                clearInterval(retry); // stop connecting
            }
        }, 5000); // retry after every 5seconds
    }

    clearChannelsSubscription() {
        this.channels.forEach(ch => {
            this.socket.ioSocket.removeListener(ch);
        });
    }





}
