/**
 * Collection of useful utility functions.
 */
import { KnoraConstants } from './api/knora-constants';
// @dynamic
export class Utils {
    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    static getOntologyIriFromEntityIri(entityIri) {
        // split class Iri on "#"
        const segments = entityIri.split(KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error(`Error: ${entityIri} is not a valid entity IRI.`);
        return segments[0];
    }
    /**
     * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
     *
     * @param {string} complexEntityIri
     * @returns {string}
     */
    static convertComplexKnoraApiEntityIritoSimple(complexEntityIri) {
        // split entity Iri on "#"
        const segments = complexEntityIri.split('v2' + KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error(`Error: ${complexEntityIri} is not a valid entity IRI.`);
        // add 'simple' to base path
        return segments[0] + 'simple/v2' + KnoraConstants.PathSeparator + segments[1];
    }
}
/**
 * A regex to validate Emails.
 *
 * @type {RegExp}
 */
Utils.RegexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
/**
 * A regex to validate URLs.
 *
 * @type {RegExp}
 */
Utils.RegexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/i;
/**
 * A regex to validate Passwords
 *
 * @type {RegExp}
 */
Utils.RegexPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/i;
/**
 * A regex to validate Hexadecimal values
 *
 * @type {RegExp}
 */
Utils.RegexHex = /^[0-9A-Fa-f]+$/;
/**
 * A regex to validate shortname in projects
 *
 * @type {RegExp}
 */
Utils.RegexShortname = /^[a-zA-Z]+\S*$/;
/**
 * Lambda function eliminating duplicates in a collection to be passed to [[filter]].
 *
 * @param elem element of an Array that is currently being looked at.
 * @param index current elements index.
 * @param self reference to the whole Array.
 * @returns {boolean} true if the same element does not already exist in the Array.
 */
Utils.filterOutDuplicates = (elem, index, self) => {
    // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example
    // returns true if the element's index equals the index of the leftmost element
    // -> this means that there is no identical element before this index, hence it is not a duplicate
    // for all other elements, false is returned
    return index === self.indexOf(elem);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kZWNsYXJhdGlvbnMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFckQsV0FBVztBQUNYLE1BQU07SUF3REY7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsMkJBQTJCLENBQUMsU0FBaUI7UUFFdkQseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXpFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLFNBQVMsNkJBQTZCLENBQUMsQ0FBQztRQUUzRixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxnQkFBd0I7UUFFMUUsMEJBQTBCO1FBQzFCLE1BQU0sUUFBUSxHQUFhLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXZGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO1lBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLGdCQUFnQiw2QkFBNkIsQ0FBQyxDQUFDO1FBRWxHLDRCQUE0QjtRQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxjQUFjLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVsRixDQUFDOztBQXhGRDs7OztHQUlHO0FBQ29CLGdCQUFVLEdBQUcsd0hBQXdILENBQUM7QUFFN0o7Ozs7R0FJRztBQUNvQixjQUFRLEdBQUcsMEhBQTBILENBQUM7QUFFN0o7Ozs7R0FJRztBQUNvQixtQkFBYSxHQUFHLGdDQUFnQyxDQUFDO0FBRXhFOzs7O0dBSUc7QUFDb0IsY0FBUSxHQUFHLGdCQUFnQixDQUFDO0FBRW5EOzs7O0dBSUc7QUFDb0Isb0JBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUd6RDs7Ozs7OztHQU9HO0FBQ1cseUJBQW1CLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBYSxFQUFFLElBQUksRUFBRSxFQUFFO0lBRTlELHVGQUF1RjtJQUN2RiwwR0FBMEc7SUFFMUcsK0VBQStFO0lBQy9FLGtHQUFrRztJQUNsRyw0Q0FBNEM7SUFDNUMsTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29sbGVjdGlvbiBvZiB1c2VmdWwgdXRpbGl0eSBmdW5jdGlvbnMuXG4gKi9cbmltcG9ydCB7S25vcmFDb25zdGFudHN9IGZyb20gJy4vYXBpL2tub3JhLWNvbnN0YW50cyc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgRW1haWxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4RW1haWwgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVUkxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXJsID0gL14oaHR0cDpcXC9cXC93d3dcXC58aHR0cHM6XFwvXFwvd3d3XFwufGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcLyk/W2EtejAtOV0rKFtcXC1cXC5dezF9W2EtejAtOV0rKSpcXC5bYS16XXsyLDZ9KDpbMC05XXsxLDV9KT8oXFwvLiopPyQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgUGFzc3dvcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhQYXNzd29yZCA9IC9eKD89LipcXGQpKD89LipbYS16QS1aXSkuezgsfSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgSGV4YWRlY2ltYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhIZXggPSAvXlswLTlBLUZhLWZdKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBzaG9ydG5hbWUgaW4gcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFNob3J0bmFtZSA9IC9eW2EtekEtWl0rXFxTKiQvO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYW1iZGEgZnVuY3Rpb24gZWxpbWluYXRpbmcgZHVwbGljYXRlcyBpbiBhIGNvbGxlY3Rpb24gdG8gYmUgcGFzc2VkIHRvIFtbZmlsdGVyXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbSBlbGVtZW50IG9mIGFuIEFycmF5IHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGxvb2tlZCBhdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggY3VycmVudCBlbGVtZW50cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gc2VsZiByZWZlcmVuY2UgdG8gdGhlIHdob2xlIEFycmF5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzYW1lIGVsZW1lbnQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBpbiB0aGUgQXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJPdXREdXBsaWNhdGVzID0gKGVsZW0sIGluZGV4OiBudW1iZXIsIHNlbGYpID0+IHtcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc0Nzc5OC9kZWxldGUtZHVwbGljYXRlLWVsZW1lbnRzLWZyb20tYW4tYXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyP3Y9ZXhhbXBsZVxuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCdzIGluZGV4IGVxdWFscyB0aGUgaW5kZXggb2YgdGhlIGxlZnRtb3N0IGVsZW1lbnRcbiAgICAgICAgLy8gLT4gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIG5vIGlkZW50aWNhbCBlbGVtZW50IGJlZm9yZSB0aGlzIGluZGV4LCBoZW5jZSBpdCBpcyBub3QgYSBkdXBsaWNhdGVcbiAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBlbGVtZW50cywgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEdpdmVuIGEgS25vcmEgZW50aXR5IElSSSwgZ2V0cyB0aGUgb250b2xvZ3kgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVudGl0eUlyaSBhbiBlbnRpdHkgSXJpLlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIG9udG9sb2d5IElSSVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKGVudGl0eUlyaTogc3RyaW5nKSB7XG5cbiAgICAgICAgLy8gc3BsaXQgY2xhc3MgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGVudGl0eUlyaS5zcGxpdChLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yKTtcblxuICAgICAgICBpZiAoc2VnbWVudHMubGVuZ3RoICE9PSAyKSBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzWzBdO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBjb21wbGV4IGtub3JhLWFwaSBlbnRpdHkgSXJpIHRvIGEga25vcmEtYXBpIHNpbXBsZSBlbnRpdHkgSXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbXBsZXhFbnRpdHlJcmlcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKGNvbXBsZXhFbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGVudGl0eSBJcmkgb24gXCIjXCJcbiAgICAgICAgY29uc3Qgc2VnbWVudHM6IHN0cmluZ1tdID0gY29tcGxleEVudGl0eUlyaS5zcGxpdCgndjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7Y29tcGxleEVudGl0eUlyaX0gaXMgbm90IGEgdmFsaWQgZW50aXR5IElSSS5gKTtcblxuICAgICAgICAvLyBhZGQgJ3NpbXBsZScgdG8gYmFzZSBwYXRoXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXSArICdzaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvciArIHNlZ21lbnRzWzFdO1xuXG4gICAgfVxuXG5cbn1cbiJdfQ==