export class Config {

    maximumRadio: number;
    minimumRadio: number;
    timeToListenAnAdvertisement: number;
    minimumReportsToBan: number;

    constructor(data: any = {}) {
        this.maximumRadio = data.maximumRadio || 100;
        this.minimumRadio = data.minimumRadio || 5000;
        this.timeToListenAnAdvertisement = data.timeToListenAnAdvertisement || 5 * 60;
        this.minimumReportsToBan = data.minimumReportsToBan || 15;
    }

    toJSON() {
        return {
            maximumRadio: this.maximumRadio,
            minimumRadio: this.minimumRadio,
            timeToListenAnAdvertisement: this.timeToListenAnAdvertisement,
            minimumReportsToBan: this.minimumReportsToBan
        };
    }

}
