/**
 * Represents an image including its regions.
 */
export class StillImageRepresentation {
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    constructor(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL3N0aWxsLWltYWdlLXJlcHJlc2VudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBOztHQUVHO0FBRUgsTUFBTTtJQUVGOzs7O09BSUc7SUFDSCxZQUFxQixtQkFBNEMsRUFBVyxPQUFzQjtRQUE3RSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXlCO1FBQVcsWUFBTyxHQUFQLE9BQU8sQ0FBZTtJQUVsRyxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBJbWFnZVJlZ2lvbiB9IGZyb20gJy4vaW1hZ2UtcmVnaW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGltYWdlIGluY2x1ZGluZyBpdHMgcmVnaW9ucy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZX0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHtJbWFnZVJlZ2lvbltdfSByZWdpb25zIHRoZSByZWdpb25zIGJlbG9uZ2luZyB0byB0aGUgaW1hZ2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIHJlYWRvbmx5IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10pIHtcblxuICAgIH1cblxufVxuIl19