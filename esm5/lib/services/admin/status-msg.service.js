import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { KuiCoreConfig } from '../../declarations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var StatusMsgService = /** @class */ (function () {
    function StatusMsgService(_http, config) {
        this._http = _http;
        this.config = config;
    }
    /**
    * this method get the status messages from the statusMsg.json file
    * which are defined here: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    * and here: http://www.w3schools.com/tags/ref_httpmessages.asp
    *
    */
    StatusMsgService.prototype.getStatusMsg = function () {
        return this._http.get(this.config.app + '/assets/i18n/statusMsg.json')
            .pipe(map(function (res) {
            return res;
        }, function (err) {
            console.error(err);
        }));
    };
    ;
    StatusMsgService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    StatusMsgService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StatusMsgService.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: StatusMsgService, providedIn: "root" });
    return StatusMsgService;
}());
export { StatusMsgService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLW1zZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7QUFFbkQ7SUFLRSwwQkFBb0IsS0FBaUIsRUFDVixNQUFxQjtRQUQ1QixVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUNoRCxDQUFDO0lBRUQ7Ozs7O01BS0U7SUFDRix1Q0FBWSxHQUFaO1FBRUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLDZCQUE2QixDQUFDO2FBQ25FLElBQUksQ0FBQyxHQUFHLENBQ1AsVUFBQyxHQUFRO1lBQ1AsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFDRCxVQUFBLEdBQUc7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUNBLENBQUM7SUFFTixDQUFDO0lBQUEsQ0FBQzs7Z0JBNUJILFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBUlEsVUFBVTtnQkFJVixhQUFhLHVCQVFqQixNQUFNLFNBQUMsUUFBUTs7OzJCQWJwQjtDQW9DQyxBQTdCRCxJQTZCQztTQTFCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2dTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcpIHtcbiAgfVxuXG4gIC8qKlxuICAqIHRoaXMgbWV0aG9kIGdldCB0aGUgc3RhdHVzIG1lc3NhZ2VzIGZyb20gdGhlIHN0YXR1c01zZy5qc29uIGZpbGVcbiAgKiB3aGljaCBhcmUgZGVmaW5lZCBoZXJlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzXG4gICogYW5kIGhlcmU6IGh0dHA6Ly93d3cudzNzY2hvb2xzLmNvbS90YWdzL3JlZl9odHRwbWVzc2FnZXMuYXNwXG4gICpcbiAgKi9cbiAgZ2V0U3RhdHVzTXNnKCk6IE9ic2VydmFibGU8YW55PiB7XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5jb25maWcuYXBwICsgJy9hc3NldHMvaTE4bi9zdGF0dXNNc2cuanNvbicpXG4gICAgICAucGlwZShtYXAoXG4gICAgICAgIChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgICApO1xuXG4gIH07XG59XG4iXX0=