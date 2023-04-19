import { Pipe, PipeTransform } from '@angular/core';
import { } from "googlemaps";
import { Observable } from 'rxjs';

@Pipe({
    name: 'location'
})
export class LocationPipe implements PipeTransform {

    transform(lat: number, lng: number): Observable<string> {
        const latlng = new google.maps.LatLng(lat, lng);
        const geocoder = new google.maps.Geocoder();
        const request = {
            location: latlng,
        };
        return new Observable(observer => {
            geocoder.geocode(request, (results: google.maps.GeocoderResult[], status: any) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        observer.next(results[0].formatted_address);
                    } else {
                        observer.next('No results found');
                    }
                } else {
                    observer.error('Geocoder failed due to: ' + status);
                }
                observer.complete(); // Gọi observer.complete() khi xử lý xong để tránh lỗi
            });
        });
    }
}
