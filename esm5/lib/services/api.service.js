import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { ApiServiceError } from '../declarations/api-service-error';
import { ApiServiceResult } from '../declarations/api-service-result';
import { KuiCoreConfig } from '../declarations/core.config';
import { from } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var jsonld = require('jsonld');
var ApiService = /** @class */ (function () {
    function ApiService(http, config) {
        this.http = http;
        this.config = config;
        // if is loading, set it true;
        // it can be used in components
        // for progress loader element
        this.loading = false;
    }
    /**
     * GET
     *
     * @param {string} path the URL for the GET request.
     * @param {HttpParams} params the parameters for the GET request.
     * @returns Observable of any
     */
    ApiService.prototype.httpGet = function (path, params) {
        var _this = this;
        this.loading = true;
        return this.http.get(this.config.api + path, { observe: 'response', params: params }).pipe(map(function (response) {
            _this.loading = false;
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            return _this.handleRequestError(error);
        }));
    };
    /**
     * Processes JSON-LD returned by Knora.
     * Expands Iris and creates an empty context object.
     *
     * @param {ApiServiceResult} resourceResponse
     */
    ApiService.prototype.processJSONLD = function (resourceResponse) {
        var resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        var resPromise = resPromises.compact(resourceResponse.body, {});
        // convert promise to Observable and return it
        // https://www.learnrxjs.io/operators/creation/frompromise.html
        return from(resPromise);
    };
    /**
     * POST
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    ApiService.prototype.httpPost = function (path, body) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.post(this.config.api + path, body, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * PUT
     *
     * @param {string} path
     * @param {any} body
     * @returns Observable of any
     */
    ApiService.prototype.httpPut = function (path, body) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.put(this.config.api + path, body, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            // console.log(response);
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * DELETE
     *
     * @param {string} path
     * @returns Observable of any
     */
    ApiService.prototype.httpDelete = function (path) {
        var _this = this;
        this.loading = true;
        // const headers = this.setHeaders(); --> this is now done by the interceptor from @knora/authentication
        return this.http.delete(this.config.api + path, { observe: 'response' }).pipe(map(function (response) {
            _this.loading = false;
            // console.log(response);
            var result = new ApiServiceResult();
            result.status = response.status;
            result.statusText = response.statusText;
            result.url = path;
            result.body = response.body;
            return result;
        }), catchError(function (error) {
            _this.loading = false;
            // console.error(error);
            return _this.handleRequestError(error);
        }));
    };
    /**
     * handle request error in case of server error
     *
     * @param {HttpErrorResponse} error
     * @returns Observable of ApiServiceError
     */
    ApiService.prototype.handleRequestError = function (error) {
        // console.error(error);
        var serviceError = new ApiServiceError();
        serviceError.status = error.status;
        serviceError.statusText = error.statusText;
        serviceError.errorInfo = error.message;
        serviceError.url = error.url;
        return throwError(serviceError);
    };
    /**
     * handle json error in case of type error in json response (json2typescript)
     *
     * @param {any} error
     * @returns Observable of ApiServiceError
     */
    ApiService.prototype.handleJsonError = function (error) {
        if (error instanceof ApiServiceError)
            return throwError(error);
        var serviceError = new ApiServiceError();
        serviceError.status = -1;
        serviceError.statusText = 'Invalid JSON';
        serviceError.errorInfo = error;
        serviceError.url = '';
        return throwError(serviceError);
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUE4QyxNQUFNLHNCQUFzQixDQUFDO0FBRTlGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBRzVCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQztJQVVJLG9CQUE2QixJQUFnQixFQUNFLE1BQXFCO1FBRHZDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDRSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBTnBFLDhCQUE4QjtRQUM5QiwrQkFBK0I7UUFDL0IsOEJBQThCO1FBQzlCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFJaEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDRCQUFPLEdBQVAsVUFBUSxJQUFZLEVBQUUsTUFBbUI7UUFBekMsaUJBdUJDO1FBckJHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3BGLEdBQUcsQ0FBQyxVQUFDLFFBQTJCO1lBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLElBQU0sTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUU1QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsVUFBQyxLQUF3QjtZQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVyQixPQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sa0NBQWEsR0FBdkIsVUFBd0IsZ0JBQWtDO1FBRXRELElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEMsMkRBQTJEO1FBQzNELElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWxFLDhDQUE4QztRQUM5QywrREFBK0Q7UUFDL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFNUIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDZCQUFRLEdBQVIsVUFBUyxJQUFZLEVBQUUsSUFBVTtRQUFqQyxpQkEwQkM7UUF4QkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsd0dBQXdHO1FBRXhHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDM0UsR0FBRyxDQUFDLFVBQUMsUUFBMkI7WUFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDeEMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzVCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxVQUFDLEtBQXdCO1lBQ2hDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLHdCQUF3QjtZQUV4QixPQUFPLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBRU4sQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILDRCQUFPLEdBQVAsVUFBUSxJQUFZLEVBQUUsSUFBVTtRQUFoQyxpQkE0QkM7UUExQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsd0dBQXdHO1FBRXhHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUUsR0FBRyxDQUFDLFVBQUMsUUFBMkI7WUFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIseUJBQXlCO1lBRXpCLElBQU0sTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDaEMsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM1QixPQUFPLE1BQU0sQ0FBQztRQUVsQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsVUFBQyxLQUF3QjtZQUNoQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVyQix3QkFBd0I7WUFFeEIsT0FBTyxLQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILCtCQUFVLEdBQVYsVUFBVyxJQUFZO1FBQXZCLGlCQTRCQztRQTFCRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUVwQix3R0FBd0c7UUFFeEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3ZFLEdBQUcsQ0FBQyxVQUFDLFFBQTJCO1lBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBRXJCLHlCQUF5QjtZQUV6QixJQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUIsT0FBTyxNQUFNLENBQUM7UUFFbEIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLFVBQUMsS0FBd0I7WUFDaEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsd0JBQXdCO1lBRXhCLE9BQU8sS0FBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBR0Q7Ozs7O09BS0c7SUFDTyx1Q0FBa0IsR0FBNUIsVUFBNkIsS0FBd0I7UUFDakQsd0JBQXdCO1FBQ3hCLElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDM0MsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25DLFlBQVksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdkMsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzdCLE9BQU8sVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLG9DQUFlLEdBQXpCLFVBQTBCLEtBQVU7UUFFaEMsSUFBSSxLQUFLLFlBQVksZUFBZTtZQUFFLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELElBQU0sWUFBWSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7UUFDM0MsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN6QixZQUFZLENBQUMsVUFBVSxHQUFHLGNBQWMsQ0FBQztRQUN6QyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMvQixZQUFZLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVwQyxDQUFDOztnQkE5TUosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7O2dCQWRRLFVBQVU7Z0JBTVYsYUFBYSx1QkFpQkssTUFBTSxTQUFDLFFBQVE7OztxQkF4QjFDO0NBc1RDLEFBelNELElBeVNDO1NBdFNxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvcic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IgfSBmcm9tICcuLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3InO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvLyBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAvLyBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgLy8gZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCB0aGUgVVJMIGZvciB0aGUgR0VUIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtIdHRwUGFyYW1zfSBwYXJhbXMgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBHRVQgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBHZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBIdHRwUGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHtvYnNlcnZlOiAncmVzcG9uc2UnLCBwYXJhbXM6IHBhcmFtc30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIEpTT04tTEQgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogRXhwYW5kcyBJcmlzIGFuZCBjcmVhdGVzIGFuIGVtcHR5IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NKU09OTEQocmVzb3VyY2VSZXNwb25zZTogQXBpU2VydmljZVJlc3VsdCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgY29uc3QgcmVzUHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgIGNvbnN0IHJlc1Byb21pc2UgPSByZXNQcm9taXNlcy5jb21wYWN0KHJlc291cmNlUmVzcG9uc2UuYm9keSwge30pO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgIHJldHVybiBmcm9tKHJlc1Byb21pc2UpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gYm9keVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBQdXQocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBlcnJvclxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgQXBpU2VydmljZUVycm9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iXX0=