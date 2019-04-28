export class Config {

    maximumRadio: number;
    minimumRadio: number;
    timeToListenAnAdvertisement: number;
    minimumReportsToBan: number;
    maxTimeUserProgressBar: number;

    constructor(data: any = {}) {
        this.maximumRadio = data.maximum_radius || 10000;
        this.minimumRadio = data.minimum_radius || 100;
        this.timeToListenAnAdvertisement = data.time_listen_advertisement || 3;
        this.minimumReportsToBan = data.minimum_reports_ban || 15;
        this.maxTimeUserProgressBar = data.maximum_time_user_progress_bar || 20;
    }

    toJSON() {
        return {
            maximum_radius: this.maximumRadio,
            minimum_radius: this.minimumRadio,
            time_listen_advertisement: this.timeToListenAnAdvertisement,
            minimum_reports_ban: this.minimumReportsToBan,
            maximum_time_user_progress_bar: this.maxTimeUserProgressBar
        };
    }

}
