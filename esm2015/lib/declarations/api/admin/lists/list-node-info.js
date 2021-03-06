import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
let ListNodeInfo = class ListNodeInfo {
    constructor() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
};
tslib_1.__decorate([
    JsonProperty('id', String),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "id", void 0);
tslib_1.__decorate([
    JsonProperty('name', String, true),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "name", void 0);
tslib_1.__decorate([
    JsonProperty('projectIri', String, true),
    tslib_1.__metadata("design:type", String)
], ListNodeInfo.prototype, "projectIri", void 0);
tslib_1.__decorate([
    JsonProperty('isRootNode', Boolean, true),
    tslib_1.__metadata("design:type", Boolean)
], ListNodeInfo.prototype, "isRootNode", void 0);
tslib_1.__decorate([
    JsonProperty('labels', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNodeInfo.prototype, "labels", void 0);
tslib_1.__decorate([
    JsonProperty('comments', [StringLiteral]),
    tslib_1.__metadata("design:type", Array)
], ListNodeInfo.prototype, "comments", void 0);
ListNodeInfo = tslib_1.__decorate([
    JsonObject('ListNodeInfo')
], ListNodeInfo);
export { ListNodeInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1ub2RlLWluZm8uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztJQUd4QyxZQUFZO0lBRHpCO1FBSVcsT0FBRSxHQUFXLFNBQVMsQ0FBQztRQUd2QixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFHL0IsZUFBVSxHQUFZLFNBQVMsQ0FBQztRQUdoQyxXQUFNLEdBQW9CLFNBQVMsQ0FBQztRQUdwQyxhQUFRLEdBQW9CLFNBQVMsQ0FBQztJQUNqRCxDQUFDO0NBQUEsQ0FBQTtBQWhCRztJQURDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDOzt3Q0FDRztBQUc5QjtJQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7MENBQ0g7QUFHaEM7SUFEQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O2dEQUNIO0FBR3RDO0lBREMsWUFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDOztnREFDSDtBQUd2QztJQURDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7NENBQ0c7QUFHM0M7SUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7OzhDQUNHO0FBbEJwQyxZQUFZO0lBRHhCLFVBQVUsQ0FBQyxjQUFjLENBQUM7R0FDZCxZQUFZLENBbUJ4QjtTQW5CWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm8nKVxuZXhwb3J0IGNsYXNzIExpc3ROb2RlSW5mbyB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RJcmknLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lzUm9vdE5vZGUnLCBCb29sZWFuLCB0cnVlKVxuICAgIHB1YmxpYyBpc1Jvb3ROb2RlOiBib29sZWFuID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGFiZWxzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBsYWJlbHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NvbW1lbnRzJywgW1N0cmluZ0xpdGVyYWxdKVxuICAgIHB1YmxpYyBjb21tZW50czogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xufVxuIl19