import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
let ListInfo = class ListInfo {
    constructor() {
        this.id = undefined;
        this.projectIri = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('id', String, false),
    tslib_1.__metadata("design:type", String)
], ListInfo.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('projectIri', String, false),
    tslib_1.__metadata("design:type", String)
], ListInfo.prototype, "projectIri", void 0);
tslib_1.__decorate([
    JsonProperty('labels', [StringLiteral], true),
    tslib_1.__metadata("design:type", Array)
], ListInfo.prototype, "labels", void 0);
tslib_1.__decorate([
    JsonProperty('comments', [StringLiteral], true),
    tslib_1.__metadata("design:type", Array)
], ListInfo.prototype, "comments", void 0);
ListInfo = tslib_1.__decorate([
    JsonObject('ListInfo')
], ListInfo);
export { ListInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pbmZvLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2NvcmUvIiwic291cmNlcyI6WyJsaWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0lBR3hDLFFBQVE7SUFEckI7UUFJVyxPQUFFLEdBQVcsU0FBUyxDQUFDO1FBR3ZCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFHL0IsV0FBTSxHQUFvQixTQUFTLENBQUM7UUFHcEMsYUFBUSxHQUFvQixTQUFTLENBQUM7SUFDakQsQ0FBQztDQUFBLENBQUE7QUFWRztJQURDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7b0NBQ0o7QUFHOUI7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7OzRDQUNKO0FBR3RDO0lBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQzs7d0NBQ0g7QUFHM0M7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDOzswQ0FDSDtBQVpwQyxRQUFRO0lBRHBCLFVBQVUsQ0FBQyxVQUFVLENBQUM7R0FDVixRQUFRLENBYXBCO1NBYlksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBTdHJpbmdMaXRlcmFsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0cmluZ3MnO1xuXG5ASnNvbk9iamVjdCgnTGlzdEluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBwcm9qZWN0SXJpOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0sIHRydWUpXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iXX0=