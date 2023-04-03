import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarRegistration } from '../../car-registration.type';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-car-information',
    templateUrl: 'car-information.component.html'
})

export class CarInformationComponent implements OnInit {

    private hubConnection: HubConnection;
    private locationSubject: Subject<any> = new Subject<any>();

    carRegistration: CarRegistration;
    location: any = {
        carId: '3087f92b-689e-49f8-ae67-c03f3db3b3c7',
        longitude: 12.02312313,
        latitude: 0
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CarRegistration,
        public matDialogRef: MatDialogRef<CarInformationComponent>,
    ) { }

    async ngOnInit() {
        this.carRegistration = this.data;

        await this.startConnection();
        this.getLocationUpdates().subscribe(result => {
            console.log(result);
        })
        this.sendLocation(this.location);
    }

    public async startConnection(): Promise<void> {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7277/locationHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

        await this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

















    public getLocationUpdates(): Observable<any> {
        this.hubConnection.on('ReceiveLocation', (clientId: string, location: string) => {
            console.log("ReceiveLocation work");
            console.log(location);
            this.locationSubject.next({ clientId, location });
        });

        return this.locationSubject.asObservable();
    }

    public sendLocation(location: any): void {
        console.log(location);
        this.hubConnection.invoke('SendLocation', location);
    }
}