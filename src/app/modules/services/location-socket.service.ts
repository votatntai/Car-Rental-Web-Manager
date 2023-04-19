import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationSocketService {

    private isConnected: boolean = false;
    private hubConnection: HubConnection;

    private _location: BehaviorSubject<any | null> = new BehaviorSubject(null);

    get location$(): Observable<any> {
        return this._location.asObservable();
    }

    constructor() { }

    public async startConnection(): Promise<void> {
        if (!this.isConnected) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('https://api-carrental.azurewebsites.net/locationHub')
                .build();

            await this.hubConnection.start()
                .then(() => {
                    this.isConnected = true;
                    console.log('Connection started');
                })
                .catch(err => console.log('Error while starting connection: ' + err));
        }

    }

    public stopConnection() {
        this.hubConnection.stop().then(() => {
            this.isConnected = false;
        });
    }

    public getLocationUpdates(): Observable<any> {
        this.hubConnection.on('ReceiveLocation', (clientId: string, location: string) => {
            console.log("ReceiveLocation work");
            this._location.next({ clientId, location });
        });
        return this._location.asObservable();
    }

    public sendLocation(location: any): void {
        this.hubConnection.invoke('SendLocation', location);
    }
}