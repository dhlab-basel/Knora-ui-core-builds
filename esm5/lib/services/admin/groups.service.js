import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { GroupResponse, GroupsResponse } from '../../declarations/';
import { ApiService } from '../api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var GroupsService = /** @class */ (function (_super) {
    tslib_1.__extends(GroupsService, _super);
    function GroupsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/groups';
        return _this;
    }
    /**
     * Return a list of all groups.
     *
     * @returns Observable<Group[]>
     */
    GroupsService.prototype.getAllGroups = function () {
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupsResponse).groups; }), catchError(this.handleJsonError));
    };
    /**
     * Return a group object (filter by IRI).
     *
     * @param {string} iri
     * @returns Observable<Group>
     */
    GroupsService.prototype.getGroupByIri = function (iri) {
        this.path += '/' + encodeURIComponent(iri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(GroupResponse).group; }), catchError(this.handleJsonError));
    };
    GroupsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    GroupsService.ngInjectableDef = i0.defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(i0.inject(i1.HttpClient), i0.inject("config")); }, token: GroupsService, providedIn: "root" });
    return GroupsService;
}(ApiService));
export { GroupsService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hZG1pbi9ncm91cHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBMkIsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTVDO0lBR21DLHlDQUFVO0lBSDdDO1FBQUEscUVBa0NDO1FBN0JXLFVBQUksR0FBVyxlQUFlLENBQUM7O0tBNkIxQztJQTNCRzs7OztPQUlHO0lBQ0gsb0NBQVksR0FBWjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQy9CLEdBQUcsQ0FBQyxVQUFDLE1BQXdCLElBQUssT0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBckMsQ0FBcUMsQ0FBQyxFQUN4RSxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUNuQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUNBQWEsR0FBYixVQUFjLEdBQVc7UUFDckIsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDL0IsR0FBRyxDQUFDLFVBQUMsTUFBd0IsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFuQyxDQUFtQyxDQUFDLEVBQ3RFLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ25DLENBQUM7SUFDTixDQUFDOztnQkFoQ0osVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7O3dCQVJEO0NBd0NDLEFBbENELENBR21DLFVBQVUsR0ErQjVDO1NBL0JZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JvdXBzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBwYXRoOiBzdHJpbmcgPSAnL2FkbWluL2dyb3Vwcyc7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGFsbCBncm91cHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwW10+XG4gICAgICovXG4gICAgZ2V0QWxsR3JvdXBzKCk6IE9ic2VydmFibGU8R3JvdXBbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cHNSZXNwb25zZSkuZ3JvdXBzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgZ3JvdXAgb2JqZWN0IChmaWx0ZXIgYnkgSVJJKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEdyb3VwPlxuICAgICAqL1xuICAgIGdldEdyb3VwQnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEdyb3VwPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShHcm91cFJlc3BvbnNlKS5ncm91cCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19