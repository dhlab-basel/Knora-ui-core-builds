import { KnoraConstants, ReadBooleanValue, ReadColorValue, ReadDateValue, ReadDecimalValue, ReadGeomValue, ReadIntegerValue, ReadIntervalValue, ReadLinkValue, ReadListValue, ReadResource, ReadResourcesSequence, ReadStillImageFileValue, ReadTextFileValue, ReadTextValueAsHtml, ReadTextValueAsString, ReadTextValueAsXml, ReadUriValue, Utils } from '../../declarations';
/**
 * Contains methods to convert JSON-LD representing resources and properties to classes.
 * These methods works only for instances of resources and properties, not for ontologies (data model).
 */
export var ConvertJSONLD;
(function (ConvertJSONLD) {
    /**
     * Function to be passed to a filter used on an array of property names
     * sorting out all non value property names.
     *
     * Gets all property names that refer to value objects.
     *
     * @param propName the name of a property to be checked.
     * @returns Boolean indicating if the name refers to a value property.
     */
    const getPropertyNames = (propName) => {
        return propName !== '@id'
            && propName !== '@type'
            && propName !== KnoraConstants.RdfsLabel
            && propName !== KnoraConstants.attachedToProject
            && propName !== KnoraConstants.attachedToUser
            && propName !== KnoraConstants.creationDate
            && propName !== KnoraConstants.lastModificationDate
            && propName !== KnoraConstants.hasPermissions;
    };
    /**
     * Constructs a [[ReadResource]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD an a resource and its properties serialized as JSON-LD.
     * @returns ReadResource
     */
    function constructReadResource(resourceJSONLD) {
        const properties = constructReadProperties(resourceJSONLD);
        return new ReadResource(resourceJSONLD['@id'], resourceJSONLD['@type'], resourceJSONLD[KnoraConstants.RdfsLabel], [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        [], // to be updated once another request has been made
        properties);
    }
    /**
     * Constructs a [[ReadPropertyItem]] from JSON-LD,
     * taking into account the property's value type.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {Object} propValue the value serialized as JSON-LD.
     * @param {string} propIri the Iri of the property.
     * @param {ReadLinkValue[]} standoffLinkValues standoffLinkValues of the resource. Text values may contain links to other resources.
     * @returns a [[ReadPropertyItem]] or `undefined` in case the value could not be processed correctly.
     */
    function createValueSpecificProp(propValue, propIri, standoffLinkValues) {
        // convert a JSON-LD property value to a `ReadPropertyItem`
        let valueSpecificProp;
        // check for the property's value type
        switch (propValue['@type']) {
            case KnoraConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                let textValue;
                if (propValue[KnoraConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                }
                else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                    const referredResources = {};
                    // check for standoff links and include referred resources, if any
                    // when the user interacts with a standoff link, further information about the referred resource can be shown
                    for (const standoffLink of standoffLinkValues) {
                        const referredRes = standoffLink.referredResource;
                        referredResources[referredRes.id] = referredRes;
                    }
                    textValue = new ReadTextValueAsHtml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsHtml], referredResources);
                }
                else if (propValue[KnoraConstants.textValueAsXml] !== undefined && propValue[KnoraConstants.textValueHasMapping]['@id'] !== undefined) {
                    textValue = new ReadTextValueAsXml(propValue['@id'], propIri, propValue[KnoraConstants.textValueAsXml], propValue[KnoraConstants.textValueHasMapping]['@id']);
                }
                else {
                    // expected text value members not defined
                    console.error('ERROR: Invalid text value: ' + JSON.stringify(propValue));
                }
                valueSpecificProp = textValue;
                break;
            case KnoraConstants.DateValue:
                const dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                valueSpecificProp = dateValue;
                break;
            case KnoraConstants.LinkValue:
                let linkValue;
                // check if the referred resource is given as an object or just as an IRI
                if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object
                    const referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                }
                else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri
                    const referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                }
                else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object
                    const incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                }
                else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri
                    const incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }
                valueSpecificProp = linkValue;
                break;
            case KnoraConstants.IntValue:
                const intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;
                break;
            case KnoraConstants.DecimalValue:
                // a decimal value is represented as a string in order to preserve its precision
                const decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                const decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;
                break;
            case KnoraConstants.StillImageFileValue:
                const stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                valueSpecificProp = stillImageFileValue;
                break;
            case KnoraConstants.TextFileValue:
                const textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                valueSpecificProp = textFileValue;
                break;
            case KnoraConstants.ColorValue:
                const readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                valueSpecificProp = readColorValue;
                break;
            case KnoraConstants.GeomValue:
                const readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                valueSpecificProp = readGeomValue;
                break;
            case KnoraConstants.UriValue:
                const uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                valueSpecificProp = uriValue;
                break;
            case KnoraConstants.BooleanValue:
                const boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                valueSpecificProp = boolValue;
                break;
            case KnoraConstants.IntervalValue:
                // represented as strings to preserve precision
                const intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                const intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                const intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                valueSpecificProp = intervalValue;
                break;
            case KnoraConstants.ListValue:
                const listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
                valueSpecificProp = listValue;
                break;
            default:
                // unsupported value type
                console.error('ERROR: value type not implemented yet: ' + propValue['@type']);
                break;
        }
        return valueSpecificProp;
    }
    /**
     * Construct a [[ReadProperties]] from JSON-LD.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD an object describing the resource and its properties.
     * @returns ReadProperties
     */
    function constructReadProperties(resourceJSONLD) {
        // JSON-LD representing standoff link values
        // text values may contain standoff links
        const standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
        // to be populated with standoff link values
        const standoffLinkValues = [];
        // convert each standoff link value JSON-LD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            for (const standoffLinkJSONLD of standoffLinkValuesJSONLD) {
                const standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                standoffLinkValues.push(standoffVal);
            }
        }
        else if (standoffLinkValuesJSONLD !== undefined) {
            const standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
            standoffLinkValues.push(standoffVal);
        }
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const properties = {};
        // iterate over all the given property names
        for (const propName of propNames) {
            const propValues = [];
            // either an array of values or just one value is given
            if (Array.isArray(resourceJSONLD[propName])) {
                // array of values
                // for each property name, an array of property values is given, iterate over it
                for (const propValue of resourceJSONLD[propName]) {
                    // convert a JSON-LD property value to a `ReadPropertyItem`
                    const valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined)
                        propValues.push(valueSpecificProp);
                }
            }
            else {
                // only one value
                const valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                // if it is undefined, the value could not be constructed correctly
                // add the property value to the array of property values
                if (valueSpecificProp !== undefined)
                    propValues.push(valueSpecificProp);
            }
            // add the property to the properties object
            properties[propName] = propValues;
        }
        return properties;
    }
    /**
     * Turns an API response in JSON-LD representing a sequence of resources into a [[ReadResourcesSequence]].
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourcesResponseJSONLD a resource or a sequence of resources, represented as a JSON-LD object.
     * @returns ReadResourcesSequence - sequence of read resources
     */
    function createReadResourcesSequenceFromJsonLD(resourcesResponseJSONLD) {
        const resources = [];
        let numberOfResources;
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;
            for (const resourceJSONLD of resourcesGraph) {
                const resource = constructReadResource(resourceJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        else {
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                // empty answer, no resources given
                numberOfResources = 0;
            }
            else {
                // only one resource
                numberOfResources = 1;
                const resource = constructReadResource(resourcesResponseJSONLD);
                // add the resource to the resources array
                resources.push(resource);
            }
        }
        return new ReadResourcesSequence(resources, numberOfResources);
    }
    ConvertJSONLD.createReadResourcesSequenceFromJsonLD = createReadResourcesSequenceFromJsonLD;
    /**
     * Collects all the types (classes) of referred resources from a given resource (from its linking properties).
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param {object} resourceJSONLD JSON-LD describing one resource.
     * @return string[] - an Array of resource class Iris (including duplicates).
     */
    function getReferredResourceClasses(resourceJSONLD) {
        let propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        const referredResourceClasses = [];
        for (const prop of propNames) {
            // several values given for this property
            if (Array.isArray(resourceJSONLD[prop])) {
                for (const referredRes of resourceJSONLD[prop]) {
                    // if the property is a LinkValue and it contains an embedded resource, get its type
                    if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasTarget] !== undefined) {
                        // target resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasTarget]['@type']);
                    }
                    else if (referredRes['@type'] === KnoraConstants.LinkValue && referredRes[KnoraConstants.linkValueHasSource] !== undefined) {
                        // source resource is represented
                        referredResourceClasses.push(referredRes[KnoraConstants.linkValueHasSource]['@type']);
                    }
                }
            }
            else {
                // only one value given for this property
                // if the property is a LinkValue and it contains an embedded resource, get its type
                if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]
                    !== undefined) {
                    // target resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasTarget]['@type']);
                }
                else if (resourceJSONLD[prop]['@type']
                    === KnoraConstants.LinkValue && resourceJSONLD[prop][KnoraConstants.linkValueHasSource]
                    !== undefined) {
                    // source resource is represented
                    referredResourceClasses.push(resourceJSONLD[prop][KnoraConstants.linkValueHasSource]['@type']);
                }
            }
        }
        return referredResourceClasses;
    }
    /**
     * Gets the resource types (classes) from a JSON-LD representing a sequence of resources.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param resourcesResponseJSONLD a sequence of resources, represented as a JSON-LD object.
     * @returns string[] - the resource class Iris (without duplicates).
     */
    function getResourceClassesFromJsonLD(resourcesResponseJSONLD) {
        const resourcesGraph = resourcesResponseJSONLD['@graph'];
        let resourceClasses = [];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            for (const resourceJSONLD of resourcesGraph) {
                // get class of the current resource
                resourceClasses.push(resourceJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        else {
            // only one resource
            if (Object.keys(resourcesResponseJSONLD).length === 0) {
                return [];
            }
            else {
                resourceClasses.push(resourcesResponseJSONLD['@type']);
                // get the classes of referred resources
                const referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
})(ConvertJSONLD || (ConvertJSONLD = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydC1qc29ubGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa25vcmEvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy92Mi9jb252ZXJ0LWpzb25sZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0gsY0FBYyxFQUNkLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsYUFBYSxFQUdiLFlBQVksRUFDWixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixZQUFZLEVBRVosS0FBSyxFQUNSLE1BQU0sb0JBQW9CLENBQUM7QUFFNUI7OztHQUdHO0FBQ0gsTUFBTSxLQUFRLGFBQWEsQ0FrZ0IxQjtBQWxnQkQsV0FBYyxhQUFhO0lBRXZCOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxRQUFRLEtBQUssS0FBSztlQUNsQixRQUFRLEtBQUssT0FBTztlQUNwQixRQUFRLEtBQUssY0FBYyxDQUFDLFNBQVM7ZUFDckMsUUFBUSxLQUFLLGNBQWMsQ0FBQyxpQkFBaUI7ZUFDN0MsUUFBUSxLQUFLLGNBQWMsQ0FBQyxjQUFjO2VBQzFDLFFBQVEsS0FBSyxjQUFjLENBQUMsWUFBWTtlQUN4QyxRQUFRLEtBQUssY0FBYyxDQUFDLG9CQUFvQjtlQUNoRCxRQUFRLEtBQUssY0FBYyxDQUFDLGNBQWMsQ0FBQztJQUN0RCxDQUFDLENBQUM7SUFHRjs7Ozs7O09BTUc7SUFDSCwrQkFBK0IsY0FBc0I7UUFFakQsTUFBTSxVQUFVLEdBQW1CLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTNFLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FDbkIsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUNyQixjQUFjLENBQUMsT0FBTyxDQUFDLEVBQ3ZCLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQ3hDLEVBQUUsRUFBRSxtREFBbUQ7UUFDdkQsRUFBRSxFQUFFLG1EQUFtRDtRQUN2RCxFQUFFLEVBQUUsbURBQW1EO1FBQ3ZELEVBQUUsRUFBRSxtREFBbUQ7UUFDdkQsVUFBVSxDQUNiLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsaUNBQ0ksU0FBaUIsRUFBRSxPQUFlLEVBQUUsa0JBQW1DO1FBRXZFLDJEQUEyRDtRQUUzRCxJQUFJLGlCQUFtQyxDQUFDO1FBRXhDLHNDQUFzQztRQUN0QyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssY0FBYyxDQUFDLFNBQVM7Z0JBQ3pCLDREQUE0RDtnQkFDNUQsSUFBSSxTQUEyQixDQUFDO2dCQUVoQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELFNBQVMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM5RyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBRWpFLE1BQU0saUJBQWlCLEdBQW9DLEVBQUUsQ0FBQztvQkFFOUQsa0VBQWtFO29CQUNsRSw2R0FBNkc7b0JBQzdHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sWUFBWSxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQzt3QkFDNUMsTUFBTSxXQUFXLEdBQWlCLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDaEUsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztvQkFDcEQsQ0FBQztvQkFFRCxTQUFTLEdBQUcsSUFBSSxtQkFBbUIsQ0FDL0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLGlCQUFpQixDQUMxRixDQUFDO2dCQUNOLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNOLFNBQVMsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUMvSCxTQUFTLEdBQUcsSUFBSSxrQkFBa0IsQ0FDOUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FDNUgsQ0FBQztnQkFDTixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLDBDQUEwQztvQkFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdFLENBQUM7Z0JBRUQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUM5QixLQUFLLENBQUM7WUFFVixLQUFLLGNBQWMsQ0FBQyxTQUFTO2dCQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hELE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQzlDLFNBQVMsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsRUFDL0MsU0FBUyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUM3QyxTQUFTLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQzlDLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFDNUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUNoRCxTQUFTLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLEVBQzlDLFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7Z0JBRWxELGlCQUFpQixHQUFHLFNBQVMsQ0FBQztnQkFDOUIsS0FBSyxDQUFDO1lBRVYsS0FBSyxjQUFjLENBQUMsU0FBUztnQkFFekIsSUFBSSxTQUF3QixDQUFDO2dCQUU3Qix5RUFBeUU7Z0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM3RCx5Q0FBeUM7b0JBRXpDLE1BQU0sZ0JBQWdCLEdBQWlCLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUUzRyxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEcsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLG9EQUFvRDtvQkFFcEQsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRW5GLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xGLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNwRSx5Q0FBeUM7b0JBRXpDLE1BQU0sZ0JBQWdCLEdBQWlCLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUUzRyxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDcEcsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLG9EQUFvRDtvQkFFcEQsTUFBTSxtQkFBbUIsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRW5GLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xGLENBQUM7Z0JBRUQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUM5QixLQUFLLENBQUM7WUFFVixLQUFLLGNBQWMsQ0FBQyxRQUFRO2dCQUV4QixNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xILGlCQUFpQixHQUFHLFFBQVEsQ0FBQztnQkFFN0IsS0FBSyxDQUFDO1lBRVYsS0FBSyxjQUFjLENBQUMsWUFBWTtnQkFFNUIsZ0ZBQWdGO2dCQUNoRixNQUFNLE1BQU0sR0FBVyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBRTdGLE1BQU0sWUFBWSxHQUFHLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0UsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO2dCQUVqQyxLQUFLLENBQUM7WUFFVixLQUFLLGNBQWMsQ0FBQyxtQkFBbUI7Z0JBRW5DLE1BQU0sbUJBQW1CLEdBQTRCLElBQUksdUJBQXVCLENBQzVFLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsT0FBTyxFQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsRUFDOUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUNyRSxTQUFTLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUNsRCxTQUFTLENBQUMsY0FBYyxDQUFDLDBCQUEwQixDQUFDLEVBQ3BELFNBQVMsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FDdkQsQ0FBQztnQkFFRixpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztnQkFFeEMsS0FBSyxDQUFDO1lBRVYsS0FBSyxjQUFjLENBQUMsYUFBYTtnQkFFN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBaUIsQ0FDdkMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixPQUFPLEVBQ1AsU0FBUyxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM5QyxTQUFTLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUNyRCxDQUFDO2dCQUVGLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztnQkFFbEMsS0FBSyxDQUFDO1lBRVYsS0FBSyxjQUFjLENBQUMsVUFBVTtnQkFFMUIsTUFBTSxjQUFjLEdBQW1CLElBQUksY0FBYyxDQUNyRCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQzlDLENBQUM7Z0JBRUYsaUJBQWlCLEdBQUcsY0FBYyxDQUFDO2dCQUVuQyxLQUFLLENBQUM7WUFFVixLQUFLLGNBQWMsQ0FBQyxTQUFTO2dCQUV6QixNQUFNLGFBQWEsR0FBa0IsSUFBSSxhQUFhLENBQ2xELFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDaEIsT0FBTyxFQUNQLFNBQVMsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FDcEQsQ0FBQztnQkFFRixpQkFBaUIsR0FBRyxhQUFhLENBQUM7Z0JBRWxDLEtBQUssQ0FBQztZQUVWLEtBQUssY0FBYyxDQUFDLFFBQVE7Z0JBRXhCLE1BQU0sUUFBUSxHQUFpQixJQUFJLFlBQVksQ0FDM0MsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixPQUFPLEVBQ1AsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FDcEQsQ0FBQztnQkFFRixpQkFBaUIsR0FBRyxRQUFRLENBQUM7Z0JBRTdCLEtBQUssQ0FBQztZQUVWLEtBQUssY0FBYyxDQUFDLFlBQVk7Z0JBRTVCLE1BQU0sU0FBUyxHQUFxQixJQUFJLGdCQUFnQixDQUNwRCxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQ2xELENBQUM7Z0JBRUYsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO2dCQUU5QixLQUFLLENBQUM7WUFHVixLQUFLLGNBQWMsQ0FBQyxhQUFhO2dCQUU3QiwrQ0FBK0M7Z0JBQy9DLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDdkYsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVuRixNQUFNLGFBQWEsR0FBc0IsSUFBSSxpQkFBaUIsQ0FDMUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUNoQixPQUFPLEVBQ1AsUUFBUSxFQUNSLE1BQU0sQ0FDVCxDQUFDO2dCQUVGLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztnQkFFbEMsS0FBSyxDQUFDO1lBRVYsS0FBSyxjQUFjLENBQUMsU0FBUztnQkFFekIsTUFBTSxTQUFTLEdBQWtCLElBQUksYUFBYSxDQUM5QyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ2hCLE9BQU8sRUFDUCxTQUFTLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQ3BELFNBQVMsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FDckQsQ0FBQztnQkFFRixpQkFBaUIsR0FBRyxTQUFTLENBQUM7Z0JBRTlCLEtBQUssQ0FBQztZQUVWO2dCQUNJLHlCQUF5QjtnQkFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUU3QixDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0gsaUNBQWlDLGNBQXNCO1FBRW5ELDRDQUE0QztRQUM1Qyx5Q0FBeUM7UUFDekMsTUFBTSx3QkFBd0IsR0FBVyxjQUFjLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFL0YsNENBQTRDO1FBQzVDLE1BQU0sa0JBQWtCLEdBQW9CLEVBQUUsQ0FBQztRQUUvQyxxRUFBcUU7UUFDckUscUVBQXFFO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLHdCQUF3QixLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLEdBQUcsQ0FBQyxDQUFDLE1BQU0sa0JBQWtCLElBQUksd0JBQXdCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLFdBQVcsR0FBa0IsdUJBQXVCLENBQ3RELGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQy9DLENBQUM7Z0JBRW5CLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx3QkFBd0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sV0FBVyxHQUFHLHVCQUF1QixDQUN2Qyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUNyRCxDQUFDO1lBRW5CLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QywwREFBMEQ7UUFDMUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUvQyxNQUFNLFVBQVUsR0FBbUIsRUFBRSxDQUFDO1FBRXRDLDRDQUE0QztRQUM1QyxHQUFHLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRS9CLE1BQU0sVUFBVSxHQUE0QixFQUFFLENBQUM7WUFFL0MsdURBQXVEO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxrQkFBa0I7Z0JBRWxCLGdGQUFnRjtnQkFDaEYsR0FBRyxDQUFDLENBQUMsTUFBTSxTQUFTLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFL0MsMkRBQTJEO29CQUMzRCxNQUFNLGlCQUFpQixHQUFxQix1QkFBdUIsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBRTdHLG1FQUFtRTtvQkFDbkUseURBQXlEO29CQUN6RCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsS0FBSyxTQUFTLENBQUM7d0JBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUU1RSxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGlCQUFpQjtnQkFFakIsTUFBTSxpQkFBaUIsR0FBcUIsdUJBQXVCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUU1SCxtRUFBbUU7Z0JBQ25FLHlEQUF5RDtnQkFDekQsRUFBRSxDQUFDLENBQUMsaUJBQWlCLEtBQUssU0FBUyxDQUFDO29CQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RSxDQUFDO1lBRUQsNENBQTRDO1lBQzVDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUM7UUFFdEMsQ0FBQztRQUVELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILCtDQUFzRCx1QkFBK0I7UUFFakYsTUFBTSxTQUFTLEdBQXdCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLGlCQUF5QixDQUFDO1FBQzlCLE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpELDZEQUE2RDtRQUM3RCxFQUFFLENBQUMsQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMvQix3QkFBd0I7WUFDeEIsaUJBQWlCLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUUxQyxHQUFHLENBQUMsQ0FBQyxNQUFNLGNBQWMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUUxQyxNQUFNLFFBQVEsR0FBaUIscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRXJFLDBDQUEwQztnQkFDMUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxtQ0FBbUM7Z0JBQ25DLGlCQUFpQixHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRUosb0JBQW9CO2dCQUNwQixpQkFBaUIsR0FBRyxDQUFDLENBQUM7Z0JBRXRCLE1BQU0sUUFBUSxHQUFpQixxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUU5RSwwQ0FBMEM7Z0JBQzFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUVuRSxDQUFDO0lBcENlLG1EQUFxQyx3Q0FvQ3BELENBQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCxvQ0FBb0MsY0FBc0I7UUFFdEQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QywwREFBMEQ7UUFDMUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUvQyxNQUFNLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUVuQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRTNCLHlDQUF5QztZQUN6QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEMsR0FBRyxDQUFDLENBQUMsTUFBTSxXQUFXLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFN0Msb0ZBQW9GO29CQUNwRixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssY0FBYyxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFFcEgsaUNBQWlDO3dCQUNqQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzFGLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNOLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxjQUFjLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNwSCxpQ0FBaUM7d0JBQ2pDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDMUYsQ0FBQztnQkFFTCxDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHlDQUF5QztnQkFFekMsb0ZBQW9GO2dCQUNwRixFQUFFLENBQUMsQ0FDQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUN6QixjQUFjLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7d0JBQ25GLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBRWhCLGlDQUFpQztvQkFDakMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDTixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUN6QixjQUFjLENBQUMsU0FBUyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7d0JBQ25GLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLGlDQUFpQztvQkFDakMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUM7UUFFRCxNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFFbkMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILHNDQUE2Qyx1QkFBK0I7UUFFeEUsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxlQUFlLEdBQWtCLEVBQUUsQ0FBQztRQUV4Qyw2REFBNkQ7UUFDN0QsRUFBRSxDQUFDLENBQUMsY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDL0Isd0JBQXdCO1lBRXhCLEdBQUcsQ0FBQyxDQUFDLE1BQU0sY0FBYyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLG9DQUFvQztnQkFDcEMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFOUMsd0NBQXdDO2dCQUN4QyxNQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUUzRSxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRXRFLENBQUM7UUFFTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixvQkFBb0I7WUFFcEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2QsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLGVBQWUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsd0NBQXdDO2dCQUN4QyxNQUFNLHVCQUF1QixHQUFHLDBCQUEwQixDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBRXBGLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFFRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFN0QsQ0FBQztJQXRDZSwwQ0FBNEIsK0JBc0MzQyxDQUFBO0FBQ0wsQ0FBQyxFQWxnQmEsYUFBYSxLQUFiLGFBQWEsUUFrZ0IxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgS25vcmFDb25zdGFudHMsXG4gICAgUmVhZEJvb2xlYW5WYWx1ZSxcbiAgICBSZWFkQ29sb3JWYWx1ZSxcbiAgICBSZWFkRGF0ZVZhbHVlLFxuICAgIFJlYWREZWNpbWFsVmFsdWUsXG4gICAgUmVhZEdlb21WYWx1ZSxcbiAgICBSZWFkSW50ZWdlclZhbHVlLFxuICAgIFJlYWRJbnRlcnZhbFZhbHVlLFxuICAgIFJlYWRMaW5rVmFsdWUsXG4gICAgUmVhZExpc3RWYWx1ZSxcbiAgICBSZWFkUHJvcGVydGllcyxcbiAgICBSZWFkUHJvcGVydHlJdGVtLFxuICAgIFJlYWRSZXNvdXJjZSxcbiAgICBSZWFkUmVzb3VyY2VzU2VxdWVuY2UsXG4gICAgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRGaWxlVmFsdWUsXG4gICAgUmVhZFRleHRWYWx1ZUFzSHRtbCxcbiAgICBSZWFkVGV4dFZhbHVlQXNTdHJpbmcsXG4gICAgUmVhZFRleHRWYWx1ZUFzWG1sLFxuICAgIFJlYWRVcmlWYWx1ZSxcbiAgICBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rLFxuICAgIFV0aWxzXG59IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbi8qKlxuICogQ29udGFpbnMgbWV0aG9kcyB0byBjb252ZXJ0IEpTT04tTEQgcmVwcmVzZW50aW5nIHJlc291cmNlcyBhbmQgcHJvcGVydGllcyB0byBjbGFzc2VzLlxuICogVGhlc2UgbWV0aG9kcyB3b3JrcyBvbmx5IGZvciBpbnN0YW5jZXMgb2YgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzLCBub3QgZm9yIG9udG9sb2dpZXMgKGRhdGEgbW9kZWwpLlxuICovXG5leHBvcnQgbW9kdWxlIENvbnZlcnRKU09OTEQge1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gYmUgcGFzc2VkIHRvIGEgZmlsdGVyIHVzZWQgb24gYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXNcbiAgICAgKiBzb3J0aW5nIG91dCBhbGwgbm9uIHZhbHVlIHByb3BlcnR5IG5hbWVzLlxuICAgICAqXG4gICAgICogR2V0cyBhbGwgcHJvcGVydHkgbmFtZXMgdGhhdCByZWZlciB0byB2YWx1ZSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHByb3BOYW1lIHRoZSBuYW1lIG9mIGEgcHJvcGVydHkgdG8gYmUgY2hlY2tlZC5cbiAgICAgKiBAcmV0dXJucyBCb29sZWFuIGluZGljYXRpbmcgaWYgdGhlIG5hbWUgcmVmZXJzIHRvIGEgdmFsdWUgcHJvcGVydHkuXG4gICAgICovXG4gICAgY29uc3QgZ2V0UHJvcGVydHlOYW1lcyA9IChwcm9wTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJvcE5hbWUgIT09ICdAaWQnXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gJ0B0eXBlJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLlJkZnNMYWJlbFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Qcm9qZWN0XG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuYXR0YWNoZWRUb1VzZXJcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5jcmVhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5sYXN0TW9kaWZpY2F0aW9uRGF0ZVxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmhhc1Blcm1pc3Npb25zO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRSZXNvdXJjZV1dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcyBzZXJpYWxpemVkIGFzIEpTT04tTEQuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUmVzb3VyY2Uge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlKFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0BpZCddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbJ0B0eXBlJ10sXG4gICAgICAgICAgICByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgW10sIC8vIHRvIGJlIHVwZGF0ZWQgb25jZSBhbm90aGVyIHJlcXVlc3QgaGFzIGJlZW4gbWFkZVxuICAgICAgICAgICAgcHJvcGVydGllc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBbW1JlYWRQcm9wZXJ0eUl0ZW1dXSBmcm9tIEpTT04tTEQsXG4gICAgICogdGFraW5nIGludG8gYWNjb3VudCB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BWYWx1ZSB0aGUgdmFsdWUgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wSXJpIHRoZSBJcmkgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7UmVhZExpbmtWYWx1ZVtdfSBzdGFuZG9mZkxpbmtWYWx1ZXMgc3RhbmRvZmZMaW5rVmFsdWVzIG9mIHRoZSByZXNvdXJjZS4gVGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gbGlua3MgdG8gb3RoZXIgcmVzb3VyY2VzLlxuICAgICAqIEByZXR1cm5zIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gb3IgYHVuZGVmaW5lZGAgaW4gY2FzZSB0aGUgdmFsdWUgY291bGQgbm90IGJlIHByb2Nlc3NlZCBjb3JyZWN0bHkuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AoXG4gICAgICAgIHByb3BWYWx1ZTogT2JqZWN0LCBwcm9wSXJpOiBzdHJpbmcsIHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdKTogUmVhZFByb3BlcnR5SXRlbSB8IHVuZGVmaW5lZCB7XG5cbiAgICAgICAgLy8gY29udmVydCBhIEpTT04tTEQgcHJvcGVydHkgdmFsdWUgdG8gYSBgUmVhZFByb3BlcnR5SXRlbWBcblxuICAgICAgICBsZXQgdmFsdWVTcGVjaWZpY1Byb3A6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHRoZSBwcm9wZXJ0eSdzIHZhbHVlIHR5cGVcbiAgICAgICAgc3dpdGNoIChwcm9wVmFsdWVbJ0B0eXBlJ10pIHtcbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dFZhbHVlOlxuICAgICAgICAgICAgICAgIC8vIGEgdGV4dCB2YWx1ZSBtaWdodCBiZSBnaXZlbiBhcyBwbGFpbiBzdHJpbmcsIGh0bWwgb3IgeG1sLlxuICAgICAgICAgICAgICAgIGxldCB0ZXh0VmFsdWU6IFJlYWRQcm9wZXJ0eUl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1N0cmluZyhwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudmFsdWVBc1N0cmluZ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIHN0YW5kb2ZmIGxpbmtzIGFuZCBpbmNsdWRlIHJlZmVycmVkIHJlc291cmNlcywgaWYgYW55XG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RzIHdpdGggYSBzdGFuZG9mZiBsaW5rLCBmdXJ0aGVyIGluZm9ybWF0aW9uIGFib3V0IHRoZSByZWZlcnJlZCByZXNvdXJjZSBjYW4gYmUgc2hvd25cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmsgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlczogUmVhZFJlc291cmNlID0gc3RhbmRvZmZMaW5rLnJlZmVycmVkUmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlc1tyZWZlcnJlZFJlcy5pZF0gPSByZWZlcnJlZFJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNIdG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzSHRtbF0sIHJlZmVycmVkUmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSAhPT0gdW5kZWZpbmVkICYmIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzWG1sKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUFzWG1sXSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnRleHRWYWx1ZUhhc01hcHBpbmddWydAaWQnXVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4cGVjdGVkIHRleHQgdmFsdWUgbWVtYmVycyBub3QgZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogSW52YWxpZCB0ZXh0IHZhbHVlOiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGF0ZVZhbHVlOlxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IG5ldyBSZWFkRGF0ZVZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNDYWxlbmRhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kWWVhcl0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydEVyYV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmRNb250aF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNTdGFydERheV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5kYXRlVmFsdWVIYXNFbmREYXldKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gZGF0ZVZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGxldCBsaW5rVmFsdWU6IFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgaXMgZ2l2ZW4gYXMgYW4gb2JqZWN0IG9yIGp1c3QgYXMgYW4gSVJJXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0IGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHJlZmVycmVkUmVzb3VyY2UuaWQsIHJlZmVycmVkUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldElyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNUYXJnZXRJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlIGNvbnRhaW5zIHRoZSBvYmplY3RcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNvbWluZ1Jlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpbmtWYWx1ZSA9IG5ldyBSZWFkTGlua1ZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGluY29taW5nUmVzb3VyY2UuaWQsIGluY29taW5nUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZUlyaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rVmFsdWVIYXNTb3VyY2VJcmkgY29udGFpbnMgdGhlIHJlc291cmNlJ3MgSXJpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZUlyaSA9IHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldWydAaWQnXTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlSXJpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpbmtWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5JbnRWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFZhbHVlID0gbmV3IFJlYWRJbnRlZ2VyVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVnZXJWYWx1ZUFzSW50ZWdlcl0pO1xuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyBhIGRlY2ltYWwgdmFsdWUgaXMgcmVwcmVzZW50ZWQgYXMgYSBzdHJpbmcgaW4gb3JkZXIgdG8gcHJlc2VydmUgaXRzIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY1ZhbDogbnVtYmVyID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGVjaW1hbFZhbHVlQXNEZWNpbWFsXVsnQHZhbHVlJ10pO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZGVjaW1hbFZhbHVlID0gbmV3IFJlYWREZWNpbWFsVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgZGVjVmFsKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRlY2ltYWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGlsbEltYWdlRmlsZVZhbHVlOiBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSA9IG5ldyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybF1bJ0B2YWx1ZSddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZmlsZVZhbHVlQXNVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1YXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dEZpbGVWYWx1ZSA9IG5ldyBSZWFkVGV4dEZpbGVWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUhhc0ZpbGVuYW1lXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB0ZXh0RmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRDb2xvclZhbHVlOiBSZWFkQ29sb3JWYWx1ZSA9IG5ldyBSZWFkQ29sb3JWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmNvbG9yVmFsdWVBc0NvbG9yXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRDb2xvclZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuR2VvbVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZEdlb21WYWx1ZTogUmVhZEdlb21WYWx1ZSA9IG5ldyBSZWFkR2VvbVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZ2VvbWV0cnlWYWx1ZUFzR2VvbWV0cnldXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gcmVhZEdlb21WYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3QgdXJpVmFsdWU6IFJlYWRVcmlWYWx1ZSA9IG5ldyBSZWFkVXJpVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy51cmlWYWx1ZUFzVXJpXVsnQHZhbHVlJ11cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSB1cmlWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xWYWx1ZTogUmVhZEJvb2xlYW5WYWx1ZSA9IG5ldyBSZWFkQm9vbGVhblZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuYm9vbGVhblZhbHVlQXNCb29sZWFuXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGJvb2xWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50ZXJ2YWxWYWx1ZTpcblxuICAgICAgICAgICAgICAgIC8vIHJlcHJlc2VudGVkIGFzIHN0cmluZ3MgdG8gcHJlc2VydmUgcHJlY2lzaW9uXG4gICAgICAgICAgICAgICAgY29uc3QgaW50U3RhcnQgPSBwYXJzZUZsb2F0KHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlcnZhbFZhbHVlSGFzU3RhcnRdWydAdmFsdWUnXSk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW50RW5kID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc0VuZF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGludGVydmFsVmFsdWU6IFJlYWRJbnRlcnZhbFZhbHVlID0gbmV3IFJlYWRJbnRlcnZhbFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBpbnRTdGFydCxcbiAgICAgICAgICAgICAgICAgICAgaW50RW5kXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gaW50ZXJ2YWxWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RWYWx1ZTogUmVhZExpc3RWYWx1ZSA9IG5ldyBSZWFkTGlzdFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZV1bJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsXVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGxpc3RWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIHVuc3VwcG9ydGVkIHZhbHVlIHR5cGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFUlJPUjogdmFsdWUgdHlwZSBub3QgaW1wbGVtZW50ZWQgeWV0OiAnICsgcHJvcFZhbHVlWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVNwZWNpZmljUHJvcDtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgW1tSZWFkUHJvcGVydGllc11dIGZyb20gSlNPTi1MRC5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBhbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgcmVzb3VyY2UgYW5kIGl0cyBwcm9wZXJ0aWVzLlxuICAgICAqIEByZXR1cm5zIFJlYWRQcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gY29uc3RydWN0UmVhZFByb3BlcnRpZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IFJlYWRQcm9wZXJ0aWVzIHtcblxuICAgICAgICAvLyBKU09OLUxEIHJlcHJlc2VudGluZyBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICAvLyB0ZXh0IHZhbHVlcyBtYXkgY29udGFpbiBzdGFuZG9mZiBsaW5rc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQ6IE9iamVjdCA9IHJlc291cmNlSlNPTkxEW0tub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWVdO1xuXG4gICAgICAgIC8vIHRvIGJlIHBvcHVsYXRlZCB3aXRoIHN0YW5kb2ZmIGxpbmsgdmFsdWVzXG4gICAgICAgIGNvbnN0IHN0YW5kb2ZmTGlua1ZhbHVlczogUmVhZExpbmtWYWx1ZVtdID0gW107XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0YW5kb2ZmIGxpbmsgdmFsdWUgSlNPTi1MRCBvYmplY3QgdG8gYSBSZWFkTGlua1ZhbHVlXG4gICAgICAgIC8vIGluIG9yZGVyIHBvcHVsYXRlIHRoZSBjb2xsZWN0aW9uIHdpdGggYWxsIHRoZSBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBpZiAoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN0YW5kb2ZmTGlua0pTT05MRCBvZiBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbDogUmVhZExpbmtWYWx1ZSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICAgICAgKSBhcyBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFuZG9mZlZhbCA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCwgS25vcmFDb25zdGFudHMuaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSwgW11cbiAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgc3RhbmRvZmZMaW5rVmFsdWVzLnB1c2goc3RhbmRvZmZWYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcHJvcGVydGllczogUmVhZFByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIHRoZSBnaXZlbiBwcm9wZXJ0eSBuYW1lc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIG9mIHByb3BOYW1lcykge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVzOiBBcnJheTxSZWFkUHJvcGVydHlJdGVtPiA9IFtdO1xuXG4gICAgICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgdmFsdWVzIG9yIGp1c3Qgb25lIHZhbHVlIGlzIGdpdmVuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2YgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBwcm9wZXJ0eSBuYW1lLCBhbiBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMgaXMgZ2l2ZW4sIGl0ZXJhdGUgb3ZlciBpdFxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcFZhbHVlIG9mIHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocHJvcFZhbHVlLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdmFsdWUgdG8gdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWVcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtID0gY3JlYXRlVmFsdWVTcGVjaWZpY1Byb3AocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdLCBwcm9wTmFtZSwgc3RhbmRvZmZMaW5rVmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzIHVuZGVmaW5lZCwgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBjb25zdHJ1Y3RlZCBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVTcGVjaWZpY1Byb3AgIT09IHVuZGVmaW5lZCkgcHJvcFZhbHVlcy5wdXNoKHZhbHVlU3BlY2lmaWNQcm9wKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB0byB0aGUgcHJvcGVydGllcyBvYmplY3RcbiAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcE5hbWVdID0gcHJvcFZhbHVlcztcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHVybnMgYW4gQVBJIHJlc3BvbnNlIGluIEpTT04tTEQgcmVwcmVzZW50aW5nIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzIGludG8gYSBbW1JlYWRSZXNvdXJjZXNTZXF1ZW5jZV1dLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEIGEgcmVzb3VyY2Ugb3IgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgUmVhZFJlc291cmNlc1NlcXVlbmNlIC0gc2VxdWVuY2Ugb2YgcmVhZCByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZFJlc291cmNlc1NlcXVlbmNlRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlc1NlcXVlbmNlIHtcblxuICAgICAgICBjb25zdCByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4gPSBbXTtcbiAgICAgICAgbGV0IG51bWJlck9mUmVzb3VyY2VzOiBudW1iZXI7XG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGVpdGhlciBhbiBhcnJheSBvZiByZXNvdXJjZXMgb3IganVzdCBvbmUgcmVzb3VyY2UgaXMgZ2l2ZW5cbiAgICAgICAgaWYgKHJlc291cmNlc0dyYXBoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGFuIGFycmF5IG9mIHJlc291cmNlc1xuICAgICAgICAgICAgbnVtYmVyT2ZSZXNvdXJjZXMgPSByZXNvdXJjZXNHcmFwaC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBhbnN3ZXIsIG5vIHJlc291cmNlcyBnaXZlblxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuICAgICAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc291cmNlOiBSZWFkUmVzb3VyY2UgPSBjb25zdHJ1Y3RSZWFkUmVzb3VyY2UocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSByZXNvdXJjZSB0byB0aGUgcmVzb3VyY2VzIGFycmF5XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VzLnB1c2gocmVzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWFkUmVzb3VyY2VzU2VxdWVuY2UocmVzb3VyY2VzLCBudW1iZXJPZlJlc291cmNlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0cyBhbGwgdGhlIHR5cGVzIChjbGFzc2VzKSBvZiByZWZlcnJlZCByZXNvdXJjZXMgZnJvbSBhIGdpdmVuIHJlc291cmNlIChmcm9tIGl0cyBsaW5raW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHJlc291cmNlSlNPTkxEIEpTT04tTEQgZGVzY3JpYmluZyBvbmUgcmVzb3VyY2UuXG4gICAgICogQHJldHVybiBzdHJpbmdbXSAtIGFuIEFycmF5IG9mIHJlc291cmNlIGNsYXNzIElyaXMgKGluY2x1ZGluZyBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG4gICAgICAgIC8vIGZpbHRlciBvdXQgZXZlcnl0aGluZyB0aGF0IGlzIG5vdCBhIEtub3JhIHByb3BlcnR5IG5hbWVcbiAgICAgICAgcHJvcE5hbWVzID0gcHJvcE5hbWVzLmZpbHRlcihnZXRQcm9wZXJ0eU5hbWVzKTtcblxuICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgLy8gc2V2ZXJhbCB2YWx1ZXMgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc291cmNlSlNPTkxEW3Byb3BdKSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByZWZlcnJlZFJlcyBvZiByZXNvdXJjZUpTT05MRFtwcm9wXSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgICAgICBpZiAocmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHJlc291cmNlIGlzIHJlcHJlc2VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlZmVycmVkUmVzW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNbJ0B0eXBlJ10gPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IG9uZSB2YWx1ZSBnaXZlbiBmb3IgdGhpcyBwcm9wZXJ0eVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGEgTGlua1ZhbHVlIGFuZCBpdCBjb250YWlucyBhbiBlbWJlZGRlZCByZXNvdXJjZSwgZ2V0IGl0cyB0eXBlXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1RhcmdldF1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlSlNPTkxEW3Byb3BdWydAdHlwZSddXG4gICAgICAgICAgICAgICAgICAgID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVzb3VyY2VKU09OTERbcHJvcF1bS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVxuICAgICAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlZFJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1bJ0B0eXBlJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzb3VyY2UgdHlwZXMgKGNsYXNzZXMpIGZyb20gYSBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcy5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHNlcXVlbmNlIG9mIHJlc291cmNlcywgcmVwcmVzZW50ZWQgYXMgYSBKU09OLUxEIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHRoZSByZXNvdXJjZSBjbGFzcyBJcmlzICh3aXRob3V0IGR1cGxpY2F0ZXMpLlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRSZXNvdXJjZUNsYXNzZXNGcm9tSnNvbkxEKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzR3JhcGggPSByZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQGdyYXBoJ107XG4gICAgICAgIGxldCByZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcblxuICAgICAgICAgICAgZm9yIChjb25zdCByZXNvdXJjZUpTT05MRCBvZiByZXNvdXJjZXNHcmFwaCkge1xuICAgICAgICAgICAgICAgIC8vIGdldCBjbGFzcyBvZiB0aGUgY3VycmVudCByZXNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlcy5wdXNoKHJlc291cmNlSlNPTkxEWydAdHlwZSddKTtcblxuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2xhc3NlcyBvZiByZWZlcnJlZCByZXNvdXJjZXNcbiAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlQ2xhc3NlcyA9IGdldFJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIHJlc291cmNlQ2xhc3NlcyA9IHJlc291cmNlQ2xhc3Nlcy5jb25jYXQocmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG9ubHkgb25lIHJlc291cmNlXG5cbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZXNSZXNwb25zZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbHRlciBvdXQgZHVwbGljYXRlc1xuICAgICAgICByZXR1cm4gcmVzb3VyY2VDbGFzc2VzLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgIH1cbn1cbiJdfQ==