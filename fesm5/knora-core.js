import { __extends, __values, __decorate, __metadata } from 'tslib';
import { JsonObject, JsonProperty, JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';
import { Inject, Injectable, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { from, Observable, forkJoin, of, Subject, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * Knora-ui core configuration with the server definitions of:
 *  - api: URL of data service e.g. knora: http://localhost:3333
 *  - media: URL of media server service e.g. sipi: http://localhost:1024
 *  - app: URL of the app e.g. salsah: http://localhost:4200
 */
var KuiCoreConfig = /** @class */ (function () {
    function KuiCoreConfig() {
        /**
         * name of the app e.g. 'SALSAH'
         * @type {string}
         */
        this.name = undefined;
        /**
         * url of the app e.g. 'https://salsah.org'
         * @type {undefined}
         */
        this.app = undefined;
        /**
         * url of the api e.g. 'https://api.knora.org'
         * @type {string}
         */
        this.api = undefined;
        /**
         * url of media/file server e.g. 'https://iiif.sipi.io'
         * @type {string}
         */
        this.media = undefined;
    }
    __decorate([
        JsonProperty('name', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "name", void 0);
    __decorate([
        JsonProperty('app', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "app", void 0);
    __decorate([
        JsonProperty('api', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "api", void 0);
    __decorate([
        JsonProperty('media', String),
        __metadata("design:type", String)
    ], KuiCoreConfig.prototype, "media", void 0);
    KuiCoreConfig = __decorate([
        JsonObject('KuiCoreConfig')
    ], KuiCoreConfig);
    return KuiCoreConfig;
}());

/**
 * Result class used as API url response in ApiService
 */
var ApiServiceResult = /** @class */ (function () {
    function ApiServiceResult() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
    }
    /**
     * Gets the result body as instance of classObject.
     * @param classObject
     * @returns {any}
     * @throws
     */
    ApiServiceResult.prototype.getBody = function (classObject) {
        // console.log(this.body);
        return ApiServiceResult.jsonConvert.deserialize(this.body, classObject);
    };
    ApiServiceResult.jsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);
    return ApiServiceResult;
}());

/**
 * Error class used as API response in ApiService
 */
var ApiServiceError = /** @class */ (function () {
    function ApiServiceError() {
        /**
         * Status number
         */
        this.status = 0;
        /**
         * Status text
         */
        this.statusText = '';
        /**
         * API url
         */
        this.url = '';
        /**
         * Additional error info
         */
        this.errorInfo = '';
    }
    return ApiServiceError;
}());

var KnoraConstants = /** @class */ (function () {
    function KnoraConstants() {
    }
    KnoraConstants.KnoraApi = 'http://api.knora.org/ontology/knora-api';
    KnoraConstants.PathSeparator = '#';
    KnoraConstants.KnoraOntologyPath = 'http://www.knora.org/ontology';
    KnoraConstants.KnoraBase = KnoraConstants.KnoraOntologyPath + '/knora-base';
    KnoraConstants.SystemProjectIRI = KnoraConstants.KnoraBase + '#SystemProject';
    KnoraConstants.SystemAdminGroupIRI = KnoraConstants.KnoraBase + '#SystemAdmin';
    KnoraConstants.ProjectAdminGroupIRI = KnoraConstants.KnoraBase + '#ProjectAdmin';
    KnoraConstants.ProjectMemberGroupIRI = KnoraConstants.KnoraBase + '#ProjectMember';
    KnoraConstants.KnoraApiV2WithValueObjectPath = KnoraConstants.KnoraApi + '/v2' + KnoraConstants.PathSeparator;
    KnoraConstants.KnoraApiV2SimplePath = KnoraConstants.KnoraApi + '/simple/v2' + KnoraConstants.PathSeparator;
    KnoraConstants.SalsahGuiOntology = 'http://api.knora.org/ontology/salsah-gui/v2';
    KnoraConstants.SalsahGuiOrder = KnoraConstants.SalsahGuiOntology + '#guiOrder';
    KnoraConstants.StandoffOntology = 'http://api.knora.org/ontology/standoff/v2';
    KnoraConstants.Resource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Resource';
    KnoraConstants.TextValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextValue';
    KnoraConstants.IntValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntValue';
    KnoraConstants.BooleanValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'BooleanValue';
    KnoraConstants.UriValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'UriValue';
    KnoraConstants.DecimalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DecimalValue';
    KnoraConstants.DateValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DateValue';
    KnoraConstants.ColorValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ColorValue';
    KnoraConstants.GeomValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeomValue';
    KnoraConstants.ListValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListValue';
    KnoraConstants.IntervalValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'IntervalValue';
    KnoraConstants.LinkValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'LinkValue';
    KnoraConstants.GeonameValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'GeonameValue';
    KnoraConstants.FileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'FileValue';
    KnoraConstants.AudioFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'AudioFileValue';
    KnoraConstants.DDDFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DDDFileValue';
    KnoraConstants.DocumentFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'DocumentFileValue';
    KnoraConstants.StillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'StillImageFileValue';
    KnoraConstants.MovingImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'MovingImageFileValue';
    KnoraConstants.TextFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'TextFileValue';
    KnoraConstants.IsResourceClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isResourceClass';
    KnoraConstants.IsValueClass = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isValueClass';
    KnoraConstants.ForbiddenResource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ForbiddenResource';
    KnoraConstants.XMLToStandoffMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'XMLToStandoffMapping';
    KnoraConstants.ListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'ListNode';
    KnoraConstants.ObjectType = KnoraConstants.KnoraApiV2WithValueObjectPath + 'objectType';
    KnoraConstants.ResourceIcon = KnoraConstants.KnoraApiV2WithValueObjectPath + 'resourceIcon';
    KnoraConstants.isEditable = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isEditable';
    KnoraConstants.isLinkProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkProperty';
    KnoraConstants.isLinkValueProperty = KnoraConstants.KnoraApiV2WithValueObjectPath + 'isLinkValueProperty';
    KnoraConstants.hasGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasGeometry';
    KnoraConstants.schemaName = 'http://schema.org/name';
    KnoraConstants.schemaNumberOfItems = 'http://schema.org/numberOfItems';
    KnoraConstants.schemaItemListElement = 'http://schema.org/itemListElement';
    KnoraConstants.RdfProperty = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property';
    KnoraConstants.RdfsSchema = 'http://www.w3.org/2000/01/rdf-schema' + KnoraConstants.PathSeparator;
    KnoraConstants.RdfsLabel = KnoraConstants.RdfsSchema + 'label';
    KnoraConstants.RdfsComment = KnoraConstants.RdfsSchema + 'comment';
    KnoraConstants.RdfsSubclassOf = KnoraConstants.RdfsSchema + 'subClassOf';
    KnoraConstants.subPropertyOf = KnoraConstants.RdfsSchema + 'subPropertyOf';
    KnoraConstants.owl = 'http://www.w3.org/2002/07/owl';
    KnoraConstants.OwlClass = KnoraConstants.owl + '#Class';
    KnoraConstants.OwlObjectProperty = KnoraConstants.owl + '#ObjectProperty';
    KnoraConstants.OwlDatatypeProperty = KnoraConstants.owl + '#DatatypeProperty';
    KnoraConstants.OwlAnnotationProperty = KnoraConstants.owl + '#AnnotationProperty';
    KnoraConstants.OwlOnProperty = KnoraConstants.owl + '#onProperty';
    KnoraConstants.OwlMaxCardinality = KnoraConstants.owl + '#maxCardinality';
    KnoraConstants.OwlMinCardinality = KnoraConstants.owl + '#minCardinality';
    KnoraConstants.OwlCardinality = KnoraConstants.owl + '#cardinality';
    KnoraConstants.OwlRestriction = KnoraConstants.owl + '#Restriction';
    KnoraConstants.creationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'creationDate';
    KnoraConstants.lastModificationDate = KnoraConstants.KnoraApiV2WithValueObjectPath + 'lastModificationDate';
    KnoraConstants.hasPermissions = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasPermissions';
    KnoraConstants.attachedToProject = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToProject';
    KnoraConstants.attachedToUser = KnoraConstants.KnoraApiV2WithValueObjectPath + 'attachedToUser';
    KnoraConstants.Region = KnoraConstants.KnoraApiV2WithValueObjectPath + 'Region';
    KnoraConstants.ReadTextValueAsHtml = 'ReadTextValueAsHtml';
    KnoraConstants.ReadTextValueAsString = 'ReadTextValueAsString';
    KnoraConstants.ReadTextValueAsXml = 'ReadTextValueAsXml';
    KnoraConstants.ReadDateValue = 'ReadDateValue';
    KnoraConstants.ReadLinkValue = 'ReadLinkValue';
    KnoraConstants.ReadIntegerValue = 'ReadIntegerValue';
    KnoraConstants.ReadDecimalValue = 'ReadDecimalValue';
    KnoraConstants.ReadStillImageFileValue = 'ReadStillImageFileValue';
    KnoraConstants.ReadTextFileValue = 'ReadTextFileValue';
    KnoraConstants.ReadGeomValue = 'ReadGeomValue';
    KnoraConstants.ReadColorValue = 'ReadColorValue';
    KnoraConstants.ReadUriValue = 'ReadUriValue';
    KnoraConstants.ReadBooleanValue = 'ReadBooleanValue';
    KnoraConstants.ReadIntervalValue = 'ReadIntervalValue';
    KnoraConstants.ReadListValue = 'ReadListValue';
    KnoraConstants.valueAsString = KnoraConstants.KnoraApiV2WithValueObjectPath + 'valueAsString';
    KnoraConstants.textValueAsHtml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsHtml';
    KnoraConstants.textValueAsXml = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueAsXml';
    KnoraConstants.textValueHasMapping = KnoraConstants.KnoraApiV2WithValueObjectPath + 'textValueHasMapping';
    KnoraConstants.hasStandoffLinkToValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStandoffLinkToValue';
    KnoraConstants.dateValueHasStartYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartYear';
    KnoraConstants.dateValueHasEndYear = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndYear';
    KnoraConstants.dateValueHasStartEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartEra';
    KnoraConstants.dateValueHasEndEra = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndEra';
    KnoraConstants.dateValueHasStartMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartMonth';
    KnoraConstants.dateValueHasEndMonth = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndMonth';
    KnoraConstants.dateValueHasStartDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasStartDay';
    KnoraConstants.dateValueHasEndDay = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasEndDay';
    KnoraConstants.dateValueHasCalendar = KnoraConstants.KnoraApiV2WithValueObjectPath + 'dateValueHasCalendar';
    KnoraConstants.linkValueHasTarget = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTarget';
    KnoraConstants.linkValueHasSource = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSource';
    KnoraConstants.linkValueHasSourceIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasSourceIri';
    KnoraConstants.linkValueHasTargetIri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'linkValueHasTargetIri';
    KnoraConstants.integerValueAsInteger = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intValueAsInt';
    KnoraConstants.decimalValueAsDecimal = KnoraConstants.KnoraApiV2WithValueObjectPath + 'decimalValueAsDecimal';
    KnoraConstants.fileValueAsUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueAsUrl';
    KnoraConstants.fileValueIsPreview = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueIsPreview';
    KnoraConstants.fileValueHasFilename = KnoraConstants.KnoraApiV2WithValueObjectPath + 'fileValueHasFilename';
    KnoraConstants.hasStillImageFileValue = KnoraConstants.KnoraApiV2WithValueObjectPath + 'hasStillImageFileValue';
    KnoraConstants.stillImageFileValueHasDimX = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimX';
    KnoraConstants.stillImageFileValueHasDimY = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasDimY';
    KnoraConstants.stillImageFileValueHasIIIFBaseUrl = KnoraConstants.KnoraApiV2WithValueObjectPath + 'stillImageFileValueHasIIIFBaseUrl';
    KnoraConstants.colorValueAsColor = KnoraConstants.KnoraApiV2WithValueObjectPath + 'colorValueAsColor';
    KnoraConstants.geometryValueAsGeometry = KnoraConstants.KnoraApiV2WithValueObjectPath + 'geometryValueAsGeometry';
    KnoraConstants.uriValueAsUri = KnoraConstants.KnoraApiV2WithValueObjectPath + 'uriValueAsUri';
    KnoraConstants.booleanValueAsBoolean = KnoraConstants.KnoraApiV2WithValueObjectPath + 'booleanValueAsBoolean';
    KnoraConstants.intervalValueHasStart = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasStart';
    KnoraConstants.intervalValueHasEnd = KnoraConstants.KnoraApiV2WithValueObjectPath + 'intervalValueHasEnd';
    KnoraConstants.listValueAsListNode = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNode';
    KnoraConstants.listValueAsListNodeLabel = KnoraConstants.KnoraApiV2WithValueObjectPath + 'listValueAsListNodeLabel';
    KnoraConstants.Xsd = 'http://www.w3.org/2001/XMLSchema#';
    KnoraConstants.xsdString = KnoraConstants.Xsd + 'string';
    KnoraConstants.xsdBoolean = KnoraConstants.Xsd + 'boolean';
    KnoraConstants.xsdInteger = KnoraConstants.Xsd + 'integer';
    KnoraConstants.xsdDecimal = KnoraConstants.Xsd + 'decimal';
    KnoraConstants.xsdUri = KnoraConstants.Xsd + 'anyURI';
    KnoraConstants.resourceSimple = KnoraConstants.KnoraApiV2SimplePath + 'Resource';
    KnoraConstants.dateSimple = KnoraConstants.KnoraApiV2SimplePath + 'Date';
    KnoraConstants.intervalSimple = KnoraConstants.KnoraApiV2SimplePath + 'Interval';
    KnoraConstants.geomSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geom';
    KnoraConstants.colorSimple = KnoraConstants.KnoraApiV2SimplePath + 'Color';
    KnoraConstants.geonameSimple = KnoraConstants.KnoraApiV2SimplePath + 'Geoname';
    KnoraConstants.fileSimple = KnoraConstants.KnoraApiV2SimplePath + 'File';
    KnoraConstants.matchFunction = KnoraConstants.KnoraApiV2SimplePath + 'match';
    KnoraConstants.EqualsComparisonOperator = '=';
    KnoraConstants.EqualsComparisonLabel = 'is equal to';
    KnoraConstants.NotEqualsComparisonOperator = '!=';
    KnoraConstants.NotEqualsComparisonLabel = 'is not equal to';
    KnoraConstants.GreaterThanComparisonOperator = '>';
    KnoraConstants.GreaterThanComparisonLabel = 'is greater than';
    KnoraConstants.GreaterThanEqualsComparisonOperator = '>=';
    KnoraConstants.GreaterThanEqualsComparisonLabel = 'is greater than equals to';
    KnoraConstants.LessThanComparisonOperator = '<';
    KnoraConstants.LessThanComparisonLabel = 'is less than';
    KnoraConstants.LessThanEqualsComparisonOperator = '<=';
    KnoraConstants.LessThanQualsComparisonLabel = 'is less than equals to';
    KnoraConstants.ExistsComparisonOperator = 'E';
    KnoraConstants.ExistsComparisonLabel = 'exists';
    KnoraConstants.LikeComparisonOperator = 'regex';
    KnoraConstants.LikeComparisonLabel = 'is like';
    KnoraConstants.MatchComparisonOperator = 'contains';
    KnoraConstants.MatchComparisonLabel = 'matches';
    KnoraConstants.SalsahLink = 'salsah-link'; // class on an HTML <a> element that indicates a link to a Knora resource
    KnoraConstants.RefMarker = 'ref-marker'; // class on an HTML element that refers to another element in the same document
    KnoraConstants.GNDPrefix = '(DE-588)';
    KnoraConstants.GNDResolver = 'http://d-nb.info/gnd/';
    KnoraConstants.VIAFPrefix = '(VIAF)';
    KnoraConstants.VIAFResolver = 'https://viaf.org/viaf/';
    return KnoraConstants;
}());
var KnoraSchema;
(function (KnoraSchema) {
    KnoraSchema[KnoraSchema["complex"] = 0] = "complex";
    KnoraSchema[KnoraSchema["simple"] = 1] = "simple";
})(KnoraSchema || (KnoraSchema = {}));

/**
 * Collection of useful utility functions.
 */
// @dynamic
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    Utils.getOntologyIriFromEntityIri = function (entityIri) {
        // split class Iri on "#"
        var segments = entityIri.split(KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error("Error: " + entityIri + " is not a valid entity IRI.");
        return segments[0];
    };
    /**
     * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
     *
     * @param {string} complexEntityIri
     * @returns {string}
     */
    Utils.convertComplexKnoraApiEntityIritoSimple = function (complexEntityIri) {
        // split entity Iri on "#"
        var segments = complexEntityIri.split('v2' + KnoraConstants.PathSeparator);
        if (segments.length !== 2)
            console.error("Error: " + complexEntityIri + " is not a valid entity IRI.");
        // add 'simple' to base path
        return segments[0] + 'simple/v2' + KnoraConstants.PathSeparator + segments[1];
    };
    /**
     * A regex to validate Email address.
     *
     * @type {RegExp}
     */
    Utils.RegexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    /**
     * A regex to validate Username.
     *
     * @type {RegExp}
     */
    Utils.RegexUsername = /^[a-zA-Z0-9]+$/;
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
    Utils.filterOutDuplicates = function (elem, index, self) {
        // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example
        // returns true if the element's index equals the index of the leftmost element
        // -> this means that there is no identical element before this index, hence it is not a duplicate
        // for all other elements, false is returned
        return index === self.indexOf(elem);
    };
    return Utils;
}());

var StringLiteral = /** @class */ (function () {
    function StringLiteral() {
        this.value = undefined;
        this.language = '';
    }
    __decorate([
        JsonProperty('value', String, false),
        __metadata("design:type", String)
    ], StringLiteral.prototype, "value", void 0);
    __decorate([
        JsonProperty('language', String, true),
        __metadata("design:type", String)
    ], StringLiteral.prototype, "language", void 0);
    StringLiteral = __decorate([
        JsonObject('StringLiteral')
    ], StringLiteral);
    return StringLiteral;
}());

/**
 * Precision for DateSalsah.
 */
var Precision;
(function (Precision) {
    Precision[Precision["yearPrecision"] = 0] = "yearPrecision";
    Precision[Precision["monthPrecision"] = 1] = "monthPrecision";
    Precision[Precision["dayPrecision"] = 2] = "dayPrecision";
})(Precision || (Precision = {}));
/**
 * Represents a Salsah date object with a precision information.
 */
var DateSalsah = /** @class */ (function () {
    function DateSalsah(calendar, era, year, month, day) {
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        if (this.month === undefined) {
            // year precision
            this.precision = Precision.yearPrecision;
        }
        else if (this.day === undefined) {
            // month precision
            this.precision = Precision.monthPrecision;
        }
        else {
            // day precision
            this.precision = Precision.dayPrecision;
        }
    }
    /**
     * Returns a string representation of the date without the calendar.
     *
     * @returns {string}
     */
    DateSalsah.prototype.getDateAsStringWithoutCalendar = function () {
        var dateString = '(' + this.era + ') ';
        switch (this.precision) {
            case Precision.yearPrecision: {
                dateString += this.year.toString();
                break;
            }
            case Precision.monthPrecision: {
                dateString += this.year + DateSalsah.separator + this.month;
                break;
            }
            case Precision.dayPrecision: {
                dateString += this.year + DateSalsah.separator + this.month + DateSalsah.separator + this.day;
                break;
            }
            default: {
                break;
            }
        }
        return dateString;
    };
    /**
     * Returns a string representation of the date (with calendar).
     *
     * @returns {string}
     */
    DateSalsah.prototype.getDateAsString = function () {
        return this.calendar + ':' + this.getDateAsStringWithoutCalendar();
    };
    DateSalsah.separator = '-';
    return DateSalsah;
}());
/**
 * Represents a period (with start date and end date).
 */
var DateRangeSalsah = /** @class */ (function () {
    function DateRangeSalsah(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * Returns a string representation of the date range (with preceding calendar).
     *
     * @returns {string}
     */
    DateRangeSalsah.prototype.getDateAsString = function () {
        return this.start.getDateAsString() + ':' + this.end.getDateAsStringWithoutCalendar();
    };
    return DateRangeSalsah;
}());

var AuthenticationResponse = /** @class */ (function () {
    function AuthenticationResponse() {
        this.token = undefined;
    }
    __decorate([
        JsonProperty('token', String),
        __metadata("design:type", String)
    ], AuthenticationResponse.prototype, "token", void 0);
    AuthenticationResponse = __decorate([
        JsonObject('AuthenticationResponse')
    ], AuthenticationResponse);
    return AuthenticationResponse;
}());

var Project = /** @class */ (function () {
    function Project() {
        this.id = undefined;
        this.shortname = undefined;
        this.shortcode = undefined;
        this.longname = undefined;
        this.description = [new StringLiteral()];
        this.keywords = undefined;
        this.logo = undefined;
        this.institution = undefined;
        this.ontologies = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
    __decorate([
        JsonProperty('id', String),
        __metadata("design:type", String)
    ], Project.prototype, "id", void 0);
    __decorate([
        JsonProperty('shortname', String),
        __metadata("design:type", String)
    ], Project.prototype, "shortname", void 0);
    __decorate([
        JsonProperty('shortcode', String, true),
        __metadata("design:type", String)
    ], Project.prototype, "shortcode", void 0);
    __decorate([
        JsonProperty('longname', String, true),
        __metadata("design:type", String)
    ], Project.prototype, "longname", void 0);
    __decorate([
        JsonProperty('description', [StringLiteral], true),
        __metadata("design:type", Array)
    ], Project.prototype, "description", void 0);
    __decorate([
        JsonProperty('keywords', [String], true),
        __metadata("design:type", Array)
    ], Project.prototype, "keywords", void 0);
    __decorate([
        JsonProperty('logo', String, true),
        __metadata("design:type", String)
    ], Project.prototype, "logo", void 0);
    __decorate([
        JsonProperty('institution', String, true),
        __metadata("design:type", String)
    ], Project.prototype, "institution", void 0);
    __decorate([
        JsonProperty('ontologies', [String]),
        __metadata("design:type", Array)
    ], Project.prototype, "ontologies", void 0);
    __decorate([
        JsonProperty('status', Boolean),
        __metadata("design:type", Boolean)
    ], Project.prototype, "status", void 0);
    __decorate([
        JsonProperty('selfjoin', Boolean),
        __metadata("design:type", Boolean)
    ], Project.prototype, "selfjoin", void 0);
    Project = __decorate([
        JsonObject('Project')
    ], Project);
    return Project;
}());

var Group = /** @class */ (function () {
    function Group() {
        this.id = undefined;
        this.name = undefined;
        this.description = undefined;
        this.project = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
    __decorate([
        JsonProperty('id', String),
        __metadata("design:type", String)
    ], Group.prototype, "id", void 0);
    __decorate([
        JsonProperty('name', String),
        __metadata("design:type", String)
    ], Group.prototype, "name", void 0);
    __decorate([
        JsonProperty('description', String),
        __metadata("design:type", String)
    ], Group.prototype, "description", void 0);
    __decorate([
        JsonProperty('project', Project, false),
        __metadata("design:type", Project)
    ], Group.prototype, "project", void 0);
    __decorate([
        JsonProperty('status', Boolean),
        __metadata("design:type", Boolean)
    ], Group.prototype, "status", void 0);
    __decorate([
        JsonProperty('selfjoin', Boolean),
        __metadata("design:type", Boolean)
    ], Group.prototype, "selfjoin", void 0);
    Group = __decorate([
        JsonObject('Group')
    ], Group);
    return Group;
}());

var GroupResponse = /** @class */ (function () {
    function GroupResponse() {
        this.group = undefined;
    }
    __decorate([
        JsonProperty('group', Group),
        __metadata("design:type", Group)
    ], GroupResponse.prototype, "group", void 0);
    GroupResponse = __decorate([
        JsonObject('GroupResponse')
    ], GroupResponse);
    return GroupResponse;
}());

var GroupsResponse = /** @class */ (function () {
    function GroupsResponse() {
        this.groups = undefined;
    }
    __decorate([
        JsonProperty('groups', [Group]),
        __metadata("design:type", Array)
    ], GroupsResponse.prototype, "groups", void 0);
    GroupsResponse = __decorate([
        JsonObject('GroupsResponse')
    ], GroupsResponse);
    return GroupsResponse;
}());

var ListInfo = /** @class */ (function () {
    function ListInfo() {
        this.id = undefined;
        this.projectIri = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
    __decorate([
        JsonProperty('id', String, false),
        __metadata("design:type", String)
    ], ListInfo.prototype, "id", void 0);
    __decorate([
        JsonProperty('projectIri', String, false),
        __metadata("design:type", String)
    ], ListInfo.prototype, "projectIri", void 0);
    __decorate([
        JsonProperty('labels', [StringLiteral], true),
        __metadata("design:type", Array)
    ], ListInfo.prototype, "labels", void 0);
    __decorate([
        JsonProperty('comments', [StringLiteral], true),
        __metadata("design:type", Array)
    ], ListInfo.prototype, "comments", void 0);
    ListInfo = __decorate([
        JsonObject('ListInfo')
    ], ListInfo);
    return ListInfo;
}());

var ListNode = /** @class */ (function () {
    function ListNode() {
        this.id = undefined;
        this.name = undefined;
        this.label = undefined;
        this.children = undefined;
        this.level = undefined;
        this.position = undefined;
    }
    ListNode_1 = ListNode;
    var ListNode_1;
    __decorate([
        JsonProperty('id', String, false),
        __metadata("design:type", String)
    ], ListNode.prototype, "id", void 0);
    __decorate([
        JsonProperty('name', String, true),
        __metadata("design:type", String)
    ], ListNode.prototype, "name", void 0);
    __decorate([
        JsonProperty('label', String, true),
        __metadata("design:type", String)
    ], ListNode.prototype, "label", void 0);
    __decorate([
        JsonProperty('children', [ListNode_1], true),
        __metadata("design:type", Array)
    ], ListNode.prototype, "children", void 0);
    __decorate([
        JsonProperty('level', Number, true),
        __metadata("design:type", Number)
    ], ListNode.prototype, "level", void 0);
    __decorate([
        JsonProperty('position', Number, true),
        __metadata("design:type", Number)
    ], ListNode.prototype, "position", void 0);
    ListNode = ListNode_1 = __decorate([
        JsonObject('ListNode')
    ], ListNode);
    return ListNode;
}());

var List = /** @class */ (function () {
    function List() {
        this.listinfo = undefined;
        this.children = undefined;
    }
    __decorate([
        JsonProperty('listinfo', ListInfo, false),
        __metadata("design:type", ListInfo)
    ], List.prototype, "listinfo", void 0);
    __decorate([
        JsonProperty('children', [ListNode], false),
        __metadata("design:type", Array)
    ], List.prototype, "children", void 0);
    List = __decorate([
        JsonObject('List')
    ], List);
    return List;
}());

var ListInfoResponse = /** @class */ (function () {
    function ListInfoResponse() {
        this.listinfo = undefined;
    }
    __decorate([
        JsonProperty('listinfo', ListInfo, false),
        __metadata("design:type", ListInfo)
    ], ListInfoResponse.prototype, "listinfo", void 0);
    ListInfoResponse = __decorate([
        JsonObject('ListInfoResponse')
    ], ListInfoResponse);
    return ListInfoResponse;
}());

var ListNodeInfo = /** @class */ (function () {
    function ListNodeInfo() {
        this.id = undefined;
        this.name = undefined;
        this.projectIri = undefined;
        this.isRootNode = undefined;
        this.labels = undefined;
        this.comments = undefined;
    }
    __decorate([
        JsonProperty('id', String),
        __metadata("design:type", String)
    ], ListNodeInfo.prototype, "id", void 0);
    __decorate([
        JsonProperty('name', String, true),
        __metadata("design:type", String)
    ], ListNodeInfo.prototype, "name", void 0);
    __decorate([
        JsonProperty('projectIri', String, true),
        __metadata("design:type", String)
    ], ListNodeInfo.prototype, "projectIri", void 0);
    __decorate([
        JsonProperty('isRootNode', Boolean, true),
        __metadata("design:type", Boolean)
    ], ListNodeInfo.prototype, "isRootNode", void 0);
    __decorate([
        JsonProperty('labels', [StringLiteral]),
        __metadata("design:type", Array)
    ], ListNodeInfo.prototype, "labels", void 0);
    __decorate([
        JsonProperty('comments', [StringLiteral]),
        __metadata("design:type", Array)
    ], ListNodeInfo.prototype, "comments", void 0);
    ListNodeInfo = __decorate([
        JsonObject('ListNodeInfo')
    ], ListNodeInfo);
    return ListNodeInfo;
}());

var ListNodeInfoResponse = /** @class */ (function () {
    function ListNodeInfoResponse() {
        this.nodeinfo = undefined;
    }
    __decorate([
        JsonProperty('nodeinfo', ListNodeInfo, false),
        __metadata("design:type", ListNodeInfo)
    ], ListNodeInfoResponse.prototype, "nodeinfo", void 0);
    ListNodeInfoResponse = __decorate([
        JsonObject('ListNodeInfoResponse')
    ], ListNodeInfoResponse);
    return ListNodeInfoResponse;
}());

var ListResponse = /** @class */ (function () {
    function ListResponse() {
        this.list = undefined;
    }
    __decorate([
        JsonProperty('list', List, false),
        __metadata("design:type", List)
    ], ListResponse.prototype, "list", void 0);
    ListResponse = __decorate([
        JsonObject('ListResponse')
    ], ListResponse);
    return ListResponse;
}());

var ListsResponse = /** @class */ (function () {
    function ListsResponse() {
        this.lists = undefined;
    }
    __decorate([
        JsonProperty('lists', [ListNodeInfo], false),
        __metadata("design:type", Array)
    ], ListsResponse.prototype, "lists", void 0);
    ListsResponse = __decorate([
        JsonObject('ListsResponse')
    ], ListsResponse);
    return ListsResponse;
}());

var OntologyInfoShort = /** @class */ (function () {
    function OntologyInfoShort() {
        this.ontologyIri = undefined;
        this.ontologyName = undefined;
    }
    __decorate([
        JsonProperty('ontologyIri', String),
        __metadata("design:type", String)
    ], OntologyInfoShort.prototype, "ontologyIri", void 0);
    __decorate([
        JsonProperty('ontologyName', String),
        __metadata("design:type", String)
    ], OntologyInfoShort.prototype, "ontologyName", void 0);
    OntologyInfoShort = __decorate([
        JsonObject('OntologyInfoShort')
    ], OntologyInfoShort);
    return OntologyInfoShort;
}());

var PermissionData = /** @class */ (function () {
    function PermissionData() {
        this.groupsPerProject = undefined;
        this.administrativePermissionsPerProject = undefined;
    }
    __decorate([
        JsonProperty('groupsPerProject', Object),
        __metadata("design:type", Object)
    ], PermissionData.prototype, "groupsPerProject", void 0);
    __decorate([
        JsonProperty('administrativePermissionsPerProject', Object),
        __metadata("design:type", Object)
    ], PermissionData.prototype, "administrativePermissionsPerProject", void 0);
    PermissionData = __decorate([
        JsonObject('PermissionData')
    ], PermissionData);
    return PermissionData;
}());

var User = /** @class */ (function () {
    function User() {
        this.id = undefined;
        this.email = undefined;
        this.username = undefined;
        this.password = undefined;
        this.token = undefined;
        this.givenName = undefined;
        this.familyName = undefined;
        this.status = undefined;
        this.lang = undefined;
        this.groups = undefined;
        this.projects = undefined;
        this.sessionId = undefined;
        this.permissions = undefined;
        this.systemAdmin = false;
    }
    __decorate([
        JsonProperty('id', String),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        JsonProperty('email', String),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        JsonProperty('username', String),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        JsonProperty('password', String, true),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        JsonProperty('token', String, true),
        __metadata("design:type", String)
    ], User.prototype, "token", void 0);
    __decorate([
        JsonProperty('givenName', String),
        __metadata("design:type", String)
    ], User.prototype, "givenName", void 0);
    __decorate([
        JsonProperty('familyName', String),
        __metadata("design:type", String)
    ], User.prototype, "familyName", void 0);
    __decorate([
        JsonProperty('status', Boolean),
        __metadata("design:type", Boolean)
    ], User.prototype, "status", void 0);
    __decorate([
        JsonProperty('lang', String),
        __metadata("design:type", String)
    ], User.prototype, "lang", void 0);
    __decorate([
        JsonProperty('groups', [Group]),
        __metadata("design:type", Array)
    ], User.prototype, "groups", void 0);
    __decorate([
        JsonProperty('projects', [Project]),
        __metadata("design:type", Array)
    ], User.prototype, "projects", void 0);
    __decorate([
        JsonProperty('sessionId', String, true),
        __metadata("design:type", String)
    ], User.prototype, "sessionId", void 0);
    __decorate([
        JsonProperty('permissions', PermissionData),
        __metadata("design:type", PermissionData)
    ], User.prototype, "permissions", void 0);
    __decorate([
        JsonProperty('systemAdmin', Boolean, true),
        __metadata("design:type", Boolean)
    ], User.prototype, "systemAdmin", void 0);
    User = __decorate([
        JsonObject('User')
    ], User);
    return User;
}());

var ProjectMembersResponse = /** @class */ (function () {
    function ProjectMembersResponse() {
        this.members = undefined;
    }
    __decorate([
        JsonProperty('members', [User]),
        __metadata("design:type", Array)
    ], ProjectMembersResponse.prototype, "members", void 0);
    ProjectMembersResponse = __decorate([
        JsonObject('ProjectMembersResponse')
    ], ProjectMembersResponse);
    return ProjectMembersResponse;
}());

var ProjectResponse = /** @class */ (function () {
    function ProjectResponse() {
        this.project = undefined;
    }
    __decorate([
        JsonProperty('project', Project),
        __metadata("design:type", Project)
    ], ProjectResponse.prototype, "project", void 0);
    ProjectResponse = __decorate([
        JsonObject('ProjectResponse')
    ], ProjectResponse);
    return ProjectResponse;
}());

var ProjectsResponse = /** @class */ (function () {
    function ProjectsResponse() {
        this.projects = undefined;
    }
    __decorate([
        JsonProperty('projects', [Project]),
        __metadata("design:type", Array)
    ], ProjectsResponse.prototype, "projects", void 0);
    ProjectsResponse = __decorate([
        JsonObject('ProjectsResponse')
    ], ProjectsResponse);
    return ProjectsResponse;
}());

var CurrentUser = /** @class */ (function () {
    function CurrentUser() {
        this.name = undefined;
        this.jwt = undefined;
        this.lang = undefined;
        this.sysAdmin = undefined;
    }
    __decorate([
        JsonProperty('name', String),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "name", void 0);
    __decorate([
        JsonProperty('jwt', String, true),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "jwt", void 0);
    __decorate([
        JsonProperty('lang', String, true),
        __metadata("design:type", String)
    ], CurrentUser.prototype, "lang", void 0);
    __decorate([
        JsonProperty('sysAdmin', Boolean),
        __metadata("design:type", Boolean)
    ], CurrentUser.prototype, "sysAdmin", void 0);
    CurrentUser = __decorate([
        JsonObject
    ], CurrentUser);
    return CurrentUser;
}());

var UsersResponse = /** @class */ (function () {
    function UsersResponse() {
        this.users = undefined;
    }
    __decorate([
        JsonProperty('users', [User]),
        __metadata("design:type", Array)
    ], UsersResponse.prototype, "users", void 0);
    UsersResponse = __decorate([
        JsonObject('UsersResponse')
    ], UsersResponse);
    return UsersResponse;
}());

var UserResponse = /** @class */ (function () {
    function UserResponse() {
        this.user = undefined;
    }
    __decorate([
        JsonProperty('user', User),
        __metadata("design:type", User)
    ], UserResponse.prototype, "user", void 0);
    UserResponse = __decorate([
        JsonObject('UserResponse')
    ], UserResponse);
    return UserResponse;
}());

/**
 * Abstract class representing a text value object with or without markup.
 */
var ReadTextValue = /** @class */ (function () {
    function ReadTextValue() {
        this.type = KnoraConstants.TextValue;
    }
    return ReadTextValue;
}());
/**
 * Represents a text value object without markup (mere character string).
 */
var ReadTextValueAsString = /** @class */ (function (_super) {
    __extends(ReadTextValueAsString, _super);
    function ReadTextValueAsString(id, propIri, str) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.str = str;
        return _this;
    }
    ReadTextValueAsString.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsString;
    };
    ReadTextValueAsString.prototype.getContent = function () {
        return this.str;
    };
    return ReadTextValueAsString;
}(ReadTextValue));
/**
 * Represents resources referred to by standoff links.
 */
var ReferredResourcesByStandoffLink = /** @class */ (function () {
    function ReferredResourcesByStandoffLink() {
    }
    return ReferredResourcesByStandoffLink;
}());
/**
 * Represents a text value object with markup that has been turned into HTML.
 */
var ReadTextValueAsHtml = /** @class */ (function (_super) {
    __extends(ReadTextValueAsHtml, _super);
    function ReadTextValueAsHtml(id, propIri, html, referredResources) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.html = html;
        _this.referredResources = referredResources;
        return _this;
    }
    /**
     * Gets information about a resource referred to by a standoff link from a text value.
     *
     * @param {string} resourceIri the Iri of the referred resource.
     * @param {OntologyInformation} ontologyInfo ontology information.
     * @returns {string} information about the referred resource's class and its label.
     */
    ReadTextValueAsHtml.prototype.getReferredResourceInfo = function (resourceIri, ontologyInfo) {
        if (this.referredResources !== undefined && this.referredResources[resourceIri] !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResources[resourceIri].type);
            return this.referredResources[resourceIri].label + (" (" + resClassLabel + ")");
        }
        else {
            return 'no information found about referred resource (target of standoff link)';
        }
    };
    ReadTextValueAsHtml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsHtml;
    };
    ReadTextValueAsHtml.prototype.getContent = function () {
        return this.html;
    };
    return ReadTextValueAsHtml;
}(ReadTextValue));
/**
 * Represents a text value object with markup as XML.
 */
var ReadTextValueAsXml = /** @class */ (function (_super) {
    __extends(ReadTextValueAsXml, _super);
    function ReadTextValueAsXml(id, propIri, xml, mappingIri) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.propIri = propIri;
        _this.xml = xml;
        _this.mappingIri = mappingIri;
        return _this;
    }
    ReadTextValueAsXml.prototype.getClassName = function () {
        return KnoraConstants.ReadTextValueAsXml;
    };
    ReadTextValueAsXml.prototype.getContent = function () {
        return this.xml;
    };
    return ReadTextValueAsXml;
}(ReadTextValue));
/**
 * Represents a date value object.
 */
var ReadDateValue = /** @class */ (function () {
    function ReadDateValue(id, propIri, calendar, startYear, endYear, startEra, endEra, startMonth, endMonth, startDay, endDay) {
        this.id = id;
        this.propIri = propIri;
        this.calendar = calendar;
        this.startYear = startYear;
        this.endYear = endYear;
        this.startEra = startEra;
        this.endEra = endEra;
        this.startMonth = startMonth;
        this.endMonth = endMonth;
        this.startDay = startDay;
        this.endDay = endDay;
        this.type = KnoraConstants.DateValue;
        this.separator = '/';
    }
    ReadDateValue.prototype.getDateSalsah = function () {
        if (this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay === this.endDay && this.startEra === this.endEra) {
            // precise date
            return new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay);
        }
        else {
            // date period
            return new DateRangeSalsah(new DateSalsah(this.calendar, this.startEra, this.startYear, this.startMonth, this.startDay), new DateSalsah(this.calendar, this.endEra, this.endYear, this.endMonth, this.endDay));
        }
    };
    ReadDateValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDateValue;
    };
    ReadDateValue.prototype.getContent = function () {
        return this.getDateSalsah().getDateAsString();
    };
    return ReadDateValue;
}());
/**
 * Represents a link value object (reification).
 */
var ReadLinkValue = /** @class */ (function () {
    function ReadLinkValue(id, propIri, referredResourceIri, referredResource) {
        this.id = id;
        this.propIri = propIri;
        this.referredResourceIri = referredResourceIri;
        this.referredResource = referredResource;
        this.type = KnoraConstants.LinkValue;
    }
    ReadLinkValue.prototype.getReferredResourceInfo = function (ontologyInfo) {
        if (this.referredResource !== undefined) {
            var resClassLabel = ontologyInfo.getLabelForResourceClass(this.referredResource.type);
            return this.referredResource.label + (" (" + resClassLabel + ")");
        }
        else {
            return this.referredResourceIri;
        }
    };
    ReadLinkValue.prototype.getClassName = function () {
        return KnoraConstants.ReadLinkValue;
    };
    ReadLinkValue.prototype.getContent = function () {
        if (this.referredResource !== undefined) {
            return this.referredResource.label;
        }
        else {
            return this.referredResourceIri;
        }
    };
    return ReadLinkValue;
}());
/**
 * Represents an integer value object.
 */
var ReadIntegerValue = /** @class */ (function () {
    function ReadIntegerValue(id, propIri, integer) {
        this.id = id;
        this.propIri = propIri;
        this.integer = integer;
        this.type = KnoraConstants.IntValue;
    }
    ReadIntegerValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntegerValue;
    };
    ReadIntegerValue.prototype.getContent = function () {
        return this.integer.toString();
    };
    return ReadIntegerValue;
}());
/**
 * Represents a decimal value object.
 */
var ReadDecimalValue = /** @class */ (function () {
    function ReadDecimalValue(id, propIri, decimal) {
        this.id = id;
        this.propIri = propIri;
        this.decimal = decimal;
        this.type = KnoraConstants.DecimalValue;
    }
    ReadDecimalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadDecimalValue;
    };
    ReadDecimalValue.prototype.getContent = function () {
        return this.decimal.toString();
    };
    return ReadDecimalValue;
}());
/**
 * Represents a still image value object.
 */
var ReadStillImageFileValue = /** @class */ (function () {
    function ReadStillImageFileValue(id, propIri, imageFilename, imageServerIIIFBaseURL, imagePath, dimX, dimY) {
        this.id = id;
        this.propIri = propIri;
        this.imageFilename = imageFilename;
        this.imageServerIIIFBaseURL = imageServerIIIFBaseURL;
        this.imagePath = imagePath;
        this.dimX = dimX;
        this.dimY = dimY;
        this.type = KnoraConstants.StillImageFileValue;
        // if the image is a jpeg, it is a preview image
        this.isPreview = imageFilename.endsWith('.jpg');
    }
    ReadStillImageFileValue.prototype.makeIIIFUrl = function (reduceFactor) {
        if (this.isPreview) {
            return this.imagePath;
        }
        else {
            var percentage = Math.floor(100 / reduceFactor);
            percentage = (percentage > 0 && percentage <= 100) ? percentage : 50;
            return this.imageServerIIIFBaseURL + '/' + this.imageFilename + '/full/pct:' + percentage.toString() + '/0/default.jpg';
        }
    };
    ReadStillImageFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadStillImageFileValue;
    };
    ReadStillImageFileValue.prototype.getContent = function () {
        return this.imagePath;
    };
    return ReadStillImageFileValue;
}());
/**
 * Represents a text representation value object
 */
var ReadTextFileValue = /** @class */ (function () {
    function ReadTextFileValue(id, propIri, textFilename, textFileURL) {
        this.id = id;
        this.propIri = propIri;
        this.textFilename = textFilename;
        this.textFileURL = textFileURL;
        this.type = KnoraConstants.TextFileValue;
    }
    ReadTextFileValue.prototype.getClassName = function () {
        return KnoraConstants.ReadTextFileValue;
    };
    ReadTextFileValue.prototype.getContent = function () {
        return this.textFileURL;
    };
    return ReadTextFileValue;
}());
/**
 * Represents a color value object.
 */
var ReadColorValue = /** @class */ (function () {
    function ReadColorValue(id, propIri, colorHex) {
        this.id = id;
        this.propIri = propIri;
        this.colorHex = colorHex;
        this.type = KnoraConstants.ColorValue;
    }
    ReadColorValue.prototype.getClassName = function () {
        return KnoraConstants.ReadColorValue;
    };
    ReadColorValue.prototype.getContent = function () {
        return this.colorHex;
    };
    return ReadColorValue;
}());
/**
 * Represents a point in a 2D-coordinate system (for geometry values).
 */
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point2D;
}());
/**
 * Represents a geometry value parsed from JSON.
 */
var RegionGeometry = /** @class */ (function () {
    function RegionGeometry(status, lineColor, lineWidth, points, type, radius) {
        this.status = status;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.points = points;
        this.type = type;
        this.radius = radius;
    }
    return RegionGeometry;
}());
/**
 * Represents a geometry value object.
 */
var ReadGeomValue = /** @class */ (function () {
    function ReadGeomValue(id, propIri, geometryString) {
        var e_1, _a;
        this.id = id;
        this.propIri = propIri;
        this.geometryString = geometryString;
        this.type = KnoraConstants.GeomValue;
        var geometryJSON = JSON.parse(geometryString);
        var points = [];
        try {
            for (var _b = __values(geometryJSON.points), _c = _b.next(); !_c.done; _c = _b.next()) {
                var point = _c.value;
                points.push(new Point2D(point.x, point.y));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var radius;
        if (geometryJSON.radius) {
            radius = new Point2D(geometryJSON.radius.x, geometryJSON.radius.y);
        }
        this.geometry = new RegionGeometry(geometryJSON.status, geometryJSON.lineColor, geometryJSON.lineWidth, points, geometryJSON.type, radius);
    }
    ReadGeomValue.prototype.getClassName = function () {
        return KnoraConstants.ReadGeomValue;
    };
    ReadGeomValue.prototype.getContent = function () {
        return this.geometryString;
    };
    return ReadGeomValue;
}());
/**
 * Represents a URI value object.
 */
var ReadUriValue = /** @class */ (function () {
    function ReadUriValue(id, propIri, uri) {
        this.id = id;
        this.propIri = propIri;
        this.uri = uri;
        this.type = KnoraConstants.UriValue;
    }
    ReadUriValue.prototype.getClassName = function () {
        return KnoraConstants.ReadUriValue;
    };
    ReadUriValue.prototype.getContent = function () {
        return this.uri;
    };
    return ReadUriValue;
}());
/**
 * Represents a Boolean value object.
 */
var ReadBooleanValue = /** @class */ (function () {
    function ReadBooleanValue(id, propIri, bool) {
        this.id = id;
        this.propIri = propIri;
        this.bool = bool;
        this.type = KnoraConstants.BooleanValue;
    }
    ReadBooleanValue.prototype.getClassName = function () {
        return KnoraConstants.ReadBooleanValue;
    };
    ReadBooleanValue.prototype.getContent = function () {
        return this.bool.toString();
    };
    return ReadBooleanValue;
}());
/**
 * Represents an interval value object.
 */
var ReadIntervalValue = /** @class */ (function () {
    function ReadIntervalValue(id, propIri, intervalStart, intervalEnd) {
        this.id = id;
        this.propIri = propIri;
        this.intervalStart = intervalStart;
        this.intervalEnd = intervalEnd;
        this.type = KnoraConstants.IntervalValue;
    }
    ReadIntervalValue.prototype.getClassName = function () {
        return KnoraConstants.ReadIntervalValue;
    };
    ReadIntervalValue.prototype.getContent = function () {
        return this.intervalStart.toString() + '-' + this.intervalEnd;
    };
    return ReadIntervalValue;
}());
/**
 * Represents an interval value object.
 */
var ReadListValue = /** @class */ (function () {
    function ReadListValue(id, propIri, listNodeIri, listNodeLabel) {
        this.id = id;
        this.propIri = propIri;
        this.listNodeIri = listNodeIri;
        this.listNodeLabel = listNodeLabel;
        this.type = KnoraConstants.ListValue;
    }
    ReadListValue.prototype.getClassName = function () {
        return KnoraConstants.ReadListValue;
    };
    ReadListValue.prototype.getContent = function () {
        return this.listNodeLabel;
    };
    return ReadListValue;
}());

/**
 * Represents a resource and its properties.
 */
var ReadResource = /** @class */ (function () {
    /**
     *
     * @param {string} id the resource's Iri.
     * @param {string} type the resource's type (class).
     * @param {string} label the resource's rdfs:label.
     * @param {Array<ReadResource>} incomingRegions regions pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingStillImageRepresentations still image representations pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {Array<ReadResource>} incomingLinks resources pointing to this resource, if any (possibly to be queried by additional requests).
     * @param {StillImageRepresentation[]} stillImageRepresentationsToDisplay  still image representations to be displayed for this resource, if any (possibly to be queried by additional requests).
     * @param {ReadProperties} properties the resources's properties.
     */
    function ReadResource(id, type, label, incomingRegions, incomingStillImageRepresentations, incomingLinks, stillImageRepresentationsToDisplay, properties) {
        this.id = id;
        this.type = type;
        this.label = label;
        this.incomingRegions = incomingRegions;
        this.incomingStillImageRepresentations = incomingStillImageRepresentations;
        this.incomingLinks = incomingLinks;
        this.stillImageRepresentationsToDisplay = stillImageRepresentationsToDisplay;
        this.properties = properties;
    }
    return ReadResource;
}());

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
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient), inject("config")); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());

/**
 * Requests ontology information from Knora.
 */
var OntologyService = /** @class */ (function (_super) {
    __extends(OntologyService, _super);
    function OntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET list of ontologies
    // ------------------------------------------------------------------------
    /**
     * DEPRECATED: You should use getAllOntologies()
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getOntologiesMetadata = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the metadata about all existing ontologies from Knora's ontologies route.
     *
     * @returns Observable<ApiServiceResult> - the metadata of all ontologies.
     */
    OntologyService.prototype.getAllOntologies = function () {
        return this.httpGet('/v2/ontologies/metadata');
    };
    /**
     * Requests the ontologies of a specific project
     *
     * @param projectIri
     * @returns Observable<ApiServiceResult> - the metadata of project ontologies.
     */
    OntologyService.prototype.getProjectOntologies = function (projectIri) {
        return this.httpGet('/v2/ontologies/metadata/' + encodeURIComponent(projectIri));
    };
    // ------------------------------------------------------------------------
    // GET ontology
    // ------------------------------------------------------------------------
    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param {string} ontologyIri the Iris of the named graphs whose resource classes are to be returned.
     * @returns Observable<ApiServiceResult> - the requested ontology.
     */
    OntologyService.prototype.getAllEntityDefinitionsForOntologies = function (ontologyIri) {
        return this.httpGet('/v2/ontologies/allentities/' + encodeURIComponent(ontologyIri));
    };
    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param {string[]} resourceClassIris the Iris of the resource classes to be queried.
     * @returns Observable<ApiServiceResult> - the requested resource class definitions.
     */
    OntologyService.prototype.getResourceClasses = function (resourceClassIris) {
        if (resourceClassIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No resource class Iris given for call of OntologyService.getResourceClasses'); });
        }
        var resClassUriEnc = '';
        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/classes' + resClassUriEnc);
    };
    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param {string[]} propertyIris the Iris of the properties to be queried.
     * @returns Observable<ApiServiceResult> - the requested properties.
     */
    OntologyService.prototype.getProperties = function (propertyIris) {
        if (propertyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(function (observer) { return observer.error('No property Iris given for call of OntologyService.getProperties'); });
        }
        var propertiesUriEnc = '';
        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + '/' + encodeURIComponent(resClassIri.toString());
        });
        return this.httpGet('/v2/ontologies/properties' + propertiesUriEnc);
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new ontology.
     *
     * @param {NewOntology} data Data contains: projectIri, name, label
     * @returns Observable<ApiServiceResult>
     */
    OntologyService.prototype.createOntology = function (data) {
        var path = '/v2/ontologies';
        var ontology = {
            'knora-api:ontologyName': data.name,
            'knora-api:attachedToProject': {
                '@id': data.projectIri,
            },
            'rdfs:label': data.label,
            '@context': {
                'rdfs': KnoraConstants.RdfsSchema,
                'knora-api': KnoraConstants.KnoraApiV2WithValueObjectPath
            }
        };
        return this.httpPost(path, ontology).pipe(map(function (result) { return result.body; }), catchError(this.handleJsonError));
    };
    OntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    OntologyService.ngInjectableDef = defineInjectable({ factory: function OntologyService_Factory() { return new OntologyService(inject(HttpClient), inject("config")); }, token: OntologyService, providedIn: "root" });
    return OntologyService;
}(ApiService));

var jsonld$1 = require('jsonld');
/**
 * Represents an error occurred in OntologyCacheService.
 */
var OntologyCacheError = /** @class */ (function (_super) {
    __extends(OntologyCacheError, _super);
    function OntologyCacheError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return OntologyCacheError;
}(Error));
/**
 * Represents an ontology's metadata.
 */
var OntologyMetadata = /** @class */ (function () {
    /**
     * @hideconstructor
     *
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    function OntologyMetadata(id, label) {
        this.id = id;
        this.label = label;
    }
    return OntologyMetadata;
}());
/**
 * Occurrence of a property for a resource class (its cardinality).
 */
var CardinalityOccurrence;
(function (CardinalityOccurrence) {
    CardinalityOccurrence[CardinalityOccurrence["minCard"] = 0] = "minCard";
    CardinalityOccurrence[CardinalityOccurrence["card"] = 1] = "card";
    CardinalityOccurrence[CardinalityOccurrence["maxCard"] = 2] = "maxCard";
})(CardinalityOccurrence || (CardinalityOccurrence = {}));
/**
 * Cardinality of a property for the given resource class.
 */
var Cardinality = /** @class */ (function () {
    /**
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    function Cardinality(occurrence, value, property) {
        this.occurrence = occurrence;
        this.value = value;
        this.property = property;
    }
    return Cardinality;
}());
/**
 * A resource class definition.
 */
var ResourceClass = /** @class */ (function () {
    /**
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label describing the resource class.
     * @param {Cardinality[]} cardinalities the resource class's properties.
     */
    function ResourceClass(id, icon, comment, label, cardinalities) {
        this.id = id;
        this.icon = icon;
        this.comment = comment;
        this.label = label;
        this.cardinalities = cardinalities;
    }
    return ResourceClass;
}());
/**
 * A map of resource class Iris to resource class definitions.
 */
var ResourceClasses = /** @class */ (function () {
    function ResourceClasses() {
    }
    return ResourceClasses;
}());
/**
 * A property definition.
 */
var Property = /** @class */ (function () {
    /**
     * @param {string} id Iri identifying the property definition.
     * @param {string} objectType the property's object constraint.
     * @param {string} comment comment on the property definition.
     * @param {string} label label describing the property definition.
     * @param {string[]} subPropertyOf Iris of properties the given property is a subproperty of.
     * @param {boolean} isEditable indicates whether the given property can be edited by the client.
     * @param {boolean} isLinkProperty indicates whether the given property is a linking property.
     * @param {boolean} isLinkValueProperty indicates whether the given property refers to a link value.
     */
    function Property(id, objectType, comment, label, subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty) {
        this.id = id;
        this.objectType = objectType;
        this.comment = comment;
        this.label = label;
        this.subPropertyOf = subPropertyOf;
        this.isEditable = isEditable;
        this.isLinkProperty = isLinkProperty;
        this.isLinkValueProperty = isLinkValueProperty;
    }
    return Property;
}());
/**
 * A map of property Iris to property definitions.
 */
var Properties = /** @class */ (function () {
    function Properties() {
    }
    return Properties;
}());
/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
var ResourceClassIrisForOntology = /** @class */ (function () {
    function ResourceClassIrisForOntology() {
    }
    return ResourceClassIrisForOntology;
}());
/**
 * Represents cached ontology information (only used by this service internally).
 * This cache is updated whenever new definitions are requested from Knora.
 *
 * Requested ontology information by a service is represented by [[OntologyInformation]].
 */
var OntologyCache = /** @class */ (function () {
    function OntologyCache() {
        this.ontologies = [];
        this.resourceClassIrisForOntology = new ResourceClassIrisForOntology();
        this.resourceClasses = new ResourceClasses();
        this.properties = new Properties();
    }
    return OntologyCache;
}());
/**
 * Represents ontology information requested from this service.
 *
 * For every request, an instance of this class is returned containing the requested information.
 */
var OntologyInformation = /** @class */ (function () {
    /**
     * @param {ResourceClassIrisForOntology} resourceClassesForOntology all resource class Iris for a given ontology.
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    function OntologyInformation(resourceClassesForOntology, resourceClasses, properties) {
        this.resourceClassesForOntology = resourceClassesForOntology;
        this.resourceClasses = resourceClasses;
        this.properties = properties;
    }
    /**
     * Sorts an array of `ResourceClass` or `Property` by label.
     *
     * @param a first element
     * @param b second element
     * @return negative -1 if the first element is considered lower than the second, 1 if the second element is considered bigger, 0 if they are equal
     */
    OntologyInformation.sortFunc = function (a, b) {
        // dealing with 'undefined' labels
        if (a.label === undefined) {
            return 1;
        }
        else if (b.label === undefined) {
            return -1;
        }
        var labelA = a.label.toLowerCase();
        var labelB = b.label.toLowerCase();
        if (labelA < labelB) {
            return -1;
        }
        else if (labelA > labelB) {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     * This is necessary when a service like the search fetches new results
     * that have to be added to an existing collection.
     * The existing ontology information must not be lost.
     *
     * @param {OntologyInformation} ontologyInfo the given definitions that have to be integrated.
     * @returns void
     */
    OntologyInformation.prototype.updateOntologyInformation = function (ontologyInfo) {
        // get new resourceClassIrisForOntology
        var newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();
        // update new resourceClassIrisForOntology
        // tslint:disable-next-line:forin
        for (var newResClassForOntology in newResourceClassesForOntology) {
            this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology];
        }
        // get new resource class definitions
        var newResourceClasses = ontologyInfo.getResourceClasses();
        // update resourceClasses
        // tslint:disable-next-line:forin
        for (var newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }
        // get new property definitions
        var newProperties = ontologyInfo.getProperties();
        // update properties
        // tslint:disable-next-line:forin
        for (var newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }
    };
    /**
     * Returns resource class definitions for ontologies.
     *
     * @returns ResourceClassIrisForOntology - all resource class definitions grouped by ontologies.
     */
    OntologyInformation.prototype.getResourceClassForOntology = function () {
        return this.resourceClassesForOntology;
    };
    /**
     * Returns all resource classes as an object.
     *
     * @returns ResourceClasses - all resource class definitions as an object.
     */
    OntologyInformation.prototype.getResourceClasses = function () {
        return this.resourceClasses;
    };
    /**
     * Returns all resource classes as an array.
     *
     * @param {boolean} sortAsc sort resource classes by label in ascending order by default
     * @returns ResourceClass[]
     */
    OntologyInformation.prototype.getResourceClassesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var resClasses = [];
        // tslint:disable-next-line:forin
        for (var resClassIri in this.resourceClasses) {
            var resClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }
        // resourceClasses order by label in ascending order
        resClasses.sort(OntologyInformation.sortFunc);
        // resourceClasses order by label in descending order
        if (!sortAsc) {
            resClasses.reverse();
        }
        return resClasses;
    };
    /**
     * Returns a resource class's label.
     *
     * @param {string} resClass resource class to query for.
     * @returns string - the resource class's label.
     */
    OntologyInformation.prototype.getLabelForResourceClass = function (resClass) {
        if (resClass !== undefined) {
            var resClassDef = this.resourceClasses[resClass];
            if (resClassDef !== undefined && resClassDef.label !== undefined) {
                return resClassDef.label;
            }
            else {
                return resClassDef.id;
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForResourceClass without argument resClass');
        }
    };
    /**
     * Returns all properties as an object.
     *
     * @returns Properties - all properties as an object.
     */
    OntologyInformation.prototype.getProperties = function () {
        return this.properties;
    };
    /**
     * Returns all properties as an array.
     *
     * @param {boolean} sortAsc sort properties by label in ascending order by default
     * @returns Property[] - all properties as an array.
     */
    OntologyInformation.prototype.getPropertiesAsArray = function (sortAsc) {
        if (sortAsc === void 0) { sortAsc = true; }
        var properties = [];
        // tslint:disable-next-line:forin
        for (var propIri in this.properties) {
            var prop = this.properties[propIri];
            properties.push(prop);
        }
        // properties order by label in ascending order
        properties.sort(OntologyInformation.sortFunc);
        // properties order by label in descending order
        if (!sortAsc) {
            properties.reverse();
        }
        return properties;
    };
    /**
     * Returns a property's label.
     *
     * @param {string} property to query for.
     * @returns string - the property's label.
     */
    OntologyInformation.prototype.getLabelForProperty = function (property) {
        if (property !== undefined) {
            var propDef = this.properties[property];
            if (propDef !== undefined && propDef.label !== undefined) {
                return propDef.label;
            }
            else {
                return propDef.id;
            }
        }
        else {
            console.log('call of OntologyInformation.getLabelForProperty without argument property');
        }
    };
    return OntologyInformation;
}());
/**
 * Requests ontology information from Knora and caches it.
 * Other components or services obtain ontology information through this service.
 */
var OntologyCacheService = /** @class */ (function () {
    function OntologyCacheService(_ontologyService) {
        this._ontologyService = _ontologyService;
        /**
         * Ontologies ingored by this service.
         * @param {string[]} excludedOntologies
         */
        this.excludedOntologies = [KnoraConstants.SalsahGuiOntology, KnoraConstants.StandoffOntology];
        /**
         * @param {string[]} excludedProperties properties that Knora is not responsible for and that have to be ignored because they cannot be resolved at the moment.
         */
        this.excludedProperties = [KnoraConstants.RdfsLabel];
        /**
         * @param {string[]} nonResourceClasses class definitions that are not be treated as Knora resource classes
         */
        this.nonResourceClasses = [KnoraConstants.ForbiddenResource, KnoraConstants.XMLToStandoffMapping, KnoraConstants.ListNode];
        /**
         * @param {OntologyCache} cacheOntology central instance that caches all definitions
         */
        this.cacheOntology = new OntologyCache();
    }
    /**
     * Requests the metadata of all ontologies from Knora.
     *
     * @returns Observable<object> - metadata for all ontologies as JSON-LD (no prefixes, all Iris fully expanded).
     */
    OntologyCacheService.prototype.getOntologiesMetadataFromKnora = function () {
        return this._ontologyService.getOntologiesMetadata().pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld$1.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Requests all entity definitions (resource classes and properties) for the given ontology from Knora.
     *
     * @param {string} ontologyIri the Iri of the requested ontology.
     * @returns Observable<object> - metadata for all entity definitions for ontology from Knora.
     */
    OntologyCacheService.prototype.getAllEntityDefinitionsForOntologyFromKnora = function (ontologyIri) {
        return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIri).pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        // http://reactivex.io/documentation/operators/flatmap.html
        // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
        function (ontRes) {
            var ontPromises = jsonld$1.promises;
            // compact JSON-LD using an empty context: expands all Iris
            var ontPromise = ontPromises.compact(ontRes.body, {});
            // convert promise to Observable and return it
            // https://www.learnrxjs.io/operators/creation/frompromise.html
            return from(ontPromise);
        }));
    };
    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {object[]} ontologies metadata of all existing ontologies as JSON-LD.
     * @returns a new OntologyMetadata object
     */
    OntologyCacheService.prototype.convertAndWriteOntologiesMetadataToCache = function (ontologies) {
        this.cacheOntology.ontologies = ontologies.map(function (ontology) {
            return new OntologyMetadata(ontology['@id'], ontology[KnoraConstants.RdfsLabel]);
        });
    };
    /**
     * Returns all ontologies' metadata from the cache and returns them.
     *
     * @returns Array<OntologyMetadata> - metadata of all existing ontologies.
     */
    OntologyCacheService.prototype.getAllOntologiesMetadataFromCache = function () {
        return this.cacheOntology.ontologies;
    };
    /**
     * Returns resource class Iris from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Array<object>} classDefinitions the class definitions in an ontology response.
     * @returns string[] - resource class Iris from the given class definitions.
     */
    OntologyCacheService.prototype.getResourceClassIrisFromOntologyResponse = function (classDefinitions) {
        var e_1, _a;
        var resourceClassIris = [];
        try {
            for (var classDefinitions_1 = __values(classDefinitions), classDefinitions_1_1 = classDefinitions_1.next(); !classDefinitions_1_1.done; classDefinitions_1_1 = classDefinitions_1.next()) {
                var classDef = classDefinitions_1_1.value;
                var classIri = classDef['@id'];
                // check that class name is not listed as a non resource class and that the isResourceClass flag is present and set to true
                if (classIri !== KnoraConstants.Resource && this.nonResourceClasses.indexOf(classIri)
                    === -1 && (classDef[KnoraConstants.IsResourceClass] !== undefined && classDef[KnoraConstants.IsResourceClass] === true)) {
                    // it is not a value class, but a resource class definition
                    resourceClassIris.push(classIri);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (classDefinitions_1_1 && !classDefinitions_1_1.done && (_a = classDefinitions_1.return)) _a.call(classDefinitions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return resourceClassIris;
    };
    /**
     * Converts a Knora response for all entity definitions for the requested ontology
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions referred to in the cardinalities of resource classes.
     * If they are defined in another ontology, that ontology is requested from Knora too.
     *
     * @param {Object} ontology the ontology to be cached.
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteAllEntityDefinitionsForOntologyToCache = function (ontology) {
        var graph = ontology['@graph'];
        // get all class definitions
        var classDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlClass;
        });
        // get all property definitions
        var propertyDefs = graph.filter(function (entity) {
            var entityType = entity['@type'];
            return entityType === KnoraConstants.OwlObjectProperty ||
                entityType === KnoraConstants.OwlDatatypeProperty ||
                entityType === KnoraConstants.OwlAnnotationProperty ||
                entityType === KnoraConstants.RdfProperty;
        });
        // cache all resource class Iris belonging to the current ontology
        this.cacheOntology.resourceClassIrisForOntology[ontology['@id']] = this.getResourceClassIrisFromOntologyResponse(classDefs);
        // write class and property defintions to cache
        this.convertAndWriteEntityDefinitionsToCache(classDefs, propertyDefs);
    };
    /**
     * Returns definitions for the requested ontologies from the cache.
     *
     * @param {string[]} ontologyIris the ontologies for which definitions should be returned.
     * @returns Observable<OntologyInformation> - the definitions for the requested ontologies.
     */
    OntologyCacheService.prototype.getOntologyInformationFromCache = function (ontologyIris) {
        var e_2, _a;
        var resourceClassesForOntology = new ResourceClassIrisForOntology();
        // collect resource class Iris for all requested named graphs
        var allResourceClassIris = [];
        try {
            for (var ontologyIris_1 = __values(ontologyIris), ontologyIris_1_1 = ontologyIris_1.next(); !ontologyIris_1_1.done; ontologyIris_1_1 = ontologyIris_1.next()) {
                var ontologyIri = ontologyIris_1_1.value;
                if (this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined) {
                    throw new OntologyCacheError("getResourceClassesForOntologiesFromCache: ontology not found in cache: " + ontologyIri);
                }
                // add information for the given ontology
                resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassIrisForOntology[ontologyIri];
                // add all resource class Iris of this ontology
                allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassIrisForOntology[ontologyIri]);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ontologyIris_1_1 && !ontologyIris_1_1.done && (_a = ontologyIris_1.return)) _a.call(ontologyIris_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // get resource class definitions for all requested ontologies
        return this.getResourceClassDefinitions(allResourceClassIris).pipe(map(function (resClassDefs) {
            return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties());
        }));
    };
    /**
     * Converts a Knora ontology response into an internal representation and caches it.
     *
     * @param {object[]} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {object[]} propertyClassDefinitions the property definitions returned by Knora.
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteEntityDefinitionsToCache = function (resourceClassDefinitions, propertyClassDefinitions) {
        var e_3, _a, e_4, _b;
        try {
            // convert and cache each given resource class definition
            for (var resourceClassDefinitions_1 = __values(resourceClassDefinitions), resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next(); !resourceClassDefinitions_1_1.done; resourceClassDefinitions_1_1 = resourceClassDefinitions_1.next()) {
                var resClass = resourceClassDefinitions_1_1.value;
                var resClassIri = resClass['@id'];
                // represents all cardinalities of this resource class
                var cardinalities = [];
                if (resClass[KnoraConstants.RdfsSubclassOf] !== undefined) {
                    var subclassOfCollection = void 0;
                    // check if it is a single object or a collection
                    if (!Array.isArray(resClass[KnoraConstants.RdfsSubclassOf])) {
                        subclassOfCollection = [resClass[KnoraConstants.RdfsSubclassOf]];
                    }
                    else {
                        subclassOfCollection = resClass[KnoraConstants.RdfsSubclassOf];
                    }
                    try {
                        // get cardinalities for the properties of a resource class
                        for (var subclassOfCollection_1 = __values(subclassOfCollection), subclassOfCollection_1_1 = subclassOfCollection_1.next(); !subclassOfCollection_1_1.done; subclassOfCollection_1_1 = subclassOfCollection_1.next()) {
                            var curCard = subclassOfCollection_1_1.value;
                            // make sure it is a cardinality (it could also be an Iri of a superclass)
                            if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] === KnoraConstants.OwlRestriction) {
                                var newCard = void 0;
                                // get occurrence
                                if (curCard[KnoraConstants.OwlMinCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.minCard, curCard[KnoraConstants.OwlMinCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else if (curCard[KnoraConstants.OwlCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.card, curCard[KnoraConstants.OwlCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else if (curCard[KnoraConstants.OwlMaxCardinality] !== undefined) {
                                    newCard = new Cardinality(CardinalityOccurrence.maxCard, curCard[KnoraConstants.OwlMaxCardinality], curCard[KnoraConstants.OwlOnProperty]['@id']);
                                }
                                else {
                                    // no known occurrence found
                                    throw new TypeError("cardinality type invalid for " + resClass['@id'] + " " + curCard[KnoraConstants.OwlOnProperty]);
                                }
                                // TODO: get gui order
                                // add cardinality
                                cardinalities.push(newCard);
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (subclassOfCollection_1_1 && !subclassOfCollection_1_1.done && (_b = subclassOfCollection_1.return)) _b.call(subclassOfCollection_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                var resClassObj = new ResourceClass(resClassIri, resClass[KnoraConstants.ResourceIcon], resClass[KnoraConstants.RdfsComment], resClass[KnoraConstants.RdfsLabel], cardinalities);
                // write this resource class definition to the cache object
                this.cacheOntology.resourceClasses[resClassIri] = resClassObj;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (resourceClassDefinitions_1_1 && !resourceClassDefinitions_1_1.done && (_a = resourceClassDefinitions_1.return)) _a.call(resourceClassDefinitions_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // cache the property definitions
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
    };
    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities of the given resource classes.
     *
     * @param {string[]} resClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - an [[OntologyCache]] representing the requested resource classes.
     */
    OntologyCacheService.prototype.getResourceClassDefinitionsFromCache = function (resClassIris) {
        // collect the definitions for each resource class from the cache
        var _this = this;
        var resClassDefs = new ResourceClasses();
        // collect the properties from the cardinalities of the given resource classes
        var propertyIris = [];
        resClassIris.forEach(function (resClassIri) {
            resClassDefs[resClassIri] = _this.cacheOntology.resourceClasses[resClassIri];
            _this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(function (card) {
                // get property definition for each cardinality
                propertyIris.push(card.property);
            });
        });
        return this.getPropertyDefinitions(propertyIris).pipe(map(function (propDefs) {
            return new OntologyInformation(new ResourceClassIrisForOntology(), resClassDefs, propDefs.getProperties());
        }));
    };
    /**
     * Converts a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param {object[]} propertyDefinitionsFromKnora the property definitions returned by Knora
     * @returns void
     */
    OntologyCacheService.prototype.convertAndWriteKnoraPropertyDefinitionsToOntologyCache = function (propertyDefinitionsFromKnora) {
        var e_5, _a;
        try {
            // convert and cache each given property definition
            for (var propertyDefinitionsFromKnora_1 = __values(propertyDefinitionsFromKnora), propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next(); !propertyDefinitionsFromKnora_1_1.done; propertyDefinitionsFromKnora_1_1 = propertyDefinitionsFromKnora_1.next()) {
                var propDef = propertyDefinitionsFromKnora_1_1.value;
                var propIri = propDef['@id'];
                var isEditable = false;
                if (propDef[KnoraConstants.isEditable] !== undefined && propDef[KnoraConstants.isEditable] === true) {
                    isEditable = true;
                }
                var isLinkProperty = false;
                if (propDef[KnoraConstants.isLinkProperty] !== undefined && propDef[KnoraConstants.isLinkProperty] === true) {
                    isLinkProperty = true;
                }
                var isLinkValueProperty = false;
                if (propDef[KnoraConstants.isLinkValueProperty] !== undefined && propDef[KnoraConstants.isLinkValueProperty] === true) {
                    isLinkValueProperty = true;
                }
                var subPropertyOf = [];
                if (propDef[KnoraConstants.subPropertyOf] !== undefined && Array.isArray(propDef[KnoraConstants.subPropertyOf])) {
                    subPropertyOf = propDef[KnoraConstants.subPropertyOf].map(function (superProp) { return superProp['@id']; });
                }
                else if (propDef[KnoraConstants.subPropertyOf] !== undefined) {
                    subPropertyOf.push(propDef[KnoraConstants.subPropertyOf]['@id']);
                }
                var objectType = void 0;
                if (propDef[KnoraConstants.ObjectType] !== undefined) {
                    objectType = propDef[KnoraConstants.ObjectType]['@id'];
                }
                // cache property definition
                this.cacheOntology.properties[propIri] = new Property(propIri, objectType, propDef[KnoraConstants.RdfsComment], propDef[KnoraConstants.RdfsLabel], subPropertyOf, isEditable, isLinkProperty, isLinkValueProperty);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (propertyDefinitionsFromKnora_1_1 && !propertyDefinitionsFromKnora_1_1.done && (_a = propertyDefinitionsFromKnora_1.return)) _a.call(propertyDefinitionsFromKnora_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    /**
     * Returns property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns OntologyInformation - requested property defintions.
     */
    OntologyCacheService.prototype.getPropertyDefinitionsFromCache = function (propertyIris) {
        var _this = this;
        var propertyDefs = new Properties();
        propertyIris.forEach(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return;
            }
            if (_this.cacheOntology.properties[propIri] === undefined) {
                throw new OntologyCacheError("getPropertyDefinitionsFromCache: property not found in cache: " + propIri);
            }
            propertyDefs[propIri] = _this.cacheOntology.properties[propIri];
        });
        return new OntologyInformation(new ResourceClassIrisForOntology(), new ResourceClasses(), propertyDefs);
    };
    /**
     * Returns metadata about all ontologies.
     *
     * @returns Observable<Array<OntologyMetadata>> - metadata about all ontologies.
     */
    OntologyCacheService.prototype.getOntologiesMetadata = function () {
        var _this = this;
        if (this.cacheOntology.ontologies.length === 0) {
            // nothing in cache yet, get metadata from Knora
            return this.getOntologiesMetadataFromKnora().pipe(map(function (metadata) {
                _this.convertAndWriteOntologiesMetadataToCache(metadata['@graph'].filter(function (onto) {
                    // ignore excluded ontologies
                    return _this.excludedOntologies.indexOf(onto['@id']) === -1;
                }));
                return _this.getAllOntologiesMetadataFromCache();
            }));
        }
        else {
            // return metadata from cache
            return of(this.getAllOntologiesMetadataFromCache());
        }
    };
    /**
     * Requests the requested ontologies from Knora, adding them to the cache.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be requested.
     * @returns Observable<any[]>
     */
    OntologyCacheService.prototype.getAndCacheOntologies = function (ontologyIris) {
        var _this = this;
        // array to be populated with Observables
        var observables = [];
        // do a request for each ontology
        ontologyIris.forEach(function (ontologyIri) {
            // push an Observable onto `observables`
            observables.push(_this.getAllEntityDefinitionsForOntologyFromKnora(ontologyIri).pipe(map(function (ontology) {
                // write response to cache
                _this.convertAndWriteAllEntityDefinitionsForOntologyToCache(ontology);
            })));
        });
        // forkJoin returns an Observable of an array of results
        // returned by each Observable contained in `observables`
        // a subscription to the Observable returned by forkJoin is executed
        // once all Observables have been completed
        return forkJoin(observables);
    };
    /**
     * Returns the entity definitions for the requested ontologies.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     * @returns Observable<OntologyInformation> - all ontology metadata from the cache
     */
    OntologyCacheService.prototype.getEntityDefinitionsForOntologies = function (ontologyIris) {
        var _this = this;
        var ontologyIrisToQuery = ontologyIris.filter(function (ontologyIri) {
            // return the ontology Iris that are not cached yet
            return _this.cacheOntology.resourceClassIrisForOntology[ontologyIri] === undefined;
        });
        // get ontologies that are mot cached yet
        if (ontologyIrisToQuery.length > 0) {
            return this.getAndCacheOntologies(ontologyIrisToQuery).pipe(mergeMap(function (results) {
                // executed once all ontologies have been cached
                return _this.getOntologyInformationFromCache(ontologyIris);
            }));
        }
        else {
            return this.getOntologyInformationFromCache(ontologyIris);
        }
    };
    /**
     * Returns the definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * Properties contained in the cardinalities will be returned too.
     *
     * @param {string[]} resourceClassIris the given resource class Iris
     * @returns Observable<OntologyInformation> - the requested resource classes (including properties).
     */
    OntologyCacheService.prototype.getResourceClassDefinitions = function (resourceClassIris) {
        var _this = this;
        var resClassIrisToQueryFor = resourceClassIris.filter(function (resClassIri) {
            // return the resource class Iris that are not cached yet
            return _this.cacheOntology.resourceClasses[resClassIri] === undefined;
        });
        if (resClassIrisToQueryFor.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing resource classes
            var ontologyIris = resClassIrisToQueryFor.map(function (resClassIri) {
                return Utils.getOntologyIriFromEntityIri(resClassIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(mergeMap(function (results) {
                return _this.getResourceClassDefinitionsFromCache(resourceClassIris);
            }));
        }
        else {
            return this.getResourceClassDefinitionsFromCache(resourceClassIris);
        }
    };
    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns Observable<OntologyInformation> - the requested property definitions.
     */
    OntologyCacheService.prototype.getPropertyDefinitions = function (propertyIris) {
        var _this = this;
        var propertiesToQuery = propertyIris.filter(function (propIri) {
            // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
            if (_this.excludedProperties.indexOf(propIri) > -1) {
                return false;
            }
            // return the property Iris that are not cached yet
            return _this.cacheOntology.properties[propIri] === undefined;
        });
        if (propertiesToQuery.length > 0) {
            // get a set of ontology Iris that have to be queried to obtain the missing properties
            var ontologyIris = propertiesToQuery.map(function (propIri) {
                return Utils.getOntologyIriFromEntityIri(propIri);
            }).filter(Utils.filterOutDuplicates);
            // obtain missing resource class information
            return this.getAndCacheOntologies(ontologyIris).pipe(map(function (results) {
                if (results) {
                    return _this.getPropertyDefinitionsFromCache(propertyIris);
                }
                else {
                    throw new Error('Problem with: return this.getPropertyDefinitionsFromCache(propertyIris);');
                }
            }));
        }
        else {
            return of(this.getPropertyDefinitionsFromCache(propertyIris));
        }
    };
    OntologyCacheService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    OntologyCacheService.ctorParameters = function () { return [
        { type: OntologyService }
    ]; };
    OntologyCacheService.ngInjectableDef = defineInjectable({ factory: function OntologyCacheService_Factory() { return new OntologyCacheService(inject(OntologyService)); }, token: OntologyCacheService, providedIn: "root" });
    return OntologyCacheService;
}());

/**
 * Represents a sequence of resources.
 */
var ReadResourcesSequence = /** @class */ (function () {
    /**
     *
     * @param {Array<ReadResource>} resources given sequence of resources.
     * @param {number} numberOfResources number of given resources.
     */
    function ReadResourcesSequence(resources, numberOfResources) {
        this.resources = resources;
        this.numberOfResources = numberOfResources;
        /**
         * Information about the entities used in the given collection of `ReadResource`.
         */
        this.ontologyInformation = new OntologyInformation({}, {}, {});
    }
    return ReadResourcesSequence;
}());

/**
 * Represents the result of a count query.
 */
var CountQueryResult = /** @class */ (function () {
    /**
     *
     * @param numberOfResults total number of results for a query.
     */
    function CountQueryResult(numberOfResults) {
        this.numberOfResults = numberOfResults;
    }
    return CountQueryResult;
}());

/**
 * Represents an image including its regions.
 */
var StillImageRepresentation = /** @class */ (function () {
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    function StillImageRepresentation(stillImageFileValue, regions) {
        this.stillImageFileValue = stillImageFileValue;
        this.regions = regions;
    }
    return StillImageRepresentation;
}());

/**
 * Represents a region.
 * Contains a reference to the resource representing the region and its geometries.
 */
var ImageRegion = /** @class */ (function () {
    /**
     *
     * @param {ReadResource} regionResource a resource of type Region
     */
    function ImageRegion(regionResource) {
        this.regionResource = regionResource;
    }
    /**
     * Get all geometry information belonging to this region.
     *
     * @returns {ReadGeomValue[]}
     */
    ImageRegion.prototype.getGeometries = function () {
        return this.regionResource.properties[KnoraConstants.hasGeometry];
    };
    return ImageRegion;
}());

var ɵ0 = KuiCoreConfig;
var KuiCoreModule = /** @class */ (function () {
    function KuiCoreModule() {
    }
    /**
     *
     * @param {KuiCoreConfig} config
     * @returns {ModuleWithProviders}
     */
    KuiCoreModule.forRoot = function (config) {
        // get the app environment configuration here
        // console.log(config);
        return {
            ngModule: KuiCoreModule,
            providers: [
                { provide: 'config', useValue: config }
            ]
        };
    };
    KuiCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule
                    ],
                    declarations: [],
                    exports: [
                        HttpClientModule
                    ],
                    providers: [
                        { provide: 'config', useValue: ɵ0 }
                    ]
                },] },
    ];
    return KuiCoreModule;
}());

/**
 * Request information about group from Knora.
 */
var GroupsService = /** @class */ (function (_super) {
    __extends(GroupsService, _super);
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
    GroupsService.ngInjectableDef = defineInjectable({ factory: function GroupsService_Factory() { return new GroupsService(inject(HttpClient), inject("config")); }, token: GroupsService, providedIn: "root" });
    return GroupsService;
}(ApiService));

/**
 * Request information about lists from Knora.
 */
var ListsService = /** @class */ (function (_super) {
    __extends(ListsService, _super);
    function ListsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.path = '/admin/lists';
        return _this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all lists.
     *
     * @param {string} [projectIri]
     * @returns Observable<ListNodeInfo[]>
     */
    ListsService.prototype.getLists = function (projectIri) {
        if (projectIri) {
            this.path += '?projectIri=' + encodeURIComponent(projectIri);
        }
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListsResponse).lists; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list object.
     *
     * @param {string} listIri
     * @returns Observable<List>
     */
    ListsService.prototype.getList = function (listIri) {
        return this.httpGet(this.path + '/' + encodeURIComponent(listIri)).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list info object.
     *
     * @param {string} listIri
     * @returns Observable<ListInfo>
     */
    ListsService.prototype.getListInfo = function (listIri) {
        this.path += '/infos/' + encodeURIComponent(listIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    /**
     * Return a list node info object.
     *
     * @param {string} nodeIri
     * @returns Observable<ListNodeInfo>
     */
    ListsService.prototype.getListNodeInfo = function (nodeIri) {
        this.path += '/nodes/' + encodeURIComponent(nodeIri);
        return this.httpGet(this.path).pipe(map(function (result) { return result.getBody(ListNodeInfoResponse).nodeinfo; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new list.
     *
     * @param {ListCreatePayload} payload
     * @returns Observable<List>
     */
    ListsService.prototype.createList = function (payload) {
        return this.httpPost(this.path, payload).pipe(map(function (result) { return result.getBody(ListResponse).list; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Edit list data.
     *
     * @param {ListInfoUpdatePayload} payload
     * @returns Observable<ListInfo>
     */
    ListsService.prototype.updateListInfo = function (payload) {
        this.path += '/infos/' + encodeURIComponent(payload.listIri);
        return this.httpPut(this.path, payload).pipe(map(function (result) { return result.getBody(ListInfoResponse).listinfo; }), catchError(this.handleJsonError));
    };
    ListsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ListsService.ngInjectableDef = defineInjectable({ factory: function ListsService_Factory() { return new ListsService(inject(HttpClient), inject("config")); }, token: ListsService, providedIn: "root" });
    return ListsService;
}(ApiService));

/**
 * Request information about projects from Knora.
 */
var ProjectsService = /** @class */ (function (_super) {
    __extends(ProjectsService, _super);
    function ProjectsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all projects.
     *
     * @returns Observable<Project[]>
     */
    ProjectsService.prototype.getAllProjects = function () {
        return this.httpGet('/admin/projects').pipe(map(function (result) { return result.getBody(ProjectsResponse).projects; }), catchError(this.handleJsonError));
    };
    /**
     * Returns a project object.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByIri = function (iri) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    };
    /**
     * Returns a project object.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByShortname = function (shortname) {
        var url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    };
    /**
     * Returns a project object.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProjectByShortcode = function (shortcode) {
        var url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    };
    /**
     * @private
     * Helper method combining project retrieval.
     *
     * @param {string} url
     * @returns Observable<Project>
     */
    ProjectsService.prototype.getProject = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * Returns all project members.
     * Project identifier is project id (iri).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByIri = function (iri) {
        var url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    };
    /**
     * Returns all project members.
     * Project identifier is shortname.
     *
     * @param {string} shortname short name that is used to identify the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByShortname = function (shortname) {
        var url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    };
    /**
     * Returns all project members.
     * Project identifier is shortcode.
     *
     * @param {string} shortcode hexadecimal code that uniquely identifies the project
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembersByShortcode = function (shortcode) {
        var url = '/admin/projects/members/' + shortcode + '?identifier=shortcode';
        return this.getProjectMembers(url);
    };
    /**
     * @private
     * Helper method combining project member retrieval.
     *
     * @param {string} url
     * @returns Observable<User[]>
     */
    ProjectsService.prototype.getProjectMembers = function (url) {
        return this.httpGet(url).pipe(map(function (result) { return result.getBody(ProjectMembersResponse).members; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new project.
     *
     * @param {any} data
     * @returns Observable<Project>
     */
    ProjectsService.prototype.createProject = function (data) {
        var url = '/admin/projects';
        return this.httpPost(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Edit project data.
     *
     * @param {string} iri identifier of the project
     * @param {any} data
     * @returns Observable<Project>
     */
    ProjectsService.prototype.updateProject = function (iri, data) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    /**
     * Activate project (if it was deleted).
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.activateProject = function (iri) {
        var data = {
            status: true
        };
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpPut(url, data).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete (set inactive) project.
     *
     * @param {string} iri identifier of the project
     * @returns Observable<Project>
     */
    ProjectsService.prototype.deleteProject = function (iri) {
        var url = '/admin/projects/' + encodeURIComponent(iri);
        return this.httpDelete(url).pipe(map(function (result) { return result.getBody(ProjectResponse).project; }), catchError(this.handleJsonError));
    };
    ProjectsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ProjectsService.ngInjectableDef = defineInjectable({ factory: function ProjectsService_Factory() { return new ProjectsService(inject(HttpClient), inject("config")); }, token: ProjectsService, providedIn: "root" });
    return ProjectsService;
}(ApiService));

/**
 * This service uses the Knora admin API and handles all user data.
 */
var UsersService = /** @class */ (function (_super) {
    __extends(UsersService, _super);
    function UsersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.usersUrl = _this.config.api + '/admin/users';
        return _this;
    }
    // ------------------------------------------------------------------------
    // GET
    // ------------------------------------------------------------------------
    /**
     * Returns a list of all users.
     *
     * @returns Observable<User[]>
     */
    UsersService.prototype.getAllUsers = function () {
        return this.httpGet('/admin/users').pipe(map(function (result) { return result.getBody(UsersResponse).users; }), catchError(this.handleJsonError));
    };
    /**
     * Get user by username, email or by iri.
     *
     * @param {string} identifier - Get user by username, email or by iri
     * @returns Observable<User>
     */
    UsersService.prototype.getUser = function (identifier) {
        var path = '/admin/users/' + encodeURIComponent(identifier);
        return this.httpGet(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Deprecated! Please use getUser(identifier: string) only!
     * Get user by email
     *
     * @ignore
     *
     * @param {string} email
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByEmail = function (email) {
        return this.getUser(email);
    };
    /**
     * Deprecated! Please use getUser(identifier: string) only!
     *
     * @ignore
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    UsersService.prototype.getUserByIri = function (iri) {
        return this.getUser(iri);
    };
    // ------------------------------------------------------------------------
    // POST
    // ------------------------------------------------------------------------
    /**
     * Create new user.
     *
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.createUser = function (data) {
        var path = '/admin/users';
        return this.httpPost(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to a project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProject = function (userIri, projectIri) {
        var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Add user to an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpPost(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Delete user of an admin project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProjectAdmin = function (userIri, projectIri) {
        var path = '/admin/users/projects-admin/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // PUT
    // ------------------------------------------------------------------------
    /**
     * Add user to the admin system.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.addUserToSystemAdmin = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Activate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.activateUser = function (userIri) {
        var data = {
            status: true
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update own password.
     *
     * @param {string} userIri
     * @param {string} oldPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateOwnPassword = function (userIri, oldPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: oldPassword
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update password of another user (not own).
     *
     * @param {string} userIri
     * @param {string} requesterPassword
     * @param {string} newPassword
     * @returns Observable<User>
     */
    UsersService.prototype.updateUsersPassword = function (userIri, requesterPassword, newPassword) {
        var data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    };
    /**
     * Update user data.
     *
     * @param {string} userIri
     * @param {any} data
     * @returns Observable<User>
     */
    UsersService.prototype.updateUser = function (userIri, data) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpPut(path, data).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    // ------------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------------
    /**
     * Delete / deactivate user.
     *
     * @param {string} userIri
     * @returns Observable<User>
     */
    UsersService.prototype.deleteUser = function (userIri) {
        var path = '/admin/users/' + encodeURIComponent(userIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    /**
     * Remove user from project.
     *
     * @param {string} userIri
     * @param {string} projectIri
     * @returns Observable<User>
     */
    UsersService.prototype.removeUserFromProject = function (userIri, projectIri) {
        var path = '/admin/users/projects/' + encodeURIComponent(userIri) + '/' + encodeURIComponent(projectIri);
        return this.httpDelete(path).pipe(map(function (result) { return result.getBody(UserResponse).user; }), catchError(this.handleJsonError));
    };
    UsersService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    UsersService.ngInjectableDef = defineInjectable({ factory: function UsersService_Factory() { return new UsersService(inject(HttpClient), inject("config")); }, token: UsersService, providedIn: "root" });
    return UsersService;
}(ApiService));

var LanguageService = /** @class */ (function () {
    function LanguageService() {
        this.subject = new Subject();
    }
    LanguageService.prototype.setLanguage = function (lang) {
        this.subject.next({ var: lang });
    };
    LanguageService.prototype.getLanguage = function () {
        return this.subject.asObservable();
    };
    LanguageService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    LanguageService.ngInjectableDef = defineInjectable({ factory: function LanguageService_Factory() { return new LanguageService(); }, token: LanguageService, providedIn: "root" });
    return LanguageService;
}());

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
    StatusMsgService.ngInjectableDef = defineInjectable({ factory: function StatusMsgService_Factory() { return new StatusMsgService(inject(HttpClient), inject("config")); }, token: StatusMsgService, providedIn: "root" });
    return StatusMsgService;
}());

/**
 * Contains methods to convert JSON-LD representing resources and properties to classes.
 * These methods works only for instances of resources and properties, not for ontologies (data model).
 */
var ConvertJSONLD;
(function (ConvertJSONLD) {
    /**
     * Function to be passed to a filter used on an array of property names
     * sorting out all non value property names.
     *
     * Gets all property names that refer to value objects.
     *
     * @param propName the name of a property to be checked.
     * @returns boolean - indicating if the name refers to a value property.
     */
    var getPropertyNames = function (propName) {
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
        var properties = constructReadProperties(resourceJSONLD);
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
        var e_1, _a;
        var valueSpecificProp;
        // check for the property's value type
        switch (propValue['@type']) {
            case KnoraConstants.TextValue:
                // a text value might be given as plain string, html or xml.
                var textValue = void 0;
                if (propValue[KnoraConstants.valueAsString] !== undefined) {
                    textValue = new ReadTextValueAsString(propValue['@id'], propIri, propValue[KnoraConstants.valueAsString]);
                }
                else if (propValue[KnoraConstants.textValueAsHtml] !== undefined) {
                    var referredResources = {};
                    try {
                        // check for standoff links and include referred resources, if any
                        // when the user interacts with a standoff link, further information about the referred resource can be shown
                        for (var standoffLinkValues_1 = __values(standoffLinkValues), standoffLinkValues_1_1 = standoffLinkValues_1.next(); !standoffLinkValues_1_1.done; standoffLinkValues_1_1 = standoffLinkValues_1.next()) {
                            var standoffLink = standoffLinkValues_1_1.value;
                            var referredRes = standoffLink.referredResource;
                            referredResources[referredRes.id] = referredRes;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (standoffLinkValues_1_1 && !standoffLinkValues_1_1.done && (_a = standoffLinkValues_1.return)) _a.call(standoffLinkValues_1);
                        }
                        finally { if (e_1) throw e_1.error; }
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
                var dateValue = new ReadDateValue(propValue['@id'], propIri, propValue[KnoraConstants.dateValueHasCalendar], propValue[KnoraConstants.dateValueHasStartYear], propValue[KnoraConstants.dateValueHasEndYear], propValue[KnoraConstants.dateValueHasStartEra], propValue[KnoraConstants.dateValueHasEndEra], propValue[KnoraConstants.dateValueHasStartMonth], propValue[KnoraConstants.dateValueHasEndMonth], propValue[KnoraConstants.dateValueHasStartDay], propValue[KnoraConstants.dateValueHasEndDay]);
                valueSpecificProp = dateValue;
                break;
            case KnoraConstants.LinkValue:
                var linkValue = void 0;
                // check if the referred resource is given as an object or just as an IRI
                if (propValue[KnoraConstants.linkValueHasTarget] !== undefined) {
                    // linkValueHasTarget contains the object
                    var referredResource = constructReadResource(propValue[KnoraConstants.linkValueHasTarget]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResource.id, referredResource);
                }
                else if (propValue[KnoraConstants.linkValueHasTargetIri] !== undefined) {
                    // linkValueHasTargetIri contains the resource's Iri
                    var referredResourceIri = propValue[KnoraConstants.linkValueHasTargetIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, referredResourceIri);
                }
                else if (propValue[KnoraConstants.linkValueHasSource] !== undefined) {
                    // linkValueHasSource contains the object
                    var incomingResource = constructReadResource(propValue[KnoraConstants.linkValueHasSource]);
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResource.id, incomingResource);
                }
                else if (propValue[KnoraConstants.linkValueHasSourceIri] !== undefined) {
                    // linkValueHasSourceIri contains the resource's Iri
                    var incomingResourceIri = propValue[KnoraConstants.linkValueHasSourceIri]['@id'];
                    linkValue = new ReadLinkValue(propValue['@id'], propIri, incomingResourceIri);
                }
                valueSpecificProp = linkValue;
                break;
            case KnoraConstants.IntValue:
                var intValue = new ReadIntegerValue(propValue['@id'], propIri, propValue[KnoraConstants.integerValueAsInteger]);
                valueSpecificProp = intValue;
                break;
            case KnoraConstants.DecimalValue:
                // a decimal value is represented as a string in order to preserve its precision
                var decVal = parseFloat(propValue[KnoraConstants.decimalValueAsDecimal]['@value']);
                var decimalValue = new ReadDecimalValue(propValue['@id'], propIri, decVal);
                valueSpecificProp = decimalValue;
                break;
            case KnoraConstants.StillImageFileValue:
                var stillImageFileValue = new ReadStillImageFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.stillImageFileValueHasIIIFBaseUrl]['@value'], propValue[KnoraConstants.fileValueAsUrl]['@value'], propValue[KnoraConstants.stillImageFileValueHasDimX], propValue[KnoraConstants.stillImageFileValueHasDimY]);
                valueSpecificProp = stillImageFileValue;
                break;
            case KnoraConstants.TextFileValue:
                var textFileValue = new ReadTextFileValue(propValue['@id'], propIri, propValue[KnoraConstants.fileValueHasFilename], propValue[KnoraConstants.fileValueAsUrl]['@value']);
                valueSpecificProp = textFileValue;
                break;
            case KnoraConstants.ColorValue:
                var readColorValue = new ReadColorValue(propValue['@id'], propIri, propValue[KnoraConstants.colorValueAsColor]);
                valueSpecificProp = readColorValue;
                break;
            case KnoraConstants.GeomValue:
                var readGeomValue = new ReadGeomValue(propValue['@id'], propIri, propValue[KnoraConstants.geometryValueAsGeometry]);
                valueSpecificProp = readGeomValue;
                break;
            case KnoraConstants.UriValue:
                var uriValue = new ReadUriValue(propValue['@id'], propIri, propValue[KnoraConstants.uriValueAsUri]['@value']);
                valueSpecificProp = uriValue;
                break;
            case KnoraConstants.BooleanValue:
                var boolValue = new ReadBooleanValue(propValue['@id'], propIri, propValue[KnoraConstants.booleanValueAsBoolean]);
                valueSpecificProp = boolValue;
                break;
            case KnoraConstants.IntervalValue:
                // represented as strings to preserve precision
                var intStart = parseFloat(propValue[KnoraConstants.intervalValueHasStart]['@value']);
                var intEnd = parseFloat(propValue[KnoraConstants.intervalValueHasEnd]['@value']);
                var intervalValue = new ReadIntervalValue(propValue['@id'], propIri, intStart, intEnd);
                valueSpecificProp = intervalValue;
                break;
            case KnoraConstants.ListValue:
                var listValue = new ReadListValue(propValue['@id'], propIri, propValue[KnoraConstants.listValueAsListNode]['@id'], propValue[KnoraConstants.listValueAsListNodeLabel]);
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
        var e_2, _a, e_3, _b, e_4, _c;
        // JSON-LD representing standoff link values
        // text values may contain standoff links
        var standoffLinkValuesJSONLD = resourceJSONLD[KnoraConstants.hasStandoffLinkToValue];
        // to be populated with standoff link values
        var standoffLinkValues = [];
        // convert each standoff link value JSON-LD object to a ReadLinkValue
        // in order populate the collection with all the standoff link values
        if (standoffLinkValuesJSONLD !== undefined && Array.isArray(standoffLinkValuesJSONLD)) {
            try {
                for (var standoffLinkValuesJSONLD_1 = __values(standoffLinkValuesJSONLD), standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next(); !standoffLinkValuesJSONLD_1_1.done; standoffLinkValuesJSONLD_1_1 = standoffLinkValuesJSONLD_1.next()) {
                    var standoffLinkJSONLD = standoffLinkValuesJSONLD_1_1.value;
                    var standoffVal = createValueSpecificProp(standoffLinkJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
                    standoffLinkValues.push(standoffVal);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (standoffLinkValuesJSONLD_1_1 && !standoffLinkValuesJSONLD_1_1.done && (_a = standoffLinkValuesJSONLD_1.return)) _a.call(standoffLinkValuesJSONLD_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else if (standoffLinkValuesJSONLD !== undefined) {
            var standoffVal = createValueSpecificProp(standoffLinkValuesJSONLD, KnoraConstants.hasStandoffLinkToValue, []);
            standoffLinkValues.push(standoffVal);
        }
        var propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        var properties = {};
        try {
            // iterate over all the given property names
            for (var propNames_1 = __values(propNames), propNames_1_1 = propNames_1.next(); !propNames_1_1.done; propNames_1_1 = propNames_1.next()) {
                var propName = propNames_1_1.value;
                var propValues = [];
                // either an array of values or just one value is given
                if (Array.isArray(resourceJSONLD[propName])) {
                    try {
                        // array of values
                        // for each property name, an array of property values is given, iterate over it
                        for (var _d = __values(resourceJSONLD[propName]), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var propValue = _e.value;
                            // convert a JSON-LD property value to a `ReadPropertyItem`
                            var valueSpecificProp = createValueSpecificProp(propValue, propName, standoffLinkValues);
                            // if it is undefined, the value could not be constructed correctly
                            // add the property value to the array of property values
                            if (valueSpecificProp !== undefined)
                                propValues.push(valueSpecificProp);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
                else {
                    // only one value
                    var valueSpecificProp = createValueSpecificProp(resourceJSONLD[propName], propName, standoffLinkValues);
                    // if it is undefined, the value could not be constructed correctly
                    // add the property value to the array of property values
                    if (valueSpecificProp !== undefined)
                        propValues.push(valueSpecificProp);
                }
                // add the property to the properties object
                properties[propName] = propValues;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (propNames_1_1 && !propNames_1_1.done && (_b = propNames_1.return)) _b.call(propNames_1);
            }
            finally { if (e_3) throw e_3.error; }
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
        var e_5, _a;
        var resources = [];
        var numberOfResources;
        var resourcesGraph = resourcesResponseJSONLD['@graph'];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            // an array of resources
            numberOfResources = resourcesGraph.length;
            try {
                for (var resourcesGraph_1 = __values(resourcesGraph), resourcesGraph_1_1 = resourcesGraph_1.next(); !resourcesGraph_1_1.done; resourcesGraph_1_1 = resourcesGraph_1.next()) {
                    var resourceJSONLD = resourcesGraph_1_1.value;
                    var resource = constructReadResource(resourceJSONLD);
                    // add the resource to the resources array
                    resources.push(resource);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (resourcesGraph_1_1 && !resourcesGraph_1_1.done && (_a = resourcesGraph_1.return)) _a.call(resourcesGraph_1);
                }
                finally { if (e_5) throw e_5.error; }
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
                var resource = constructReadResource(resourcesResponseJSONLD);
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
        var e_6, _a, e_7, _b;
        var propNames = Object.keys(resourceJSONLD);
        // filter out everything that is not a Knora property name
        propNames = propNames.filter(getPropertyNames);
        var referredResourceClasses = [];
        try {
            for (var propNames_2 = __values(propNames), propNames_2_1 = propNames_2.next(); !propNames_2_1.done; propNames_2_1 = propNames_2.next()) {
                var prop = propNames_2_1.value;
                // several values given for this property
                if (Array.isArray(resourceJSONLD[prop])) {
                    try {
                        for (var _c = __values(resourceJSONLD[prop]), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var referredRes = _d.value;
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
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_7) throw e_7.error; }
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
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (propNames_2_1 && !propNames_2_1.done && (_a = propNames_2.return)) _a.call(propNames_2);
            }
            finally { if (e_6) throw e_6.error; }
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
        var e_8, _a;
        var resourcesGraph = resourcesResponseJSONLD['@graph'];
        var resourceClasses = [];
        // either an array of resources or just one resource is given
        if (resourcesGraph !== undefined) {
            try {
                // an array of resources
                for (var resourcesGraph_2 = __values(resourcesGraph), resourcesGraph_2_1 = resourcesGraph_2.next(); !resourcesGraph_2_1.done; resourcesGraph_2_1 = resourcesGraph_2.next()) {
                    var resourceJSONLD = resourcesGraph_2_1.value;
                    // get class of the current resource
                    resourceClasses.push(resourceJSONLD['@type']);
                    // get the classes of referred resources
                    var referredResourceClasses = getReferredResourceClasses(resourceJSONLD);
                    resourceClasses = resourceClasses.concat(referredResourceClasses);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (resourcesGraph_2_1 && !resourcesGraph_2_1.done && (_a = resourcesGraph_2.return)) _a.call(resourcesGraph_2);
                }
                finally { if (e_8) throw e_8.error; }
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
                var referredResourceClasses = getReferredResourceClasses(resourcesResponseJSONLD);
                resourceClasses = resourceClasses.concat(referredResourceClasses);
            }
        }
        // filter out duplicates
        return resourceClasses.filter(Utils.filterOutDuplicates);
    }
    ConvertJSONLD.getResourceClassesFromJsonLD = getResourceClassesFromJsonLD;
    /**
     * Turns a JSON-LD response to a count query into a `CountQueryResult`.
     * Expects JSON-LD with all Iris fully expanded.
     *
     * @param countQueryJSONLD
     * @returns {CountQueryResult}
     */
    function createCountQueryResult(countQueryJSONLD) {
        return new CountQueryResult(countQueryJSONLD[KnoraConstants.schemaNumberOfItems]);
    }
    ConvertJSONLD.createCountQueryResult = createCountQueryResult;
})(ConvertJSONLD || (ConvertJSONLD = {}));

/**
 * Requests representation of resources from Knora.
 */
var ResourceService = /** @class */ (function (_super) {
    __extends(ResourceService, _super);
    function ResourceService(http, config, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._ontologyCacheService = _ontologyCacheService;
        return _this;
    }
    /**
     * Given the Iri, requests the representation of a resource.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @returns Observable<ApiServiceResult>
     */
    ResourceService.prototype.getResource = function (iri) {
        return this.httpGet('/v2/resources/' + encodeURIComponent(iri));
    };
    /**
     * Given the Iri, requests the representation of a resource as a `ReadResourceSequence`.
     *
     * @param {string} iri Iri of the resource (not yet URL encoded).
     * @return {Observable<ReadResourcesSequence>}
     */
    ResourceService.prototype.getReadResource = function (iri) {
        var _this = this;
        var res = this.httpGet('/v2/resources/' + encodeURIComponent(iri));
        // TODO: handle case of an ApiServiceError
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        }));
    };
    ResourceService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ResourceService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
        { type: OntologyCacheService }
    ]; };
    ResourceService.ngInjectableDef = defineInjectable({ factory: function ResourceService_Factory() { return new ResourceService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: ResourceService, providedIn: "root" });
    return ResourceService;
}(ApiService));

/**
 * Performs searches (fulltext or extended) and search count queries into Knora.
 */
var SearchService = /** @class */ (function (_super) {
    __extends(SearchService, _super);
    function SearchService(http, config, _ontologyCacheService) {
        var _this = _super.call(this, http, config) || this;
        _this.http = http;
        _this.config = config;
        _this._ontologyCacheService = _ontologyCacheService;
        /**
         * Converts a JSON-LD object to a `ReadResorceSequence`.
         * To be passed as a function pointer (arrow notation required).
         *
         * @param {Object} resourceResponse
         * @returns {Observable<ReadResourcesSequence>}
         */
        _this.convertJSONLDToReadResourceSequence = function (resourceResponse) {
            // convert JSON-LD into a ReadResourceSequence
            var resSeq = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resourceResponse);
            // collect resource class Iris
            var resourceClassIris = ConvertJSONLD.getResourceClassesFromJsonLD(resourceResponse);
            // request information about resource classes
            return _this._ontologyCacheService.getResourceClassDefinitions(resourceClassIris).pipe(map(function (ontoInfo) {
                // add ontology information to ReadResourceSequence
                resSeq.ontologyInformation.updateOntologyInformation(ontoInfo);
                return resSeq;
            }));
        };
        return _this;
    }
    /**
     * Performs a fulltext search.
     * TODO: mark as deprecated, use of `doFullTextSearchReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFulltextSearch = function (searchTerm, offset) {
        if (offset === void 0) { offset = 0; }
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        return this.httpGet('/v2/search/' + searchTerm, httpParams);
    };
    /**
     * Performs a fulltext search and turns the result into a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {number} offset the offset to be used (for paging, first offset is 0).
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFullTextSearchReadResourceSequence = function (searchTerm, offset) {
        if (offset === void 0) { offset = 0; }
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        httpParams = httpParams.set('offset', offset.toString());
        var res = this.httpGet('/v2/search/' + searchTerm, httpParams);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), mergeMap(
        // return Observable of ReadResourcesSequence
        this.convertJSONLDToReadResourceSequence));
    };
    /**
     * Performs a fulltext search count query.
     * TODO: mark as deprecated, use of `doFullTextSearchCountQueryCountQueryResult` recommended
     *
     * @param searchTerm the term to search for.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doFulltextSearchCountQuery = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        return this.httpGet('/v2/search/count/' + searchTerm);
    };
    /**
     * Performs a fulltext search count query and turns the result into a `CountQueryResult`.
     *
     * @param {string} searchTerm the term to search for.
     * @returns Observable<CountQueryResult>
     */
    SearchService.prototype.doFullTextSearchCountQueryCountQueryResult = function (searchTerm) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'); });
        }
        var res = this.httpGet('/v2/search/count/' + searchTerm);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    };
    /**
     * Performs an extended search.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearch = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        return this.httpPost('/v2/searchextended', gravsearchQuery);
    };
    /**
     * Performs an extended search and turns the result into a `ReadResourceSequence`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchReadResourceSequence = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearch'); });
        }
        var res = this.httpPost('/v2/searchextended', gravsearchQuery);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    };
    /**
     * Performs an extended search count query.
     * TODO: mark as deprecated, use of `doExtendedSearchReadResourceSequence` recommended
     *
     * @param {string} gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchCountQuery = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        return this.httpPost('/v2/searchextended/count', gravsearchQuery);
    };
    /**
     * Performs an extended search count query and turns the result into a `CountQueryResult`.
     *
     * @param gravsearchQuery the Sparql query string to be sent to Knora.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.doExtendedSearchCountQueryCountQueryResult = function (gravsearchQuery) {
        if (gravsearchQuery === undefined || gravsearchQuery.length === 0) {
            return Observable.create(function (observer) { return observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'); });
        }
        var res = this.httpPost('/v2/searchextended/count', gravsearchQuery);
        return res.pipe(mergeMap(
        // this would return an Observable of a PromiseObservable -> combine them into one Observable
        this.processJSONLD), map(
        // convert to a `CountQueryResult`
        ConvertJSONLD.createCountQueryResult));
    };
    /**
     * Perform a search by a resource's rdfs:label.
     * TODO: mark as deprecated, use of `searchByLabelReadResourceSequence` recommended
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.searchByLabel = function (searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        // httpGet() expects only one argument, not 2
        return this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
    };
    /**
     * Perform a search by a resource's rdfs:label and turns the results in a `ReadResourceSequence`.
     *
     * @param {string} searchTerm the term to search for.
     * @param {string} [resourceClassIRI] restrict search to given resource class.
     * @param {string} [projectIri] restrict search to given project.
     * @returns Observable<ApiServiceResult>
     */
    SearchService.prototype.searchByLabelReadResourceSequence = function (searchTerm, resourceClassIRI, projectIri) {
        if (searchTerm === undefined || searchTerm.length === 0) {
            return Observable.create(function (observer) { return observer.error('No search term given for call of SearchService.doFulltextSearch'); });
        }
        var httpParams = new HttpParams();
        if (resourceClassIRI !== undefined) {
            httpParams = httpParams.set('limitToResourceClass', resourceClassIRI);
        }
        if (projectIri !== undefined) {
            httpParams = httpParams.set('limitToProject', projectIri);
        }
        var res = this.httpGet('/v2/searchbylabel/' + encodeURIComponent(searchTerm), httpParams);
        return res.pipe(mergeMap(this.processJSONLD), mergeMap(this.convertJSONLDToReadResourceSequence));
    };
    SearchService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    /** @nocollapse */
    SearchService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] },
        { type: OntologyCacheService }
    ]; };
    SearchService.ngInjectableDef = defineInjectable({ factory: function SearchService_Factory() { return new SearchService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: SearchService, providedIn: "root" });
    return SearchService;
}(ApiService));

/**
 * Requests incoming information (regions, links, stillImageRepresentations) from Knora.
 */
var IncomingService = /** @class */ (function (_super) {
    __extends(IncomingService, _super);
    function IncomingService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Returns all incoming regions for a particular resource.
    *
    * @param {string} resourceIRI the Iri of the resource whose Incoming regions should be returned.
    * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
    * @returns {Observable<any>}
    */
    IncomingService.prototype.getIncomingRegions = function (resourceIRI, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?region knora-api:isMainResource true .\n\n?region knora-api:hasGeometry ?geom .\n\n?region knora-api:hasComment ?comment .\n\n?region knora-api:hasColor ?color .\n} WHERE {\n?region a knora-api:Region .\n?region a knora-api:Resource .\n\n?region knora-api:isRegionOf <" + resourceIRI + "> .\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIRI + "> a knora-api:Resource .\n\n?region knora-api:hasGeometry ?geom .\nknora-api:hasGeometry knora-api:objectType knora-api:Geom .\n\n?geom a knora-api:Geom .\n\n?region knora-api:hasComment ?comment .\nknora-api:hasComment knora-api:objectType xsd:string .\n\n?comment a xsd:string .\n\n?region knora-api:hasColor ?color .\nknora-api:hasColor knora-api:objectType knora-api:Color .\n\n?color a knora-api:Color .\n} OFFSET " + offset + "\n";
        // console.log('sparqlQueryStr ', sparqlQueryStr);
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    };
    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param {string} resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    IncomingService.prototype.getStillImageRepresentationsForCompoundResource = function (resourceIri, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?page knora-api:isMainResource true .\n\n?page knora-api:seqnum ?seqnum .\n\n?page knora-api:hasStillImageFile ?file .\n} WHERE {\n\n?page a knora-api:StillImageRepresentation .\n?page a knora-api:Resource .\n\n?page knora-api:isPartOf <" + resourceIri + "> .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?page knora-api:seqnum ?seqnum .\nknora-api:seqnum knora-api:objectType xsd:integer .\n\n?seqnum a xsd:integer .\n\n?page knora-api:hasStillImageFile ?file .\nknora-api:hasStillImageFile knora-api:objectType knora-api:File .\n\n?file a knora-api:File .\n\n} ORDER BY ?seqnum\nOFFSET " + offset + "\n";
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    };
    /**
     * Returns all incoming links for the given resource Iri but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param {number} offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    IncomingService.prototype.getIncomingLinksForResource = function (resourceIri, offset) {
        var sparqlQueryStr = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\n\nCONSTRUCT {\n?incomingRes knora-api:isMainResource true .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n} WHERE {\n\n?incomingRes a knora-api:Resource .\n\n?incomingRes ?incomingProp <" + resourceIri + "> .\n\n<" + resourceIri + "> a knora-api:Resource .\n\n?incomingProp knora-api:objectType knora-api:Resource .\n\nknora-api:isRegionOf knora-api:objectType knora-api:Resource .\nknora-api:isPartOf knora-api:objectType knora-api:Resource .\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isRegionOf <" + resourceIri + "> .\n}\n\nFILTER NOT EXISTS {\n ?incomingRes  knora-api:isPartOf <" + resourceIri + "> .\n}\n\n} OFFSET " + offset + "\n";
        return this.doExtendedSearchReadResourceSequence(sparqlQueryStr);
    };
    IncomingService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] },
    ];
    IncomingService.ngInjectableDef = defineInjectable({ factory: function IncomingService_Factory() { return new IncomingService(inject(HttpClient), inject("config"), inject(OntologyCacheService)); }, token: IncomingService, providedIn: "root" });
    return IncomingService;
}(SearchService));

/**
 * Represents the parameters of an extended search.
 */
var ExtendedSearchParams = /** @class */ (function () {
    /**
     *
     * @param generateGravsearch a function that generates a Gravsearch query.
     *
     *                           The function takes the offset
     *                           as a parameter and returns a Gravsearch query string.
     *                           Returns false if not set correctly (init state).
     */
    function ExtendedSearchParams(generateGravsearch) {
        this.generateGravsearch = generateGravsearch;
    }
    return ExtendedSearchParams;
}());
var SearchParamsService = /** @class */ (function () {
    function SearchParamsService() {
        // init with a dummy function that returns false
        // if the application is reloaded, this will be returned
        this._currentSearchParams = new BehaviorSubject(new ExtendedSearchParams(function (offset) { return false; }));
    }
    /**
     * Updates the parameters of an extended search.
     *
     * @param {ExtendedSearchParams} searchParams
     * @returns void
     */
    SearchParamsService.prototype.changeSearchParamsMsg = function (searchParams) {
        this._currentSearchParams.next(searchParams);
    };
    /**
     * Gets the search params of an extended search.
     *
     * @returns ExtendedSearchParams - search parameters
     */
    SearchParamsService.prototype.getSearchParams = function () {
        return this._currentSearchParams.getValue();
    };
    SearchParamsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    SearchParamsService.ctorParameters = function () { return []; };
    SearchParamsService.ngInjectableDef = defineInjectable({ factory: function SearchParamsService_Factory() { return new SearchParamsService(); }, token: SearchParamsService, providedIn: "root" });
    return SearchParamsService;
}());

/**
 * @ignore
 * Represents an error that occurred when generating KnarQL.
 */
var GravsearchGenerationError = /** @class */ (function (_super) {
    __extends(GravsearchGenerationError, _super);
    function GravsearchGenerationError(msg) {
        return _super.call(this, msg) || this;
    }
    return GravsearchGenerationError;
}(Error));
/**
 * Create GravSearch queries from provided parameters.
 */
var GravsearchGenerationService = /** @class */ (function () {
    function GravsearchGenerationService(_searchParamsService) {
        this._searchParamsService = _searchParamsService;
    }
    /**
       * @private
       * Converts a complex type Iri to a simple type Iri.
       *
       * @param {string} complexType the Iri of a value type (knora-api complex).
       * @returns string - the corresponding Iri of the simple type (knora-api simple).
       */
    GravsearchGenerationService.prototype.convertComplexTypeToSimpleType = function (complexType) {
        var simpleType = GravsearchGenerationService.typeConversionComplexToSimple[complexType];
        if (simpleType !== undefined) {
            return simpleType;
        }
        else {
            throw new GravsearchGenerationError("complex type " + complexType + " could not be converted to simple type.");
        }
    };
    /**
     * Generates a Gravsearch query from the provided arguments.
     *
     * @param {PropertyWithValue[]} properties the properties specified by the user.
     * @param {string} [mainResourceClassOption] the class of the main resource, if specified.
     * @param {number} offset the offset to be used (nth page of results).
     * @returns string - a KnarQL query string.
     */
    GravsearchGenerationService.prototype.createGravsearchQuery = function (properties, mainResourceClassOption, offset) {
        var _this = this;
        if (offset === void 0) { offset = 0; }
        // class restriction for the resource searched for
        var mainResourceClass = '';
        // if given, create the class restriction for the main resource
        if (mainResourceClassOption !== undefined) {
            mainResourceClass = "?mainRes a <" + Utils.convertComplexKnoraApiEntityIritoSimple(mainResourceClassOption) + "> .";
        }
        // criteria for the order by statement
        var orderByCriteria = [];
        // statements to be returned in query results
        var returnStatements = [];
        // loop over given properties and create statements and Filters and type annotations from them
        var props = properties.map(function (propWithVal, index) {
            var propIriSimple = Utils.convertComplexKnoraApiEntityIritoSimple(propWithVal.property.id);
            var simpleType;
            if (!propWithVal.property.isLinkProperty) {
                simpleType = _this.convertComplexTypeToSimpleType(propWithVal.property.objectType);
            }
            else {
                simpleType = KnoraConstants.resourceSimple;
            }
            // represents the object of a statement
            var propValue;
            if (!propWithVal.property.isLinkProperty || propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Exists') {
                // it is not a linking property, create a variable for the value (to be used by a subsequent FILTER)
                // OR the comparison operator Exists is used in which case we do not need to specify the object any further
                propValue = "?propVal" + index;
            }
            else {
                // it is a linking property and the comparison operator is not Exists, use its IRI
                propValue = propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple);
            }
            // generate statement
            var statement = "?mainRes <" + propIriSimple + "> " + propValue + " .";
            // type annotations
            var propTypeAnnotation = "<" + propIriSimple + "> knora-api:objectType <" + simpleType + "> .";
            var propValueAnnotation = propValue + " a <" + simpleType + "> .";
            // check if it is a linking property that has to be wrapped in a FILTER NOT EXISTS (comparison operator NOT_EQUALS) to negate it
            if (propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() === 'NotEquals') {
                // do not include statement in results, because the query checks for the absence of this statement
                statement = "FILTER NOT EXISTS {\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n}";
            }
            else {
                // TODO: check if statement should be returned returned in results (Boolean flag from checkbox)
                returnStatements.push(statement);
                statement = "\n" + statement + "\n" + propTypeAnnotation + "\n" + propValueAnnotation + "\n";
            }
            // generate filter if comparison operator is not Exists
            var filter = '';
            // only create a FILTER if the comparison operator is not EXISTS and it is not a linking property
            if (!propWithVal.property.isLinkProperty && propWithVal.valueLiteral.comparisonOperator.getClassName() !== 'Exists') {
                if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Like') {
                    // use regex function for LIKE
                    filter = "FILTER regex(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ", \"i\")";
                }
                else if (propWithVal.valueLiteral.comparisonOperator.getClassName() === 'Match') {
                    // use contains function for MATCH
                    filter = "FILTER <" + KnoraConstants.matchFunction + ">(" + propValue + ", " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
                else {
                    filter = "FILTER(" + propValue + " " + propWithVal.valueLiteral.comparisonOperator.type + " " + propWithVal.valueLiteral.value.toSparql(KnoraSchema.simple) + ")";
                }
            }
            // check if current value is a sort criterion
            if (propWithVal.isSortCriterion)
                orderByCriteria.push(propValue);
            return statement + "\n" + filter + "\n";
        });
        var orderByStatement = '';
        if (orderByCriteria.length > 0) {
            orderByStatement = "\nORDER BY " + orderByCriteria.join(' ') + "\n";
        }
        // template of the KnarQL query with dynamic components
        var gravsearchTemplate = "\nPREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>\nCONSTRUCT {\n\n?mainRes knora-api:isMainResource true .\n\n" + returnStatements.join('\n') + "\n\n} WHERE {\n\n?mainRes a knora-api:Resource .\n\n" + mainResourceClass + "\n\n" + props.join('') + "\n\n}\n" + orderByStatement;
        // offset component of the KnarQL query
        var offsetTemplate = "\nOFFSET " + offset + "\n";
        // function that generates the same KnarQL query with the given offset
        var generateGravsearchQueryWithCustomOffset = function (localOffset) {
            var offsetCustomTemplate = "\nOFFSET " + localOffset + "\n";
            return gravsearchTemplate + offsetCustomTemplate;
        };
        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateGravsearchQueryWithCustomOffset));
        }
        // console.log(knarqlTemplate + offsetTemplate);
        return gravsearchTemplate + offsetTemplate;
    };
    /**
     * @ignore
     *
     * Map of complex knora-api value types to simple ones.
     * Use computed property name: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer.
     */
    GravsearchGenerationService.typeConversionComplexToSimple = {
        'http://api.knora.org/ontology/knora-api/v2#IntValue': KnoraConstants.xsdInteger,
        'http://api.knora.org/ontology/knora-api/v2#DecimalValue': KnoraConstants.xsdDecimal,
        'http://api.knora.org/ontology/knora-api/v2#BooleanValue': KnoraConstants.xsdBoolean,
        'http://api.knora.org/ontology/knora-api/v2#TextValue': KnoraConstants.xsdString,
        'http://api.knora.org/ontology/knora-api/v2#DateValue': KnoraConstants.dateSimple,
        'http://api.knora.org/ontology/knora-api/v2#IntervalValue': KnoraConstants.intervalSimple,
        'http://api.knora.org/ontology/knora-api/v2#GeomValue': KnoraConstants.geomSimple,
        'http://api.knora.org/ontology/knora-api/v2#ColorValue': KnoraConstants.colorSimple,
        'http://api.knora.org/ontology/knora-api/v2#GeonameValue': KnoraConstants.geonameSimple,
        'http://api.knora.org/ontology/knora-api/v2#UriValue': KnoraConstants.xsdUri,
        'http://api.knora.org/ontology/knora-api/v2#StillImageFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#FileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#DDDFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#AudioFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#DocumentFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#TextFileValue': KnoraConstants.fileSimple,
        'http://api.knora.org/ontology/knora-api/v2#ListValue': KnoraConstants.xsdString
    };
    GravsearchGenerationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    GravsearchGenerationService.ctorParameters = function () { return [
        { type: SearchParamsService }
    ]; };
    GravsearchGenerationService.ngInjectableDef = defineInjectable({ factory: function GravsearchGenerationService_Factory() { return new GravsearchGenerationService(inject(SearchParamsService)); }, token: GravsearchGenerationService, providedIn: "root" });
    return GravsearchGenerationService;
}());

var StoreService = /** @class */ (function () {
    function StoreService(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
       * Resets the content of the triplestore.
       *
       * @param rdfDataObjects
       * @returns Observable<string>
       */
    StoreService.prototype.resetTriplestoreContent = function (rdfDataObjects) {
        return this.http.post(this.config.api + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(map(function (data) {
            var result = data;
            // console.log('StoreService - resetTriplestoreContent: ', result);
            return result.message;
        }, function (error) {
            if (error.error instanceof Error) {
                console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
            }
            else {
                console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
            }
            throw error;
        }));
    };
    StoreService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    StoreService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: KuiCoreConfig, decorators: [{ type: Inject, args: ['config',] }] }
    ]; };
    StoreService.ngInjectableDef = defineInjectable({ factory: function StoreService_Factory() { return new StoreService(inject(HttpClient), inject("config")); }, token: StoreService, providedIn: "root" });
    return StoreService;
}());

var BasicOntologyService = /** @class */ (function (_super) {
    __extends(BasicOntologyService, _super);
    function BasicOntologyService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * returns our list of a basic ontology
       *
       * @returns {Observable<any>}
       */
    // getBasicOntology(): Observable<any> {
    //     let url = environment.url;
    //     return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    // }
    BasicOntologyService.prototype.getBasicOntology = function () {
        var url = this.config.app;
        return this.httpGet(url + '/data/base-data/basic-ontology.json');
        // return this.httpGet(url + '/data/base-data/basic-ontology.json', {withCredentials: false});
    };
    BasicOntologyService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    BasicOntologyService.ngInjectableDef = defineInjectable({ factory: function BasicOntologyService_Factory() { return new BasicOntologyService(inject(HttpClient), inject("config")); }, token: BasicOntologyService, providedIn: "root" });
    return BasicOntologyService;
}(ApiService));

var ResourceTypesService = /** @class */ (function (_super) {
    __extends(ResourceTypesService, _super);
    function ResourceTypesService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
       * Get all resource types defined by the vocabulary.
       *
       * @param {string} iri Vocabulary iri
       * @returns Observable<any>
       */
    ResourceTypesService.prototype.getResourceTypesByVoc = function (iri) {
        return this.httpGet('/v1/resourcetypes?vocabulary=' + encodeURIComponent(iri));
    };
    /**
     * Get a specific resource type.
     *
     * @param {string} iri resource type iri
     * @returns Observable<any>
     */
    ResourceTypesService.prototype.getResourceType = function (iri) {
        return this.httpGet('/v1/resourcetypes/' + encodeURIComponent(iri));
    };
    ResourceTypesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    ResourceTypesService.ngInjectableDef = defineInjectable({ factory: function ResourceTypesService_Factory() { return new ResourceTypesService(inject(HttpClient), inject("config")); }, token: ResourceTypesService, providedIn: "root" });
    return ResourceTypesService;
}(ApiService));

/**
 * main api services
 */

var Equals = /** @class */ (function () {
    function Equals() {
        this.type = KnoraConstants.EqualsComparisonOperator;
        this.label = KnoraConstants.EqualsComparisonLabel;
    }
    Equals.prototype.getClassName = function () {
        return 'Equals';
    };
    return Equals;
}());
var NotEquals = /** @class */ (function () {
    function NotEquals() {
        this.type = KnoraConstants.NotEqualsComparisonOperator;
        this.label = KnoraConstants.NotEqualsComparisonLabel;
    }
    NotEquals.prototype.getClassName = function () {
        return 'NotEquals';
    };
    return NotEquals;
}());
var GreaterThanEquals = /** @class */ (function () {
    function GreaterThanEquals() {
        this.type = KnoraConstants.GreaterThanEqualsComparisonOperator;
        this.label = KnoraConstants.GreaterThanEqualsComparisonLabel;
    }
    GreaterThanEquals.prototype.getClassName = function () {
        return 'GreaterThanEquals';
    };
    return GreaterThanEquals;
}());
var GreaterThan = /** @class */ (function () {
    function GreaterThan() {
        this.type = KnoraConstants.GreaterThanComparisonOperator;
        this.label = KnoraConstants.GreaterThanComparisonLabel;
    }
    GreaterThan.prototype.getClassName = function () {
        return 'GreaterThan';
    };
    return GreaterThan;
}());
var LessThan = /** @class */ (function () {
    function LessThan() {
        this.type = KnoraConstants.LessThanComparisonOperator;
        this.label = KnoraConstants.LessThanComparisonLabel;
    }
    LessThan.prototype.getClassName = function () {
        return 'LessThan';
    };
    return LessThan;
}());
var LessThanEquals = /** @class */ (function () {
    function LessThanEquals() {
        this.type = KnoraConstants.LessThanEqualsComparisonOperator;
        this.label = KnoraConstants.LessThanQualsComparisonLabel;
    }
    LessThanEquals.prototype.getClassName = function () {
        return 'LessThanEquals';
    };
    return LessThanEquals;
}());
var Exists = /** @class */ (function () {
    function Exists() {
        this.type = KnoraConstants.ExistsComparisonOperator;
        this.label = KnoraConstants.ExistsComparisonLabel;
    }
    Exists.prototype.getClassName = function () {
        return 'Exists';
    };
    return Exists;
}());
var Like = /** @class */ (function () {
    function Like() {
        this.type = KnoraConstants.LikeComparisonOperator;
        this.label = KnoraConstants.LikeComparisonLabel;
    }
    Like.prototype.getClassName = function () {
        return 'Like';
    };
    return Like;
}());
var Match = /** @class */ (function () {
    function Match() {
        this.type = KnoraConstants.MatchComparisonOperator;
        this.label = KnoraConstants.MatchComparisonLabel;
    }
    Match.prototype.getClassName = function () {
        return 'Match';
    };
    return Match;
}());
/**
 * Combination of a comparison operator and a value literal or an IRI.
 * In case the comparison operator is 'Exists', no value is given.
 */
var ComparisonOperatorAndValue = /** @class */ (function () {
    function ComparisonOperatorAndValue(comparisonOperator, value) {
        this.comparisonOperator = comparisonOperator;
        this.value = value;
    }
    return ComparisonOperatorAndValue;
}());
/**
 * Represents a property's value as a literal with the indication of its type.
 */
var ValueLiteral = /** @class */ (function () {
    /**
     * Constructs a [ValueLiteral].
     *
     * @param {string} value the literal representation of the value.
     * @param {string} type the type of the value (making use of xsd).
     */
    function ValueLiteral(value, type) {
        this.value = value;
        this.type = type;
    }
    /**
     * Creates a type annotated value literal to be used in a SPARQL query.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    ValueLiteral.prototype.toSparql = function (schema) {
        var literalType;
        // check if a Knora schema conversion is necessary, e.g., knora-api:dateValue (complex) to knora-api:date (simple).
        // xsd types will remain unchanged
        if (schema === KnoraSchema.simple && GravsearchGenerationService.typeConversionComplexToSimple[this.type] !== undefined) {
            // convert to simple schema
            literalType = GravsearchGenerationService.typeConversionComplexToSimple[this.type];
        }
        else {
            // do not convert
            literalType = this.type;
        }
        return "\"" + this.value + "\"^^<" + literalType + ">";
    };
    return ValueLiteral;
}());
/**
 * Represents an IRI.
 */
var IRI = /** @class */ (function () {
    /**
     * Constructs an [IRI].
     *
     * @param {string} iri the IRI of a resource instance.
     */
    function IRI(iri) {
        this.iri = iri;
    }
    /**
     * Creates a SPARQL representation of the IRI.
     *
     * @param schema indicates the Knora schema to be used.
     * @returns {string}
     */
    IRI.prototype.toSparql = function (schema) {
        // this is an instance Iri and does not have to be converted.
        return "<" + this.iri + ">";
    };
    return IRI;
}());
/**
 * Represents a property, the specified comparison operator, and value.
 */
var PropertyWithValue = /** @class */ (function () {
    /**
     * Constructs a [PropertyWithValue].
     *
     * @param {Property} property the specified property.
     * @param {ComparisonOperatorAndValue} valueLiteral the specified comparison operator and value.
     * @param isSortCriterion indicates if the property is used as a sort criterion.
     */
    function PropertyWithValue(property, valueLiteral, isSortCriterion) {
        this.property = property;
        this.valueLiteral = valueLiteral;
        this.isSortCriterion = isSortCriterion;
    }
    return PropertyWithValue;
}());

/*
 * Public API Surface of core
 */

/**
 * Generated bundle index. Do not edit.
 */

export { KuiCoreConfig as ɵa, Property as ɵb, KuiCoreModule, ɵ0, KuiCoreConfig, ApiServiceResult, ApiServiceError, Utils, KnoraConstants, KnoraSchema, StringLiteral, Precision, DateSalsah, DateRangeSalsah, AuthenticationResponse, Group, GroupResponse, GroupsResponse, List, ListInfo, ListInfoResponse, ListNode, ListNodeInfo, ListNodeInfoResponse, ListResponse, ListsResponse, OntologyInfoShort, PermissionData, Project, ProjectMembersResponse, ProjectResponse, ProjectsResponse, CurrentUser, UsersResponse, UserResponse, User, ReadTextValue, ReadTextValueAsString, ReferredResourcesByStandoffLink, ReadTextValueAsHtml, ReadTextValueAsXml, ReadDateValue, ReadLinkValue, ReadIntegerValue, ReadDecimalValue, ReadStillImageFileValue, ReadTextFileValue, ReadColorValue, Point2D, RegionGeometry, ReadGeomValue, ReadUriValue, ReadBooleanValue, ReadIntervalValue, ReadListValue, ReadResource, ReadResourcesSequence, CountQueryResult, StillImageRepresentation, ImageRegion, Equals, NotEquals, GreaterThanEquals, GreaterThan, LessThan, LessThanEquals, Exists, Like, Match, ComparisonOperatorAndValue, ValueLiteral, IRI, PropertyWithValue, ApiService, GroupsService, ListsService, ProjectsService, UsersService, LanguageService, StatusMsgService, OntologyService, OntologyMetadata, CardinalityOccurrence, Cardinality, ResourceClass, ResourceClasses, Property, Properties, ResourceClassIrisForOntology, OntologyInformation, OntologyCacheService, ResourceService, SearchService, ConvertJSONLD, IncomingService, ExtendedSearchParams, SearchParamsService, GravsearchGenerationService, StoreService, BasicOntologyService, ResourceTypesService };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia25vcmEtY29yZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3IudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2tub3JhLWNvbnN0YW50cy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy91dGlscy50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvc2hhcmVkL3N0cmluZ3MudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3NoYXJlZC9kYXRlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9hdXRoZW50aWNhdGlvbi9hdXRoZW50aWNhdGlvbi1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vZ3JvdXBzL2dyb3VwLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9ncm91cHMvZ3JvdXAtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2dyb3Vwcy9ncm91cHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3QtaW5mby50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1ub2RlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LWluZm8tcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL2xpc3RzL2xpc3Qtbm9kZS1pbmZvLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9saXN0cy9saXN0LW5vZGUtaW5mby1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdC1yZXNwb25zZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vbGlzdHMvbGlzdHMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL29udG9sb2dpZXMvb250b2xvZ3ktaW5mby1zaG9ydC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcGVybWlzc2lvbnMvcGVybWlzc2lvbi1kYXRhLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi9wcm9qZWN0cy9wcm9qZWN0LW1lbWJlcnMtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3QtcmVzcG9uc2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3Byb2plY3RzL3Byb2plY3RzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy9jdXJyZW50LXVzZXIudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL2FkbWluL3VzZXJzL3VzZXJzLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9hZG1pbi91c2Vycy91c2VyLXJlc3BvbnNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9wcm9wZXJ0aWVzL3JlYWQtcHJvcGVydHktaXRlbS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvcmVzb3VyY2VzL3JlYWQtcmVzb3VyY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hcGkuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL29udG9sb2d5LnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS92Mi9yZXNvdXJjZXMvcmVhZC1yZXNvdXJjZXMtc2VxdWVuY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL2NvdW50LXF1ZXJ5L2NvdW50LXF1ZXJ5LXJlc3VsdC50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2RlY2xhcmF0aW9ucy9hcGkvdjIvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UtcmVwcmVzZW50YXRpb24udHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9kZWNsYXJhdGlvbnMvYXBpL3YyL3N0aWxsLWltYWdlL2ltYWdlLXJlZ2lvbi50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL2NvcmUubW9kdWxlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vZ3JvdXBzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9saXN0cy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vcHJvamVjdHMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2FkbWluL3VzZXJzLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvY29udmVydC1qc29ubGQudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9yZXNvdXJjZS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9pbmNvbWluZy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvc2VhcmNoLXBhcmFtcy5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvZ3Jhdi1zZWFyY2guc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL3YyL3N0b3JlLnNlcnZpY2UudHMiLCJuZzovL0Brbm9yYS9jb3JlL2xpYi9zZXJ2aWNlcy92Mi9iYXNpYy1vbnRvbG9neS5zZXJ2aWNlLnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvc2VydmljZXMvdjIvcmVzb3VyY2UtdHlwZXMuc2VydmljZS50cyIsIm5nOi8vQGtub3JhL2NvcmUvbGliL3NlcnZpY2VzL2luZGV4LnRzIiwibmc6Ly9Aa25vcmEvY29yZS9saWIvZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMudHMiLCJuZzovL0Brbm9yYS9jb3JlL3B1YmxpY19hcGkudHMiLCJuZzovL0Brbm9yYS9jb3JlL2tub3JhLWNvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuLyoqXG4gKiBLbm9yYS11aSBjb3JlIGNvbmZpZ3VyYXRpb24gd2l0aCB0aGUgc2VydmVyIGRlZmluaXRpb25zIG9mOlxuICogIC0gYXBpOiBVUkwgb2YgZGF0YSBzZXJ2aWNlIGUuZy4ga25vcmE6IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzM1xuICogIC0gbWVkaWE6IFVSTCBvZiBtZWRpYSBzZXJ2ZXIgc2VydmljZSBlLmcuIHNpcGk6IGh0dHA6Ly9sb2NhbGhvc3Q6MTAyNFxuICogIC0gYXBwOiBVUkwgb2YgdGhlIGFwcCBlLmcuIHNhbHNhaDogaHR0cDovL2xvY2FsaG9zdDo0MjAwXG4gKi9cbkBKc29uT2JqZWN0KCdLdWlDb3JlQ29uZmlnJylcbmV4cG9ydCBjbGFzcyBLdWlDb3JlQ29uZmlnIHtcblxuICAgIC8qKlxuICAgICAqIG5hbWUgb2YgdGhlIGFwcCBlLmcuICdTQUxTQUgnXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAvKipcbiAgICAgKiB1cmwgb2YgdGhlIGFwcCBlLmcuICdodHRwczovL3NhbHNhaC5vcmcnXG4gICAgICogQHR5cGUge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBASnNvblByb3BlcnR5KCdhcHAnLCBTdHJpbmcpXG4gICAgcHVibGljIGFwcDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgLyoqXG4gICAgICogdXJsIG9mIHRoZSBhcGkgZS5nLiAnaHR0cHM6Ly9hcGkua25vcmEub3JnJ1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgQEpzb25Qcm9wZXJ0eSgnYXBpJywgU3RyaW5nKVxuICAgIHB1YmxpYyBhcGk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIHVybCBvZiBtZWRpYS9maWxlIHNlcnZlciBlLmcuICdodHRwczovL2lpaWYuc2lwaS5pbydcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIEBKc29uUHJvcGVydHkoJ21lZGlhJywgU3RyaW5nKVxuICAgIHB1YmxpYyBtZWRpYTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG59XG4iLCJcbmltcG9ydCB7IEpzb25Db252ZXJ0LCBPcGVyYXRpb25Nb2RlLCBWYWx1ZUNoZWNraW5nTW9kZSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbi8qKlxuICogUmVzdWx0IGNsYXNzIHVzZWQgYXMgQVBJIHVybCByZXNwb25zZSBpbiBBcGlTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVzdWx0IHtcblxuICAgIHByaXZhdGUgc3RhdGljIGpzb25Db252ZXJ0OiBKc29uQ29udmVydCA9IG5ldyBKc29uQ29udmVydChPcGVyYXRpb25Nb2RlLkVOQUJMRSwgVmFsdWVDaGVja2luZ01vZGUuQUxMT1dfTlVMTCk7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQm9keSBhcyBKU09OXG4gICAgICovXG4gICAgYm9keTogYW55O1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcmVzdWx0IGJvZHkgYXMgaW5zdGFuY2Ugb2YgY2xhc3NPYmplY3QuXG4gICAgICogQHBhcmFtIGNsYXNzT2JqZWN0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKiBAdGhyb3dzXG4gICAgICovXG5cbiAgICBnZXRCb2R5KGNsYXNzT2JqZWN0PzogeyBuZXcoKTogYW55IH0pOiBhbnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJvZHkpO1xuICAgICAgICByZXR1cm4gQXBpU2VydmljZVJlc3VsdC5qc29uQ29udmVydC5kZXNlcmlhbGl6ZSh0aGlzLmJvZHksIGNsYXNzT2JqZWN0KTtcbiAgICB9XG5cblxufVxuIiwiXG4vKipcbiAqIEVycm9yIGNsYXNzIHVzZWQgYXMgQVBJIHJlc3BvbnNlIGluIEFwaVNlcnZpY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2VFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgbnVtYmVyXG4gICAgICovXG4gICAgc3RhdHVzID0gMDtcblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyB0ZXh0XG4gICAgICovXG4gICAgc3RhdHVzVGV4dCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQVBJIHVybFxuICAgICAqL1xuICAgIHVybCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogQWRkaXRpb25hbCBlcnJvciBpbmZvXG4gICAgICovXG4gICAgZXJyb3JJbmZvID0gJyc7XG5cbn1cbiIsImV4cG9ydCBjbGFzcyBLbm9yYUNvbnN0YW50cyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIEtub3JhQXBpOiBzdHJpbmcgPSAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpJztcbiAgICBwdWJsaWMgc3RhdGljIFBhdGhTZXBhcmF0b3I6IHN0cmluZyA9ICcjJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFPbnRvbG9neVBhdGg6IHN0cmluZyA9ICdodHRwOi8vd3d3Lmtub3JhLm9yZy9vbnRvbG9neSc7XG4gICAgcHVibGljIHN0YXRpYyBLbm9yYUJhc2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhT250b2xvZ3lQYXRoICsgJy9rbm9yYS1iYXNlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU3lzdGVtUHJvamVjdElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNTeXN0ZW1Qcm9qZWN0JztcbiAgICBwdWJsaWMgc3RhdGljIFN5c3RlbUFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjU3lzdGVtQWRtaW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgUHJvamVjdEFkbWluR3JvdXBJUkk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQmFzZSArICcjUHJvamVjdEFkbWluJztcbiAgICBwdWJsaWMgc3RhdGljIFByb2plY3RNZW1iZXJHcm91cElSSTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFCYXNlICsgJyNQcm9qZWN0TWVtYmVyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy92MicgKyBLbm9yYUNvbnN0YW50cy5QYXRoU2VwYXJhdG9yO1xuICAgIHB1YmxpYyBzdGF0aWMgS25vcmFBcGlWMlNpbXBsZVBhdGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpICsgJy9zaW1wbGUvdjInICsgS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT250b2xvZ3k6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zYWxzYWgtZ3VpL3YyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgU2Fsc2FoR3VpT3JkZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlNhbHNhaEd1aU9udG9sb2d5ICsgJyNndWlPcmRlcic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFN0YW5kb2ZmT250b2xvZ3k6IHN0cmluZyA9ICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9zdGFuZG9mZi92Mic7XG5cbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZXNvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBUZXh0VmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBJbnRWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgQm9vbGVhblZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdCb29sZWFuVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgVXJpVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1VyaVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERlY2ltYWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIERhdGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIENvbG9yVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0NvbG9yVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgR2VvbVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdHZW9tVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTGlzdFZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdMaXN0VmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnSW50ZXJ2YWxWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBMaW5rVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0xpbmtWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBHZW9uYW1lVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0dlb25hbWVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBBdWRpb0ZpbGVWYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnQXVkaW9GaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRERERmlsZVZhbHVlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdERERGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgRG9jdW1lbnRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0RvY3VtZW50RmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFN0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgTW92aW5nSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ01vdmluZ0ltYWdlRmlsZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFRleHRGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ1RleHRGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNSZXNvdXJjZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1Jlc291cmNlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgSXNWYWx1ZUNsYXNzOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpc1ZhbHVlQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgRm9yYmlkZGVuUmVzb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ0ZvcmJpZGRlblJlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIFhNTFRvU3RhbmRvZmZNYXBwaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdYTUxUb1N0YW5kb2ZmTWFwcGluZyc7XG4gICAgcHVibGljIHN0YXRpYyBMaXN0Tm9kZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnTGlzdE5vZGUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBPYmplY3RUeXBlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdvYmplY3RUeXBlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlc291cmNlSWNvbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAncmVzb3VyY2VJY29uJztcbiAgICBwdWJsaWMgc3RhdGljIGlzRWRpdGFibGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzRWRpdGFibGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaXNMaW5rUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1Byb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIGlzTGlua1ZhbHVlUHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2lzTGlua1ZhbHVlUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgaGFzR2VvbWV0cnk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc0dlb21ldHJ5JztcblxuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTmFtZTogc3RyaW5nID0gJ2h0dHA6Ly9zY2hlbWEub3JnL25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hTnVtYmVyT2ZJdGVtczogc3RyaW5nID0gJ2h0dHA6Ly9zY2hlbWEub3JnL251bWJlck9mSXRlbXMnO1xuICAgIHB1YmxpYyBzdGF0aWMgc2NoZW1hSXRlbUxpc3RFbGVtZW50OiBzdHJpbmcgPSAnaHR0cDovL3NjaGVtYS5vcmcvaXRlbUxpc3RFbGVtZW50JztcblxuXG4gICAgcHVibGljIHN0YXRpYyBSZGZQcm9wZXJ0eTogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyNQcm9wZXJ0eSc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU2NoZW1hOiBzdHJpbmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC8wMS9yZGYtc2NoZW1hJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3I7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzTGFiZWw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnbGFiZWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmRmc0NvbW1lbnQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnY29tbWVudCc7XG4gICAgcHVibGljIHN0YXRpYyBSZGZzU3ViY2xhc3NPZjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuUmRmc1NjaGVtYSArICdzdWJDbGFzc09mJztcbiAgICBwdWJsaWMgc3RhdGljIHN1YlByb3BlcnR5T2Y6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEgKyAnc3ViUHJvcGVydHlPZic7XG5cbiAgICBwdWJsaWMgc3RhdGljIG93bDogc3RyaW5nID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDIvMDcvb3dsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgT3dsQ2xhc3M6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjQ2xhc3MnO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT2JqZWN0UHJvcGVydHk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLm93bCArICcjT2JqZWN0UHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsRGF0YXR5cGVQcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNEYXRhdHlwZVByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bEFubm90YXRpb25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNBbm5vdGF0aW9uUHJvcGVydHknO1xuICAgIHB1YmxpYyBzdGF0aWMgT3dsT25Qcm9wZXJ0eTogc3RyaW5nID0gS25vcmFDb25zdGFudHMub3dsICsgJyNvblByb3BlcnR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1heENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21heENhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bE1pbkNhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI21pbkNhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bENhcmRpbmFsaXR5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI2NhcmRpbmFsaXR5JztcbiAgICBwdWJsaWMgc3RhdGljIE93bFJlc3RyaWN0aW9uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5vd2wgKyAnI1Jlc3RyaWN0aW9uJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRpb25EYXRlOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdjcmVhdGlvbkRhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGFzdE1vZGlmaWNhdGlvbkRhdGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xhc3RNb2RpZmljYXRpb25EYXRlJztcbiAgICBwdWJsaWMgc3RhdGljIGhhc1Blcm1pc3Npb25zOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdoYXNQZXJtaXNzaW9ucyc7XG4gICAgcHVibGljIHN0YXRpYyBhdHRhY2hlZFRvUHJvamVjdDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYXR0YWNoZWRUb1Byb2plY3QnO1xuICAgIHB1YmxpYyBzdGF0aWMgYXR0YWNoZWRUb1VzZXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2F0dGFjaGVkVG9Vc2VyJztcblxuICAgIHB1YmxpYyBzdGF0aWMgUmVnaW9uOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdSZWdpb24nO1xuXG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNIdG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzSHRtbCc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkVGV4dFZhbHVlQXNTdHJpbmc6IHN0cmluZyA9ICdSZWFkVGV4dFZhbHVlQXNTdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSAnUmVhZFRleHRWYWx1ZUFzWG1sJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREYXRlVmFsdWU6IHN0cmluZyA9ICdSZWFkRGF0ZVZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaW5rVmFsdWU6IHN0cmluZyA9ICdSZWFkTGlua1ZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRJbnRlZ2VyVmFsdWU6IHN0cmluZyA9ICdSZWFkSW50ZWdlclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWREZWNpbWFsVmFsdWU6IHN0cmluZyA9ICdSZWFkRGVjaW1hbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRTdGlsbEltYWdlRmlsZVZhbHVlOiBzdHJpbmcgPSAnUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgUmVhZFRleHRGaWxlVmFsdWU6IHN0cmluZyA9ICdSZWFkVGV4dEZpbGVWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkR2VvbVZhbHVlOiBzdHJpbmcgPSAnUmVhZEdlb21WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQ29sb3JWYWx1ZTogc3RyaW5nID0gJ1JlYWRDb2xvclZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRVcmlWYWx1ZTogc3RyaW5nID0gJ1JlYWRVcmlWYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkQm9vbGVhblZhbHVlOiBzdHJpbmcgPSAnUmVhZEJvb2xlYW5WYWx1ZSc7XG4gICAgcHVibGljIHN0YXRpYyBSZWFkSW50ZXJ2YWxWYWx1ZTogc3RyaW5nID0gJ1JlYWRJbnRlcnZhbFZhbHVlJztcbiAgICBwdWJsaWMgc3RhdGljIFJlYWRMaXN0VmFsdWU6IHN0cmluZyA9ICdSZWFkTGlzdFZhbHVlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgdmFsdWVBc1N0cmluZzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndmFsdWVBc1N0cmluZyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzSHRtbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAndGV4dFZhbHVlQXNIdG1sJztcbiAgICBwdWJsaWMgc3RhdGljIHRleHRWYWx1ZUFzWG1sOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVBc1htbCc7XG4gICAgcHVibGljIHN0YXRpYyB0ZXh0VmFsdWVIYXNNYXBwaW5nOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd0ZXh0VmFsdWVIYXNNYXBwaW5nJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaGFzU3RhbmRvZmZMaW5rVG9WYWx1ZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0WWVhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzU3RhcnRZZWFyJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZFllYXI6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZFllYXInO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzU3RhcnRFcmE6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0RXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc0VuZEVyYTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzRW5kRXJhJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0TW9udGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc1N0YXJ0TW9udGgnO1xuICAgIHB1YmxpYyBzdGF0aWMgZGF0ZVZhbHVlSGFzRW5kTW9udGg6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZE1vbnRoJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVWYWx1ZUhhc1N0YXJ0RGF5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdkYXRlVmFsdWVIYXNTdGFydERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNFbmREYXk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2RhdGVWYWx1ZUhhc0VuZERheSc7XG4gICAgcHVibGljIHN0YXRpYyBkYXRlVmFsdWVIYXNDYWxlbmRhcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGF0ZVZhbHVlSGFzQ2FsZW5kYXInO1xuXG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXQ6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldCc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2U6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNTb3VyY2VJcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1NvdXJjZUlyaSc7XG4gICAgcHVibGljIHN0YXRpYyBsaW5rVmFsdWVIYXNUYXJnZXRJcmk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpbmtWYWx1ZUhhc1RhcmdldElyaSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGludGVnZXJWYWx1ZUFzSW50ZWdlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50VmFsdWVBc0ludCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlY2ltYWxWYWx1ZUFzRGVjaW1hbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZGVjaW1hbFZhbHVlQXNEZWNpbWFsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVZhbHVlQXNVcmw6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2ZpbGVWYWx1ZUFzVXJsJztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUlzUHJldmlldzogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnZmlsZVZhbHVlSXNQcmV2aWV3JztcbiAgICBwdWJsaWMgc3RhdGljIGZpbGVWYWx1ZUhhc0ZpbGVuYW1lOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdmaWxlVmFsdWVIYXNGaWxlbmFtZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGhhc1N0aWxsSW1hZ2VGaWxlVmFsdWU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2hhc1N0aWxsSW1hZ2VGaWxlVmFsdWUnO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVgnO1xuICAgIHB1YmxpYyBzdGF0aWMgc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0RpbVk6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ3N0aWxsSW1hZ2VGaWxlVmFsdWVIYXNEaW1ZJztcbiAgICBwdWJsaWMgc3RhdGljIHN0aWxsSW1hZ2VGaWxlVmFsdWVIYXNJSUlGQmFzZVVybDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnc3RpbGxJbWFnZUZpbGVWYWx1ZUhhc0lJSUZCYXNlVXJsJztcblxuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JWYWx1ZUFzQ29sb3I6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2NvbG9yVmFsdWVBc0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdnZW9tZXRyeVZhbHVlQXNHZW9tZXRyeSc7XG4gICAgcHVibGljIHN0YXRpYyB1cmlWYWx1ZUFzVXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICd1cmlWYWx1ZUFzVXJpJztcbiAgICBwdWJsaWMgc3RhdGljIGJvb2xlYW5WYWx1ZUFzQm9vbGVhbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnYm9vbGVhblZhbHVlQXNCb29sZWFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0OiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdpbnRlcnZhbFZhbHVlSGFzU3RhcnQnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxWYWx1ZUhhc0VuZDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMldpdGhWYWx1ZU9iamVjdFBhdGggKyAnaW50ZXJ2YWxWYWx1ZUhhc0VuZCc7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxpc3RWYWx1ZUFzTGlzdE5vZGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoICsgJ2xpc3RWYWx1ZUFzTGlzdE5vZGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgbGlzdFZhbHVlQXNMaXN0Tm9kZUxhYmVsOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Lbm9yYUFwaVYyV2l0aFZhbHVlT2JqZWN0UGF0aCArICdsaXN0VmFsdWVBc0xpc3ROb2RlTGFiZWwnO1xuXG4gICAgcHVibGljIHN0YXRpYyBYc2Q6IHN0cmluZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSMnO1xuXG4gICAgcHVibGljIHN0YXRpYyB4c2RTdHJpbmc6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlhzZCArICdzdHJpbmcnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkQm9vbGVhbjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2Jvb2xlYW4nO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkSW50ZWdlcjogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2ludGVnZXInO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkRGVjaW1hbDogc3RyaW5nID0gS25vcmFDb25zdGFudHMuWHNkICsgJ2RlY2ltYWwnO1xuICAgIHB1YmxpYyBzdGF0aWMgeHNkVXJpOiBzdHJpbmcgPSBLbm9yYUNvbnN0YW50cy5Yc2QgKyAnYW55VVJJJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVzb3VyY2VTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ1Jlc291cmNlJztcbiAgICBwdWJsaWMgc3RhdGljIGRhdGVTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0RhdGUnO1xuICAgIHB1YmxpYyBzdGF0aWMgaW50ZXJ2YWxTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0ludGVydmFsJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb21TaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb20nO1xuICAgIHB1YmxpYyBzdGF0aWMgY29sb3JTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0NvbG9yJztcbiAgICBwdWJsaWMgc3RhdGljIGdlb25hbWVTaW1wbGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ0dlb25hbWUnO1xuICAgIHB1YmxpYyBzdGF0aWMgZmlsZVNpbXBsZTogc3RyaW5nID0gS25vcmFDb25zdGFudHMuS25vcmFBcGlWMlNpbXBsZVBhdGggKyAnRmlsZSc7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1hdGNoRnVuY3Rpb246IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJTaW1wbGVQYXRoICsgJ21hdGNoJztcblxuICAgIHB1YmxpYyBzdGF0aWMgRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPSc7XG4gICAgcHVibGljIHN0YXRpYyBFcXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJyE9JztcbiAgICBwdWJsaWMgc3RhdGljIE5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIG5vdCBlcXVhbCB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPic7XG4gICAgcHVibGljIHN0YXRpYyBHcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ2lzIGdyZWF0ZXIgdGhhbic7XG5cbiAgICBwdWJsaWMgc3RhdGljIEdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yOiBzdHJpbmcgPSAnPj0nO1xuICAgIHB1YmxpYyBzdGF0aWMgR3JlYXRlclRoYW5FcXVhbHNDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBncmVhdGVyIHRoYW4gZXF1YWxzIHRvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5Db21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc8JztcbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbGVzcyB0aGFuJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGVzc1RoYW5FcXVhbHNDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICc8PSc7XG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhblF1YWxzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnaXMgbGVzcyB0aGFuIGVxdWFscyB0byc7XG5cbiAgICBwdWJsaWMgc3RhdGljIEV4aXN0c0NvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJ0UnO1xuICAgIHB1YmxpYyBzdGF0aWMgRXhpc3RzQ29tcGFyaXNvbkxhYmVsOiBzdHJpbmcgPSAnZXhpc3RzJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTGlrZUNvbXBhcmlzb25PcGVyYXRvcjogc3RyaW5nID0gJ3JlZ2V4JztcbiAgICBwdWJsaWMgc3RhdGljIExpa2VDb21wYXJpc29uTGFiZWw6IHN0cmluZyA9ICdpcyBsaWtlJztcblxuICAgIHB1YmxpYyBzdGF0aWMgTWF0Y2hDb21wYXJpc29uT3BlcmF0b3I6IHN0cmluZyA9ICdjb250YWlucyc7XG4gICAgcHVibGljIHN0YXRpYyBNYXRjaENvbXBhcmlzb25MYWJlbDogc3RyaW5nID0gJ21hdGNoZXMnO1xuXG4gICAgcHVibGljIHN0YXRpYyBTYWxzYWhMaW5rOiBzdHJpbmcgPSAnc2Fsc2FoLWxpbmsnOyAvLyBjbGFzcyBvbiBhbiBIVE1MIDxhPiBlbGVtZW50IHRoYXQgaW5kaWNhdGVzIGEgbGluayB0byBhIEtub3JhIHJlc291cmNlXG4gICAgcHVibGljIHN0YXRpYyBSZWZNYXJrZXI6IHN0cmluZyA9ICdyZWYtbWFya2VyJzsgLy8gY2xhc3Mgb24gYW4gSFRNTCBlbGVtZW50IHRoYXQgcmVmZXJzIHRvIGFub3RoZXIgZWxlbWVudCBpbiB0aGUgc2FtZSBkb2N1bWVudFxuXG4gICAgcHVibGljIHN0YXRpYyBHTkRQcmVmaXg6IHN0cmluZyA9ICcoREUtNTg4KSc7XG4gICAgcHVibGljIHN0YXRpYyBHTkRSZXNvbHZlcjogc3RyaW5nID0gJ2h0dHA6Ly9kLW5iLmluZm8vZ25kLyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIFZJQUZQcmVmaXg6IHN0cmluZyA9ICcoVklBRiknO1xuICAgIHB1YmxpYyBzdGF0aWMgVklBRlJlc29sdmVyOiBzdHJpbmcgPSAnaHR0cHM6Ly92aWFmLm9yZy92aWFmLyc7XG5cbn1cblxuXG5leHBvcnQgZW51bSBLbm9yYVNjaGVtYSB7XG4gICAgY29tcGxleCA9IDAsXG4gICAgc2ltcGxlID0gMVxufVxuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHVzZWZ1bCB1dGlsaXR5IGZ1bmN0aW9ucy5cbiAqL1xuaW1wb3J0IHsgS25vcmFDb25zdGFudHMgfSBmcm9tICcuL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIEVtYWlsIGFkZHJlc3MuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhFbWFpbCA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZ2V4IHRvIHZhbGlkYXRlIFVzZXJuYW1lLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXNlcm5hbWUgPSAvXlthLXpBLVowLTldKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBVUkxzLlxuICAgICAqXG4gICAgICogQHR5cGUge1JlZ0V4cH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJlZ2V4VXJsID0gL14oaHR0cDpcXC9cXC93d3dcXC58aHR0cHM6XFwvXFwvd3d3XFwufGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcLyk/W2EtejAtOV0rKFtcXC1cXC5dezF9W2EtejAtOV0rKSpcXC5bYS16XXsyLDZ9KDpbMC05XXsxLDV9KT8oXFwvLiopPyQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgUGFzc3dvcmRzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhQYXNzd29yZCA9IC9eKD89LipcXGQpKD89LipbYS16QS1aXSkuezgsfSQvaTtcblxuICAgIC8qKlxuICAgICAqIEEgcmVnZXggdG8gdmFsaWRhdGUgSGV4YWRlY2ltYWwgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVnZXhIZXggPSAvXlswLTlBLUZhLWZdKyQvO1xuXG4gICAgLyoqXG4gICAgICogQSByZWdleCB0byB2YWxpZGF0ZSBzaG9ydG5hbWUgaW4gcHJvamVjdHNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtSZWdFeHB9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBSZWdleFNob3J0bmFtZSA9IC9eW2EtekEtWl0rXFxTKiQvO1xuXG5cbiAgICAvKipcbiAgICAgKiBMYW1iZGEgZnVuY3Rpb24gZWxpbWluYXRpbmcgZHVwbGljYXRlcyBpbiBhIGNvbGxlY3Rpb24gdG8gYmUgcGFzc2VkIHRvIFtbZmlsdGVyXV0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZWxlbSBlbGVtZW50IG9mIGFuIEFycmF5IHRoYXQgaXMgY3VycmVudGx5IGJlaW5nIGxvb2tlZCBhdC5cbiAgICAgKiBAcGFyYW0gaW5kZXggY3VycmVudCBlbGVtZW50cyBpbmRleC5cbiAgICAgKiBAcGFyYW0gc2VsZiByZWZlcmVuY2UgdG8gdGhlIHdob2xlIEFycmF5LlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlIGlmIHRoZSBzYW1lIGVsZW1lbnQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBpbiB0aGUgQXJyYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJPdXREdXBsaWNhdGVzID0gKGVsZW0sIGluZGV4OiBudW1iZXIsIHNlbGYpID0+IHtcblxuICAgICAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjc0Nzc5OC9kZWxldGUtZHVwbGljYXRlLWVsZW1lbnRzLWZyb20tYW4tYXJyYXlcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyP3Y9ZXhhbXBsZVxuXG4gICAgICAgIC8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCdzIGluZGV4IGVxdWFscyB0aGUgaW5kZXggb2YgdGhlIGxlZnRtb3N0IGVsZW1lbnRcbiAgICAgICAgLy8gLT4gdGhpcyBtZWFucyB0aGF0IHRoZXJlIGlzIG5vIGlkZW50aWNhbCBlbGVtZW50IGJlZm9yZSB0aGlzIGluZGV4LCBoZW5jZSBpdCBpcyBub3QgYSBkdXBsaWNhdGVcbiAgICAgICAgLy8gZm9yIGFsbCBvdGhlciBlbGVtZW50cywgZmFsc2UgaXMgcmV0dXJuZWRcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSBzZWxmLmluZGV4T2YoZWxlbSk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIEtub3JhIGVudGl0eSBJUkksIGdldHMgdGhlIG9udG9sb2d5IElyaS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbnRpdHlJcmkgYW4gZW50aXR5IElyaS5cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBvbnRvbG9neSBJUklcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShlbnRpdHlJcmk6IHN0cmluZykge1xuXG4gICAgICAgIC8vIHNwbGl0IGNsYXNzIElyaSBvbiBcIiNcIlxuICAgICAgICBjb25zdCBzZWdtZW50czogc3RyaW5nW10gPSBlbnRpdHlJcmkuc3BsaXQoS25vcmFDb25zdGFudHMuUGF0aFNlcGFyYXRvcik7XG5cbiAgICAgICAgaWYgKHNlZ21lbnRzLmxlbmd0aCAhPT0gMikgY29uc29sZS5lcnJvcihgRXJyb3I6ICR7ZW50aXR5SXJpfSBpcyBub3QgYSB2YWxpZCBlbnRpdHkgSVJJLmApO1xuXG4gICAgICAgIHJldHVybiBzZWdtZW50c1swXTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgY29tcGxleCBrbm9yYS1hcGkgZW50aXR5IElyaSB0byBhIGtub3JhLWFwaSBzaW1wbGUgZW50aXR5IElyaS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21wbGV4RW50aXR5SXJpXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRDb21wbGV4S25vcmFBcGlFbnRpdHlJcml0b1NpbXBsZShjb21wbGV4RW50aXR5SXJpOiBzdHJpbmcpIHtcblxuICAgICAgICAvLyBzcGxpdCBlbnRpdHkgSXJpIG9uIFwiI1wiXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzOiBzdHJpbmdbXSA9IGNvbXBsZXhFbnRpdHlJcmkuc3BsaXQoJ3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzZWdtZW50cy5sZW5ndGggIT09IDIpIGNvbnNvbGUuZXJyb3IoYEVycm9yOiAke2NvbXBsZXhFbnRpdHlJcml9IGlzIG5vdCBhIHZhbGlkIGVudGl0eSBJUkkuYCk7XG5cbiAgICAgICAgLy8gYWRkICdzaW1wbGUnIHRvIGJhc2UgcGF0aFxuICAgICAgICByZXR1cm4gc2VnbWVudHNbMF0gKyAnc2ltcGxlL3YyJyArIEtub3JhQ29uc3RhbnRzLlBhdGhTZXBhcmF0b3IgKyBzZWdtZW50c1sxXTtcblxuICAgIH1cblxuXG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuXG5ASnNvbk9iamVjdCgnU3RyaW5nTGl0ZXJhbCcpXG5leHBvcnQgY2xhc3MgU3RyaW5nTGl0ZXJhbCB7XG5cbiAgICBASnNvblByb3BlcnR5KCd2YWx1ZScsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIHZhbHVlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYW5ndWFnZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyA9ICcnO1xufVxuIiwiLyoqXG4gKiBQcmVjaXNpb24gZm9yIERhdGVTYWxzYWguXG4gKi9cbmV4cG9ydCBlbnVtIFByZWNpc2lvbiB7XG4gICAgeWVhclByZWNpc2lvbixcbiAgICBtb250aFByZWNpc2lvbixcbiAgICBkYXlQcmVjaXNpb25cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgU2Fsc2FoIGRhdGUgb2JqZWN0IHdpdGggYSBwcmVjaXNpb24gaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlU2Fsc2FoIHtcblxuICAgIHByaXZhdGUgc3RhdGljIHNlcGFyYXRvciA9ICctJztcblxuICAgIHJlYWRvbmx5IHByZWNpc2lvbjogUHJlY2lzaW9uO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSB5ZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IG1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBkYXk/OiBudW1iZXJcbiAgICApIHtcbiAgICAgICAgaWYgKHRoaXMubW9udGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8geWVhciBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLnllYXJQcmVjaXNpb247XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gbW9udGggcHJlY2lzaW9uXG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IFByZWNpc2lvbi5tb250aFByZWNpc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRheSBwcmVjaXNpb25cbiAgICAgICAgICAgIHRoaXMucHJlY2lzaW9uID0gUHJlY2lzaW9uLmRheVByZWNpc2lvbjtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSB3aXRob3V0IHRoZSBjYWxlbmRhci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCkge1xuXG4gICAgICAgIGxldCBkYXRlU3RyaW5nID0gJygnICsgdGhpcy5lcmEgKyAnKSAnO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcmVjaXNpb24pIHtcblxuICAgICAgICAgICAgY2FzZSBQcmVjaXNpb24ueWVhclByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLm1vbnRoUHJlY2lzaW9uOiB7XG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSB0aGlzLnllYXIgKyBEYXRlU2Fsc2FoLnNlcGFyYXRvciArIHRoaXMubW9udGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgUHJlY2lzaW9uLmRheVByZWNpc2lvbjoge1xuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgKz0gdGhpcy55ZWFyICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLm1vbnRoICsgRGF0ZVNhbHNhaC5zZXBhcmF0b3IgKyB0aGlzLmRheTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZVN0cmluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXRlICh3aXRoIGNhbGVuZGFyKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RGF0ZUFzU3RyaW5nKCk6IHN0cmluZyB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXIgKyAnOicgKyB0aGlzLmdldERhdGVBc1N0cmluZ1dpdGhvdXRDYWxlbmRhcigpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwZXJpb2QgKHdpdGggc3RhcnQgZGF0ZSBhbmQgZW5kIGRhdGUpLlxuICovXG5leHBvcnQgY2xhc3MgRGF0ZVJhbmdlU2Fsc2FoIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBzdGFydDogRGF0ZVNhbHNhaCxcbiAgICAgICAgcmVhZG9ubHkgZW5kOiBEYXRlU2Fsc2FoXG4gICAgKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF0ZSByYW5nZSAod2l0aCBwcmVjZWRpbmcgY2FsZW5kYXIpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXREYXRlQXNTdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0LmdldERhdGVBc1N0cmluZygpICsgJzonICsgdGhpcy5lbmQuZ2V0RGF0ZUFzU3RyaW5nV2l0aG91dENhbGVuZGFyKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ0F1dGhlbnRpY2F0aW9uUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndG9rZW4nLCBTdHJpbmcpXG4gICAgcHVibGljIHRva2VuOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdCcpXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0bmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgc2hvcnRuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydGNvZGUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNob3J0Y29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9uZ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvbmduYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdkZXNjcmlwdGlvbicsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IFN0cmluZ0xpdGVyYWxbXSA9IFtuZXcgU3RyaW5nTGl0ZXJhbCgpXTtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tleXdvcmRzJywgW1N0cmluZ10sIHRydWUpXG4gICAgcHVibGljIGtleXdvcmRzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvZ28nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvZ286IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2luc3RpdHV0aW9uJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBpbnN0aXR1dGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ2llcycsIFtTdHJpbmddKVxuICAgIHB1YmxpYyBvbnRvbG9naWVzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3NlbGZqb2luJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc2VsZmpvaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vcHJvamVjdHMvcHJvamVjdCc7XG5cbkBKc29uT2JqZWN0KCdHcm91cCcpXG5leHBvcnQgY2xhc3MgR3JvdXAge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcpXG4gICAgcHVibGljIGlkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCduYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdkZXNjcmlwdGlvbicsIFN0cmluZylcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3QnLCBQcm9qZWN0LCBmYWxzZSlcbiAgICBwdWJsaWMgcHJvamVjdDogUHJvamVjdCA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3NlbGZqb2luJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc2VsZmpvaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXBSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgR3JvdXBSZXNwb25zZSB7XG5cbiAgICBASnNvblByb3BlcnR5KCdncm91cCcsIEdyb3VwKVxuICAgIHB1YmxpYyBncm91cDogR3JvdXAgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vZ3JvdXAnO1xuXG5ASnNvbk9iamVjdCgnR3JvdXBzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwcycsIFtHcm91cF0pXG4gICAgcHVibGljIGdyb3VwczogR3JvdXBbXSA9IHVuZGVmaW5lZDtcblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFN0cmluZ0xpdGVyYWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3RyaW5ncyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0SW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdEluZm8ge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaWQnLCBTdHJpbmcsIGZhbHNlKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgZmFsc2UpXG4gICAgcHVibGljIHByb2plY3RJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVscycsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgbGFiZWxzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdjb21tZW50cycsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgY29tbWVudHM6IFN0cmluZ0xpdGVyYWxbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGUge1xuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nLCBmYWxzZSlcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhYmVsJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBsYWJlbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY2hpbGRyZW4nLCBbTGlzdE5vZGVdLCB0cnVlKVxuICAgIHB1YmxpYyBjaGlsZHJlbjogTGlzdE5vZGVbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xldmVsJywgTnVtYmVyLCB0cnVlKVxuICAgIHB1YmxpYyBsZXZlbDogbnVtYmVyID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncG9zaXRpb24nLCBOdW1iZXIsIHRydWUpXG4gICAgcHVibGljIHBvc2l0aW9uOiBudW1iZXIgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdEluZm8gfSBmcm9tICcuL2xpc3QtaW5mbyc7XG5pbXBvcnQgeyBMaXN0Tm9kZSB9IGZyb20gJy4vbGlzdC1ub2RlJztcblxuQEpzb25PYmplY3QoJ0xpc3QnKVxuZXhwb3J0IGNsYXNzIExpc3Qge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdGluZm8nLCBMaXN0SW5mbywgZmFsc2UpXG4gICAgcHVibGljIGxpc3RpbmZvOiBMaXN0SW5mbyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2NoaWxkcmVuJywgW0xpc3ROb2RlXSwgZmFsc2UpXG4gICAgcHVibGljIGNoaWxkcmVuOiBMaXN0Tm9kZVtdID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0SW5mbyB9IGZyb20gJy4vbGlzdC1pbmZvJztcblxuQEpzb25PYmplY3QoJ0xpc3RJbmZvUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIExpc3RJbmZvUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbGlzdGluZm8nLCBMaXN0SW5mbywgZmFsc2UpXG4gICAgcHVibGljIGxpc3RpbmZvOiBMaXN0SW5mbyA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuQEpzb25PYmplY3QoJ0xpc3ROb2RlSW5mbycpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGVJbmZvIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2lkJywgU3RyaW5nKVxuICAgIHB1YmxpYyBpZDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdElyaScsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcHJvamVjdElyaTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnaXNSb290Tm9kZScsIEJvb2xlYW4sIHRydWUpXG4gICAgcHVibGljIGlzUm9vdE5vZGU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdsYWJlbHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGxhYmVsczogU3RyaW5nTGl0ZXJhbFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnY29tbWVudHMnLCBbU3RyaW5nTGl0ZXJhbF0pXG4gICAgcHVibGljIGNvbW1lbnRzOiBTdHJpbmdMaXRlcmFsW10gPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdE5vZGVJbmZvIH0gZnJvbSAnLi9saXN0LW5vZGUtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0Tm9kZUluZm9SZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdE5vZGVJbmZvUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbm9kZWluZm8nLCBMaXN0Tm9kZUluZm8sIGZhbHNlKVxuICAgIHB1YmxpYyBub2RlaW5mbzogTGlzdE5vZGVJbmZvID0gdW5kZWZpbmVkO1xufVxuXG5cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcblxuQEpzb25PYmplY3QoJ0xpc3RSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgTGlzdFJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3QnLCBMaXN0LCBmYWxzZSlcbiAgICBwdWJsaWMgbGlzdDogTGlzdCA9IHVuZGVmaW5lZDtcbn1cblxuXG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgTGlzdE5vZGVJbmZvIH0gZnJvbSAnLi9saXN0LW5vZGUtaW5mbyc7XG5cbkBKc29uT2JqZWN0KCdMaXN0c1Jlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBMaXN0c1Jlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xpc3RzJywgW0xpc3ROb2RlSW5mb10sIGZhbHNlKVxuICAgIHB1YmxpYyBsaXN0czogTGlzdE5vZGVJbmZvW10gPSB1bmRlZmluZWQ7XG59XG5cblxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcblxuQEpzb25PYmplY3QoJ09udG9sb2d5SW5mb1Nob3J0JylcbmV4cG9ydCBjbGFzcyBPbnRvbG9neUluZm9TaG9ydCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdvbnRvbG9neUlyaScsIFN0cmluZylcbiAgICBwdWJsaWMgb250b2xvZ3lJcmk6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ29udG9sb2d5TmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgb250b2xvZ3lOYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0KCdQZXJtaXNzaW9uRGF0YScpXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRhdGEge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ3JvdXBzUGVyUHJvamVjdCcsIE9iamVjdClcbiAgICBwdWJsaWMgZ3JvdXBzUGVyUHJvamVjdDogYW55ID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnYWRtaW5pc3RyYXRpdmVQZXJtaXNzaW9uc1BlclByb2plY3QnLCBPYmplY3QpXG4gICAgcHVibGljIGFkbWluaXN0cmF0aXZlUGVybWlzc2lvbnNQZXJQcm9qZWN0OiBhbnkgPSB1bmRlZmluZWQ7XG59XG4iLCJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9ncm91cHMvZ3JvdXAnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkRhdGEgfSBmcm9tICcuLi9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLWRhdGEnO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL3Byb2plY3RzL3Byb2plY3QnO1xuXG5ASnNvbk9iamVjdCgnVXNlcicpXG5leHBvcnQgY2xhc3MgVXNlciB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2VtYWlsJywgU3RyaW5nKVxuICAgIHB1YmxpYyBlbWFpbDogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcm5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIHVzZXJuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdwYXNzd29yZCcsIFN0cmluZywgdHJ1ZSlcbiAgICBwdWJsaWMgcGFzc3dvcmQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Rva2VuJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnZ2l2ZW5OYW1lJywgU3RyaW5nKVxuICAgIHB1YmxpYyBnaXZlbk5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2ZhbWlseU5hbWUnLCBTdHJpbmcpXG4gICAgcHVibGljIGZhbWlseU5hbWU6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2dyb3VwcycsIFtHcm91cF0pXG4gICAgcHVibGljIGdyb3VwczogR3JvdXBbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Byb2plY3RzJywgW1Byb2plY3RdKVxuICAgIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnc2Vzc2lvbklkJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBzZXNzaW9uSWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Blcm1pc3Npb25zJywgUGVybWlzc2lvbkRhdGEpXG4gICAgcHVibGljIHBlcm1pc3Npb25zOiBQZXJtaXNzaW9uRGF0YSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c3RlbUFkbWluJywgQm9vbGVhbiwgdHJ1ZSlcbiAgICBwdWJsaWMgc3lzdGVtQWRtaW4/OiBib29sZWFuID0gZmFsc2U7XG5cblxufVxuIiwiaW1wb3J0IHsgSnNvbk9iamVjdCwgSnNvblByb3BlcnR5IH0gZnJvbSAnanNvbjJ0eXBlc2NyaXB0JztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy91c2VyJztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RNZW1iZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RNZW1iZXJzUmVzcG9uc2Uge1xuICAgIEBKc29uUHJvcGVydHkoJ21lbWJlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIG1lbWJlcnM6IFVzZXJbXSA9IHVuZGVmaW5lZDtcbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdFJlc3BvbnNlJylcbmV4cG9ydCBjbGFzcyBQcm9qZWN0UmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdCcsIFByb2plY3QpXG4gICAgcHVibGljIHByb2plY3Q6IFByb2plY3QgPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0JztcblxuQEpzb25PYmplY3QoJ1Byb2plY3RzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFByb2plY3RzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgncHJvamVjdHMnLCBbUHJvamVjdF0pXG4gICAgcHVibGljIHByb2plY3RzOiBQcm9qZWN0W10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5cbkBKc29uT2JqZWN0XG5leHBvcnQgY2xhc3MgQ3VycmVudFVzZXIge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnand0JywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBqd3Q6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xhbmcnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxhbmc6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N5c0FkbWluJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc3lzQWRtaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJzUmVzcG9uc2UnKVxuZXhwb3J0IGNsYXNzIFVzZXJzUmVzcG9uc2Uge1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgndXNlcnMnLCBbVXNlcl0pXG4gICAgcHVibGljIHVzZXJzOiBVc2VyW10gPSB1bmRlZmluZWQ7XG5cbn1cbiIsImltcG9ydCB7IEpzb25PYmplY3QsIEpzb25Qcm9wZXJ0eSB9IGZyb20gJ2pzb24ydHlwZXNjcmlwdCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi91c2VyJztcblxuQEpzb25PYmplY3QoJ1VzZXJSZXNwb25zZScpXG5leHBvcnQgY2xhc3MgVXNlclJlc3BvbnNlIHtcblxuICAgIEBKc29uUHJvcGVydHkoJ3VzZXInLCBVc2VyKVxuICAgIHB1YmxpYyB1c2VyOiBVc2VyID0gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2tub3JhLWNvbnN0YW50cyc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VTYWxzYWgsIERhdGVTYWxzYWggfSBmcm9tICcuLi8uLi9zaGFyZWQvZGF0ZSc7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHJlcHJlc2VudGluZyBhbnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIElyaS5cbiAgICAgKi9cbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHZhbHVlIG9iamVjdCdzIHR5cGUuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHlwZTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3BlcnR5IHBvaW50aW5nIHRvIHRoZSB2YWx1ZSBvYmplY3QuXG4gICAgICovXG4gICAgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY2xhc3MgbmFtZSBvZiB0aGUgY2xhc3MgdGhhdCBpbXBsZW1lbnRzIHRoaXMgaW50ZXJmYWNlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXMgYSBzdHJpbmcgKGNvbXBsZXhpdHkgb2YgdGhlIHZhbHVlIHBvc3NpYmx5IHJlZHVjZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBjbGFzcyByZXByZXNlbnRpbmcgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG9yIHdpdGhvdXQgbWFya3VwLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVhZFRleHRWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgYWJzdHJhY3QgaWQ6IHN0cmluZztcblxuICAgIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTtcblxuICAgIGFic3RyYWN0IHByb3BJcmk6IHN0cmluZztcblxuICAgIGFic3RyYWN0IGdldENsYXNzTmFtZSgpOiBzdHJpbmc7XG5cbiAgICBhYnN0cmFjdCBnZXRDb250ZW50KCk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aG91dCBtYXJrdXAgKG1lcmUgY2hhcmFjdGVyIHN0cmluZykuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcgZXh0ZW5kcyBSZWFkVGV4dFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNTdHJpbmc7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHJlc291cmNlcyByZWZlcnJlZCB0byBieSBzdGFuZG9mZiBsaW5rcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmsge1xuICAgIFtpbmRleDogc3RyaW5nXTogUmVhZFJlc291cmNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB0ZXh0IHZhbHVlIG9iamVjdCB3aXRoIG1hcmt1cCB0aGF0IGhhcyBiZWVuIHR1cm5lZCBpbnRvIEhUTUwuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dFZhbHVlQXNIdG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBodG1sOiBzdHJpbmcsIHJlYWRvbmx5IHJlZmVycmVkUmVzb3VyY2VzOiBSZWZlcnJlZFJlc291cmNlc0J5U3RhbmRvZmZMaW5rKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCBhIHJlc291cmNlIHJlZmVycmVkIHRvIGJ5IGEgc3RhbmRvZmYgbGluayBmcm9tIGEgdGV4dCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZWZlcnJlZCByZXNvdXJjZS5cbiAgICAgKiBAcGFyYW0ge09udG9sb2d5SW5mb3JtYXRpb259IG9udG9sb2d5SW5mbyBvbnRvbG9neSBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UncyBjbGFzcyBhbmQgaXRzIGxhYmVsLlxuICAgICAqL1xuXG5cbiAgICBnZXRSZWZlcnJlZFJlc291cmNlSW5mbyhyZXNvdXJjZUlyaTogc3RyaW5nLCBvbnRvbG9neUluZm86IE9udG9sb2d5SW5mb3JtYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVmZXJyZWRSZXNvdXJjZXMgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJlZmVycmVkUmVzb3VyY2VzW3Jlc291cmNlSXJpXSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzTGFiZWwgPSBvbnRvbG9neUluZm8uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzKHRoaXMucmVmZXJyZWRSZXNvdXJjZXNbcmVzb3VyY2VJcmldLnR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlc1tyZXNvdXJjZUlyaV0ubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ25vIGluZm9ybWF0aW9uIGZvdW5kIGFib3V0IHJlZmVycmVkIHJlc291cmNlICh0YXJnZXQgb2Ygc3RhbmRvZmYgbGluayknO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRUZXh0VmFsdWVBc0h0bWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgdGV4dCB2YWx1ZSBvYmplY3Qgd2l0aCBtYXJrdXAgYXMgWE1MLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFRleHRWYWx1ZUFzWG1sIGV4dGVuZHMgUmVhZFRleHRWYWx1ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSB4bWw6IHN0cmluZywgcmVhZG9ubHkgbWFwcGluZ0lyaTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dFZhbHVlQXNYbWw7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueG1sO1xuICAgIH1cblxufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGRhdGUgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZERhdGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNhbGVuZGFyOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0WWVhcjogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRZZWFyOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHN0YXJ0RXJhOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGVuZEVyYTogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBzdGFydE1vbnRoPzogbnVtYmVyLFxuICAgICAgICByZWFkb25seSBlbmRNb250aD86IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgc3RhcnREYXk/OiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IGVuZERheT86IG51bWJlcikge1xuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EYXRlVmFsdWU7XG5cbiAgICBwcml2YXRlIHNlcGFyYXRvciA9ICcvJztcblxuICAgIGdldERhdGVTYWxzYWgoKTogRGF0ZVNhbHNhaCB8IERhdGVSYW5nZVNhbHNhaCB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0WWVhciA9PT0gdGhpcy5lbmRZZWFyICYmIHRoaXMuc3RhcnRNb250aCA9PT0gdGhpcy5lbmRNb250aCAmJiB0aGlzLnN0YXJ0RGF5ID09PSB0aGlzLmVuZERheSAmJiB0aGlzLnN0YXJ0RXJhID09PSB0aGlzLmVuZEVyYSkge1xuICAgICAgICAgICAgLy8gcHJlY2lzZSBkYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkYXRlIHBlcmlvZFxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlUmFuZ2VTYWxzYWgobmV3IERhdGVTYWxzYWgodGhpcy5jYWxlbmRhciwgdGhpcy5zdGFydEVyYSwgdGhpcy5zdGFydFllYXIsIHRoaXMuc3RhcnRNb250aCwgdGhpcy5zdGFydERheSksIG5ldyBEYXRlU2Fsc2FoKHRoaXMuY2FsZW5kYXIsIHRoaXMuZW5kRXJhLCB0aGlzLmVuZFllYXIsIHRoaXMuZW5kTW9udGgsIHRoaXMuZW5kRGF5KSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZERhdGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlU2Fsc2FoKCkuZ2V0RGF0ZUFzU3RyaW5nKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaW5rIHZhbHVlIG9iamVjdCAocmVpZmljYXRpb24pLlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpbmtWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgcmVmZXJyZWRSZXNvdXJjZUlyaTogc3RyaW5nLCByZWFkb25seSByZWZlcnJlZFJlc291cmNlPzogUmVhZFJlc291cmNlKSB7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlO1xuXG4gICAgZ2V0UmVmZXJyZWRSZXNvdXJjZUluZm8ob250b2xvZ3lJbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0xhYmVsID0gb250b2xvZ3lJbmZvLmdldExhYmVsRm9yUmVzb3VyY2VDbGFzcyh0aGlzLnJlZmVycmVkUmVzb3VyY2UudHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2UubGFiZWwgKyBgICgke3Jlc0NsYXNzTGFiZWx9KWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZlcnJlZFJlc291cmNlSXJpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkTGlua1ZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlZmVycmVkUmVzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmZXJyZWRSZXNvdXJjZS5sYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZmVycmVkUmVzb3VyY2VJcmk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRJbnRlZ2VyVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmksIHJlYWRvbmx5IGludGVnZXI6IG51bWJlcikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkludFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZWdlclZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVnZXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZGVjaW1hbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkRGVjaW1hbFZhbHVlIGltcGxlbWVudHMgUmVhZFByb3BlcnR5SXRlbSB7XG5cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLCByZWFkb25seSBwcm9wSXJpLCByZWFkb25seSBkZWNpbWFsOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5EZWNpbWFsVmFsdWU7XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWREZWNpbWFsVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RpbGwgaW1hZ2UgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBwcm9wSXJpLFxuICAgICAgICByZWFkb25seSBpbWFnZUZpbGVuYW1lOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGltYWdlU2VydmVySUlJRkJhc2VVUkw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgaW1hZ2VQYXRoOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGRpbVg6IG51bWJlcixcbiAgICAgICAgcmVhZG9ubHkgZGltWTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGltYWdlIGlzIGEganBlZywgaXQgaXMgYSBwcmV2aWV3IGltYWdlXG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gaW1hZ2VGaWxlbmFtZS5lbmRzV2l0aCgnLmpwZycpO1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlN0aWxsSW1hZ2VGaWxlVmFsdWU7XG5cbiAgICByZWFkb25seSBpc1ByZXZpZXc6IGJvb2xlYW47XG5cbiAgICBtYWtlSUlJRlVybChyZWR1Y2VGYWN0b3I6IG51bWJlcik6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZVBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGguZmxvb3IoMTAwIC8gcmVkdWNlRmFjdG9yKTtcblxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IChwZXJjZW50YWdlID4gMCAmJiBwZXJjZW50YWdlIDw9IDEwMCkgPyBwZXJjZW50YWdlIDogNTA7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlU2VydmVySUlJRkJhc2VVUkwgKyAnLycgKyB0aGlzLmltYWdlRmlsZW5hbWUgKyAnL2Z1bGwvcGN0OicgKyBwZXJjZW50YWdlLnRvU3RyaW5nKCkgKyAnLzAvZGVmYXVsdC5qcGcnO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEtub3JhQ29uc3RhbnRzLlJlYWRTdGlsbEltYWdlRmlsZVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlUGF0aDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHRleHQgcmVwcmVzZW50YXRpb24gdmFsdWUgb2JqZWN0XG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkVGV4dEZpbGVWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaSwgcmVhZG9ubHkgdGV4dEZpbGVuYW1lOiBzdHJpbmcsIHJlYWRvbmx5IHRleHRGaWxlVVJMOiBzdHJpbmcpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5UZXh0RmlsZVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVGV4dEZpbGVWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0RmlsZVVSTDtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgY29sb3IgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZENvbG9yVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IHByb3BJcmksXG4gICAgICAgIHJlYWRvbmx5IGNvbG9ySGV4OiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuQ29sb3JWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZENvbG9yVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JIZXg7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwb2ludCBpbiBhIDJELWNvb3JkaW5hdGUgc3lzdGVtIChmb3IgZ2VvbWV0cnkgdmFsdWVzKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBvaW50MkQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGdlb21ldHJ5IHZhbHVlIHBhcnNlZCBmcm9tIEpTT04uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpb25HZW9tZXRyeSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIHN0YXR1czogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgbGluZUNvbG9yOiBzdHJpbmcsXG4gICAgICAgIHB1YmxpYyBsaW5lV2lkdGg6IG51bWJlcixcbiAgICAgICAgcHVibGljIHBvaW50czogUG9pbnQyRFtdLFxuICAgICAgICBwdWJsaWMgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmFkaXVzPzogUG9pbnQyRFxuICAgICkge1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgZ2VvbWV0cnkgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZEdlb21WYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBnZW9tZXRyeVN0cmluZzogc3RyaW5nKSB7XG5cbiAgICAgICAgY29uc3QgZ2VvbWV0cnlKU09OID0gSlNPTi5wYXJzZShnZW9tZXRyeVN0cmluZyk7XG5cbiAgICAgICAgY29uc3QgcG9pbnRzOiBQb2ludDJEW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBwb2ludCBvZiBnZW9tZXRyeUpTT04ucG9pbnRzKSB7XG4gICAgICAgICAgICBwb2ludHMucHVzaChuZXcgUG9pbnQyRChwb2ludC54LCBwb2ludC55KSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFkaXVzO1xuICAgICAgICBpZiAoZ2VvbWV0cnlKU09OLnJhZGl1cykge1xuICAgICAgICAgICAgcmFkaXVzID0gbmV3IFBvaW50MkQoZ2VvbWV0cnlKU09OLnJhZGl1cy54LCBnZW9tZXRyeUpTT04ucmFkaXVzLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBSZWdpb25HZW9tZXRyeShcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi5zdGF0dXMsXG4gICAgICAgICAgICBnZW9tZXRyeUpTT04ubGluZUNvbG9yLFxuICAgICAgICAgICAgZ2VvbWV0cnlKU09OLmxpbmVXaWR0aCxcbiAgICAgICAgICAgIHBvaW50cyxcbiAgICAgICAgICAgIGdlb21ldHJ5SlNPTi50eXBlLFxuICAgICAgICAgICAgcmFkaXVzXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICByZWFkb25seSBnZW9tZXRyeTogUmVnaW9uR2VvbWV0cnk7XG5cbiAgICByZWFkb25seSB0eXBlID0gS25vcmFDb25zdGFudHMuR2VvbVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkR2VvbVZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdlb21ldHJ5U3RyaW5nO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgVVJJIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRVcmlWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSB1cmk6IHN0cmluZykge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLlVyaVZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkVXJpVmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJpO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBCb29sZWFuIHZhbHVlIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRCb29sZWFuVmFsdWUgaW1wbGVtZW50cyBSZWFkUHJvcGVydHlJdGVtIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsIHJlYWRvbmx5IHByb3BJcmk6IHN0cmluZywgcmVhZG9ubHkgYm9vbDogYm9vbGVhbikge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkJvb2xlYW5WYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib29sLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcnZhbCB2YWx1ZSBvYmplY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkSW50ZXJ2YWxWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBpbnRlcnZhbFN0YXJ0OiBudW1iZXIsIHJlYWRvbmx5IGludGVydmFsRW5kOiBudW1iZXIpIHtcblxuICAgIH1cblxuICAgIHJlYWRvbmx5IHR5cGUgPSBLbm9yYUNvbnN0YW50cy5JbnRlcnZhbFZhbHVlO1xuXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBLbm9yYUNvbnN0YW50cy5SZWFkSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbFN0YXJ0LnRvU3RyaW5nKCkgKyAnLScgKyB0aGlzLmludGVydmFsRW5kO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJ2YWwgdmFsdWUgb2JqZWN0LlxuICovXG5leHBvcnQgY2xhc3MgUmVhZExpc3RWYWx1ZSBpbXBsZW1lbnRzIFJlYWRQcm9wZXJ0eUl0ZW0ge1xuXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgaWQ6IHN0cmluZywgcmVhZG9ubHkgcHJvcElyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUlyaTogc3RyaW5nLCByZWFkb25seSBsaXN0Tm9kZUxhYmVsOiBzdHJpbmcsICkge1xuXG4gICAgfVxuXG4gICAgcmVhZG9ubHkgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxpc3RWYWx1ZTtcblxuICAgIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gS25vcmFDb25zdGFudHMuUmVhZExpc3RWYWx1ZTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Tm9kZUxhYmVsO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZFByb3BlcnRpZXMsIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiB9IGZyb20gJy4uLy4uLy4uLyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlYWRSZXNvdXJjZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgcmVzb3VyY2UncyBJcmkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIHJlc291cmNlJ3MgdHlwZSAoY2xhc3MpLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCB0aGUgcmVzb3VyY2UncyByZGZzOmxhYmVsLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdSZWdpb25zIHJlZ2lvbnMgcG9pbnRpbmcgdG8gdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7QXJyYXk8UmVhZFJlc291cmNlPn0gaW5jb21pbmdTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIHN0aWxsIGltYWdlIHJlcHJlc2VudGF0aW9ucyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSBpbmNvbWluZ0xpbmtzIHJlc291cmNlcyBwb2ludGluZyB0byB0aGlzIHJlc291cmNlLCBpZiBhbnkgKHBvc3NpYmx5IHRvIGJlIHF1ZXJpZWQgYnkgYWRkaXRpb25hbCByZXF1ZXN0cykuXG4gICAgICogQHBhcmFtIHtTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXX0gc3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uc1RvRGlzcGxheSAgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zIHRvIGJlIGRpc3BsYXllZCBmb3IgdGhpcyByZXNvdXJjZSwgaWYgYW55IChwb3NzaWJseSB0byBiZSBxdWVyaWVkIGJ5IGFkZGl0aW9uYWwgcmVxdWVzdHMpLlxuICAgICAqIEBwYXJhbSB7UmVhZFByb3BlcnRpZXN9IHByb3BlcnRpZXMgdGhlIHJlc291cmNlcydzIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogc3RyaW5nLFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcHVibGljIGluY29taW5nUmVnaW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uczogQXJyYXk8UmVhZFJlc291cmNlPixcbiAgICAgICAgcHVibGljIGluY29taW5nTGlua3M6IEFycmF5PFJlYWRSZXNvdXJjZT4sXG4gICAgICAgIHB1YmxpYyBzdGlsbEltYWdlUmVwcmVzZW50YXRpb25zVG9EaXNwbGF5OiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25bXSxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHByb3BlcnRpZXM/OiBSZWFkUHJvcGVydGllcykge1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcywgSHR0cFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHRocm93RXJyb3IgfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvdGhyb3dFcnJvcic7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IgfSBmcm9tICcuLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtZXJyb3InO1xuaW1wb3J0IHsgQXBpU2VydmljZVJlc3VsdCB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9hcGktc2VydmljZS1yZXN1bHQnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uL2RlY2xhcmF0aW9ucy9jb3JlLmNvbmZpZyc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNDczMDAxMC9hbmd1bGFyMi01LW1pbnV0ZS1pbnN0YWxsLWJ1Zy1yZXF1aXJlLWlzLW5vdC1kZWZpbmVkXG5jb25zdCBqc29ubGQgPSByZXF1aXJlKCdqc29ubGQnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICAvLyBpZiBpcyBsb2FkaW5nLCBzZXQgaXQgdHJ1ZTtcbiAgICAvLyBpdCBjYW4gYmUgdXNlZCBpbiBjb21wb25lbnRzXG4gICAgLy8gZm9yIHByb2dyZXNzIGxvYWRlciBlbGVtZW50XG4gICAgbG9hZGluZyA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR0VUXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aCB0aGUgVVJMIGZvciB0aGUgR0VUIHJlcXVlc3QuXG4gICAgICogQHBhcmFtIHtIdHRwUGFyYW1zfSBwYXJhbXMgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBHRVQgcmVxdWVzdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBHZXQocGF0aDogc3RyaW5nLCBwYXJhbXM/OiBIdHRwUGFyYW1zKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIHtvYnNlcnZlOiAncmVzcG9uc2UnLCBwYXJhbXM6IHBhcmFtc30pLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2U8YW55Pik6IEFwaVNlcnZpY2VSZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFwaVNlcnZpY2VSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dDtcbiAgICAgICAgICAgICAgICByZXN1bHQudXJsID0gcGF0aDtcbiAgICAgICAgICAgICAgICByZXN1bHQuYm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIEpTT04tTEQgcmV0dXJuZWQgYnkgS25vcmEuXG4gICAgICogRXhwYW5kcyBJcmlzIGFuZCBjcmVhdGVzIGFuIGVtcHR5IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcGlTZXJ2aWNlUmVzdWx0fSByZXNvdXJjZVJlc3BvbnNlXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NKU09OTEQocmVzb3VyY2VSZXNwb25zZTogQXBpU2VydmljZVJlc3VsdCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgY29uc3QgcmVzUHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgIGNvbnN0IHJlc1Byb21pc2UgPSByZXNQcm9taXNlcy5jb21wYWN0KHJlc291cmNlUmVzcG9uc2UuYm9keSwge30pO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgcHJvbWlzZSB0byBPYnNlcnZhYmxlIGFuZCByZXR1cm4gaXRcbiAgICAgICAgLy8gaHR0cHM6Ly93d3cubGVhcm5yeGpzLmlvL29wZXJhdG9ycy9jcmVhdGlvbi9mcm9tcHJvbWlzZS5odG1sXG4gICAgICAgIHJldHVybiBmcm9tKHJlc1Byb21pc2UpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUE9TVFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcGFyYW0ge2FueX0gYm9keVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYW55XG4gICAgICovXG4gICAgaHR0cFBvc3QocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuY29uZmlnLmFwaSArIHBhdGgsIGJvZHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IEh0dHBSZXNwb25zZTxhbnk+KTogQXBpU2VydmljZVJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXBpU2VydmljZVJlc3VsdCgpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0O1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cmwgPSBwYXRoO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5ib2R5ID0gcmVzcG9uc2UuYm9keTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQVVRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBQdXQocGF0aDogc3RyaW5nLCBib2R5PzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5jb25maWcuYXBpICsgcGF0aCwgYm9keSwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERFTEVURVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGFueVxuICAgICAqL1xuICAgIGh0dHBEZWxldGUocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNvbnN0IGhlYWRlcnMgPSB0aGlzLnNldEhlYWRlcnMoKTsgLS0+IHRoaXMgaXMgbm93IGRvbmUgYnkgdGhlIGludGVyY2VwdG9yIGZyb20gQGtub3JhL2F1dGhlbnRpY2F0aW9uXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5jb25maWcuYXBpICsgcGF0aCwge29ic2VydmU6ICdyZXNwb25zZSd9KS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXNwb25zZTogSHR0cFJlc3BvbnNlPGFueT4pOiBBcGlTZXJ2aWNlUmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcGlTZXJ2aWNlUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVybCA9IHBhdGg7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJvZHkgPSByZXNwb25zZS5ib2R5O1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlcXVlc3RFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIHJlcXVlc3QgZXJyb3IgaW4gY2FzZSBvZiBzZXJ2ZXIgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SHR0cEVycm9yUmVzcG9uc2V9IGVycm9yXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiBBcGlTZXJ2aWNlRXJyb3JcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgaGFuZGxlUmVxdWVzdEVycm9yKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8QXBpU2VydmljZUVycm9yPiB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXNUZXh0ID0gZXJyb3Iuc3RhdHVzVGV4dDtcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgIHNlcnZpY2VFcnJvci51cmwgPSBlcnJvci51cmw7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaGFuZGxlIGpzb24gZXJyb3IgaW4gY2FzZSBvZiB0eXBlIGVycm9yIGluIGpzb24gcmVzcG9uc2UgKGpzb24ydHlwZXNjcmlwdClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSBlcnJvclxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgQXBpU2VydmljZUVycm9yXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGhhbmRsZUpzb25FcnJvcihlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlRXJyb3I+IHtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlTZXJ2aWNlRXJyb3IpIHJldHVybiB0aHJvd0Vycm9yKGVycm9yKTtcblxuICAgICAgICBjb25zdCBzZXJ2aWNlRXJyb3IgPSBuZXcgQXBpU2VydmljZUVycm9yKCk7XG4gICAgICAgIHNlcnZpY2VFcnJvci5zdGF0dXMgPSAtMTtcbiAgICAgICAgc2VydmljZUVycm9yLnN0YXR1c1RleHQgPSAnSW52YWxpZCBKU09OJztcbiAgICAgICAgc2VydmljZUVycm9yLmVycm9ySW5mbyA9IGVycm9yO1xuICAgICAgICBzZXJ2aWNlRXJyb3IudXJsID0gJyc7XG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKHNlcnZpY2VFcnJvcik7XG5cbiAgICB9XG5cbiAgICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZCBpcyByZXBsYWNlZCBieSB0aGUgSnd0SW50ZXJjZXB0b3JcbiAgICAvKlxuICAgIHByb3RlY3RlZCBzZXRIZWFkZXJzKCk6IEh0dHBIZWFkZXJzIHtcbiAgICAgICAgbGV0IGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgICAgIC8vIGdldCBrZXkgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uX2lkJyk7XG5cbiAgICAgICAgaWYgKGtleSAmJiBrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHRoaXMuX2Fjcy5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVzZXIgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXBpIHNlcnZpY2UgLS0gc2V0SGVhZGVycyAtLSBjdXJyZW50VXNlciBmcm9tIGFjcycsIGN1cnJlbnRVc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke2N1cnJlbnRVc2VyLnRva2VufWBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgICovXG4gICAgLypcbiAgICAvISoqXG4gICAgICogQXBwZW5kcyB0byBleGlzdGluZyBvcHRpb25zIGlmIHRoZXkgZXhpc3QuXG4gICAgICogQHBhcmFtIHtIdHRwSGVhZGVyc30gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtIdHRwSGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZFRvT3B0aW9ucyhvcHRpb25zOiBhbnkpOiBhbnkge1xuXG4gICAgICAgIGxldCBoZWFkZXJzOiBIdHRwSGVhZGVycztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIGhlYWRlcnMgPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcyYSkgJywgaGVhZGVycyk7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnMmIpICcsIG9wdGlvbnMpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBoYXZlIG9wdGlvbnNcbiAgICAgICAgICAgIGlmICghb3B0aW9uc1snaGVhZGVycyddKSB7XG4gICAgICAgICAgICAgICAgLy8gbm8gaGVhZGVycyBzZXRcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMzogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGhhdmUgaGVhZGVycywgbmVlZCB0byBhcHBlbmQgdG8gdGhvc2VcbiAgICAgICAgICAgICAgICBvcHRpb25zWydoZWFkZXJzJ10gPSB0aGlzLmFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIob3B0aW9uc1snaGVhZGVycyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnNDogJywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfVxuKi9cbiAgICAvKlxuICAgIC8hKipcbiAgICAgKiBBcHBlbmRzIHRvIGV4aXN0aW5nIGhlYWRlcnMgaWYgdGhleSBleGlzdC5cbiAgICAgKiBAcGFyYW0ge0hlYWRlcnN9IGhlYWRlcnNcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKiEvXG4gICAgcHJvdGVjdGVkIGFwcGVuZEF1dGhvcml6YXRpb25IZWFkZXIoaGVhZGVycz86IEh0dHBIZWFkZXJzKTogSHR0cEhlYWRlcnMge1xuXG5cbiAgICAgICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKSkudG9rZW47XG5cbi8vICAgICAgICAgICAgaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG5cbiAgICAgICAgICAgIGhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50VXNlcicpKS50b2tlbn1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZWFkZXJzO1xuICAgIH1cbiovXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy9hcGkva25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IE5ld09udG9sb2d5IH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS92Mi9vbnRvbG9neS9uZXctb250b2xvZ3knO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBvbnRvbG9neSBpbmZvcm1hdGlvbiBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gR0VUIGxpc3Qgb2Ygb250b2xvZ2llc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogREVQUkVDQVRFRDogWW91IHNob3VsZCB1c2UgZ2V0QWxsT250b2xvZ2llcygpXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRPbnRvbG9naWVzTWV0YWRhdGEoKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL21ldGFkYXRhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIG1ldGFkYXRhIGFib3V0IGFsbCBleGlzdGluZyBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSBtZXRhZGF0YSBvZiBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRBbGxPbnRvbG9naWVzKCk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvb250b2xvZ2llcy9tZXRhZGF0YScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIHRoZSBvbnRvbG9naWVzIG9mIGEgc3BlY2lmaWMgcHJvamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIG1ldGFkYXRhIG9mIHByb2plY3Qgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0T250b2xvZ2llcyhwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvbWV0YWRhdGEvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKSk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVQgb250b2xvZ3lcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSBnaXZlbiBvbnRvbG9naWVzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9udG9sb2d5SXJpIHRoZSBJcmlzIG9mIHRoZSBuYW1lZCBncmFwaHMgd2hvc2UgcmVzb3VyY2UgY2xhc3NlcyBhcmUgdG8gYmUgcmV0dXJuZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiAtIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICovXG4gICAgZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvYWxsZW50aXRpZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChvbnRvbG9neUlyaSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzIGZyb20gS25vcmEncyBvbnRvbG9naWVzIHJvdXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIElyaXMgb2YgdGhlIHJlc291cmNlIGNsYXNzZXMgdG8gYmUgcXVlcmllZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VDbGFzc0lyaXM6IEFycmF5PHN0cmluZz4pOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAocmVzb3VyY2VDbGFzc0lyaXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBubyByZXNvdXJjZSBjbGFzcyBJcmlzIGFyZSBnaXZlbiB0byBxdWVyeSBmb3IsIHJldHVybiBhIGZhaWxlZCBPYnNlcnZlclxuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyByZXNvdXJjZSBjbGFzcyBJcmlzIGdpdmVuIGZvciBjYWxsIG9mIE9udG9sb2d5U2VydmljZS5nZXRSZXNvdXJjZUNsYXNzZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzQ2xhc3NVcmlFbmMgPSAnJztcblxuICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcmVzQ2xhc3NVcmlFbmMgPSByZXNDbGFzc1VyaUVuYyArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChyZXNDbGFzc0lyaS50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL29udG9sb2dpZXMvY2xhc3NlcycgKyByZXNDbGFzc1VyaUVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgcHJvcGVydGllcyBmcm9tIEtub3JhJ3Mgb250b2xvZ2llcyByb3V0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSBxdWVyaWVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4gLSB0aGUgcmVxdWVzdGVkIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ2V0UHJvcGVydGllcyhwcm9wZXJ0eUlyaXM6IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5SXJpcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIG5vIHJlc291cmNlIGNsYXNzIElyaXMgYXJlIGdpdmVuIHRvIHF1ZXJ5IGZvciwgcmV0dXJuIGEgZmFpbGVkIE9ic2VydmVyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHByb3BlcnR5IElyaXMgZ2l2ZW4gZm9yIGNhbGwgb2YgT250b2xvZ3lTZXJ2aWNlLmdldFByb3BlcnRpZXMnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcHJvcGVydGllc1VyaUVuYyA9ICcnO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKGZ1bmN0aW9uIChyZXNDbGFzc0lyaSkge1xuICAgICAgICAgICAgcHJvcGVydGllc1VyaUVuYyA9IHByb3BlcnRpZXNVcmlFbmMgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocmVzQ2xhc3NJcmkudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy92Mi9vbnRvbG9naWVzL3Byb3BlcnRpZXMnICsgcHJvcGVydGllc1VyaUVuYyk7XG5cbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IG9udG9sb2d5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOZXdPbnRvbG9neX0gZGF0YSBEYXRhIGNvbnRhaW5zOiBwcm9qZWN0SXJpLCBuYW1lLCBsYWJlbFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBjcmVhdGVPbnRvbG9neShkYXRhOiBOZXdPbnRvbG9neSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy92Mi9vbnRvbG9naWVzJztcblxuICAgICAgICBjb25zdCBvbnRvbG9neSA9IHtcbiAgICAgICAgICAgICdrbm9yYS1hcGk6b250b2xvZ3lOYW1lJzogZGF0YS5uYW1lLFxuICAgICAgICAgICAgJ2tub3JhLWFwaTphdHRhY2hlZFRvUHJvamVjdCc6IHtcbiAgICAgICAgICAgICAgICAnQGlkJzogZGF0YS5wcm9qZWN0SXJpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdyZGZzOmxhYmVsJzogZGF0YS5sYWJlbCxcbiAgICAgICAgICAgICdAY29udGV4dCc6IHtcbiAgICAgICAgICAgICAgICAncmRmcyc6IEtub3JhQ29uc3RhbnRzLlJkZnNTY2hlbWEsXG4gICAgICAgICAgICAgICAgJ2tub3JhLWFwaSc6IEtub3JhQ29uc3RhbnRzLktub3JhQXBpVjJXaXRoVmFsdWVPYmplY3RQYXRoXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFBvc3QocGF0aCwgb250b2xvZ3kpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmJvZHkpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvYXBpLXNlcnZpY2UtcmVzdWx0JztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9rbm9yYS1jb25zdGFudHMnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgT250b2xvZ3lTZXJ2aWNlIH0gZnJvbSAnLi9vbnRvbG9neS5zZXJ2aWNlJztcbmltcG9ydCB7IGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55OyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NzMwMDEwL2FuZ3VsYXIyLTUtbWludXRlLWluc3RhbGwtYnVnLXJlcXVpcmUtaXMtbm90LWRlZmluZWRcbmNvbnN0IGpzb25sZCA9IHJlcXVpcmUoJ2pzb25sZCcpO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3Igb2NjdXJyZWQgaW4gT250b2xvZ3lDYWNoZVNlcnZpY2UuXG4gKi9cbmNsYXNzIE9udG9sb2d5Q2FjaGVFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIG9udG9sb2d5J3MgbWV0YWRhdGEuXG4gKi9cbmV4cG9ydCBjbGFzcyBPbnRvbG9neU1ldGFkYXRhIHtcblxuICAgIC8qKlxuICAgICAqIEBoaWRlY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBhIGxhYmVsIGRlc2NyaWJpbmcgdGhlIG9udG9sb2d5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlkOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmcpIHtcblxuICAgIH1cblxufVxuXG5cbi8qKlxuICogT2NjdXJyZW5jZSBvZiBhIHByb3BlcnR5IGZvciBhIHJlc291cmNlIGNsYXNzIChpdHMgY2FyZGluYWxpdHkpLlxuICovXG5leHBvcnQgZW51bSBDYXJkaW5hbGl0eU9jY3VycmVuY2Uge1xuICAgIG1pbkNhcmQgPSAwLFxuICAgIGNhcmQgPSAxLFxuICAgIG1heENhcmQgPSAyXG59XG5cblxuLyoqXG4gKiBDYXJkaW5hbGl0eSBvZiBhIHByb3BlcnR5IGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBDYXJkaW5hbGl0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5T2NjdXJyZW5jZX0gb2NjdXJyZW5jZSB0eXBlIG9mIGdpdmVuIG9jY3VycmVuY2UuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIG51bWVyaWNhbCB2YWx1ZSBvZiBnaXZlbiBvY2N1cnJlbmNlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdGhlIGdpdmVuIG9jY3VycmVuY2UgYXBwbGllcyB0by5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBvY2N1cnJlbmNlOiBDYXJkaW5hbGl0eU9jY3VycmVuY2UsXG4gICAgICAgIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIsXG4gICAgICAgIHJlYWRvbmx5IHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJcmkgaWRlbnRpZnlpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIHBhdGggdG8gYW4gaWNvbiByZXByZXNlbnRpbmcgdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHJlc291cmNlIGNsYXNzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbCBsYWJlbCBkZXNjcmliaW5nIHRoZSByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge0NhcmRpbmFsaXR5W119IGNhcmRpbmFsaXRpZXMgdGhlIHJlc291cmNlIGNsYXNzJ3MgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBpY29uOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgY2FyZGluYWxpdGllczogQXJyYXk8Q2FyZGluYWxpdHk+KSB7XG5cbiAgICB9XG59XG5cblxuLyoqXG4gKiBBIG1hcCBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIHRvIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc2VzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFJlc291cmNlQ2xhc3M7XG59XG5cblxuLyoqXG4gKiBBIHByb3BlcnR5IGRlZmluaXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSXJpIGlkZW50aWZ5aW5nIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvYmplY3RUeXBlIHRoZSBwcm9wZXJ0eSdzIG9iamVjdCBjb25zdHJhaW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50IGNvbW1lbnQgb24gdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsIGxhYmVsIGRlc2NyaWJpbmcgdGhlIHByb3BlcnR5IGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gc3ViUHJvcGVydHlPZiBJcmlzIG9mIHByb3BlcnRpZXMgdGhlIGdpdmVuIHByb3BlcnR5IGlzIGEgc3VicHJvcGVydHkgb2YuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0VkaXRhYmxlIGluZGljYXRlcyB3aGV0aGVyIHRoZSBnaXZlbiBwcm9wZXJ0eSBjYW4gYmUgZWRpdGVkIGJ5IHRoZSBjbGllbnQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0xpbmtQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgaXMgYSBsaW5raW5nIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNMaW5rVmFsdWVQcm9wZXJ0eSBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZ2l2ZW4gcHJvcGVydHkgcmVmZXJzIHRvIGEgbGluayB2YWx1ZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZWFkb25seSBpZDogc3RyaW5nLFxuICAgICAgICByZWFkb25seSBvYmplY3RUeXBlOiBzdHJpbmcsXG4gICAgICAgIHJlYWRvbmx5IGNvbW1lbnQ6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZyxcbiAgICAgICAgcmVhZG9ubHkgc3ViUHJvcGVydHlPZjogQXJyYXk8c3RyaW5nPixcbiAgICAgICAgcmVhZG9ubHkgaXNFZGl0YWJsZTogQm9vbGVhbixcbiAgICAgICAgcmVhZG9ubHkgaXNMaW5rUHJvcGVydHk6IEJvb2xlYW4sXG4gICAgICAgIHJlYWRvbmx5IGlzTGlua1ZhbHVlUHJvcGVydHk6IEJvb2xlYW4pIHtcblxuICAgIH1cbn1cblxuXG4vKipcbiAqIEEgbWFwIG9mIHByb3BlcnR5IElyaXMgdG8gcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0aWVzIHtcbiAgICBbaW5kZXg6IHN0cmluZ106IFByb3BlcnR5O1xufVxuXG5cbi8qKlxuICogR3JvdXBzIHJlc291cmNlIGNsYXNzZXMgYnkgdGhlIG9udG9sb2d5IHRoZXkgYXJlIGRlZmluZWQgaW4uXG4gKlxuICogQSBtYXAgb2Ygb250b2xvZ3kgSXJpcyB0byBhbiBhcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzLlxuICovXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSB7XG4gICAgW2luZGV4OiBzdHJpbmddOiBBcnJheTxzdHJpbmc+O1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBjYWNoZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gKG9ubHkgdXNlZCBieSB0aGlzIHNlcnZpY2UgaW50ZXJuYWxseSkuXG4gKiBUaGlzIGNhY2hlIGlzIHVwZGF0ZWQgd2hlbmV2ZXIgbmV3IGRlZmluaXRpb25zIGFyZSByZXF1ZXN0ZWQgZnJvbSBLbm9yYS5cbiAqXG4gKiBSZXF1ZXN0ZWQgb250b2xvZ3kgaW5mb3JtYXRpb24gYnkgYSBzZXJ2aWNlIGlzIHJlcHJlc2VudGVkIGJ5IFtbT250b2xvZ3lJbmZvcm1hdGlvbl1dLlxuICovXG5jbGFzcyBPbnRvbG9neUNhY2hlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T250b2xvZ3lNZXRhZGF0YVtdfSBvbnRvbG9naWVzIEFuIGFycmF5IG9mIGFsbCBleGlzdGluZyBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIG9udG9sb2dpZXM6IEFycmF5PE9udG9sb2d5TWV0YWRhdGE+O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IGxpc3Qgb2YgYWxsIHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGEgbmFtZWQgZ3JhcGguXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVzb3VyY2VDbGFzc2VzfSByZXNvdXJjZUNsYXNzZXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcmVzb3VyY2VDbGFzc2VzOiBSZXNvdXJjZUNsYXNzZXM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnRpZXN9IHByb3BlcnRpZXMgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJvcGVydGllczogUHJvcGVydGllcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9udG9sb2dpZXMgPSBbXTtcblxuICAgICAgICB0aGlzLnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgPSBuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpO1xuXG4gICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzID0gbmV3IFJlc291cmNlQ2xhc3NlcygpO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgb250b2xvZ3kgaW5mb3JtYXRpb24gcmVxdWVzdGVkIGZyb20gdGhpcyBzZXJ2aWNlLlxuICpcbiAqIEZvciBldmVyeSByZXF1ZXN0LCBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGlzIHJldHVybmVkIGNvbnRhaW5pbmcgdGhlIHJlcXVlc3RlZCBpbmZvcm1hdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE9udG9sb2d5SW5mb3JtYXRpb24ge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5fSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBmb3IgYSBnaXZlbiBvbnRvbG9neS5cbiAgICAgKiBAcGFyYW0ge1Jlc291cmNlQ2xhc3Nlc30gcmVzb3VyY2VDbGFzc2VzIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25zLlxuICAgICAqIEBwYXJhbSB7UHJvcGVydGllc30gcHJvcGVydGllcyBwcm9wZXJ0eSBkZWZpbml0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSxcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZUNsYXNzZXM6IFJlc291cmNlQ2xhc3NlcyxcbiAgICAgICAgcHJpdmF0ZSBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU29ydHMgYW4gYXJyYXkgb2YgYFJlc291cmNlQ2xhc3NgIG9yIGBQcm9wZXJ0eWAgYnkgbGFiZWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gYSBmaXJzdCBlbGVtZW50XG4gICAgICogQHBhcmFtIGIgc2Vjb25kIGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIG5lZ2F0aXZlIC0xIGlmIHRoZSBmaXJzdCBlbGVtZW50IGlzIGNvbnNpZGVyZWQgbG93ZXIgdGhhbiB0aGUgc2Vjb25kLCAxIGlmIHRoZSBzZWNvbmQgZWxlbWVudCBpcyBjb25zaWRlcmVkIGJpZ2dlciwgMCBpZiB0aGV5IGFyZSBlcXVhbFxuICAgICAqL1xuICAgIHN0YXRpYyBzb3J0RnVuYyhhOiBSZXNvdXJjZUNsYXNzIHwgUHJvcGVydHksIGI6IFJlc291cmNlQ2xhc3MgfCBQcm9wZXJ0eSkge1xuICAgICAgICAvLyBkZWFsaW5nIHdpdGggJ3VuZGVmaW5lZCcgbGFiZWxzXG4gICAgICAgIGlmIChhLmxhYmVsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGIubGFiZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGFiZWxBID0gYS5sYWJlbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsYWJlbEIgPSBiLmxhYmVsLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGxhYmVsQSA8IGxhYmVsQikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGxhYmVsQSA+IGxhYmVsQikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBnaXZlbiBbW09udG9sb2d5SW5mb3JtYXRpb25dXSBpbnRvIHRoZSBjdXJyZW50IGluc3RhbmNlLFxuICAgICAqIHVwZGF0aW5nIHRoZSBleGlzdGluZyBpbmZvcm1hdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5lY2Vzc2FyeSB3aGVuIGEgc2VydmljZSBsaWtlIHRoZSBzZWFyY2ggZmV0Y2hlcyBuZXcgcmVzdWx0c1xuICAgICAqIHRoYXQgaGF2ZSB0byBiZSBhZGRlZCB0byBhbiBleGlzdGluZyBjb2xsZWN0aW9uLlxuICAgICAqIFRoZSBleGlzdGluZyBvbnRvbG9neSBpbmZvcm1hdGlvbiBtdXN0IG5vdCBiZSBsb3N0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPbnRvbG9neUluZm9ybWF0aW9ufSBvbnRvbG9neUluZm8gdGhlIGdpdmVuIGRlZmluaXRpb25zIHRoYXQgaGF2ZSB0byBiZSBpbnRlZ3JhdGVkLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICB1cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBuZXcgcmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVxuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neTogUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSA9IG9udG9sb2d5SW5mby5nZXRSZXNvdXJjZUNsYXNzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyB1cGRhdGUgbmV3IHJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgbmV3UmVzQ2xhc3NGb3JPbnRvbG9neSBpbiBuZXdSZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neSkge1xuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZUNsYXNzZXNGb3JPbnRvbG9neVtuZXdSZXNDbGFzc0Zvck9udG9sb2d5XSA9IG5ld1Jlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W25ld1Jlc0NsYXNzRm9yT250b2xvZ3ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG5ldyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9uc1xuICAgICAgICBjb25zdCBuZXdSZXNvdXJjZUNsYXNzZXMgPSBvbnRvbG9neUluZm8uZ2V0UmVzb3VyY2VDbGFzc2VzKCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHJlc291cmNlQ2xhc3Nlc1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBuZXdSZXNDbGFzcyBpbiBuZXdSZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VDbGFzc2VzW25ld1Jlc0NsYXNzXSA9IG5ld1Jlc291cmNlQ2xhc3Nlc1tuZXdSZXNDbGFzc107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbmV3IHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IG5ld1Byb3BlcnRpZXMgPSBvbnRvbG9neUluZm8uZ2V0UHJvcGVydGllcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpmb3JpblxuICAgICAgICBmb3IgKGNvbnN0IG5ld1Byb3AgaW4gbmV3UHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzW25ld1Byb3BdID0gbmV3UHJvcGVydGllc1tuZXdQcm9wXTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyBmb3Igb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3kgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZ3JvdXBlZCBieSBvbnRvbG9naWVzLlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NGb3JPbnRvbG9neSgpOiBSZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzZXMgLSBhbGwgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgYXMgYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIGdldFJlc291cmNlQ2xhc3NlcygpOiBSZXNvdXJjZUNsYXNzZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZUNsYXNzZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgcmVzb3VyY2UgY2xhc3NlcyBhcyBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc29ydEFzYyBzb3J0IHJlc291cmNlIGNsYXNzZXMgYnkgbGFiZWwgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGRlZmF1bHRcbiAgICAgKiBAcmV0dXJucyBSZXNvdXJjZUNsYXNzW11cbiAgICAgKi9cbiAgICBnZXRSZXNvdXJjZUNsYXNzZXNBc0FycmF5KHNvcnRBc2M6IGJvb2xlYW4gPSB0cnVlKTogQXJyYXk8UmVzb3VyY2VDbGFzcz4ge1xuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzZXM6IEFycmF5PFJlc291cmNlQ2xhc3M+ID0gW107XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmZvcmluXG4gICAgICAgIGZvciAoY29uc3QgcmVzQ2xhc3NJcmkgaW4gdGhpcy5yZXNvdXJjZUNsYXNzZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc0NsYXNzOiBSZXNvdXJjZUNsYXNzID0gdGhpcy5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5wdXNoKHJlc0NsYXNzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc291cmNlQ2xhc3NlcyBvcmRlciBieSBsYWJlbCBpbiBhc2NlbmRpbmcgb3JkZXJcbiAgICAgICAgcmVzQ2xhc3Nlcy5zb3J0KE9udG9sb2d5SW5mb3JtYXRpb24uc29ydEZ1bmMpO1xuXG4gICAgICAgIC8vIHJlc291cmNlQ2xhc3NlcyBvcmRlciBieSBsYWJlbCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGlmICghc29ydEFzYykge1xuICAgICAgICAgICAgcmVzQ2xhc3Nlcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSByZXNvdXJjZSBjbGFzcydzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc0NsYXNzIHJlc291cmNlIGNsYXNzIHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgcmVzb3VyY2UgY2xhc3MncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclJlc291cmNlQ2xhc3MocmVzQ2xhc3M6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgaWYgKHJlc0NsYXNzICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NEZWYgPSB0aGlzLnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc0RlZiAhPT0gdW5kZWZpbmVkICYmIHJlc0NsYXNzRGVmLmxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzQ2xhc3NEZWYubGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNDbGFzc0RlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JSZXNvdXJjZUNsYXNzIHdpdGhvdXQgYXJndW1lbnQgcmVzQ2xhc3MnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgUHJvcGVydGllcyAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBnZXRQcm9wZXJ0aWVzKCk6IFByb3BlcnRpZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHByb3BlcnRpZXMgYXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNvcnRBc2Mgc29ydCBwcm9wZXJ0aWVzIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlciBieSBkZWZhdWx0XG4gICAgICogQHJldHVybnMgUHJvcGVydHlbXSAtIGFsbCBwcm9wZXJ0aWVzIGFzIGFuIGFycmF5LlxuICAgICAqL1xuICAgIGdldFByb3BlcnRpZXNBc0FycmF5KHNvcnRBc2M6IGJvb2xlYW4gPSB0cnVlKTogQXJyYXk8UHJvcGVydHk+IHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBBcnJheTxQcm9wZXJ0eT4gPSBbXTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Zm9yaW5cbiAgICAgICAgZm9yIChjb25zdCBwcm9wSXJpIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcDogUHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbcHJvcElyaV07XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnB1c2gocHJvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm9wZXJ0aWVzIG9yZGVyIGJ5IGxhYmVsIGluIGFzY2VuZGluZyBvcmRlclxuICAgICAgICBwcm9wZXJ0aWVzLnNvcnQoT250b2xvZ3lJbmZvcm1hdGlvbi5zb3J0RnVuYyk7XG5cbiAgICAgICAgLy8gcHJvcGVydGllcyBvcmRlciBieSBsYWJlbCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgICAgIGlmICghc29ydEFzYykge1xuICAgICAgICAgICAgcHJvcGVydGllcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSdzIGxhYmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IHRvIHF1ZXJ5IGZvci5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSB0aGUgcHJvcGVydHkncyBsYWJlbC5cbiAgICAgKi9cbiAgICBnZXRMYWJlbEZvclByb3BlcnR5KHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWYgPSB0aGlzLnByb3BlcnRpZXNbcHJvcGVydHldO1xuXG4gICAgICAgICAgICBpZiAocHJvcERlZiAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWYubGFiZWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjYWxsIG9mIE9udG9sb2d5SW5mb3JtYXRpb24uZ2V0TGFiZWxGb3JQcm9wZXJ0eSB3aXRob3V0IGFyZ3VtZW50IHByb3BlcnR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuXG4vKipcbiAqIFJlcXVlc3RzIG9udG9sb2d5IGluZm9ybWF0aW9uIGZyb20gS25vcmEgYW5kIGNhY2hlcyBpdC5cbiAqIE90aGVyIGNvbXBvbmVudHMgb3Igc2VydmljZXMgb2J0YWluIG9udG9sb2d5IGluZm9ybWF0aW9uIHRocm91Z2ggdGhpcyBzZXJ2aWNlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE9udG9sb2d5Q2FjaGVTZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIE9udG9sb2dpZXMgaW5nb3JlZCBieSB0aGlzIHNlcnZpY2UuXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZWRPbnRvbG9naWVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGNsdWRlZE9udG9sb2dpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuU2Fsc2FoR3VpT250b2xvZ3ksIEtub3JhQ29uc3RhbnRzLlN0YW5kb2ZmT250b2xvZ3ldO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZXhjbHVkZWRQcm9wZXJ0aWVzIHByb3BlcnRpZXMgdGhhdCBLbm9yYSBpcyBub3QgcmVzcG9uc2libGUgZm9yIGFuZCB0aGF0IGhhdmUgdG8gYmUgaWdub3JlZCBiZWNhdXNlIHRoZXkgY2Fubm90IGJlIHJlc29sdmVkIGF0IHRoZSBtb21lbnQuXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGNsdWRlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG5vblJlc291cmNlQ2xhc3NlcyBjbGFzcyBkZWZpbml0aW9ucyB0aGF0IGFyZSBub3QgYmUgdHJlYXRlZCBhcyBLbm9yYSByZXNvdXJjZSBjbGFzc2VzXG4gICAgICovXG4gICAgcHJpdmF0ZSBub25SZXNvdXJjZUNsYXNzZXM6IEFycmF5PHN0cmluZz4gPSBbS25vcmFDb25zdGFudHMuRm9yYmlkZGVuUmVzb3VyY2UsIEtub3JhQ29uc3RhbnRzLlhNTFRvU3RhbmRvZmZNYXBwaW5nLCBLbm9yYUNvbnN0YW50cy5MaXN0Tm9kZV07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09udG9sb2d5Q2FjaGV9IGNhY2hlT250b2xvZ3kgY2VudHJhbCBpbnN0YW5jZSB0aGF0IGNhY2hlcyBhbGwgZGVmaW5pdGlvbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGNhY2hlT250b2xvZ3k6IE9udG9sb2d5Q2FjaGUgPSBuZXcgT250b2xvZ3lDYWNoZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfb250b2xvZ3lTZXJ2aWNlOiBPbnRvbG9neVNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyB0aGUgbWV0YWRhdGEgb2YgYWxsIG9udG9sb2dpZXMgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8b2JqZWN0PiAtIG1ldGFkYXRhIGZvciBhbGwgb250b2xvZ2llcyBhcyBKU09OLUxEIChubyBwcmVmaXhlcywgYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQpLlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0T250b2xvZ2llc01ldGFkYXRhRnJvbUtub3JhKCk6IE9ic2VydmFibGU8b2JqZWN0PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX29udG9sb2d5U2VydmljZS5nZXRPbnRvbG9naWVzTWV0YWRhdGEoKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3RzIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgKHJlc291cmNlIGNsYXNzZXMgYW5kIHByb3BlcnRpZXMpIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3kgZnJvbSBLbm9yYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbnRvbG9neUlyaSB0aGUgSXJpIG9mIHRoZSByZXF1ZXN0ZWQgb250b2xvZ3kuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxvYmplY3Q+IC0gbWV0YWRhdGEgZm9yIGFsbCBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIG9udG9sb2d5IGZyb20gS25vcmEuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2d5RnJvbUtub3JhKG9udG9sb2d5SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPG9iamVjdD4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neVNlcnZpY2UuZ2V0QWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9naWVzKG9udG9sb2d5SXJpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgLy8gaHR0cDovL3JlYWN0aXZleC5pby9kb2N1bWVudGF0aW9uL29wZXJhdG9ycy9mbGF0bWFwLmh0bWxcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vcmVhY3RpdmV4LmlvL3J4anMvY2xhc3MvZXM2L09ic2VydmFibGUuanN+T2JzZXJ2YWJsZS5odG1sI2luc3RhbmNlLW1ldGhvZC1tZXJnZU1hcFxuICAgICAgICAgICAgICAgIChvbnRSZXM6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb250UHJvbWlzZXMgPSBqc29ubGQucHJvbWlzZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBhY3QgSlNPTi1MRCB1c2luZyBhbiBlbXB0eSBjb250ZXh0OiBleHBhbmRzIGFsbCBJcmlzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9udFByb21pc2UgPSBvbnRQcm9taXNlcy5jb21wYWN0KG9udFJlcy5ib2R5LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29udmVydCBwcm9taXNlIHRvIE9ic2VydmFibGUgYW5kIHJldHVybiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL3d3dy5sZWFybnJ4anMuaW8vb3BlcmF0b3JzL2NyZWF0aW9uL2Zyb21wcm9taXNlLmh0bWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ob250UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhbGwgdGhlIG9udG9sb2dpZXMnIG1ldGFkYXRhIHJldHVybmVkIGJ5IEtub3JhIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0W119IG9udG9sb2dpZXMgbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMgYXMgSlNPTi1MRC5cbiAgICAgKiBAcmV0dXJucyBhIG5ldyBPbnRvbG9neU1ldGFkYXRhIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlT250b2xvZ2llc01ldGFkYXRhVG9DYWNoZShvbnRvbG9naWVzOiBvYmplY3RbXSkge1xuXG4gICAgICAgIHRoaXMuY2FjaGVPbnRvbG9neS5vbnRvbG9naWVzID0gb250b2xvZ2llcy5tYXAoXG4gICAgICAgICAgICBvbnRvbG9neSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neU1ldGFkYXRhKG9udG9sb2d5WydAaWQnXSwgb250b2xvZ3lbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgb250b2xvZ2llcycgbWV0YWRhdGEgZnJvbSB0aGUgY2FjaGUgYW5kIHJldHVybnMgdGhlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEFycmF5PE9udG9sb2d5TWV0YWRhdGE+IC0gbWV0YWRhdGEgb2YgYWxsIGV4aXN0aW5nIG9udG9sb2dpZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKTogQXJyYXk8T250b2xvZ3lNZXRhZGF0YT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kub250b2xvZ2llcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgcmVzb3VyY2UgY2xhc3MgSXJpcyBmcm9tIHRoZSBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBga25vcmEtYXBpOlJlc291cmNlYCB3aWxsIGJlIGV4Y2x1ZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxvYmplY3Q+fSBjbGFzc0RlZmluaXRpb25zIHRoZSBjbGFzcyBkZWZpbml0aW9ucyBpbiBhbiBvbnRvbG9neSByZXNwb25zZS5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmdbXSAtIHJlc291cmNlIGNsYXNzIElyaXMgZnJvbSB0aGUgZ2l2ZW4gY2xhc3MgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzSXJpc0Zyb21PbnRvbG9neVJlc3BvbnNlKGNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3NJcmlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgY2xhc3NEZWYgb2YgY2xhc3NEZWZpbml0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NJcmkgPSBjbGFzc0RlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIHRoYXQgY2xhc3MgbmFtZSBpcyBub3QgbGlzdGVkIGFzIGEgbm9uIHJlc291cmNlIGNsYXNzIGFuZCB0aGF0IHRoZSBpc1Jlc291cmNlQ2xhc3MgZmxhZyBpcyBwcmVzZW50IGFuZCBzZXQgdG8gdHJ1ZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNsYXNzSXJpICE9PSBLbm9yYUNvbnN0YW50cy5SZXNvdXJjZSAmJiB0aGlzLm5vblJlc291cmNlQ2xhc3Nlcy5pbmRleE9mKGNsYXNzSXJpKVxuICAgICAgICAgICAgICAgID09PSAtMSAmJiAoY2xhc3NEZWZbS25vcmFDb25zdGFudHMuSXNSZXNvdXJjZUNsYXNzXSAhPT0gdW5kZWZpbmVkICYmIGNsYXNzRGVmW0tub3JhQ29uc3RhbnRzLklzUmVzb3VyY2VDbGFzc10gPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgdmFsdWUgY2xhc3MsIGJ1dCBhIHJlc291cmNlIGNsYXNzIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzSXJpcy5wdXNoKGNsYXNzSXJpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZUNsYXNzSXJpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIEtub3JhIHJlc3BvbnNlIGZvciBhbGwgZW50aXR5IGRlZmluaXRpb25zIGZvciB0aGUgcmVxdWVzdGVkIG9udG9sb2d5XG4gICAgICogaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogS25vcmEgYXV0b21hdGljYWxseSBpbmNsdWRlcyB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmVmZXJyZWQgdG8gaW4gdGhlIGNhcmRpbmFsaXRpZXMgb2YgcmVzb3VyY2UgY2xhc3Nlcy5cbiAgICAgKiBJZiB0aGV5IGFyZSBkZWZpbmVkIGluIGFub3RoZXIgb250b2xvZ3ksIHRoYXQgb250b2xvZ3kgaXMgcmVxdWVzdGVkIGZyb20gS25vcmEgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9udG9sb2d5IHRoZSBvbnRvbG9neSB0byBiZSBjYWNoZWQuXG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIHByaXZhdGUgY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3k6IG9iamVjdCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGdyYXBoID0gb250b2xvZ3lbJ0BncmFwaCddO1xuXG4gICAgICAgIC8vIGdldCBhbGwgY2xhc3MgZGVmaW5pdGlvbnNcbiAgICAgICAgY29uc3QgY2xhc3NEZWZzID0gZ3JhcGguZmlsdGVyKFxuICAgICAgICAgICAgKGVudGl0eTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZW50aXR5VHlwZSA9IGVudGl0eVsnQHR5cGUnXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQ2xhc3M7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZXQgYWxsIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIGNvbnN0IHByb3BlcnR5RGVmcyA9IGdyYXBoLmZpbHRlcihcbiAgICAgICAgICAgIChlbnRpdHk6IE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVudGl0eVR5cGUgPSBlbnRpdHlbJ0B0eXBlJ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bE9iamVjdFByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLk93bERhdGF0eXBlUHJvcGVydHkgfHxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5VHlwZSA9PT0gS25vcmFDb25zdGFudHMuT3dsQW5ub3RhdGlvblByb3BlcnR5IHx8XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVR5cGUgPT09IEtub3JhQ29uc3RhbnRzLlJkZlByb3BlcnR5O1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBjYWNoZSBhbGwgcmVzb3VyY2UgY2xhc3MgSXJpcyBiZWxvbmdpbmcgdG8gdGhlIGN1cnJlbnQgb250b2xvZ3lcbiAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3lbb250b2xvZ3lbJ0BpZCddXSA9IHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0lyaXNGcm9tT250b2xvZ3lSZXNwb25zZShjbGFzc0RlZnMpO1xuXG4gICAgICAgIC8vIHdyaXRlIGNsYXNzIGFuZCBwcm9wZXJ0eSBkZWZpbnRpb25zIHRvIGNhY2hlXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlRW50aXR5RGVmaW5pdGlvbnNUb0NhY2hlKGNsYXNzRGVmcywgcHJvcGVydHlEZWZzKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcyBmcm9tIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyB0aGUgb250b2xvZ2llcyBmb3Igd2hpY2ggZGVmaW5pdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4gLSB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdldE9udG9sb2d5SW5mb3JtYXRpb25Gcm9tQ2FjaGUob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5ID0gbmV3IFJlc291cmNlQ2xhc3NJcmlzRm9yT250b2xvZ3koKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHJlc291cmNlIGNsYXNzIElyaXMgZm9yIGFsbCByZXF1ZXN0ZWQgbmFtZWQgZ3JhcGhzXG4gICAgICAgIGxldCBhbGxSZXNvdXJjZUNsYXNzSXJpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3Qgb250b2xvZ3lJcmkgb2Ygb250b2xvZ3lJcmlzKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2dpZXNGcm9tQ2FjaGU6IG9udG9sb2d5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtvbnRvbG9neUlyaX1gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYWRkIGluZm9ybWF0aW9uIGZvciB0aGUgZ2l2ZW4gb250b2xvZ3lcbiAgICAgICAgICAgIHJlc291cmNlQ2xhc3Nlc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXTtcblxuICAgICAgICAgICAgLy8gYWRkIGFsbCByZXNvdXJjZSBjbGFzcyBJcmlzIG9mIHRoaXMgb250b2xvZ3lcbiAgICAgICAgICAgIGFsbFJlc291cmNlQ2xhc3NJcmlzID0gYWxsUmVzb3VyY2VDbGFzc0lyaXMuY29uY2F0KHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzSXJpc0Zvck9udG9sb2d5W29udG9sb2d5SXJpXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbnMgZm9yIGFsbCByZXF1ZXN0ZWQgb250b2xvZ2llc1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMoYWxsUmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPbnRvbG9neUluZm9ybWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzRm9yT250b2xvZ3ksIHJlc0NsYXNzRGVmcy5nZXRSZXNvdXJjZUNsYXNzZXMoKSwgcmVzQ2xhc3NEZWZzLmdldFByb3BlcnRpZXMoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgS25vcmEgb250b2xvZ3kgcmVzcG9uc2UgaW50byBhbiBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhbmQgY2FjaGVzIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcmVzb3VyY2VDbGFzc0RlZmluaXRpb25zIHRoZSByZXNvdXJjZSBjbGFzcyBkZWZpbml0aW9ucyByZXR1cm5lZCBieSBLbm9yYS5cbiAgICAgKiBAcGFyYW0ge29iamVjdFtdfSBwcm9wZXJ0eUNsYXNzRGVmaW5pdGlvbnMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJldHVybmVkIGJ5IEtub3JhLlxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGNvbnZlcnRBbmRXcml0ZUVudGl0eURlZmluaXRpb25zVG9DYWNoZShyZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnM6IEFycmF5PG9iamVjdD4sIHByb3BlcnR5Q2xhc3NEZWZpbml0aW9uczogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHJlc0NsYXNzIG9mIHJlc291cmNlQ2xhc3NEZWZpbml0aW9ucykge1xuXG4gICAgICAgICAgICBjb25zdCByZXNDbGFzc0lyaSA9IHJlc0NsYXNzWydAaWQnXTtcblxuICAgICAgICAgICAgLy8gcmVwcmVzZW50cyBhbGwgY2FyZGluYWxpdGllcyBvZiB0aGlzIHJlc291cmNlIGNsYXNzXG4gICAgICAgICAgICBjb25zdCBjYXJkaW5hbGl0aWVzOiBDYXJkaW5hbGl0eVtdID0gW107XG5cbiAgICAgICAgICAgIGlmIChyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNsYXNzT2ZDb2xsZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgaXQgaXMgYSBzaW5nbGUgb2JqZWN0IG9yIGEgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YmNsYXNzT2ZDb2xsZWN0aW9uID0gW3Jlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNTdWJjbGFzc09mXV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViY2xhc3NPZkNvbGxlY3Rpb24gPSByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzU3ViY2xhc3NPZl07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGNhcmRpbmFsaXRpZXMgZm9yIHRoZSBwcm9wZXJ0aWVzIG9mIGEgcmVzb3VyY2UgY2xhc3NcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGN1ckNhcmQgb2Ygc3ViY2xhc3NPZkNvbGxlY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgaXQgaXMgYSBjYXJkaW5hbGl0eSAoaXQgY291bGQgYWxzbyBiZSBhbiBJcmkgb2YgYSBzdXBlcmNsYXNzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBjdXJDYXJkWydAdHlwZSddICE9PSB1bmRlZmluZWQgJiYgY3VyQ2FyZFsnQHR5cGUnXSA9PT0gS25vcmFDb25zdGFudHMuT3dsUmVzdHJpY3Rpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0NhcmQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBvY2N1cnJlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNaW5DYXJkaW5hbGl0eV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NhcmQgPSBuZXcgQ2FyZGluYWxpdHkoQ2FyZGluYWxpdHlPY2N1cnJlbmNlLm1pbkNhcmQsIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsTWluQ2FyZGluYWxpdHldLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE9uUHJvcGVydHldWydAaWQnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsQ2FyZGluYWxpdHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDYXJkID0gbmV3IENhcmRpbmFsaXR5KENhcmRpbmFsaXR5T2NjdXJyZW5jZS5jYXJkLCBjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bENhcmRpbmFsaXR5XSwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XVsnQGlkJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJDYXJkW0tub3JhQ29uc3RhbnRzLk93bE1heENhcmRpbmFsaXR5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZCA9IG5ldyBDYXJkaW5hbGl0eShDYXJkaW5hbGl0eU9jY3VycmVuY2UubWF4Q2FyZCwgY3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xNYXhDYXJkaW5hbGl0eV0sIGN1ckNhcmRbS25vcmFDb25zdGFudHMuT3dsT25Qcm9wZXJ0eV1bJ0BpZCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm8ga25vd24gb2NjdXJyZW5jZSBmb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGNhcmRpbmFsaXR5IHR5cGUgaW52YWxpZCBmb3IgJHtyZXNDbGFzc1snQGlkJ119ICR7Y3VyQ2FyZFtLbm9yYUNvbnN0YW50cy5Pd2xPblByb3BlcnR5XX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ2V0IGd1aSBvcmRlclxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBjYXJkaW5hbGl0eVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZGluYWxpdGllcy5wdXNoKG5ld0NhcmQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzQ2xhc3NPYmogPSBuZXcgUmVzb3VyY2VDbGFzcyhcbiAgICAgICAgICAgICAgICByZXNDbGFzc0lyaSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZXNvdXJjZUljb25dLFxuICAgICAgICAgICAgICAgIHJlc0NsYXNzW0tub3JhQ29uc3RhbnRzLlJkZnNDb21tZW50XSxcbiAgICAgICAgICAgICAgICByZXNDbGFzc1tLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxdLFxuICAgICAgICAgICAgICAgIGNhcmRpbmFsaXRpZXNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHdyaXRlIHRoaXMgcmVzb3VyY2UgY2xhc3MgZGVmaW5pdGlvbiB0byB0aGUgY2FjaGUgb2JqZWN0XG4gICAgICAgICAgICB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9IHJlc0NsYXNzT2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGUgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zXG4gICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlS25vcmFQcm9wZXJ0eURlZmluaXRpb25zVG9PbnRvbG9neUNhY2hlKHByb3BlcnR5Q2xhc3NEZWZpbml0aW9ucyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzIGZyb20gdGhlIGNhY2hlLlxuICAgICAqIFRoZSBhbnN3ZXIgaW5jbHVkZXMgdGhlIHByb3BlcnR5IGRlZmluaXRpb25zIHJlZmVycmVkIHRvIGJ5IHRoZSBjYXJkaW5hbGl0aWVzIG9mIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzQ2xhc3NJcmlzIHRoZSBnaXZlbiByZXNvdXJjZSBjbGFzcyBJcmlzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIGFuIFtbT250b2xvZ3lDYWNoZV1dIHJlcHJlc2VudGluZyB0aGUgcmVxdWVzdGVkIHJlc291cmNlIGNsYXNzZXMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzQ2xhc3NJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuICAgICAgICAvLyBjb2xsZWN0IHRoZSBkZWZpbml0aW9ucyBmb3IgZWFjaCByZXNvdXJjZSBjbGFzcyBmcm9tIHRoZSBjYWNoZVxuXG4gICAgICAgIGNvbnN0IHJlc0NsYXNzRGVmcyA9IG5ldyBSZXNvdXJjZUNsYXNzZXMoKTtcblxuICAgICAgICAvLyBjb2xsZWN0IHRoZSBwcm9wZXJ0aWVzIGZyb20gdGhlIGNhcmRpbmFsaXRpZXMgb2YgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzZXNcbiAgICAgICAgY29uc3QgcHJvcGVydHlJcmlzID0gW107XG5cbiAgICAgICAgcmVzQ2xhc3NJcmlzLmZvckVhY2goXG4gICAgICAgICAgICByZXNDbGFzc0lyaSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NEZWZzW3Jlc0NsYXNzSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5yZXNvdXJjZUNsYXNzZXNbcmVzQ2xhc3NJcmldO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnJlc291cmNlQ2xhc3Nlc1tyZXNDbGFzc0lyaV0uY2FyZGluYWxpdGllcy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgICAgICBjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCBwcm9wZXJ0eSBkZWZpbml0aW9uIGZvciBlYWNoIGNhcmRpbmFsaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUlyaXMucHVzaChjYXJkLnByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eURlZmluaXRpb25zKHByb3BlcnR5SXJpcykucGlwZShcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICBwcm9wRGVmcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCByZXNDbGFzc0RlZnMsIHByb3BEZWZzLmdldFByb3BlcnRpZXMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBLbm9yYSByZXNwb25zZSBmb3Igb250b2xvZ3kgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllc1xuICAgICAqIGludG8gYW4gaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYW5kIGNhY2hlIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3RbXX0gcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSB0aGUgcHJvcGVydHkgZGVmaW5pdGlvbnMgcmV0dXJuZWQgYnkgS25vcmFcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0QW5kV3JpdGVLbm9yYVByb3BlcnR5RGVmaW5pdGlvbnNUb09udG9sb2d5Q2FjaGUocHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYTogQXJyYXk8b2JqZWN0Pik6IHZvaWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYW5kIGNhY2hlIGVhY2ggZ2l2ZW4gcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICBmb3IgKGNvbnN0IHByb3BEZWYgb2YgcHJvcGVydHlEZWZpbml0aW9uc0Zyb21Lbm9yYSkge1xuXG4gICAgICAgICAgICBjb25zdCBwcm9wSXJpID0gcHJvcERlZlsnQGlkJ107XG5cbiAgICAgICAgICAgIGxldCBpc0VkaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0VkaXRhYmxlXSAhPT0gdW5kZWZpbmVkICYmIHByb3BEZWZbS25vcmFDb25zdGFudHMuaXNFZGl0YWJsZV0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpc0VkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1Byb3BlcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtQcm9wZXJ0eV0gIT09IHVuZGVmaW5lZCAmJiBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1Byb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1Byb3BlcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGlzTGlua1ZhbHVlUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLmlzTGlua1ZhbHVlUHJvcGVydHldICE9PSB1bmRlZmluZWQgJiYgcHJvcERlZltLbm9yYUNvbnN0YW50cy5pc0xpbmtWYWx1ZVByb3BlcnR5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlzTGlua1ZhbHVlUHJvcGVydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc3ViUHJvcGVydHlPZiA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCAmJiBBcnJheS5pc0FycmF5KHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0pKSB7XG4gICAgICAgICAgICAgICAgc3ViUHJvcGVydHlPZiA9IHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0ubWFwKChzdXBlclByb3A6IE9iamVjdCkgPT4gc3VwZXJQcm9wWydAaWQnXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuc3ViUHJvcGVydHlPZl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1YlByb3BlcnR5T2YucHVzaChwcm9wRGVmW0tub3JhQ29uc3RhbnRzLnN1YlByb3BlcnR5T2ZdWydAaWQnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBvYmplY3RUeXBlO1xuICAgICAgICAgICAgaWYgKHByb3BEZWZbS25vcmFDb25zdGFudHMuT2JqZWN0VHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFR5cGUgPSBwcm9wRGVmW0tub3JhQ29uc3RhbnRzLk9iamVjdFR5cGVdWydAaWQnXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGUgcHJvcGVydHkgZGVmaW5pdGlvblxuICAgICAgICAgICAgdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPSBuZXcgUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0NvbW1lbnRdLFxuICAgICAgICAgICAgICAgIHByb3BEZWZbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgICAgICBzdWJQcm9wZXJ0eU9mLFxuICAgICAgICAgICAgICAgIGlzRWRpdGFibGUsXG4gICAgICAgICAgICAgICAgaXNMaW5rUHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNMaW5rVmFsdWVQcm9wZXJ0eVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHByb3BlcnR5IGRlZmluaXRpb25zIGZyb20gdGhlIGNhY2hlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcGVydHlJcmlzIHRoZSBwcm9wZXJ0eSBkZWZpbml0aW9ucyB0byBiZSByZXR1cm5lZC5cbiAgICAgKiBAcmV0dXJucyBPbnRvbG9neUluZm9ybWF0aW9uIC0gcmVxdWVzdGVkIHByb3BlcnR5IGRlZmludGlvbnMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eURlZmluaXRpb25zRnJvbUNhY2hlKHByb3BlcnR5SXJpczogc3RyaW5nW10pOiBPbnRvbG9neUluZm9ybWF0aW9uIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0eURlZnMgPSBuZXcgUHJvcGVydGllcygpO1xuXG4gICAgICAgIHByb3BlcnR5SXJpcy5mb3JFYWNoKFxuICAgICAgICAgICAgcHJvcElyaSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWdub3JlIG5vbiBLbm9yYSBwcm9wczogaWYgcHJvcElyaSBpcyBjb250YWluZWQgaW4gZXhjbHVkZWRQcm9wZXJ0aWVzLCBza2lwIHRoaXMgcHJvcElyaVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2x1ZGVkUHJvcGVydGllcy5pbmRleE9mKHByb3BJcmkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlT250b2xvZ3kucHJvcGVydGllc1twcm9wSXJpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBPbnRvbG9neUNhY2hlRXJyb3IoYGdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGU6IHByb3BlcnR5IG5vdCBmb3VuZCBpbiBjYWNoZTogJHtwcm9wSXJpfWApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb3BlcnR5RGVmc1twcm9wSXJpXSA9IHRoaXMuY2FjaGVPbnRvbG9neS5wcm9wZXJ0aWVzW3Byb3BJcmldO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbihuZXcgUmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neSgpLCBuZXcgUmVzb3VyY2VDbGFzc2VzKCksIHByb3BlcnR5RGVmcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIG1ldGFkYXRhIGFib3V0IGFsbCBvbnRvbG9naWVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcnJheTxPbnRvbG9neU1ldGFkYXRhPj4gLSBtZXRhZGF0YSBhYm91dCBhbGwgb250b2xvZ2llcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0T250b2xvZ2llc01ldGFkYXRhKCk6IE9ic2VydmFibGU8QXJyYXk8T250b2xvZ3lNZXRhZGF0YT4+IHtcblxuICAgICAgICBpZiAodGhpcy5jYWNoZU9udG9sb2d5Lm9udG9sb2dpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nIGluIGNhY2hlIHlldCwgZ2V0IG1ldGFkYXRhIGZyb20gS25vcmFcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldE9udG9sb2dpZXNNZXRhZGF0YUZyb21Lbm9yYSgpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICBtZXRhZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRBbmRXcml0ZU9udG9sb2dpZXNNZXRhZGF0YVRvQ2FjaGUobWV0YWRhdGFbJ0BncmFwaCddLmZpbHRlcigob250bykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBleGNsdWRlZCBvbnRvbG9naWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXhjbHVkZWRPbnRvbG9naWVzLmluZGV4T2Yob250b1snQGlkJ10pID09PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFsbE9udG9sb2dpZXNNZXRhZGF0YUZyb21DYWNoZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJldHVybiBtZXRhZGF0YSBmcm9tIGNhY2hlXG4gICAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRBbGxPbnRvbG9naWVzTWV0YWRhdGFGcm9tQ2FjaGUoKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdHMgdGhlIHJlcXVlc3RlZCBvbnRvbG9naWVzIGZyb20gS25vcmEsIGFkZGluZyB0aGVtIHRvIHRoZSBjYWNoZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHJlcXVlc3RlZC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueVtdPlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPGFueVtdPiB7XG5cbiAgICAgICAgLy8gYXJyYXkgdG8gYmUgcG9wdWxhdGVkIHdpdGggT2JzZXJ2YWJsZXNcbiAgICAgICAgY29uc3Qgb2JzZXJ2YWJsZXMgPSBbXTtcblxuICAgICAgICAvLyBkbyBhIHJlcXVlc3QgZm9yIGVhY2ggb250b2xvZ3lcbiAgICAgICAgb250b2xvZ3lJcmlzLmZvckVhY2gob250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgLy8gcHVzaCBhbiBPYnNlcnZhYmxlIG9udG8gYG9ic2VydmFibGVzYFxuICAgICAgICAgICAgb2JzZXJ2YWJsZXMucHVzaCh0aGlzLmdldEFsbEVudGl0eURlZmluaXRpb25zRm9yT250b2xvZ3lGcm9tS25vcmEob250b2xvZ3lJcmkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICAob250b2xvZ3k6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgcmVzcG9uc2UgdG8gY2FjaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEFuZFdyaXRlQWxsRW50aXR5RGVmaW5pdGlvbnNGb3JPbnRvbG9neVRvQ2FjaGUob250b2xvZ3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGZvcmtKb2luIHJldHVybnMgYW4gT2JzZXJ2YWJsZSBvZiBhbiBhcnJheSBvZiByZXN1bHRzXG4gICAgICAgIC8vIHJldHVybmVkIGJ5IGVhY2ggT2JzZXJ2YWJsZSBjb250YWluZWQgaW4gYG9ic2VydmFibGVzYFxuICAgICAgICAvLyBhIHN1YnNjcmlwdGlvbiB0byB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieSBmb3JrSm9pbiBpcyBleGVjdXRlZFxuICAgICAgICAvLyBvbmNlIGFsbCBPYnNlcnZhYmxlcyBoYXZlIGJlZW4gY29tcGxldGVkXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihvYnNlcnZhYmxlcyk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbnRpdHkgZGVmaW5pdGlvbnMgZm9yIHRoZSByZXF1ZXN0ZWQgb250b2xvZ2llcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IG9udG9sb2d5SXJpcyBJcmlzIG9mIHRoZSBvbnRvbG9naWVzIHRvIGJlIHF1ZXJpZWQuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIGFsbCBvbnRvbG9neSBtZXRhZGF0YSBmcm9tIHRoZSBjYWNoZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRFbnRpdHlEZWZpbml0aW9uc0Zvck9udG9sb2dpZXMob250b2xvZ3lJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IG9udG9sb2d5SXJpc1RvUXVlcnkgPSBvbnRvbG9neUlyaXMuZmlsdGVyKFxuICAgICAgICAgICAgb250b2xvZ3lJcmkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgb250b2xvZ3kgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc0lyaXNGb3JPbnRvbG9neVtvbnRvbG9neUlyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdldCBvbnRvbG9naWVzIHRoYXQgYXJlIG1vdCBjYWNoZWQgeWV0XG4gICAgICAgIGlmIChvbnRvbG9neUlyaXNUb1F1ZXJ5Lmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QW5kQ2FjaGVPbnRvbG9naWVzKG9udG9sb2d5SXJpc1RvUXVlcnkpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhlY3V0ZWQgb25jZSBhbGwgb250b2xvZ2llcyBoYXZlIGJlZW4gY2FjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRPbnRvbG9neUluZm9ybWF0aW9uRnJvbUNhY2hlKG9udG9sb2d5SXJpcyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UgY2xhc3MgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIFByb3BlcnRpZXMgY29udGFpbmVkIGluIHRoZSBjYXJkaW5hbGl0aWVzIHdpbGwgYmUgcmV0dXJuZWQgdG9vLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gcmVzb3VyY2VDbGFzc0lyaXMgdGhlIGdpdmVuIHJlc291cmNlIGNsYXNzIElyaXNcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IC0gdGhlIHJlcXVlc3RlZCByZXNvdXJjZSBjbGFzc2VzIChpbmNsdWRpbmcgcHJvcGVydGllcykuXG4gICAgICovXG4gICAgcHVibGljIGdldFJlc291cmNlQ2xhc3NEZWZpbml0aW9ucyhyZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10pOiBPYnNlcnZhYmxlPE9udG9sb2d5SW5mb3JtYXRpb24+IHtcblxuICAgICAgICBjb25zdCByZXNDbGFzc0lyaXNUb1F1ZXJ5Rm9yOiBzdHJpbmdbXSA9IHJlc291cmNlQ2xhc3NJcmlzLmZpbHRlcihcbiAgICAgICAgICAgIHJlc0NsYXNzSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyB0aGF0IGFyZSBub3QgY2FjaGVkIHlldFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlT250b2xvZ3kucmVzb3VyY2VDbGFzc2VzW3Jlc0NsYXNzSXJpXSA9PT0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIC8vIGdldCBhIHNldCBvZiBvbnRvbG9neSBJcmlzIHRoYXQgaGF2ZSB0byBiZSBxdWVyaWVkIHRvIG9idGFpbiB0aGUgbWlzc2luZyByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICBjb25zdCBvbnRvbG9neUlyaXM6IHN0cmluZ1tdID0gcmVzQ2xhc3NJcmlzVG9RdWVyeUZvci5tYXAoXG4gICAgICAgICAgICAgICAgcmVzQ2xhc3NJcmkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuZ2V0T250b2xvZ3lJcmlGcm9tRW50aXR5SXJpKHJlc0NsYXNzSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnNGcm9tQ2FjaGUocmVzb3VyY2VDbGFzc0lyaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVzb3VyY2VDbGFzc0RlZmluaXRpb25zRnJvbUNhY2hlKHJlc291cmNlQ2xhc3NJcmlzKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmluaXRpb25zIGZvciB0aGUgZ2l2ZW4gcHJvcGVydHkgSXJpcy5cbiAgICAgKiBJZiB0aGUgZGVmaW5pdGlvbnMgYXJlIG5vdCBhbHJlYWR5IGluIHRoZSBjYWNoZSwgdGhlIHdpbGwgYmUgcmV0cmlldmVkIGZyb20gS25vcmEgYW5kIGNhY2hlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHByb3BlcnR5SXJpcyB0aGUgSXJpcyBvZiB0aGUgcHJvcGVydGllcyB0byBiZSByZXR1cm5lZCAuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxPbnRvbG9neUluZm9ybWF0aW9uPiAtIHRoZSByZXF1ZXN0ZWQgcHJvcGVydHkgZGVmaW5pdGlvbnMuXG4gICAgICovXG4gICAgcHVibGljIGdldFByb3BlcnR5RGVmaW5pdGlvbnMocHJvcGVydHlJcmlzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8T250b2xvZ3lJbmZvcm1hdGlvbj4ge1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXNUb1F1ZXJ5OiBzdHJpbmdbXSA9IHByb3BlcnR5SXJpcy5maWx0ZXIoXG4gICAgICAgICAgICBwcm9wSXJpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBub24gS25vcmEgcHJvcHM6IGlmIHByb3BJcmkgaXMgY29udGFpbmVkIGluIGV4Y2x1ZGVkUHJvcGVydGllcywgc2tpcCB0aGlzIHByb3BJcmlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNsdWRlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wSXJpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHByb3BlcnR5IElyaXMgdGhhdCBhcmUgbm90IGNhY2hlZCB5ZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWNoZU9udG9sb2d5LnByb3BlcnRpZXNbcHJvcElyaV0gPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvcGVydGllc1RvUXVlcnkubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBnZXQgYSBzZXQgb2Ygb250b2xvZ3kgSXJpcyB0aGF0IGhhdmUgdG8gYmUgcXVlcmllZCB0byBvYnRhaW4gdGhlIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICAgICAgY29uc3Qgb250b2xvZ3lJcmlzOiBzdHJpbmdbXSA9IHByb3BlcnRpZXNUb1F1ZXJ5Lm1hcChcbiAgICAgICAgICAgICAgICBwcm9wSXJpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmdldE9udG9sb2d5SXJpRnJvbUVudGl0eUlyaShwcm9wSXJpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLmZpbHRlcihVdGlscy5maWx0ZXJPdXREdXBsaWNhdGVzKTtcblxuICAgICAgICAgICAgLy8gb2J0YWluIG1pc3NpbmcgcmVzb3VyY2UgY2xhc3MgaW5mb3JtYXRpb25cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEFuZENhY2hlT250b2xvZ2llcyhvbnRvbG9neUlyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gd2l0aDogcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlEZWZpbml0aW9uc0Zyb21DYWNoZShwcm9wZXJ0eUlyaXMpOycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFByb3BlcnR5RGVmaW5pdGlvbnNGcm9tQ2FjaGUocHJvcGVydHlJcmlzKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSZWFkUmVzb3VyY2UgfSBmcm9tICcuL3JlYWQtcmVzb3VyY2UnO1xuaW1wb3J0IHsgT250b2xvZ3lJbmZvcm1hdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFkUmVzb3VyY2VzU2VxdWVuY2Uge1xuXG4gICAgLyoqXG4gICAgICogSW5mb3JtYXRpb24gYWJvdXQgdGhlIGVudGl0aWVzIHVzZWQgaW4gdGhlIGdpdmVuIGNvbGxlY3Rpb24gb2YgYFJlYWRSZXNvdXJjZWAuXG4gICAgICovXG4gICAgcHVibGljIHJlYWRvbmx5IG9udG9sb2d5SW5mb3JtYXRpb246IE9udG9sb2d5SW5mb3JtYXRpb24gPSBuZXcgT250b2xvZ3lJbmZvcm1hdGlvbih7fSwge30sIHt9KTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheTxSZWFkUmVzb3VyY2U+fSByZXNvdXJjZXMgZ2l2ZW4gc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZlJlc291cmNlcyBudW1iZXIgb2YgZ2l2ZW4gcmVzb3VyY2VzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByZXNvdXJjZXM6IEFycmF5PFJlYWRSZXNvdXJjZT4sIHB1YmxpYyByZWFkb25seSBudW1iZXJPZlJlc291cmNlczogbnVtYmVyKSB7XG4gICAgfVxuXG59XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiBhIGNvdW50IHF1ZXJ5LlxuICovXG5leHBvcnQgY2xhc3MgQ291bnRRdWVyeVJlc3VsdCB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBudW1iZXJPZlJlc3VsdHMgdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgZm9yIGEgcXVlcnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG51bWJlck9mUmVzdWx0czogbnVtYmVyKSB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSB9IGZyb20gJy4uLy4uLy4uLyc7XG5pbXBvcnQgeyBJbWFnZVJlZ2lvbiB9IGZyb20gJy4vaW1hZ2UtcmVnaW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGltYWdlIGluY2x1ZGluZyBpdHMgcmVnaW9ucy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgU3RpbGxJbWFnZVJlcHJlc2VudGF0aW9uIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZX0gc3RpbGxJbWFnZUZpbGVWYWx1ZSBhIFtbUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWVdXSByZXByZXNlbnRpbmcgYW4gaW1hZ2UuXG4gICAgICogQHBhcmFtIHtJbWFnZVJlZ2lvbltdfSByZWdpb25zIHRoZSByZWdpb25zIGJlbG9uZ2luZyB0byB0aGUgaW1hZ2UuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVhZG9ubHkgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUsIHJlYWRvbmx5IHJlZ2lvbnM6IEltYWdlUmVnaW9uW10pIHtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgUmVhZEdlb21WYWx1ZSwgUmVhZFJlc291cmNlIH0gZnJvbSAnLi4vLi4vLi4vJztcbmltcG9ydCB7IEtub3JhQ29uc3RhbnRzIH0gZnJvbSAnLi4vLi4va25vcmEtY29uc3RhbnRzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmVnaW9uLlxuICogQ29udGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlIHJlc291cmNlIHJlcHJlc2VudGluZyB0aGUgcmVnaW9uIGFuZCBpdHMgZ2VvbWV0cmllcy5cbiAqL1xuXG5leHBvcnQgY2xhc3MgSW1hZ2VSZWdpb24ge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWRSZXNvdXJjZX0gcmVnaW9uUmVzb3VyY2UgYSByZXNvdXJjZSBvZiB0eXBlIFJlZ2lvblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHJlZ2lvblJlc291cmNlOiBSZWFkUmVzb3VyY2UpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgZ2VvbWV0cnkgaW5mb3JtYXRpb24gYmVsb25naW5nIHRvIHRoaXMgcmVnaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1JlYWRHZW9tVmFsdWVbXX1cbiAgICAgKi9cbiAgICBnZXRHZW9tZXRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25SZXNvdXJjZS5wcm9wZXJ0aWVzW0tub3JhQ29uc3RhbnRzLmhhc0dlb21ldHJ5XSBhcyBSZWFkR2VvbVZhbHVlW107XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4vZGVjbGFyYXRpb25zJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgSHR0cENsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogJ2NvbmZpZycsIHVzZVZhbHVlOiBLdWlDb3JlQ29uZmlnfVxuICAgIF1cbn0pXG5cblxuZXhwb3J0IGNsYXNzIEt1aUNvcmVNb2R1bGUge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtLdWlDb3JlQ29uZmlnfSBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7TW9kdWxlV2l0aFByb3ZpZGVyc31cbiAgICAgKi9cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEt1aUNvcmVDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBhcHAgZW52aXJvbm1lbnQgY29uZmlndXJhdGlvbiBoZXJlXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogS3VpQ29yZU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIHtwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBHcm91cCwgR3JvdXBSZXNwb25zZSwgR3JvdXBzUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMvJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5cbi8qKlxuICogUmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCBncm91cCBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEdyb3Vwc1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcGF0aDogc3RyaW5nID0gJy9hZG1pbi9ncm91cHMnO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgbGlzdCBvZiBhbGwgZ3JvdXBzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cFtdPlxuICAgICAqL1xuICAgIGdldEFsbEdyb3VwcygpOiBPYnNlcnZhYmxlPEdyb3VwW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBzUmVzcG9uc2UpLmdyb3VwcyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGdyb3VwIG9iamVjdCAoZmlsdGVyIGJ5IElSSSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxHcm91cD5cbiAgICAgKi9cbiAgICBnZXRHcm91cEJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxHcm91cD4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoR3JvdXBSZXNwb25zZSkuZ3JvdXApLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICAgIEFwaVNlcnZpY2VSZXN1bHQsXG4gICAgTGlzdCxcbiAgICBMaXN0Q3JlYXRlUGF5bG9hZCxcbiAgICBMaXN0SW5mbyxcbiAgICBMaXN0SW5mb1Jlc3BvbnNlLFxuICAgIExpc3RJbmZvVXBkYXRlUGF5bG9hZCxcbiAgICBMaXN0Tm9kZUluZm8sXG4gICAgTGlzdE5vZGVJbmZvUmVzcG9uc2UsXG4gICAgTGlzdFJlc3BvbnNlLFxuICAgIExpc3RzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBSZXF1ZXN0IGluZm9ybWF0aW9uIGFib3V0IGxpc3RzIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdHNTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHBhdGg6IHN0cmluZyA9ICcvYWRtaW4vbGlzdHMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcHJvamVjdElyaV1cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPlxuICAgICAqL1xuICAgIGdldExpc3RzKHByb2plY3RJcmk/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPExpc3ROb2RlSW5mb1tdPiB7XG4gICAgICAgIGlmIChwcm9qZWN0SXJpKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGggKz0gJz9wcm9qZWN0SXJpPScgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCh0aGlzLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoTGlzdHNSZXNwb25zZSkubGlzdHMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaXN0SXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0PlxuICAgICAqL1xuICAgIGdldExpc3QobGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoICsgJy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RSZXNwb25zZSkubGlzdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3QgaW5mbyBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGlzdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdEluZm8obGlzdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGxpc3RJcmkpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHRoaXMucGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0SW5mb1Jlc3BvbnNlKS5saXN0aW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIGxpc3Qgbm9kZSBpbmZvIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlSXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxMaXN0Tm9kZUluZm8+XG4gICAgICovXG4gICAgZ2V0TGlzdE5vZGVJbmZvKG5vZGVJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8TGlzdE5vZGVJbmZvPiB7XG4gICAgICAgIHRoaXMucGF0aCArPSAnL25vZGVzLycgKyBlbmNvZGVVUklDb21wb25lbnQobm9kZUlyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQodGhpcy5wYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3ROb2RlSW5mb1Jlc3BvbnNlKS5ub2RlaW5mbyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUE9TVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIG5ldyBsaXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtMaXN0Q3JlYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdD5cbiAgICAgKi9cbiAgICBjcmVhdGVMaXN0KHBheWxvYWQ6IExpc3RDcmVhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHRoaXMucGF0aCwgcGF5bG9hZCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShMaXN0UmVzcG9uc2UpLmxpc3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFBVVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRWRpdCBsaXN0IGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0xpc3RJbmZvVXBkYXRlUGF5bG9hZH0gcGF5bG9hZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8TGlzdEluZm8+XG4gICAgICovXG4gICAgdXBkYXRlTGlzdEluZm8ocGF5bG9hZDogTGlzdEluZm9VcGRhdGVQYXlsb2FkKTogT2JzZXJ2YWJsZTxMaXN0SW5mbz4ge1xuICAgICAgICB0aGlzLnBhdGggKz0gJy9pbmZvcy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBheWxvYWQubGlzdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodGhpcy5wYXRoLCBwYXlsb2FkKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KExpc3RJbmZvUmVzcG9uc2UpLmxpc3RpbmZvKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2VSZXN1bHQsIFByb2plY3QsIFByb2plY3RNZW1iZXJzUmVzcG9uc2UsIFByb2plY3RSZXNwb25zZSwgUHJvamVjdHNSZXNwb25zZSwgVXNlciB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucy8nO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3QgaW5mb3JtYXRpb24gYWJvdXQgcHJvamVjdHMgZnJvbSBLbm9yYS5cbiAqL1xuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9qZWN0c1NlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdFVFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHByb2plY3RzLlxuICAgICAqXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0W10+XG4gICAgICovXG4gICAgZ2V0QWxsUHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL2FkbWluL3Byb2plY3RzJykucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0c1Jlc3BvbnNlKS5wcm9qZWN0cyksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlJcmkoaXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsOiBzdHJpbmcgPSAnL2FkbWluL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdCh1cmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9qZWN0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWUgc2hvcnQgbmFtZSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFByb2plY3Q+XG4gICAgICovXG4gICAgZ2V0UHJvamVjdEJ5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybCA9ICcvYWRtaW4vcHJvamVjdHMvJyArIHNob3J0bmFtZSArICc/aWRlbnRpZmllcj1zaG9ydG5hbWUnO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9qZWN0KHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHByb2plY3Qgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0Y29kZSBoZXhhZGVjaW1hbCBjb2RlIHRoYXQgdW5pcXVlbHkgaWRlbnRpZmllcyB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0QnlTaG9ydGNvZGUoc2hvcnRjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFByb2plY3Q+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgc2hvcnRjb2RlICsgJz9pZGVudGlmaWVyPXNob3J0Y29kZSc7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFByb2plY3QodXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgcmV0cmlldmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0UmVzcG9uc2UpLnByb2plY3QpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHByb2plY3QgaWQgKGlyaSkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpIGlkZW50aWZpZXIgb2YgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0bmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydG5hbWUgc2hvcnQgbmFtZSB0aGF0IGlzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRuYW1lKHNob3J0bmFtZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydG5hbWUgKyAnP2lkZW50aWZpZXI9c2hvcnRuYW1lJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBwcm9qZWN0IG1lbWJlcnMuXG4gICAgICogUHJvamVjdCBpZGVudGlmaWVyIGlzIHNob3J0Y29kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaG9ydGNvZGUgaGV4YWRlY2ltYWwgY29kZSB0aGF0IHVuaXF1ZWx5IGlkZW50aWZpZXMgdGhlIHByb2plY3RcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBnZXRQcm9qZWN0TWVtYmVyc0J5U2hvcnRjb2RlKHNob3J0Y29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyW10+IHtcbiAgICAgICAgY29uc3QgdXJsID0gJy9hZG1pbi9wcm9qZWN0cy9tZW1iZXJzLycgKyBzaG9ydGNvZGUgKyAnP2lkZW50aWZpZXI9c2hvcnRjb2RlJztcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvamVjdE1lbWJlcnModXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEhlbHBlciBtZXRob2QgY29tYmluaW5nIHByb2plY3QgbWVtYmVyIHJldHJpZXZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXJbXT5cbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvamVjdE1lbWJlcnModXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXJbXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShQcm9qZWN0TWVtYmVyc1Jlc3BvbnNlKS5tZW1iZXJzKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IHByb2plY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBjcmVhdGVQcm9qZWN0KGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMnO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwUG9zdCh1cmwsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBFZGl0IHByb2plY3QgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2plY3QoaXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgcHJvamVjdCAoaWYgaXQgd2FzIGRlbGV0ZWQpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBpZGVudGlmaWVyIG9mIHRoZSBwcm9qZWN0XG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxQcm9qZWN0PlxuICAgICAqL1xuICAgIGFjdGl2YXRlUHJvamVjdChpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8UHJvamVjdD4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCB1cmw6IHN0cmluZyA9ICcvYWRtaW4vcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQodXJsLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFByb2plY3RSZXNwb25zZSkucHJvamVjdCksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gREVMRVRFXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBEZWxldGUgKHNldCBpbmFjdGl2ZSkgcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgaWRlbnRpZmllciBvZiB0aGUgcHJvamVjdFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8UHJvamVjdD5cbiAgICAgKi9cbiAgICBkZWxldGVQcm9qZWN0KGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9qZWN0PiB7XG4gICAgICAgIGNvbnN0IHVybDogc3RyaW5nID0gJy9hZG1pbi9wcm9qZWN0cy8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGlyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZSh1cmwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoUHJvamVjdFJlc3BvbnNlKS5wcm9qZWN0KSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBBcGlTZXJ2aWNlUmVzdWx0LFxuICAgIFVzZXIsXG4gICAgVXNlclJlc3BvbnNlLFxuICAgIFVzZXJzUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zLyc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIHVzZXMgdGhlIEtub3JhIGFkbWluIEFQSSBhbmQgaGFuZGxlcyBhbGwgdXNlciBkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgdXNlcnNVcmw6IHN0cmluZyA9IHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vdXNlcnMnO1xuXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHRVRcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB1c2Vycy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcltdPlxuICAgICAqL1xuICAgIGdldEFsbFVzZXJzKCk6IE9ic2VydmFibGU8VXNlcltdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQoJy9hZG1pbi91c2VycycpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlcnNSZXNwb25zZSkudXNlcnMpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkZW50aWZpZXIgLSBHZXQgdXNlciBieSB1c2VybmFtZSwgZW1haWwgb3IgYnkgaXJpXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBHZXQocGF0aCkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXByZWNhdGVkISBQbGVhc2UgdXNlIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nKSBvbmx5IVxuICAgICAqIEdldCB1c2VyIGJ5IGVtYWlsXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWxcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxVc2VyPn1cbiAgICAgKi9cbiAgICBnZXRVc2VyQnlFbWFpbChlbWFpbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIoZW1haWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcHJlY2F0ZWQhIFBsZWFzZSB1c2UgZ2V0VXNlcihpZGVudGlmaWVyOiBzdHJpbmcpIG9ubHkhXG4gICAgICpcbiAgICAgKiBAaWdub3JlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXJpXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VXNlcj59XG4gICAgICovXG4gICAgZ2V0VXNlckJ5SXJpKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVzZXIoaXJpKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBQT1NUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgbmV3IHVzZXIuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gZGF0YVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBjcmVhdGVVc2VyKGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBwYXRoID0gJy9hZG1pbi91c2Vycyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgsIGRhdGEpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICBhZGRVc2VyVG9Qcm9qZWN0KHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHVzZXIgdG8gYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWRkVXNlclRvUHJvamVjdEFkbWluKHVzZXJJcmk6IHN0cmluZywgcHJvamVjdElyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzL3Byb2plY3RzLWFkbWluLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSkgKyAnLycgKyBlbmNvZGVVUklDb21wb25lbnQocHJvamVjdElyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KHBhdGgpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKHJlc3VsdDogQXBpU2VydmljZVJlc3VsdCkgPT4gcmVzdWx0LmdldEJvZHkoVXNlclJlc3BvbnNlKS51c2VyKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVKc29uRXJyb3IpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHVzZXIgb2YgYW4gYWRtaW4gcHJvamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgcmVtb3ZlVXNlckZyb21Qcm9qZWN0QWRtaW4odXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMtYWRtaW4vJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUFVUXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuICAgIC8qKlxuICAgICAqIEFkZCB1c2VyIHRvIHRoZSBhZG1pbiBzeXN0ZW0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7YW55fSBkYXRhXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxVc2VyPlxuICAgICAqL1xuICAgIGFkZFVzZXJUb1N5c3RlbUFkbWluKHVzZXJJcmk6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQdXQocGF0aCwgZGF0YSkucGlwZShcbiAgICAgICAgICAgIG1hcCgocmVzdWx0OiBBcGlTZXJ2aWNlUmVzdWx0KSA9PiByZXN1bHQuZ2V0Qm9keShVc2VyUmVzcG9uc2UpLnVzZXIpLFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUpzb25FcnJvcilcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgYWN0aXZhdGVVc2VyKHVzZXJJcmk6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXNlcih1c2VySXJpLCBkYXRhKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBvd24gcGFzc3dvcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcklyaVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvbGRQYXNzd29yZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdQYXNzd29yZFxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICB1cGRhdGVPd25QYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIG9sZFBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiBvbGRQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBwYXNzd29yZCBvZiBhbm90aGVyIHVzZXIgKG5vdCBvd24pLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVyUGFzc3dvcmRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3UGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlVXNlcnNQYXNzd29yZCh1c2VySXJpOiBzdHJpbmcsIHJlcXVlc3RlclBhc3N3b3JkOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG5ld1Bhc3N3b3JkOiBuZXdQYXNzd29yZCxcbiAgICAgICAgICAgIHJlcXVlc3RlclBhc3N3b3JkOiByZXF1ZXN0ZXJQYXNzd29yZFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVc2VyKHVzZXJJcmksIGRhdGEpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHVzZXIgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySXJpXG4gICAgICogQHBhcmFtIHthbnl9IGRhdGFcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgdXBkYXRlVXNlcih1c2VySXJpOiBzdHJpbmcsIGRhdGE6IGFueSk6IE9ic2VydmFibGU8VXNlcj4ge1xuXG4gICAgICAgIGNvbnN0IHBhdGggPSAnL2FkbWluL3VzZXJzLycgKyBlbmNvZGVVUklDb21wb25lbnQodXNlcklyaSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFB1dChwYXRoLCBkYXRhKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIERFTEVURVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIC8gZGVhY3RpdmF0ZSB1c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPFVzZXI+XG4gICAgICovXG4gICAgZGVsZXRlVXNlcih1c2VySXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHVzZXIgZnJvbSBwcm9qZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJJcmlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvamVjdElyaVxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8VXNlcj5cbiAgICAgKi9cbiAgICByZW1vdmVVc2VyRnJvbVByb2plY3QodXNlcklyaTogc3RyaW5nLCBwcm9qZWN0SXJpOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9ICcvYWRtaW4vdXNlcnMvcHJvamVjdHMvJyArIGVuY29kZVVSSUNvbXBvbmVudCh1c2VySXJpKSArICcvJyArIGVuY29kZVVSSUNvbXBvbmVudChwcm9qZWN0SXJpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cERlbGV0ZShwYXRoKS5waXBlKFxuICAgICAgICAgICAgbWFwKChyZXN1bHQ6IEFwaVNlcnZpY2VSZXN1bHQpID0+IHJlc3VsdC5nZXRCb2R5KFVzZXJSZXNwb25zZSkudXNlciksXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlSnNvbkVycm9yKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTGFuZ3VhZ2VTZXJ2aWNlIHtcblxuICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgdGhpcy5zdWJqZWN0Lm5leHQoeyB2YXI6IGxhbmcgfSk7XG4gIH1cbiAgZ2V0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS3VpQ29yZUNvbmZpZyB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c01zZ1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZykge1xuICB9XG5cbiAgLyoqXG4gICogdGhpcyBtZXRob2QgZ2V0IHRoZSBzdGF0dXMgbWVzc2FnZXMgZnJvbSB0aGUgc3RhdHVzTXNnLmpzb24gZmlsZVxuICAqIHdoaWNoIGFyZSBkZWZpbmVkIGhlcmU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xpc3Rfb2ZfSFRUUF9zdGF0dXNfY29kZXNcbiAgKiBhbmQgaGVyZTogaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvcmVmX2h0dHBtZXNzYWdlcy5hc3BcbiAgKlxuICAqL1xuICBnZXRTdGF0dXNNc2coKTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLmNvbmZpZy5hcHAgKyAnL2Fzc2V0cy9pMThuL3N0YXR1c01zZy5qc29uJylcbiAgICAgIC5waXBlKG1hcChcbiAgICAgICAgKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfSxcbiAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICk7XG5cbiAgfTtcbn1cbiIsImltcG9ydCB7XG4gICAgQ291bnRRdWVyeVJlc3VsdCxcbiAgICBLbm9yYUNvbnN0YW50cyxcbiAgICBSZWFkQm9vbGVhblZhbHVlLFxuICAgIFJlYWRDb2xvclZhbHVlLFxuICAgIFJlYWREYXRlVmFsdWUsXG4gICAgUmVhZERlY2ltYWxWYWx1ZSxcbiAgICBSZWFkR2VvbVZhbHVlLFxuICAgIFJlYWRJbnRlZ2VyVmFsdWUsXG4gICAgUmVhZEludGVydmFsVmFsdWUsXG4gICAgUmVhZExpbmtWYWx1ZSxcbiAgICBSZWFkTGlzdFZhbHVlLFxuICAgIFJlYWRQcm9wZXJ0aWVzLFxuICAgIFJlYWRQcm9wZXJ0eUl0ZW0sXG4gICAgUmVhZFJlc291cmNlLFxuICAgIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSxcbiAgICBSZWFkU3RpbGxJbWFnZUZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dEZpbGVWYWx1ZSxcbiAgICBSZWFkVGV4dFZhbHVlQXNIdG1sLFxuICAgIFJlYWRUZXh0VmFsdWVBc1N0cmluZyxcbiAgICBSZWFkVGV4dFZhbHVlQXNYbWwsXG4gICAgUmVhZFVyaVZhbHVlLFxuICAgIFJlZmVycmVkUmVzb3VyY2VzQnlTdGFuZG9mZkxpbmssXG4gICAgVXRpbHNcbn0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBDb250YWlucyBtZXRob2RzIHRvIGNvbnZlcnQgSlNPTi1MRCByZXByZXNlbnRpbmcgcmVzb3VyY2VzIGFuZCBwcm9wZXJ0aWVzIHRvIGNsYXNzZXMuXG4gKiBUaGVzZSBtZXRob2RzIHdvcmtzIG9ubHkgZm9yIGluc3RhbmNlcyBvZiByZXNvdXJjZXMgYW5kIHByb3BlcnRpZXMsIG5vdCBmb3Igb250b2xvZ2llcyAoZGF0YSBtb2RlbCkuXG4gKi9cbmV4cG9ydCBtb2R1bGUgQ29udmVydEpTT05MRCB7XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0byBiZSBwYXNzZWQgdG8gYSBmaWx0ZXIgdXNlZCBvbiBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lc1xuICAgICAqIHNvcnRpbmcgb3V0IGFsbCBub24gdmFsdWUgcHJvcGVydHkgbmFtZXMuXG4gICAgICpcbiAgICAgKiBHZXRzIGFsbCBwcm9wZXJ0eSBuYW1lcyB0aGF0IHJlZmVyIHRvIHZhbHVlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcHJvcE5hbWUgdGhlIG5hbWUgb2YgYSBwcm9wZXJ0eSB0byBiZSBjaGVja2VkLlxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4gLSBpbmRpY2F0aW5nIGlmIHRoZSBuYW1lIHJlZmVycyB0byBhIHZhbHVlIHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbnN0IGdldFByb3BlcnR5TmFtZXMgPSAocHJvcE5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb3BOYW1lICE9PSAnQGlkJ1xuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09ICdAdHlwZSdcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5SZGZzTGFiZWxcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5hdHRhY2hlZFRvUHJvamVjdFxuICAgICAgICAgICAgJiYgcHJvcE5hbWUgIT09IEtub3JhQ29uc3RhbnRzLmF0dGFjaGVkVG9Vc2VyXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMuY3JlYXRpb25EYXRlXG4gICAgICAgICAgICAmJiBwcm9wTmFtZSAhPT0gS25vcmFDb25zdGFudHMubGFzdE1vZGlmaWNhdGlvbkRhdGVcbiAgICAgICAgICAgICYmIHByb3BOYW1lICE9PSBLbm9yYUNvbnN0YW50cy5oYXNQZXJtaXNzaW9ucztcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUmVzb3VyY2VdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gYSByZXNvdXJjZSBhbmQgaXRzIHByb3BlcnRpZXMgc2VyaWFsaXplZCBhcyBKU09OLUxELlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRSZXNvdXJjZShyZXNvdXJjZUpTT05MRDogb2JqZWN0KTogUmVhZFJlc291cmNlIHtcblxuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzOiBSZWFkUHJvcGVydGllcyA9IGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICByZXR1cm4gbmV3IFJlYWRSZXNvdXJjZShcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAaWQnXSxcbiAgICAgICAgICAgIHJlc291cmNlSlNPTkxEWydAdHlwZSddLFxuICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbS25vcmFDb25zdGFudHMuUmRmc0xhYmVsXSxcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIFtdLCAvLyB0byBiZSB1cGRhdGVkIG9uY2UgYW5vdGhlciByZXF1ZXN0IGhhcyBiZWVuIG1hZGVcbiAgICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1tSZWFkUHJvcGVydHlJdGVtXV0gZnJvbSBKU09OLUxELFxuICAgICAqIHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByb3BlcnR5J3MgdmFsdWUgdHlwZS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wVmFsdWUgdGhlIHZhbHVlIHNlcmlhbGl6ZWQgYXMgSlNPTi1MRC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcElyaSB0aGUgSXJpIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1JlYWRMaW5rVmFsdWVbXX0gc3RhbmRvZmZMaW5rVmFsdWVzIHN0YW5kb2ZmTGlua1ZhbHVlcyBvZiB0aGUgcmVzb3VyY2UuIFRleHQgdmFsdWVzIG1heSBjb250YWluIGxpbmtzIHRvIG90aGVyIHJlc291cmNlcy5cbiAgICAgKiBAcmV0dXJucyBhIFtbUmVhZFByb3BlcnR5SXRlbV1dIG9yIGB1bmRlZmluZWRgIGluIGNhc2UgdGhlIHZhbHVlIGNvdWxkIG5vdCBiZSBwcm9jZXNzZWQgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKFxuICAgICAgICBwcm9wVmFsdWU6IE9iamVjdCwgcHJvcElyaTogc3RyaW5nLCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSk6IFJlYWRQcm9wZXJ0eUl0ZW0gfCB1bmRlZmluZWQge1xuXG4gICAgICAgIC8vIGNvbnZlcnQgYSBKU09OLUxEIHByb3BlcnR5IHZhbHVlIHRvIGEgYFJlYWRQcm9wZXJ0eUl0ZW1gXG5cbiAgICAgICAgbGV0IHZhbHVlU3BlY2lmaWNQcm9wOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgIC8vIGNoZWNrIGZvciB0aGUgcHJvcGVydHkncyB2YWx1ZSB0eXBlXG4gICAgICAgIHN3aXRjaCAocHJvcFZhbHVlWydAdHlwZSddKSB7XG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLlRleHRWYWx1ZTpcbiAgICAgICAgICAgICAgICAvLyBhIHRleHQgdmFsdWUgbWlnaHQgYmUgZ2l2ZW4gYXMgcGxhaW4gc3RyaW5nLCBodG1sIG9yIHhtbC5cbiAgICAgICAgICAgICAgICBsZXQgdGV4dFZhbHVlOiBSZWFkUHJvcGVydHlJdGVtO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy52YWx1ZUFzU3RyaW5nXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZSA9IG5ldyBSZWFkVGV4dFZhbHVlQXNTdHJpbmcocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLnZhbHVlQXNTdHJpbmddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZlcnJlZFJlc291cmNlczogUmVmZXJyZWRSZXNvdXJjZXNCeVN0YW5kb2ZmTGluayA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBzdGFuZG9mZiBsaW5rcyBhbmQgaW5jbHVkZSByZWZlcnJlZCByZXNvdXJjZXMsIGlmIGFueVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB1c2VyIGludGVyYWN0cyB3aXRoIGEgc3RhbmRvZmYgbGluaywgZnVydGhlciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVmZXJyZWQgcmVzb3VyY2UgY2FuIGJlIHNob3duXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhbmRvZmZMaW5rIG9mIHN0YW5kb2ZmTGlua1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXM6IFJlYWRSZXNvdXJjZSA9IHN0YW5kb2ZmTGluay5yZWZlcnJlZFJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZXNbcmVmZXJyZWRSZXMuaWRdID0gcmVmZXJyZWRSZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0ZXh0VmFsdWUgPSBuZXcgUmVhZFRleHRWYWx1ZUFzSHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc0h0bWxdLCByZWZlcnJlZFJlc291cmNlc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0gIT09IHVuZGVmaW5lZCAmJiBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudGV4dFZhbHVlSGFzTWFwcGluZ11bJ0BpZCddICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlID0gbmV3IFJlYWRUZXh0VmFsdWVBc1htbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVBc1htbF0sIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy50ZXh0VmFsdWVIYXNNYXBwaW5nXVsnQGlkJ11cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHBlY3RlZCB0ZXh0IHZhbHVlIG1lbWJlcnMgbm90IGRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IEludmFsaWQgdGV4dCB2YWx1ZTogJyArIEpTT04uc3RyaW5naWZ5KHByb3BWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dFZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkRhdGVWYWx1ZTpcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsdWUgPSBuZXcgUmVhZERhdGVWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzQ2FsZW5kYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRZZWFyXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc0VuZFllYXJdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnRFcmFdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRXJhXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRhdGVWYWx1ZUhhc1N0YXJ0TW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kTW9udGhdLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzU3RhcnREYXldLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuZGF0ZVZhbHVlSGFzRW5kRGF5XSk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGRhdGVWYWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlua1ZhbHVlOiBSZWFkTGlua1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHJlZmVycmVkIHJlc291cmNlIGlzIGdpdmVuIGFzIGFuIG9iamVjdCBvciBqdXN0IGFzIGFuIElSSVxuICAgICAgICAgICAgICAgIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1RhcmdldCBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCByZWZlcnJlZFJlc291cmNlLmlkLCByZWZlcnJlZFJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzVGFyZ2V0SXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0SXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgcmVmZXJyZWRSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtWYWx1ZUhhc1NvdXJjZSBjb250YWlucyB0aGUgb2JqZWN0XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5jb21pbmdSZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdKTtcblxuICAgICAgICAgICAgICAgICAgICBsaW5rVmFsdWUgPSBuZXcgUmVhZExpbmtWYWx1ZShwcm9wVmFsdWVbJ0BpZCddLCBwcm9wSXJpLCBpbmNvbWluZ1Jlc291cmNlLmlkLCBpbmNvbWluZ1Jlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VJcmldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua1ZhbHVlSGFzU291cmNlSXJpIGNvbnRhaW5zIHRoZSByZXNvdXJjZSdzIElyaVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29taW5nUmVzb3VyY2VJcmkgPSBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlSXJpXVsnQGlkJ107XG5cbiAgICAgICAgICAgICAgICAgICAgbGlua1ZhbHVlID0gbmV3IFJlYWRMaW5rVmFsdWUocHJvcFZhbHVlWydAaWQnXSwgcHJvcElyaSwgaW5jb21pbmdSZXNvdXJjZUlyaSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaW5rVmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuSW50VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRWYWx1ZSA9IG5ldyBSZWFkSW50ZWdlclZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5pbnRlZ2VyVmFsdWVBc0ludGVnZXJdKTtcbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuRGVjaW1hbFZhbHVlOlxuXG4gICAgICAgICAgICAgICAgLy8gYSBkZWNpbWFsIHZhbHVlIGlzIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nIGluIG9yZGVyIHRvIHByZXNlcnZlIGl0cyBwcmVjaXNpb25cbiAgICAgICAgICAgICAgICBjb25zdCBkZWNWYWw6IG51bWJlciA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmRlY2ltYWxWYWx1ZUFzRGVjaW1hbF1bJ0B2YWx1ZSddKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlY2ltYWxWYWx1ZSA9IG5ldyBSZWFkRGVjaW1hbFZhbHVlKHByb3BWYWx1ZVsnQGlkJ10sIHByb3BJcmksIGRlY1ZhbCk7XG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBkZWNpbWFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5TdGlsbEltYWdlRmlsZVZhbHVlOlxuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RpbGxJbWFnZUZpbGVWYWx1ZTogUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUgPSBuZXcgUmVhZFN0aWxsSW1hZ2VGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzSUlJRkJhc2VVcmxdWydAdmFsdWUnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmZpbGVWYWx1ZUFzVXJsXVsnQHZhbHVlJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWF0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5zdGlsbEltYWdlRmlsZVZhbHVlSGFzRGltWV1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBzdGlsbEltYWdlRmlsZVZhbHVlO1xuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgS25vcmFDb25zdGFudHMuVGV4dEZpbGVWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRGaWxlVmFsdWUgPSBuZXcgUmVhZFRleHRGaWxlVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVIYXNGaWxlbmFtZV0sXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5maWxlVmFsdWVBc1VybF1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdGV4dEZpbGVWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkNvbG9yVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZWFkQ29sb3JWYWx1ZTogUmVhZENvbG9yVmFsdWUgPSBuZXcgUmVhZENvbG9yVmFsdWUoXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVsnQGlkJ10sXG4gICAgICAgICAgICAgICAgICAgIHByb3BJcmksXG4gICAgICAgICAgICAgICAgICAgIHByb3BWYWx1ZVtLbm9yYUNvbnN0YW50cy5jb2xvclZhbHVlQXNDb2xvcl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSByZWFkQ29sb3JWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkdlb21WYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWRHZW9tVmFsdWU6IFJlYWRHZW9tVmFsdWUgPSBuZXcgUmVhZEdlb21WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmdlb21ldHJ5VmFsdWVBc0dlb21ldHJ5XVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IHJlYWRHZW9tVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5VcmlWYWx1ZTpcblxuICAgICAgICAgICAgICAgIGNvbnN0IHVyaVZhbHVlOiBSZWFkVXJpVmFsdWUgPSBuZXcgUmVhZFVyaVZhbHVlKFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbJ0BpZCddLFxuICAgICAgICAgICAgICAgICAgICBwcm9wSXJpLFxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWVbS25vcmFDb25zdGFudHMudXJpVmFsdWVBc1VyaV1bJ0B2YWx1ZSddXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlU3BlY2lmaWNQcm9wID0gdXJpVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5Cb29sZWFuVmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBib29sVmFsdWU6IFJlYWRCb29sZWFuVmFsdWUgPSBuZXcgUmVhZEJvb2xlYW5WYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmJvb2xlYW5WYWx1ZUFzQm9vbGVhbl1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBib29sVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuXG4gICAgICAgICAgICBjYXNlIEtub3JhQ29uc3RhbnRzLkludGVydmFsVmFsdWU6XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRlZCBhcyBzdHJpbmdzIHRvIHByZXNlcnZlIHByZWNpc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IGludFN0YXJ0ID0gcGFyc2VGbG9hdChwcm9wVmFsdWVbS25vcmFDb25zdGFudHMuaW50ZXJ2YWxWYWx1ZUhhc1N0YXJ0XVsnQHZhbHVlJ10pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGludEVuZCA9IHBhcnNlRmxvYXQocHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmludGVydmFsVmFsdWVIYXNFbmRdWydAdmFsdWUnXSk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcnZhbFZhbHVlOiBSZWFkSW50ZXJ2YWxWYWx1ZSA9IG5ldyBSZWFkSW50ZXJ2YWxWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgaW50U3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGludEVuZFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZVNwZWNpZmljUHJvcCA9IGludGVydmFsVmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBLbm9yYUNvbnN0YW50cy5MaXN0VmFsdWU6XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VmFsdWU6IFJlYWRMaXN0VmFsdWUgPSBuZXcgUmVhZExpc3RWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcElyaSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVdWydAaWQnXSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcFZhbHVlW0tub3JhQ29uc3RhbnRzLmxpc3RWYWx1ZUFzTGlzdE5vZGVMYWJlbF1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFsdWVTcGVjaWZpY1Byb3AgPSBsaXN0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyB1bnN1cHBvcnRlZCB2YWx1ZSB0eXBlXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRVJST1I6IHZhbHVlIHR5cGUgbm90IGltcGxlbWVudGVkIHlldDogJyArIHByb3BWYWx1ZVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVTcGVjaWZpY1Byb3A7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIFtbUmVhZFByb3BlcnRpZXNdXSBmcm9tIEpTT04tTEQuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVzb3VyY2VKU09OTEQgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHJlc291cmNlIGFuZCBpdHMgcHJvcGVydGllcy5cbiAgICAgKiBAcmV0dXJucyBSZWFkUHJvcGVydGllc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdFJlYWRQcm9wZXJ0aWVzKHJlc291cmNlSlNPTkxEOiBvYmplY3QpOiBSZWFkUHJvcGVydGllcyB7XG5cbiAgICAgICAgLy8gSlNPTi1MRCByZXByZXNlbnRpbmcgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgLy8gdGV4dCB2YWx1ZXMgbWF5IGNvbnRhaW4gc3RhbmRvZmYgbGlua3NcbiAgICAgICAgY29uc3Qgc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEOiBPYmplY3QgPSByZXNvdXJjZUpTT05MRFtLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlXTtcblxuICAgICAgICAvLyB0byBiZSBwb3B1bGF0ZWQgd2l0aCBzdGFuZG9mZiBsaW5rIHZhbHVlc1xuICAgICAgICBjb25zdCBzdGFuZG9mZkxpbmtWYWx1ZXM6IFJlYWRMaW5rVmFsdWVbXSA9IFtdO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgZWFjaCBzdGFuZG9mZiBsaW5rIHZhbHVlIEpTT04tTEQgb2JqZWN0IHRvIGEgUmVhZExpbmtWYWx1ZVxuICAgICAgICAvLyBpbiBvcmRlciBwb3B1bGF0ZSB0aGUgY29sbGVjdGlvbiB3aXRoIGFsbCB0aGUgc3RhbmRvZmYgbGluayB2YWx1ZXNcbiAgICAgICAgaWYgKHN0YW5kb2ZmTGlua1ZhbHVlc0pTT05MRCAhPT0gdW5kZWZpbmVkICYmIEFycmF5LmlzQXJyYXkoc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBzdGFuZG9mZkxpbmtKU09OTEQgb2Ygc3RhbmRvZmZMaW5rVmFsdWVzSlNPTkxEKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWw6IFJlYWRMaW5rVmFsdWUgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICAgICAgc3RhbmRvZmZMaW5rSlNPTkxELCBLbm9yYUNvbnN0YW50cy5oYXNTdGFuZG9mZkxpbmtUb1ZhbHVlLCBbXVxuICAgICAgICAgICAgICAgICkgYXMgUmVhZExpbmtWYWx1ZTtcblxuICAgICAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhbmRvZmZWYWwgPSBjcmVhdGVWYWx1ZVNwZWNpZmljUHJvcChcbiAgICAgICAgICAgICAgICBzdGFuZG9mZkxpbmtWYWx1ZXNKU09OTEQsIEtub3JhQ29uc3RhbnRzLmhhc1N0YW5kb2ZmTGlua1RvVmFsdWUsIFtdXG4gICAgICAgICAgICApIGFzIFJlYWRMaW5rVmFsdWU7XG5cbiAgICAgICAgICAgIHN0YW5kb2ZmTGlua1ZhbHVlcy5wdXNoKHN0YW5kb2ZmVmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIG91dCBldmVyeXRoaW5nIHRoYXQgaXMgbm90IGEgS25vcmEgcHJvcGVydHkgbmFtZVxuICAgICAgICBwcm9wTmFtZXMgPSBwcm9wTmFtZXMuZmlsdGVyKGdldFByb3BlcnR5TmFtZXMpO1xuXG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXM6IFJlYWRQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCB0aGUgZ2l2ZW4gcHJvcGVydHkgbmFtZXNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBvZiBwcm9wTmFtZXMpIHtcblxuICAgICAgICAgICAgY29uc3QgcHJvcFZhbHVlczogQXJyYXk8UmVhZFByb3BlcnR5SXRlbT4gPSBbXTtcblxuICAgICAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHZhbHVlcyBvciBqdXN0IG9uZSB2YWx1ZSBpcyBnaXZlblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzb3VyY2VKU09OTERbcHJvcE5hbWVdKSkge1xuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIHZhbHVlc1xuXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggcHJvcGVydHkgbmFtZSwgYW4gYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzIGlzIGdpdmVuLCBpdGVyYXRlIG92ZXIgaXRcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3BWYWx1ZSBvZiByZXNvdXJjZUpTT05MRFtwcm9wTmFtZV0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IGEgSlNPTi1MRCBwcm9wZXJ0eSB2YWx1ZSB0byBhIGBSZWFkUHJvcGVydHlJdGVtYFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHByb3BWYWx1ZSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgdW5kZWZpbmVkLCB0aGUgdmFsdWUgY291bGQgbm90IGJlIGNvbnN0cnVjdGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgb25lIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVNwZWNpZmljUHJvcDogUmVhZFByb3BlcnR5SXRlbSA9IGNyZWF0ZVZhbHVlU3BlY2lmaWNQcm9wKHJlc291cmNlSlNPTkxEW3Byb3BOYW1lXSwgcHJvcE5hbWUsIHN0YW5kb2ZmTGlua1ZhbHVlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyB1bmRlZmluZWQsIHRoZSB2YWx1ZSBjb3VsZCBub3QgYmUgY29uc3RydWN0ZWQgY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBwcm9wZXJ0eSB2YWx1ZSB0byB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlU3BlY2lmaWNQcm9wICE9PSB1bmRlZmluZWQpIHByb3BWYWx1ZXMucHVzaCh2YWx1ZVNwZWNpZmljUHJvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgcHJvcGVydHkgdG8gdGhlIHByb3BlcnRpZXMgb2JqZWN0XG4gICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IHByb3BWYWx1ZXM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGFuIEFQSSByZXNwb25zZSBpbiBKU09OLUxEIHJlcHJlc2VudGluZyBhIHNlcXVlbmNlIG9mIHJlc291cmNlcyBpbnRvIGEgW1tSZWFkUmVzb3VyY2VzU2VxdWVuY2VdXS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZXNSZXNwb25zZUpTT05MRCBhIHJlc291cmNlIG9yIGEgc2VxdWVuY2Ugb2YgcmVzb3VyY2VzLCByZXByZXNlbnRlZCBhcyBhIEpTT04tTEQgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSAtIHNlcXVlbmNlIG9mIHJlYWQgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlYWRSZXNvdXJjZXNTZXF1ZW5jZUZyb21Kc29uTEQocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQ6IG9iamVjdCk6IFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB7XG5cbiAgICAgICAgY29uc3QgcmVzb3VyY2VzOiBBcnJheTxSZWFkUmVzb3VyY2U+ID0gW107XG4gICAgICAgIGxldCBudW1iZXJPZlJlc291cmNlczogbnVtYmVyO1xuICAgICAgICBjb25zdCByZXNvdXJjZXNHcmFwaCA9IHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEWydAZ3JhcGgnXTtcblxuICAgICAgICAvLyBlaXRoZXIgYW4gYXJyYXkgb2YgcmVzb3VyY2VzIG9yIGp1c3Qgb25lIHJlc291cmNlIGlzIGdpdmVuXG4gICAgICAgIGlmIChyZXNvdXJjZXNHcmFwaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBhbiBhcnJheSBvZiByZXNvdXJjZXNcbiAgICAgICAgICAgIG51bWJlck9mUmVzb3VyY2VzID0gcmVzb3VyY2VzR3JhcGgubGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlSlNPTkxEIG9mIHJlc291cmNlc0dyYXBoKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhyZXNvdXJjZXNSZXNwb25zZUpTT05MRCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgYW5zd2VyLCBubyByZXNvdXJjZXMgZ2l2ZW5cbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICBudW1iZXJPZlJlc291cmNlcyA9IDE7XG5cbiAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZTogUmVhZFJlc291cmNlID0gY29uc3RydWN0UmVhZFJlc291cmNlKHJlc291cmNlc1Jlc3BvbnNlSlNPTkxEKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgcmVzb3VyY2UgdG8gdGhlIHJlc291cmNlcyBhcnJheVxuICAgICAgICAgICAgICAgIHJlc291cmNlcy5wdXNoKHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUmVhZFJlc291cmNlc1NlcXVlbmNlKHJlc291cmNlcywgbnVtYmVyT2ZSZXNvdXJjZXMpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdHMgYWxsIHRoZSB0eXBlcyAoY2xhc3Nlcykgb2YgcmVmZXJyZWQgcmVzb3VyY2VzIGZyb20gYSBnaXZlbiByZXNvdXJjZSAoZnJvbSBpdHMgbGlua2luZyBwcm9wZXJ0aWVzKS5cbiAgICAgKiBFeHBlY3RzIEpTT04tTEQgd2l0aCBhbGwgSXJpcyBmdWxseSBleHBhbmRlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXNvdXJjZUpTT05MRCBKU09OLUxEIGRlc2NyaWJpbmcgb25lIHJlc291cmNlLlxuICAgICAqIEByZXR1cm4gc3RyaW5nW10gLSBhbiBBcnJheSBvZiByZXNvdXJjZSBjbGFzcyBJcmlzIChpbmNsdWRpbmcgZHVwbGljYXRlcykuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VKU09OTEQ6IG9iamVjdCk6IHN0cmluZ1tdIHtcblxuICAgICAgICBsZXQgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocmVzb3VyY2VKU09OTEQpO1xuICAgICAgICAvLyBmaWx0ZXIgb3V0IGV2ZXJ5dGhpbmcgdGhhdCBpcyBub3QgYSBLbm9yYSBwcm9wZXJ0eSBuYW1lXG4gICAgICAgIHByb3BOYW1lcyA9IHByb3BOYW1lcy5maWx0ZXIoZ2V0UHJvcGVydHlOYW1lcyk7XG5cbiAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgcHJvcE5hbWVzKSB7XG5cbiAgICAgICAgICAgIC8vIHNldmVyYWwgdmFsdWVzIGdpdmVuIGZvciB0aGlzIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXNvdXJjZUpTT05MRFtwcm9wXSkpIHtcblxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcmVmZXJyZWRSZXMgb2YgcmVzb3VyY2VKU09OTERbcHJvcF0pIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYSBMaW5rVmFsdWUgYW5kIGl0IGNvbnRhaW5zIGFuIGVtYmVkZGVkIHJlc291cmNlLCBnZXQgaXRzIHR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzVGFyZ2V0XSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCByZXNvdXJjZSBpcyByZXByZXNlbnRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZWZlcnJlZFJlc1tLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzWydAdHlwZSddID09PSBLbm9yYUNvbnN0YW50cy5MaW5rVmFsdWUgJiYgcmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzLnB1c2gocmVmZXJyZWRSZXNbS25vcmFDb25zdGFudHMubGlua1ZhbHVlSGFzU291cmNlXVsnQHR5cGUnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSBvbmUgdmFsdWUgZ2l2ZW4gZm9yIHRoaXMgcHJvcGVydHlcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBhIExpbmtWYWx1ZSBhbmQgaXQgY29udGFpbnMgYW4gZW1iZWRkZWQgcmVzb3VyY2UsIGdldCBpdHMgdHlwZVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VKU09OTERbcHJvcF1bJ0B0eXBlJ11cbiAgICAgICAgICAgICAgICAgICAgPT09IEtub3JhQ29uc3RhbnRzLkxpbmtWYWx1ZSAmJiByZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdXG4gICAgICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNUYXJnZXRdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUpTT05MRFtwcm9wXVsnQHR5cGUnXVxuICAgICAgICAgICAgICAgICAgICA9PT0gS25vcmFDb25zdGFudHMuTGlua1ZhbHVlICYmIHJlc291cmNlSlNPTkxEW3Byb3BdW0tub3JhQ29uc3RhbnRzLmxpbmtWYWx1ZUhhc1NvdXJjZV1cbiAgICAgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb3VyY2UgcmVzb3VyY2UgaXMgcmVwcmVzZW50ZWRcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFtwcm9wXVtLbm9yYUNvbnN0YW50cy5saW5rVmFsdWVIYXNTb3VyY2VdWydAdHlwZSddKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZWZlcnJlZFJlc291cmNlQ2xhc3NlcztcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlc291cmNlIHR5cGVzIChjbGFzc2VzKSBmcm9tIGEgSlNPTi1MRCByZXByZXNlbnRpbmcgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMuXG4gICAgICogRXhwZWN0cyBKU09OLUxEIHdpdGggYWxsIElyaXMgZnVsbHkgZXhwYW5kZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTEQgYSBzZXF1ZW5jZSBvZiByZXNvdXJjZXMsIHJlcHJlc2VudGVkIGFzIGEgSlNPTi1MRCBvYmplY3QuXG4gICAgICogQHJldHVybnMgc3RyaW5nW10gLSB0aGUgcmVzb3VyY2UgY2xhc3MgSXJpcyAod2l0aG91dCBkdXBsaWNhdGVzKS5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UmVzb3VyY2VDbGFzc2VzRnJvbUpzb25MRChyZXNvdXJjZXNSZXNwb25zZUpTT05MRDogb2JqZWN0KTogc3RyaW5nW10ge1xuXG4gICAgICAgIGNvbnN0IHJlc291cmNlc0dyYXBoID0gcmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0BncmFwaCddO1xuICAgICAgICBsZXQgcmVzb3VyY2VDbGFzc2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgICAgLy8gZWl0aGVyIGFuIGFycmF5IG9mIHJlc291cmNlcyBvciBqdXN0IG9uZSByZXNvdXJjZSBpcyBnaXZlblxuICAgICAgICBpZiAocmVzb3VyY2VzR3JhcGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gYW4gYXJyYXkgb2YgcmVzb3VyY2VzXG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcmVzb3VyY2VKU09OTEQgb2YgcmVzb3VyY2VzR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAvLyBnZXQgY2xhc3Mgb2YgdGhlIGN1cnJlbnQgcmVzb3VyY2VcbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMucHVzaChyZXNvdXJjZUpTT05MRFsnQHR5cGUnXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNsYXNzZXMgb2YgcmVmZXJyZWQgcmVzb3VyY2VzXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMgPSBnZXRSZWZlcnJlZFJlc291cmNlQ2xhc3NlcyhyZXNvdXJjZUpTT05MRCk7XG5cbiAgICAgICAgICAgICAgICByZXNvdXJjZUNsYXNzZXMgPSByZXNvdXJjZUNsYXNzZXMuY29uY2F0KHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvbmx5IG9uZSByZXNvdXJjZVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzLnB1c2gocmVzb3VyY2VzUmVzcG9uc2VKU09OTERbJ0B0eXBlJ10pO1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjbGFzc2VzIG9mIHJlZmVycmVkIHJlc291cmNlc1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVycmVkUmVzb3VyY2VDbGFzc2VzID0gZ2V0UmVmZXJyZWRSZXNvdXJjZUNsYXNzZXMocmVzb3VyY2VzUmVzcG9uc2VKU09OTEQpO1xuXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VDbGFzc2VzID0gcmVzb3VyY2VDbGFzc2VzLmNvbmNhdChyZWZlcnJlZFJlc291cmNlQ2xhc3Nlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaWx0ZXIgb3V0IGR1cGxpY2F0ZXNcbiAgICAgICAgcmV0dXJuIHJlc291cmNlQ2xhc3Nlcy5maWx0ZXIoVXRpbHMuZmlsdGVyT3V0RHVwbGljYXRlcyk7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyBhIEpTT04tTEQgcmVzcG9uc2UgdG8gYSBjb3VudCBxdWVyeSBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqIEV4cGVjdHMgSlNPTi1MRCB3aXRoIGFsbCBJcmlzIGZ1bGx5IGV4cGFuZGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50UXVlcnlKU09OTERcbiAgICAgKiBAcmV0dXJucyB7Q291bnRRdWVyeVJlc3VsdH1cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQ291bnRRdWVyeVJlc3VsdChjb3VudFF1ZXJ5SlNPTkxEOiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb3VudFF1ZXJ5UmVzdWx0KGNvdW50UXVlcnlKU09OTERbS25vcmFDb25zdGFudHMuc2NoZW1hTnVtYmVyT2ZJdGVtc10pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlRXJyb3IsIEFwaVNlcnZpY2VSZXN1bHQsIEt1aUNvcmVDb25maWcsIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZSB9IGZyb20gJy4uLy4uL2RlY2xhcmF0aW9ucyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgT250b2xvZ3lDYWNoZVNlcnZpY2UsIE9udG9sb2d5SW5mb3JtYXRpb24gfSBmcm9tICcuL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlcXVlc3RzIHJlcHJlc2VudGF0aW9uIG9mIHJlc291cmNlcyBmcm9tIEtub3JhLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgICAgQEluamVjdCgnY29uZmlnJykgcHVibGljIGNvbmZpZzogS3VpQ29yZUNvbmZpZyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9vbnRvbG9neUNhY2hlU2VydmljZTogT250b2xvZ3lDYWNoZVNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoaHR0cCwgY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHaXZlbiB0aGUgSXJpLCByZXF1ZXN0cyB0aGUgcmVwcmVzZW50YXRpb24gb2YgYSByZXNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgSXJpIG9mIHRoZSByZXNvdXJjZSAobm90IHlldCBVUkwgZW5jb2RlZCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGdldFJlc291cmNlKGlyaSk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdCB8IEFwaVNlcnZpY2VFcnJvcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIElyaSwgcmVxdWVzdHMgdGhlIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzb3VyY2UgYXMgYSBgUmVhZFJlc291cmNlU2VxdWVuY2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSBJcmkgb2YgdGhlIHJlc291cmNlIChub3QgeWV0IFVSTCBlbmNvZGVkKS5cbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT59XG4gICAgICovXG4gICAgZ2V0UmVhZFJlc291cmNlKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfCBBcGlTZXJ2aWNlRXJyb3I+IHtcbiAgICAgICAgY29uc3QgcmVzOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQgfCBBcGlTZXJ2aWNlRXJyb3I+ID0gdGhpcy5odHRwR2V0KCcvdjIvcmVzb3VyY2VzLycgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG5cbiAgICAgICAgLy8gVE9ETzogaGFuZGxlIGNhc2Ugb2YgYW4gQXBpU2VydmljZUVycm9yXG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3b3VsZCByZXR1cm4gYW4gT2JzZXJ2YWJsZSBvZiBhIFByb21pc2VPYnNlcnZhYmxlIC0+IGNvbWJpbmUgdGhlbSBpbnRvIG9uZSBPYnNlcnZhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIE9ic2VydmFibGUgb2YgUmVhZFJlc291cmNlc1NlcXVlbmNlXG4gICAgICAgICAgICAgICAgKHJlc291cmNlUmVzcG9uc2U6IG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IEpTT04tTEQgaW50byBhIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc1NlcTogUmVhZFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neUNhY2hlU2VydmljZS5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHBvc3QsIHB1dCwgZGVsZXRlXG59XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVzdWx0LCBDb3VudFF1ZXJ5UmVzdWx0LCBLdWlDb3JlQ29uZmlnLCBSZWFkUmVzb3VyY2VzU2VxdWVuY2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuaW1wb3J0IHsgQ29udmVydEpTT05MRCB9IGZyb20gJy4vY29udmVydC1qc29ubGQnO1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9udG9sb2d5Q2FjaGVTZXJ2aWNlLCBPbnRvbG9neUluZm9ybWF0aW9uIH0gZnJvbSAnLi9vbnRvbG9neS1jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7SHR0cENsaWVudCwgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vKipcbiAqIFBlcmZvcm1zIHNlYXJjaGVzIChmdWxsdGV4dCBvciBleHRlbmRlZCkgYW5kIHNlYXJjaCBjb3VudCBxdWVyaWVzIGludG8gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LFxuICAgICAgICAgICAgICAgIEBJbmplY3QoJ2NvbmZpZycpIHB1YmxpYyBjb25maWc6IEt1aUNvcmVDb25maWcsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfb250b2xvZ3lDYWNoZVNlcnZpY2U6IE9udG9sb2d5Q2FjaGVTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKGh0dHAsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBKU09OLUxEIG9iamVjdCB0byBhIGBSZWFkUmVzb3JjZVNlcXVlbmNlYC5cbiAgICAgKiBUbyBiZSBwYXNzZWQgYXMgYSBmdW5jdGlvbiBwb2ludGVyIChhcnJvdyBub3RhdGlvbiByZXF1aXJlZCkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcmVzb3VyY2VSZXNwb25zZVxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT59XG4gICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZTogKHJlc291cmNlUmVzcG9uc2U6IE9iamVjdCkgPT4gT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+ID0gKHJlc291cmNlUmVzcG9uc2U6IE9iamVjdCkgPT4ge1xuICAgICAgICAvLyBjb252ZXJ0IEpTT04tTEQgaW50byBhIFJlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgIGNvbnN0IHJlc1NlcTogUmVhZFJlc291cmNlc1NlcXVlbmNlID0gQ29udmVydEpTT05MRC5jcmVhdGVSZWFkUmVzb3VyY2VzU2VxdWVuY2VGcm9tSnNvbkxEKHJlc291cmNlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIGNvbGxlY3QgcmVzb3VyY2UgY2xhc3MgSXJpc1xuICAgICAgICBjb25zdCByZXNvdXJjZUNsYXNzSXJpczogc3RyaW5nW10gPSBDb252ZXJ0SlNPTkxELmdldFJlc291cmNlQ2xhc3Nlc0Zyb21Kc29uTEQocmVzb3VyY2VSZXNwb25zZSk7XG5cbiAgICAgICAgLy8gcmVxdWVzdCBpbmZvcm1hdGlvbiBhYm91dCByZXNvdXJjZSBjbGFzc2VzXG4gICAgICAgIHJldHVybiB0aGlzLl9vbnRvbG9neUNhY2hlU2VydmljZS5nZXRSZXNvdXJjZUNsYXNzRGVmaW5pdGlvbnMocmVzb3VyY2VDbGFzc0lyaXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgKG9udG9JbmZvOiBPbnRvbG9neUluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBvbnRvbG9neSBpbmZvcm1hdGlvbiB0byBSZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICByZXNTZXEub250b2xvZ3lJbmZvcm1hdGlvbi51cGRhdGVPbnRvbG9neUluZm9ybWF0aW9uKG9udG9JbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1NlcTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGEgZnVsbHRleHQgc2VhcmNoLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0Z1bGxUZXh0U2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybSB0aGUgdGVybSB0byBzZWFyY2ggZm9yLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChmb3IgcGFnaW5nLCBmaXJzdCBvZmZzZXQgaXMgMCkuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbHRleHRTZWFyY2goc2VhcmNoVGVybTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5zZXQoJ29mZnNldCcsIG9mZnNldC50b1N0cmluZygpKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoLycgKyBzZWFyY2hUZXJtLCBodHRwUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgKGZvciBwYWdpbmcsIGZpcnN0IG9mZnNldCBpcyAwKS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsVGV4dFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNlYXJjaFRlcm06IHN0cmluZywgb2Zmc2V0OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdvZmZzZXQnLCBvZmZzZXQudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgY29uc3QgcmVzOiBPYnNlcnZhYmxlPGFueT4gPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvJyArIHNlYXJjaFRlcm0sIGh0dHBQYXJhbXMpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBPYnNlcnZhYmxlIG9mIFJlYWRSZXNvdXJjZXNTZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHRoaXMuY29udmVydEpTT05MRFRvUmVhZFJlc291cmNlU2VxdWVuY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGZ1bGx0ZXh0IHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9GdWxsVGV4dFNlYXJjaENvdW50UXVlcnlDb3VudFF1ZXJ5UmVzdWx0YCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnkoc2VhcmNoVGVybTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2hDb3VudFF1ZXJ5JykpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YyL3NlYXJjaC9jb3VudC8nICsgc2VhcmNoVGVybSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYSBmdWxsdGV4dCBzZWFyY2ggY291bnQgcXVlcnkgYW5kIHR1cm5zIHRoZSByZXN1bHQgaW50byBhIGBDb3VudFF1ZXJ5UmVzdWx0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxDb3VudFF1ZXJ5UmVzdWx0PlxuICAgICAqL1xuICAgIGRvRnVsbFRleHRTZWFyY2hDb3VudFF1ZXJ5Q291bnRRdWVyeVJlc3VsdChzZWFyY2hUZXJtOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFRlcm0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIHNlYXJjaCB0ZXJtIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9GdWxsdGV4dFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBHZXQoJy92Mi9zZWFyY2gvY291bnQvJyArIHNlYXJjaFRlcm0pO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICAgICAqIFRPRE86IG1hcmsgYXMgZGVwcmVjYXRlZCwgdXNlIG9mIGBkb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2VgIHJlY29tbWVuZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZ3JhdnNlYXJjaFF1ZXJ5IHRoZSBTcGFycWwgcXVlcnkgc3RyaW5nIHRvIGJlIHNlbnQgdG8gS25vcmEuXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxBcGlTZXJ2aWNlUmVzdWx0PlxuICAgICAqL1xuICAgIGRvRXh0ZW5kZWRTZWFyY2goZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBncmF2c2VhcmNoUXVlcnkgdGhlIFNwYXJxbCBxdWVyeSBzdHJpbmcgdG8gYmUgc2VudCB0byBLbm9yYS5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlKGdyYXZzZWFyY2hRdWVyeTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlcyA9IHRoaXMuaHR0cFBvc3QoJy92Mi9zZWFyY2hleHRlbmRlZCcsIGdyYXZzZWFyY2hRdWVyeSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcy5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzSlNPTkxEXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbWVyZ2VNYXAoXG4gICAgICAgICAgICAgICAgdGhpcy5jb252ZXJ0SlNPTkxEVG9SZWFkUmVzb3VyY2VTZXF1ZW5jZVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeS5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgZG9FeHRlbmRlZFNlYXJjaFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeShncmF2c2VhcmNoUXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChncmF2c2VhcmNoUXVlcnkgPT09IHVuZGVmaW5lZCB8fCBncmF2c2VhcmNoUXVlcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIuZXJyb3IoJ05vIFNwYXJxbCBzdHJpbmcgZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGV4dGVuZGVkIHNlYXJjaCBjb3VudCBxdWVyeSBhbmQgdHVybnMgdGhlIHJlc3VsdCBpbnRvIGEgYENvdW50UXVlcnlSZXN1bHRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIGdyYXZzZWFyY2hRdWVyeSB0aGUgU3BhcnFsIHF1ZXJ5IHN0cmluZyB0byBiZSBzZW50IHRvIEtub3JhLlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBkb0V4dGVuZGVkU2VhcmNoQ291bnRRdWVyeUNvdW50UXVlcnlSZXN1bHQoZ3JhdnNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvdW50UXVlcnlSZXN1bHQ+IHtcblxuICAgICAgICBpZiAoZ3JhdnNlYXJjaFF1ZXJ5ID09PSB1bmRlZmluZWQgfHwgZ3JhdnNlYXJjaFF1ZXJ5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBTcGFycWwgc3RyaW5nIGdpdmVuIGZvciBjYWxsIG9mIFNlYXJjaFNlcnZpY2UuZG9FeHRlbmRlZFNlYXJjaENvdW50UXVlcnknKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXMgPSB0aGlzLmh0dHBQb3N0KCcvdjIvc2VhcmNoZXh0ZW5kZWQvY291bnQnLCBncmF2c2VhcmNoUXVlcnkpO1xuXG4gICAgICAgIHJldHVybiByZXMucGlwZShcbiAgICAgICAgICAgIG1lcmdlTWFwKFxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd291bGQgcmV0dXJuIGFuIE9ic2VydmFibGUgb2YgYSBQcm9taXNlT2JzZXJ2YWJsZSAtPiBjb21iaW5lIHRoZW0gaW50byBvbmUgT2JzZXJ2YWJsZVxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc0pTT05MRFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1hcChcbiAgICAgICAgICAgICAgICAvLyBjb252ZXJ0IHRvIGEgYENvdW50UXVlcnlSZXN1bHRgXG4gICAgICAgICAgICAgICAgQ29udmVydEpTT05MRC5jcmVhdGVDb3VudFF1ZXJ5UmVzdWx0XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIHNlYXJjaCBieSBhIHJlc291cmNlJ3MgcmRmczpsYWJlbC5cbiAgICAgKiBUT0RPOiBtYXJrIGFzIGRlcHJlY2F0ZWQsIHVzZSBvZiBgc2VhcmNoQnlMYWJlbFJlYWRSZXNvdXJjZVNlcXVlbmNlYCByZWNvbW1lbmRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRlcm0gdGhlIHRlcm0gdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Jlc291cmNlQ2xhc3NJUkldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiByZXNvdXJjZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb2plY3RJcmldIHJlc3RyaWN0IHNlYXJjaCB0byBnaXZlbiBwcm9qZWN0LlxuICAgICAqIEByZXR1cm5zIE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD5cbiAgICAgKi9cbiAgICBzZWFyY2hCeUxhYmVsKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8QXBpU2VydmljZVJlc3VsdD4ge1xuXG4gICAgICAgIGlmIChzZWFyY2hUZXJtID09PSB1bmRlZmluZWQgfHwgc2VhcmNoVGVybS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShvYnNlcnZlciA9PiBvYnNlcnZlci5lcnJvcignTm8gc2VhcmNoIHRlcm0gZ2l2ZW4gZm9yIGNhbGwgb2YgU2VhcmNoU2VydmljZS5kb0Z1bGx0ZXh0U2VhcmNoJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuXG4gICAgICAgIGlmIChyZXNvdXJjZUNsYXNzSVJJICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Jlc291cmNlQ2xhc3MnLCByZXNvdXJjZUNsYXNzSVJJKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9qZWN0SXJpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCgnbGltaXRUb1Byb2plY3QnLCBwcm9qZWN0SXJpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHBHZXQoKSBleHBlY3RzIG9ubHkgb25lIGFyZ3VtZW50LCBub3QgMlxuICAgICAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBodHRwUGFyYW1zKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYSBzZWFyY2ggYnkgYSByZXNvdXJjZSdzIHJkZnM6bGFiZWwgYW5kIHR1cm5zIHRoZSByZXN1bHRzIGluIGEgYFJlYWRSZXNvdXJjZVNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2hUZXJtIHRoZSB0ZXJtIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtyZXNvdXJjZUNsYXNzSVJJXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcmVzb3VyY2UgY2xhc3MuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtwcm9qZWN0SXJpXSByZXN0cmljdCBzZWFyY2ggdG8gZ2l2ZW4gcHJvamVjdC5cbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPEFwaVNlcnZpY2VSZXN1bHQ+XG4gICAgICovXG4gICAgc2VhcmNoQnlMYWJlbFJlYWRSZXNvdXJjZVNlcXVlbmNlKHNlYXJjaFRlcm06IHN0cmluZywgcmVzb3VyY2VDbGFzc0lSST86IHN0cmluZywgcHJvamVjdElyaT86IHN0cmluZyk6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG5cbiAgICAgICAgaWYgKHNlYXJjaFRlcm0gPT09IHVuZGVmaW5lZCB8fCBzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IG9ic2VydmVyLmVycm9yKCdObyBzZWFyY2ggdGVybSBnaXZlbiBmb3IgY2FsbCBvZiBTZWFyY2hTZXJ2aWNlLmRvRnVsbHRleHRTZWFyY2gnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG5cbiAgICAgICAgaWYgKHJlc291cmNlQ2xhc3NJUkkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUmVzb3VyY2VDbGFzcycsIHJlc291cmNlQ2xhc3NJUkkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb2plY3RJcmkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KCdsaW1pdFRvUHJvamVjdCcsIHByb2plY3RJcmkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzID0gdGhpcy5odHRwR2V0KCcvdjIvc2VhcmNoYnlsYWJlbC8nICsgZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFRlcm0pLCBodHRwUGFyYW1zKTtcblxuICAgICAgICByZXR1cm4gcmVzLnBpcGUoXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NKU09OTERcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBtZXJnZU1hcChcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnZlcnRKU09OTERUb1JlYWRSZXNvdXJjZVNlcXVlbmNlXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4vc2VhcmNoLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVhZFJlc291cmNlc1NlcXVlbmNlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcblxuLyoqXG4gKiBSZXF1ZXN0cyBpbmNvbWluZyBpbmZvcm1hdGlvbiAocmVnaW9ucywgbGlua3MsIHN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMpIGZyb20gS25vcmEuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEluY29taW5nU2VydmljZSBleHRlbmRzIFNlYXJjaFNlcnZpY2Uge1xuXG4gICAgLyoqXG4gICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyByZWdpb25zIGZvciBhIHBhcnRpY3VsYXIgcmVzb3VyY2UuXG4gICAgKlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSVJJIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIEluY29taW5nIHJlZ2lvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCB0aGUgb2Zmc2V0IHRvIGJlIHVzZWQgZm9yIHBhZ2luZy4gMCBpcyB0aGUgZGVmYXVsdCBhbmQgaXMgdXNlZCB0byBnZXQgdGhlIGZpcnN0IHBhZ2Ugb2YgcmVzdWx0cy5cbiAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgKi9cbiAgICBnZXRJbmNvbWluZ1JlZ2lvbnMocmVzb3VyY2VJUkk6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpOiBPYnNlcnZhYmxlPFJlYWRSZXNvdXJjZXNTZXF1ZW5jZT4ge1xuICAgICAgICBjb25zdCBzcGFycWxRdWVyeVN0ciA9IGBcblBSRUZJWCBrbm9yYS1hcGk6IDxodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvc2ltcGxlL3YyIz5cblxuQ09OU1RSVUNUIHtcbj9yZWdpb24ga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5cbj9yZWdpb24ga25vcmEtYXBpOmhhc0NvbW1lbnQgP2NvbW1lbnQgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNDb2xvciA/Y29sb3IgLlxufSBXSEVSRSB7XG4/cmVnaW9uIGEga25vcmEtYXBpOlJlZ2lvbiAuXG4/cmVnaW9uIGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aXNSZWdpb25PZiA8JHtyZXNvdXJjZUlSSX0+IC5cbmtub3JhLWFwaTppc1JlZ2lvbk9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbjwke3Jlc291cmNlSVJJfT4gYSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG4/cmVnaW9uIGtub3JhLWFwaTpoYXNHZW9tZXRyeSA/Z2VvbSAuXG5rbm9yYS1hcGk6aGFzR2VvbWV0cnkga25vcmEtYXBpOm9iamVjdFR5cGUga25vcmEtYXBpOkdlb20gLlxuXG4/Z2VvbSBhIGtub3JhLWFwaTpHZW9tIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29tbWVudCA/Y29tbWVudCAuXG5rbm9yYS1hcGk6aGFzQ29tbWVudCBrbm9yYS1hcGk6b2JqZWN0VHlwZSB4c2Q6c3RyaW5nIC5cblxuP2NvbW1lbnQgYSB4c2Q6c3RyaW5nIC5cblxuP3JlZ2lvbiBrbm9yYS1hcGk6aGFzQ29sb3IgP2NvbG9yIC5cbmtub3JhLWFwaTpoYXNDb2xvciBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6Q29sb3IgLlxuXG4/Y29sb3IgYSBrbm9yYS1hcGk6Q29sb3IgLlxufSBPRkZTRVQgJHtvZmZzZXR9XG5gO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3BhcnFsUXVlcnlTdHIgJywgc3BhcnFsUXVlcnlTdHIpO1xuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGZvciB0aGUgZ2l2ZW4gcmVzb3VyY2UsIGlmIGFueS5cbiAgICAgKiBTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zIGxpbmsgdG8gdGhlIGdpdmVuIHJlc291cmNlIHZpYSBrbm9yYS1iYXNlOmlzUGFydE9mLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIFN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbnMgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIGZvciBwYWdpbmcuIDAgaXMgdGhlIGRlZmF1bHQgYW5kIGlzIHVzZWQgdG8gZ2V0IHRoZSBmaXJzdCBwYWdlIG9mIHJlc3VsdHMuXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRTdGlsbEltYWdlUmVwcmVzZW50YXRpb25zRm9yQ29tcG91bmRSZXNvdXJjZShyZXNvdXJjZUlyaTogc3RyaW5nLCBvZmZzZXQ6IG51bWJlcik6IE9ic2VydmFibGU8UmVhZFJlc291cmNlc1NlcXVlbmNlPiB7XG4gICAgICAgIGNvbnN0IHNwYXJxbFF1ZXJ5U3RyID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuXG5DT05TVFJVQ1Qge1xuP3BhZ2Uga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/cGFnZSBrbm9yYS1hcGk6c2VxbnVtID9zZXFudW0gLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxufSBXSEVSRSB7XG5cbj9wYWdlIGEga25vcmEtYXBpOlN0aWxsSW1hZ2VSZXByZXNlbnRhdGlvbiAuXG4/cGFnZSBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9wYWdlIGtub3JhLWFwaTppc1BhcnRPZiA8JHtyZXNvdXJjZUlyaX0+IC5cbmtub3JhLWFwaTppc1BhcnRPZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP3BhZ2Uga25vcmEtYXBpOnNlcW51bSA/c2VxbnVtIC5cbmtub3JhLWFwaTpzZXFudW0ga25vcmEtYXBpOm9iamVjdFR5cGUgeHNkOmludGVnZXIgLlxuXG4/c2VxbnVtIGEgeHNkOmludGVnZXIgLlxuXG4/cGFnZSBrbm9yYS1hcGk6aGFzU3RpbGxJbWFnZUZpbGUgP2ZpbGUgLlxua25vcmEtYXBpOmhhc1N0aWxsSW1hZ2VGaWxlIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpGaWxlIC5cblxuP2ZpbGUgYSBrbm9yYS1hcGk6RmlsZSAuXG5cbn0gT1JERVIgQlkgP3NlcW51bVxuT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCBpbmNvbWluZyBsaW5rcyBmb3IgdGhlIGdpdmVuIHJlc291cmNlIElyaSBidXQgaW5jb21pbmcgcmVnaW9ucyBhbmQgc3RpbGwgaW1hZ2UgcmVwcmVzZW50YXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHdob3NlIGluY29taW5nIGxpbmtzIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IHRoZSBvZmZzZXQgdG8gYmUgdXNlZCBmb3IgcGFnaW5nLiAwIGlzIHRoZSBkZWZhdWx0IGFuZCBpcyB1c2VkIHRvIGdldCB0aGUgZmlyc3QgcGFnZSBvZiByZXN1bHRzLlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gICAgZ2V0SW5jb21pbmdMaW5rc0ZvclJlc291cmNlKHJlc291cmNlSXJpOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogT2JzZXJ2YWJsZTxSZWFkUmVzb3VyY2VzU2VxdWVuY2U+IHtcbiAgICAgICAgY29uc3Qgc3BhcnFsUXVlcnlTdHIgPSBgXG5QUkVGSVgga25vcmEtYXBpOiA8aHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3NpbXBsZS92MiM+XG5cbkNPTlNUUlVDVCB7XG4/aW5jb21pbmdSZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4/aW5jb21pbmdSZXMgP2luY29taW5nUHJvcCA8JHtyZXNvdXJjZUlyaX0+IC5cblxufSBXSEVSRSB7XG5cbj9pbmNvbWluZ1JlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbj9pbmNvbWluZ1JlcyA/aW5jb21pbmdQcm9wIDwke3Jlc291cmNlSXJpfT4gLlxuXG48JHtyZXNvdXJjZUlyaX0+IGEga25vcmEtYXBpOlJlc291cmNlIC5cblxuP2luY29taW5nUHJvcCBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxuXG5rbm9yYS1hcGk6aXNSZWdpb25PZiBrbm9yYS1hcGk6b2JqZWN0VHlwZSBrbm9yYS1hcGk6UmVzb3VyY2UgLlxua25vcmEtYXBpOmlzUGFydE9mIGtub3JhLWFwaTpvYmplY3RUeXBlIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbkZJTFRFUiBOT1QgRVhJU1RTIHtcbiA/aW5jb21pbmdSZXMgIGtub3JhLWFwaTppc1JlZ2lvbk9mIDwke3Jlc291cmNlSXJpfT4gLlxufVxuXG5GSUxURVIgTk9UIEVYSVNUUyB7XG4gP2luY29taW5nUmVzICBrbm9yYS1hcGk6aXNQYXJ0T2YgPCR7cmVzb3VyY2VJcml9PiAuXG59XG5cbn0gT0ZGU0VUICR7b2Zmc2V0fVxuYDtcblxuICAgICAgICByZXR1cm4gdGhpcy5kb0V4dGVuZGVkU2VhcmNoUmVhZFJlc291cmNlU2VxdWVuY2Uoc3BhcnFsUXVlcnlTdHIpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAqL1xuZXhwb3J0IGNsYXNzIEV4dGVuZGVkU2VhcmNoUGFyYW1zIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGdlbmVyYXRlR3JhdnNlYXJjaCBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeS5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHRha2VzIHRoZSBvZmZzZXRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIGEgcGFyYW1ldGVyIGFuZCByZXR1cm5zIGEgR3JhdnNlYXJjaCBxdWVyeSBzdHJpbmcuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBSZXR1cm5zIGZhbHNlIGlmIG5vdCBzZXQgY29ycmVjdGx5IChpbml0IHN0YXRlKS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZ2VuZXJhdGVHcmF2c2VhcmNoOiAob2Zmc2V0OiBudW1iZXIpID0+IHN0cmluZyB8IGJvb2xlYW4pIHtcblxuICAgIH1cblxufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuLyoqXG4gKiBUZW1wb3JhcmlseSBzdG9yZXMgdGhlIHBhcmFtZXRlcnMgb2YgYW4gZXh0ZW5kZWQgc2VhcmNoLlxuICovXG5leHBvcnQgY2xhc3MgU2VhcmNoUGFyYW1zU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50U2VhcmNoUGFyYW1zO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIGluaXQgd2l0aCBhIGR1bW15IGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBmYWxzZVxuICAgICAgICAvLyBpZiB0aGUgYXBwbGljYXRpb24gaXMgcmVsb2FkZWQsIHRoaXMgd2lsbCBiZSByZXR1cm5lZFxuICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFeHRlbmRlZFNlYXJjaFBhcmFtcz4obmV3IEV4dGVuZGVkU2VhcmNoUGFyYW1zKChvZmZzZXQ6IG51bWJlcikgPT4gZmFsc2UpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXh0ZW5kZWRTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBjaGFuZ2VTZWFyY2hQYXJhbXNNc2coc2VhcmNoUGFyYW1zOiBFeHRlbmRlZFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jdXJyZW50U2VhcmNoUGFyYW1zLm5leHQoc2VhcmNoUGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBzZWFyY2ggcGFyYW1zIG9mIGFuIGV4dGVuZGVkIHNlYXJjaC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEV4dGVuZGVkU2VhcmNoUGFyYW1zIC0gc2VhcmNoIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBnZXRTZWFyY2hQYXJhbXMoKTogRXh0ZW5kZWRTZWFyY2hQYXJhbXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFNlYXJjaFBhcmFtcy5nZXRWYWx1ZSgpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXh0ZW5kZWRTZWFyY2hQYXJhbXMsIFNlYXJjaFBhcmFtc1NlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC1wYXJhbXMuc2VydmljZSc7XG5pbXBvcnQgeyBLbm9yYUNvbnN0YW50cywgS25vcmFTY2hlbWEsIFV0aWxzIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zJztcbmltcG9ydCB7IFByb3BlcnR5V2l0aFZhbHVlIH0gZnJvbSAnLi4vLi4vZGVjbGFyYXRpb25zL2FwaS9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEBpZ25vcmVcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgdGhhdCBvY2N1cnJlZCB3aGVuIGdlbmVyYXRpbmcgS25hclFMLlxuICovXG5jbGFzcyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXG4gICAgY29uc3RydWN0b3IobXNnOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIEdyYXZTZWFyY2ggcXVlcmllcyBmcm9tIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlIHtcblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKlxuICAgICAqIE1hcCBvZiBjb21wbGV4IGtub3JhLWFwaSB2YWx1ZSB0eXBlcyB0byBzaW1wbGUgb25lcy5cbiAgICAgKiBVc2UgY29tcHV0ZWQgcHJvcGVydHkgbmFtZTogaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC1pbml0aWFsaXplci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlID0ge1xuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0ludFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkSW50ZWdlcixcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNEZWNpbWFsVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2REZWNpbWFsLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0Jvb2xlYW5WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZEJvb2xlYW4sXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVGV4dFZhbHVlJzogS25vcmFDb25zdGFudHMueHNkU3RyaW5nLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0RhdGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmRhdGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjSW50ZXJ2YWxWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmludGVydmFsU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb21WYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb21TaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjQ29sb3JWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmNvbG9yU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0dlb25hbWVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmdlb25hbWVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjVXJpVmFsdWUnOiBLbm9yYUNvbnN0YW50cy54c2RVcmksXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjU3RpbGxJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNNb3ZpbmdJbWFnZUZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRERERmlsZVZhbHVlJzogS25vcmFDb25zdGFudHMuZmlsZVNpbXBsZSxcbiAgICAgICAgJ2h0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS92MiNBdWRpb0ZpbGVWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLmZpbGVTaW1wbGUsXG4gICAgICAgICdodHRwOi8vYXBpLmtub3JhLm9yZy9vbnRvbG9neS9rbm9yYS1hcGkvdjIjRG9jdW1lbnRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI1RleHRGaWxlVmFsdWUnOiBLbm9yYUNvbnN0YW50cy5maWxlU2ltcGxlLFxuICAgICAgICAnaHR0cDovL2FwaS5rbm9yYS5vcmcvb250b2xvZ3kva25vcmEtYXBpL3YyI0xpc3RWYWx1ZSc6IEtub3JhQ29uc3RhbnRzLnhzZFN0cmluZ1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZWFyY2hQYXJhbXNTZXJ2aWNlOiBTZWFyY2hQYXJhbXNTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIENvbnZlcnRzIGEgY29tcGxleCB0eXBlIElyaSB0byBhIHNpbXBsZSB0eXBlIElyaS5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcGxleFR5cGUgdGhlIElyaSBvZiBhIHZhbHVlIHR5cGUgKGtub3JhLWFwaSBjb21wbGV4KS5cbiAgICAgICAqIEByZXR1cm5zIHN0cmluZyAtIHRoZSBjb3JyZXNwb25kaW5nIElyaSBvZiB0aGUgc2ltcGxlIHR5cGUgKGtub3JhLWFwaSBzaW1wbGUpLlxuICAgICAgICovXG4gICAgcHJpdmF0ZSBjb252ZXJ0Q29tcGxleFR5cGVUb1NpbXBsZVR5cGUoY29tcGxleFR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG5cbiAgICAgICAgY29uc3Qgc2ltcGxlVHlwZTogc3RyaW5nID0gR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLnR5cGVDb252ZXJzaW9uQ29tcGxleFRvU2ltcGxlW2NvbXBsZXhUeXBlXTtcblxuICAgICAgICBpZiAoc2ltcGxlVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2ltcGxlVHlwZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHcmF2c2VhcmNoR2VuZXJhdGlvbkVycm9yKGBjb21wbGV4IHR5cGUgJHtjb21wbGV4VHlwZX0gY291bGQgbm90IGJlIGNvbnZlcnRlZCB0byBzaW1wbGUgdHlwZS5gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgR3JhdnNlYXJjaCBxdWVyeSBmcm9tIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5V2l0aFZhbHVlW119IHByb3BlcnRpZXMgdGhlIHByb3BlcnRpZXMgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbWFpblJlc291cmNlQ2xhc3NPcHRpb25dIHRoZSBjbGFzcyBvZiB0aGUgbWFpbiByZXNvdXJjZSwgaWYgc3BlY2lmaWVkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgdGhlIG9mZnNldCB0byBiZSB1c2VkIChudGggcGFnZSBvZiByZXN1bHRzKS5cbiAgICAgKiBAcmV0dXJucyBzdHJpbmcgLSBhIEtuYXJRTCBxdWVyeSBzdHJpbmcuXG4gICAgICovXG4gICAgY3JlYXRlR3JhdnNlYXJjaFF1ZXJ5KHByb3BlcnRpZXM6IFByb3BlcnR5V2l0aFZhbHVlW10sIG1haW5SZXNvdXJjZUNsYXNzT3B0aW9uPzogc3RyaW5nLCBvZmZzZXQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xuXG4gICAgICAgIC8vIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgcmVzb3VyY2Ugc2VhcmNoZWQgZm9yXG4gICAgICAgIGxldCBtYWluUmVzb3VyY2VDbGFzcyA9ICcnO1xuXG4gICAgICAgIC8vIGlmIGdpdmVuLCBjcmVhdGUgdGhlIGNsYXNzIHJlc3RyaWN0aW9uIGZvciB0aGUgbWFpbiByZXNvdXJjZVxuICAgICAgICBpZiAobWFpblJlc291cmNlQ2xhc3NPcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbWFpblJlc291cmNlQ2xhc3MgPSBgP21haW5SZXMgYSA8JHtVdGlscy5jb252ZXJ0Q29tcGxleEtub3JhQXBpRW50aXR5SXJpdG9TaW1wbGUobWFpblJlc291cmNlQ2xhc3NPcHRpb24pfT4gLmA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcml0ZXJpYSBmb3IgdGhlIG9yZGVyIGJ5IHN0YXRlbWVudFxuICAgICAgICBjb25zdCBvcmRlckJ5Q3JpdGVyaWEgPSBbXTtcblxuICAgICAgICAvLyBzdGF0ZW1lbnRzIHRvIGJlIHJldHVybmVkIGluIHF1ZXJ5IHJlc3VsdHNcbiAgICAgICAgY29uc3QgcmV0dXJuU3RhdGVtZW50cyA9IFtdO1xuXG4gICAgICAgIC8vIGxvb3Agb3ZlciBnaXZlbiBwcm9wZXJ0aWVzIGFuZCBjcmVhdGUgc3RhdGVtZW50cyBhbmQgRmlsdGVycyBhbmQgdHlwZSBhbm5vdGF0aW9ucyBmcm9tIHRoZW1cbiAgICAgICAgY29uc3QgcHJvcHM6IHN0cmluZ1tdID0gcHJvcGVydGllcy5tYXAoXG4gICAgICAgICAgICAocHJvcFdpdGhWYWw6IFByb3BlcnR5V2l0aFZhbHVlLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wSXJpU2ltcGxlID0gVXRpbHMuY29udmVydENvbXBsZXhLbm9yYUFwaUVudGl0eUlyaXRvU2ltcGxlKHByb3BXaXRoVmFsLnByb3BlcnR5LmlkKTtcblxuICAgICAgICAgICAgICAgIGxldCBzaW1wbGVUeXBlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2ltcGxlVHlwZSA9IHRoaXMuY29udmVydENvbXBsZXhUeXBlVG9TaW1wbGVUeXBlKHByb3BXaXRoVmFsLnByb3BlcnR5Lm9iamVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbXBsZVR5cGUgPSBLbm9yYUNvbnN0YW50cy5yZXNvdXJjZVNpbXBsZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBvYmplY3Qgb2YgYSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgcHJvcFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICghcHJvcFdpdGhWYWwucHJvcGVydHkuaXNMaW5rUHJvcGVydHkgfHwgcHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci5nZXRDbGFzc05hbWUoKSA9PT0gJ0V4aXN0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgbm90IGEgbGlua2luZyBwcm9wZXJ0eSwgY3JlYXRlIGEgdmFyaWFibGUgZm9yIHRoZSB2YWx1ZSAodG8gYmUgdXNlZCBieSBhIHN1YnNlcXVlbnQgRklMVEVSKVxuICAgICAgICAgICAgICAgICAgICAvLyBPUiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBFeGlzdHMgaXMgdXNlZCBpbiB3aGljaCBjYXNlIHdlIGRvIG5vdCBuZWVkIHRvIHNwZWNpZnkgdGhlIG9iamVjdCBhbnkgZnVydGhlclxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBgP3Byb3BWYWwke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgaXMgYSBsaW5raW5nIHByb3BlcnR5IGFuZCB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRXhpc3RzLCB1c2UgaXRzIElSSVxuICAgICAgICAgICAgICAgICAgICBwcm9wVmFsdWUgPSBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZW5lcmF0ZSBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgc3RhdGVtZW50OiBzdHJpbmcgPSBgP21haW5SZXMgPCR7cHJvcElyaVNpbXBsZX0+ICR7cHJvcFZhbHVlfSAuYDtcblxuICAgICAgICAgICAgICAgIC8vIHR5cGUgYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVHlwZUFubm90YXRpb24gPSBgPCR7cHJvcElyaVNpbXBsZX0+IGtub3JhLWFwaTpvYmplY3RUeXBlIDwke3NpbXBsZVR5cGV9PiAuYDtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wVmFsdWVBbm5vdGF0aW9uID0gYCR7cHJvcFZhbHVlfSBhIDwke3NpbXBsZVR5cGV9PiAuYDtcblxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGEgbGlua2luZyBwcm9wZXJ0eSB0aGF0IGhhcyB0byBiZSB3cmFwcGVkIGluIGEgRklMVEVSIE5PVCBFWElTVFMgKGNvbXBhcmlzb24gb3BlcmF0b3IgTk9UX0VRVUFMUykgdG8gbmVnYXRlIGl0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLnByb3BlcnR5LmlzTGlua1Byb3BlcnR5ICYmIHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdOb3RFcXVhbHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBpbmNsdWRlIHN0YXRlbWVudCBpbiByZXN1bHRzLCBiZWNhdXNlIHRoZSBxdWVyeSBjaGVja3MgZm9yIHRoZSBhYnNlbmNlIG9mIHRoaXMgc3RhdGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBGSUxURVIgTk9UIEVYSVNUUyB7XG4ke3N0YXRlbWVudH1cbiR7cHJvcFR5cGVBbm5vdGF0aW9ufVxuJHtwcm9wVmFsdWVBbm5vdGF0aW9ufVxufWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgc3RhdGVtZW50IHNob3VsZCBiZSByZXR1cm5lZCByZXR1cm5lZCBpbiByZXN1bHRzIChCb29sZWFuIGZsYWcgZnJvbSBjaGVja2JveClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuU3RhdGVtZW50cy5wdXNoKHN0YXRlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudCA9IGBcbiR7c3RhdGVtZW50fVxuJHtwcm9wVHlwZUFubm90YXRpb259XG4ke3Byb3BWYWx1ZUFubm90YXRpb259XG5gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYXRlIGZpbHRlciBpZiBjb21wYXJpc29uIG9wZXJhdG9yIGlzIG5vdCBFeGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICAvLyBvbmx5IGNyZWF0ZSBhIEZJTFRFUiBpZiB0aGUgY29tcGFyaXNvbiBvcGVyYXRvciBpcyBub3QgRVhJU1RTIGFuZCBpdCBpcyBub3QgYSBsaW5raW5nIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wV2l0aFZhbC5wcm9wZXJ0eS5pc0xpbmtQcm9wZXJ0eSAmJiBwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpICE9PSAnRXhpc3RzJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwuY29tcGFyaXNvbk9wZXJhdG9yLmdldENsYXNzTmFtZSgpID09PSAnTGlrZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSByZWdleCBmdW5jdGlvbiBmb3IgTElLRVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0gYEZJTFRFUiByZWdleCgke3Byb3BWYWx1ZX0sICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLnZhbHVlLnRvU3BhcnFsKEtub3JhU2NoZW1hLnNpbXBsZSl9LCBcImlcIilgO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC5jb21wYXJpc29uT3BlcmF0b3IuZ2V0Q2xhc3NOYW1lKCkgPT09ICdNYXRjaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBjb250YWlucyBmdW5jdGlvbiBmb3IgTUFUQ0hcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIgPCR7S25vcmFDb25zdGFudHMubWF0Y2hGdW5jdGlvbn0+KCR7cHJvcFZhbHVlfSwgJHtwcm9wV2l0aFZhbC52YWx1ZUxpdGVyYWwudmFsdWUudG9TcGFycWwoS25vcmFTY2hlbWEuc2ltcGxlKX0pYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IGBGSUxURVIoJHtwcm9wVmFsdWV9ICR7cHJvcFdpdGhWYWwudmFsdWVMaXRlcmFsLmNvbXBhcmlzb25PcGVyYXRvci50eXBlfSAke3Byb3BXaXRoVmFsLnZhbHVlTGl0ZXJhbC52YWx1ZS50b1NwYXJxbChLbm9yYVNjaGVtYS5zaW1wbGUpfSlgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCB2YWx1ZSBpcyBhIHNvcnQgY3JpdGVyaW9uXG4gICAgICAgICAgICAgICAgaWYgKHByb3BXaXRoVmFsLmlzU29ydENyaXRlcmlvbikgb3JkZXJCeUNyaXRlcmlhLnB1c2gocHJvcFZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBgJHtzdGF0ZW1lbnR9XG4ke2ZpbHRlcn1cbmA7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBvcmRlckJ5U3RhdGVtZW50ID0gJyc7XG5cbiAgICAgICAgaWYgKG9yZGVyQnlDcml0ZXJpYS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmRlckJ5U3RhdGVtZW50ID0gYFxuT1JERVIgQlkgJHtvcmRlckJ5Q3JpdGVyaWEuam9pbignICcpfVxuYDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRlbXBsYXRlIG9mIHRoZSBLbmFyUUwgcXVlcnkgd2l0aCBkeW5hbWljIGNvbXBvbmVudHNcbiAgICAgICAgY29uc3QgZ3JhdnNlYXJjaFRlbXBsYXRlID0gYFxuUFJFRklYIGtub3JhLWFwaTogPGh0dHA6Ly9hcGkua25vcmEub3JnL29udG9sb2d5L2tub3JhLWFwaS9zaW1wbGUvdjIjPlxuQ09OU1RSVUNUIHtcblxuP21haW5SZXMga25vcmEtYXBpOmlzTWFpblJlc291cmNlIHRydWUgLlxuXG4ke3JldHVyblN0YXRlbWVudHMuam9pbignXFxuJyl9XG5cbn0gV0hFUkUge1xuXG4/bWFpblJlcyBhIGtub3JhLWFwaTpSZXNvdXJjZSAuXG5cbiR7bWFpblJlc291cmNlQ2xhc3N9XG5cbiR7cHJvcHMuam9pbignJyl9XG5cbn1cbiR7b3JkZXJCeVN0YXRlbWVudH1gO1xuXG4gICAgICAgIC8vIG9mZnNldCBjb21wb25lbnQgb2YgdGhlIEtuYXJRTCBxdWVyeVxuICAgICAgICBjb25zdCBvZmZzZXRUZW1wbGF0ZSA9IGBcbk9GRlNFVCAke29mZnNldH1cbmA7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIHNhbWUgS25hclFMIHF1ZXJ5IHdpdGggdGhlIGdpdmVuIG9mZnNldFxuICAgICAgICBjb25zdCBnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQgPSAobG9jYWxPZmZzZXQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXRDdXN0b21UZW1wbGF0ZSA9IGBcbk9GRlNFVCAke2xvY2FsT2Zmc2V0fVxuYDtcblxuICAgICAgICAgICAgcmV0dXJuIGdyYXZzZWFyY2hUZW1wbGF0ZSArIG9mZnNldEN1c3RvbVRlbXBsYXRlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBmdW5jdGlvbiBzbyBhbm90aGVyIEtuYXJRTCBxdWVyeSBjYW4gYmUgY3JlYXRlZCB3aXRoIGFuIGluY3JlYXNlZCBvZmZzZXRcbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFBhcmFtc1NlcnZpY2UuY2hhbmdlU2VhcmNoUGFyYW1zTXNnKG5ldyBFeHRlbmRlZFNlYXJjaFBhcmFtcyhnZW5lcmF0ZUdyYXZzZWFyY2hRdWVyeVdpdGhDdXN0b21PZmZzZXQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGtuYXJxbFRlbXBsYXRlICsgb2Zmc2V0VGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiBncmF2c2VhcmNoVGVtcGxhdGUgKyBvZmZzZXRUZW1wbGF0ZTtcblxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEt1aUNvcmVDb25maWcsIFJkZkRhdGFPYmplY3QsIFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9kZWNsYXJhdGlvbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KCdjb25maWcnKSBwdWJsaWMgY29uZmlnOiBLdWlDb3JlQ29uZmlnKSB7IH1cblxuICAvKipcbiAgICAgKiBSZXNldHMgdGhlIGNvbnRlbnQgb2YgdGhlIHRyaXBsZXN0b3JlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJkZkRhdGFPYmplY3RzXG4gICAgICogQHJldHVybnMgT2JzZXJ2YWJsZTxzdHJpbmc+XG4gICAgICovXG4gIHJlc2V0VHJpcGxlc3RvcmVDb250ZW50KHJkZkRhdGFPYmplY3RzOiBSZGZEYXRhT2JqZWN0W10pOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFJlc2V0VHJpcGxlc3RvcmVDb250ZW50UmVzcG9uc2U+KHRoaXMuY29uZmlnLmFwaSArICcvYWRtaW4vc3RvcmUvUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQnLCByZGZEYXRhT2JqZWN0cylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVzZXRUcmlwbGVzdG9yZUNvbnRlbnRSZXNwb25zZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQ6ICcsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBDbGllbnQtc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcmVTZXJ2aWNlIC0gcmVzZXRUcmlwbGVzdG9yZUNvbnRlbnQgLSBTZXJ2ZXItc2lkZSBlcnJvciBvY2N1cnJlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgICkpO1xuXG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQmFzaWNPbnRvbG9neVNlcnZpY2UgZXh0ZW5kcyBBcGlTZXJ2aWNlIHtcblxuICAvKipcbiAgICAgKiByZXR1cm5zIG91ciBsaXN0IG9mIGEgYmFzaWMgb250b2xvZ3lcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGFueT59XG4gICAgICovXG4gIC8vIGdldEJhc2ljT250b2xvZ3koKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgLy8gICAgIGxldCB1cmwgPSBlbnZpcm9ubWVudC51cmw7XG4gIC8vICAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicsIHt3aXRoQ3JlZGVudGlhbHM6IGZhbHNlfSk7XG4gIC8vIH1cbiAgZ2V0QmFzaWNPbnRvbG9neSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwcDtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KHVybCArICcvZGF0YS9iYXNlLWRhdGEvYmFzaWMtb250b2xvZ3kuanNvbicpO1xuICAgIC8vIHJldHVybiB0aGlzLmh0dHBHZXQodXJsICsgJy9kYXRhL2Jhc2UtZGF0YS9iYXNpYy1vbnRvbG9neS5qc29uJywge3dpdGhDcmVkZW50aWFsczogZmFsc2V9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZVR5cGVzU2VydmljZSBleHRlbmRzIEFwaVNlcnZpY2Uge1xuXG4gIC8qKlxuICAgICAqIEdldCBhbGwgcmVzb3VyY2UgdHlwZXMgZGVmaW5lZCBieSB0aGUgdm9jYWJ1bGFyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgVm9jYWJ1bGFyeSBpcmlcbiAgICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICAgKi9cbiAgZ2V0UmVzb3VyY2VUeXBlc0J5Vm9jKGlyaTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwR2V0KCcvdjEvcmVzb3VyY2V0eXBlcz92b2NhYnVsYXJ5PScgKyBlbmNvZGVVUklDb21wb25lbnQoaXJpKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3BlY2lmaWMgcmVzb3VyY2UgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlyaSByZXNvdXJjZSB0eXBlIGlyaVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlPGFueT5cbiAgICovXG4gIGdldFJlc291cmNlVHlwZShpcmk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cEdldCgnL3YxL3Jlc291cmNldHlwZXMvJyArIGVuY29kZVVSSUNvbXBvbmVudChpcmkpKTtcbiAgfVxuXG5cbiAgLy8gcHV0UmVzb3VyY2VUeXBlKGlyaSlcblxufVxuIiwiLyoqXG4gKiBtYWluIGFwaSBzZXJ2aWNlc1xuICovXG5leHBvcnQgKiBmcm9tICcuL2FwaS5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgYWRtaW4gYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vZ3JvdXBzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9saXN0cy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vcHJvamVjdHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2FkbWluL3VzZXJzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hZG1pbi9sYW5ndWFnZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYWRtaW4vc3RhdHVzLW1zZy5zZXJ2aWNlJztcblxuLyoqXG4gKiBzcGVjaWZpYyBzZXJ2aWNlcyBmb3Iga25vcmEgdjIgYXBpXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vdjIvb250b2xvZ3kuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL29udG9sb2d5LWNhY2hlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc2VhcmNoLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9jb252ZXJ0LWpzb25sZCc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2luY29taW5nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9zZWFyY2gtcGFyYW1zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9ncmF2LXNlYXJjaC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdjIvc3RvcmUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3YyL2Jhc2ljLW9udG9sb2d5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi92Mi9yZXNvdXJjZS10eXBlcy5zZXJ2aWNlJztcbiIsImltcG9ydCB7IEtub3JhQ29uc3RhbnRzLCBLbm9yYVNjaGVtYSB9IGZyb20gJy4va25vcmEtY29uc3RhbnRzJztcbmltcG9ydCB7IEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZSwgUHJvcGVydHkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG5cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIGEgY29tcGFyaXNvbiBvcGVyYXRvci5cbiAqIFRoaXMgaW50ZXJmYWNlIGlzIGltcGxlbWVudGVkIGZvciB0aGUgc3VwcG9ydGVkIGNvbXBhcmlzb24gb3BlcmF0b3JzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICAvLyB0eXBlIG9mIGNvbXBhcmlzb24gb3BlcmF0b3JcbiAgICB0eXBlOiBzdHJpbmc7XG5cbiAgICAvLyB0aGUgbGFiZWwgb2YgdGhlIGNvbXBhcmlzb24gb3BlcmF0b3IgdG8gYmUgcHJlc2VudGVkIHRvIHRoZSB1c2VyLlxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvLyByZXR1cm5zIHRoZSBjbGFzcyBuYW1lIHdoZW4gY2FsbGVkIG9uIGFuIGluc3RhbmNlXG4gICAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEVxdWFscyBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0VxdWFscyc7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBjbGFzcyBOb3RFcXVhbHMgaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk5vdEVxdWFsc0NvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdOb3RFcXVhbHMnO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyZWF0ZXJUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkdyZWF0ZXJUaGFuRXF1YWxzQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ0dyZWF0ZXJUaGFuRXF1YWxzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHcmVhdGVyVGhhbiBpbXBsZW1lbnRzIENvbXBhcmlzb25PcGVyYXRvciB7XG5cbiAgICB0eXBlID0gS25vcmFDb25zdGFudHMuR3JlYXRlclRoYW5Db21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5HcmVhdGVyVGhhbkNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdHcmVhdGVyVGhhbic7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTGVzc1RoYW4gaW1wbGVtZW50cyBDb21wYXJpc29uT3BlcmF0b3Ige1xuXG4gICAgdHlwZSA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGVzc1RoYW5Db21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW4nO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIExlc3NUaGFuRXF1YWxzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MZXNzVGhhbkVxdWFsc0NvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLkxlc3NUaGFuUXVhbHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnTGVzc1RoYW5FcXVhbHMnO1xuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgRXhpc3RzIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uT3BlcmF0b3I7XG4gICAgbGFiZWwgPSBLbm9yYUNvbnN0YW50cy5FeGlzdHNDb21wYXJpc29uTGFiZWw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBnZXRDbGFzc05hbWUoKSB7XG4gICAgICAgIHJldHVybiAnRXhpc3RzJztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaWtlIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5MaWtlQ29tcGFyaXNvbk9wZXJhdG9yO1xuICAgIGxhYmVsID0gS25vcmFDb25zdGFudHMuTGlrZUNvbXBhcmlzb25MYWJlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIGdldENsYXNzTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdMaWtlJztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1hdGNoIGltcGxlbWVudHMgQ29tcGFyaXNvbk9wZXJhdG9yIHtcblxuICAgIHR5cGUgPSBLbm9yYUNvbnN0YW50cy5NYXRjaENvbXBhcmlzb25PcGVyYXRvcjtcbiAgICBsYWJlbCA9IEtub3JhQ29uc3RhbnRzLk1hdGNoQ29tcGFyaXNvbkxhYmVsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgZ2V0Q2xhc3NOYW1lKCkge1xuICAgICAgICByZXR1cm4gJ01hdGNoJztcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBDb21iaW5hdGlvbiBvZiBhIGNvbXBhcmlzb24gb3BlcmF0b3IgYW5kIGEgdmFsdWUgbGl0ZXJhbCBvciBhbiBJUkkuXG4gKiBJbiBjYXNlIHRoZSBjb21wYXJpc29uIG9wZXJhdG9yIGlzICdFeGlzdHMnLCBubyB2YWx1ZSBpcyBnaXZlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlIHtcblxuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGNvbXBhcmlzb25PcGVyYXRvcjogQ29tcGFyaXNvbk9wZXJhdG9yLCByZWFkb25seSB2YWx1ZT86IFZhbHVlKSB7XG4gICAgfVxufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGludGVyZmFjZSByZXByZXNlbnRpbmcgYSB2YWx1ZTogYW4gSVJJIG9yIGEgbGl0ZXJhbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdmFsdWUgaW50byBhIFNQQVJRTCBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc2NoZW1hIGluZGljYXRlcyB0aGUgS25vcmEgc2NoZW1hIHRvIGJlIHVzZWQuXG4gICAgICogQHJldHVybnMge3N0cmluZ30gU1BBUlFMIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICAgKi9cbiAgICB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nO1xuXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb3BlcnR5J3MgdmFsdWUgYXMgYSBsaXRlcmFsIHdpdGggdGhlIGluZGljYXRpb24gb2YgaXRzIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBWYWx1ZUxpdGVyYWwgaW1wbGVtZW50cyBWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1ZhbHVlTGl0ZXJhbF0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgdGhlIGxpdGVyYWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSB0eXBlIG9mIHRoZSB2YWx1ZSAobWFraW5nIHVzZSBvZiB4c2QpLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdmFsdWU6IHN0cmluZyxcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZykge1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHR5cGUgYW5ub3RhdGVkIHZhbHVlIGxpdGVyYWwgdG8gYmUgdXNlZCBpbiBhIFNQQVJRTCBxdWVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzY2hlbWEgaW5kaWNhdGVzIHRoZSBLbm9yYSBzY2hlbWEgdG8gYmUgdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHB1YmxpYyB0b1NwYXJxbChzY2hlbWE6IEtub3JhU2NoZW1hKTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgbGl0ZXJhbFR5cGU6IHN0cmluZztcblxuICAgICAgICAvLyBjaGVjayBpZiBhIEtub3JhIHNjaGVtYSBjb252ZXJzaW9uIGlzIG5lY2Vzc2FyeSwgZS5nLiwga25vcmEtYXBpOmRhdGVWYWx1ZSAoY29tcGxleCkgdG8ga25vcmEtYXBpOmRhdGUgKHNpbXBsZSkuXG4gICAgICAgIC8vIHhzZCB0eXBlcyB3aWxsIHJlbWFpbiB1bmNoYW5nZWRcbiAgICAgICAgaWYgKHNjaGVtYSA9PT0gS25vcmFTY2hlbWEuc2ltcGxlICYmIEdyYXZzZWFyY2hHZW5lcmF0aW9uU2VydmljZS50eXBlQ29udmVyc2lvbkNvbXBsZXhUb1NpbXBsZVt0aGlzLnR5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gc2ltcGxlIHNjaGVtYVxuICAgICAgICAgICAgbGl0ZXJhbFR5cGUgPSBHcmF2c2VhcmNoR2VuZXJhdGlvblNlcnZpY2UudHlwZUNvbnZlcnNpb25Db21wbGV4VG9TaW1wbGVbdGhpcy50eXBlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGRvIG5vdCBjb252ZXJ0XG4gICAgICAgICAgICBsaXRlcmFsVHlwZSA9IHRoaXMudHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgXCIke3RoaXMudmFsdWV9XCJeXjwke2xpdGVyYWxUeXBlfT5gO1xuICAgIH1cblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gSVJJLlxuICovXG5leHBvcnQgY2xhc3MgSVJJIGltcGxlbWVudHMgVmFsdWUge1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhbiBbSVJJXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcmkgdGhlIElSSSBvZiBhIHJlc291cmNlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGlyaTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFNQQVJRTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSVJJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNjaGVtYSBpbmRpY2F0ZXMgdGhlIEtub3JhIHNjaGVtYSB0byBiZSB1c2VkLlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHRvU3BhcnFsKHNjaGVtYTogS25vcmFTY2hlbWEpOiBzdHJpbmcge1xuICAgICAgICAvLyB0aGlzIGlzIGFuIGluc3RhbmNlIElyaSBhbmQgZG9lcyBub3QgaGF2ZSB0byBiZSBjb252ZXJ0ZWQuXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy5pcml9PmA7XG4gICAgfVxuXG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgaW50ZXJmYWNlIHRoYXQgcmVwcmVzZW50cyBhIHZhbHVlLlxuICogVGhpcyBpbnRlcmZhY2UgaGFzIHRvIGJlIGltcGxlbWVudGVkIGZvciBhbGwgdmFsdWUgdHlwZXMgKHZhbHVlIGNvbXBvbmVudCBjbGFzc2VzKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eVZhbHVlIHtcblxuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIHZhbHVlLlxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZhbHVlfS5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpOiBWYWx1ZTtcblxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBwcm9wZXJ0eSwgdGhlIHNwZWNpZmllZCBjb21wYXJpc29uIG9wZXJhdG9yLCBhbmQgdmFsdWUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eVdpdGhWYWx1ZSB7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgW1Byb3BlcnR5V2l0aFZhbHVlXS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHJvcGVydHl9IHByb3BlcnR5IHRoZSBzcGVjaWZpZWQgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtDb21wYXJpc29uT3BlcmF0b3JBbmRWYWx1ZX0gdmFsdWVMaXRlcmFsIHRoZSBzcGVjaWZpZWQgY29tcGFyaXNvbiBvcGVyYXRvciBhbmQgdmFsdWUuXG4gICAgICogQHBhcmFtIGlzU29ydENyaXRlcmlvbiBpbmRpY2F0ZXMgaWYgdGhlIHByb3BlcnR5IGlzIHVzZWQgYXMgYSBzb3J0IGNyaXRlcmlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcmVhZG9ubHkgcHJvcGVydHk6IFByb3BlcnR5LFxuICAgICAgICByZWFkb25seSB2YWx1ZUxpdGVyYWw6IENvbXBhcmlzb25PcGVyYXRvckFuZFZhbHVlLFxuICAgICAgICByZWFkb25seSBpc1NvcnRDcml0ZXJpb246IEJvb2xlYW4pIHtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBhIGxpc3QsIHdoaWNoIGlzIHVzZWQgaW4gdGhlIG1hdC1hdXRvY29tcGxldGUgZm9ybSBmaWVsZFxuICogY29udGFpbnMgb2JqZWN0cyB3aXRoIGlkIGFuZCBuYW1lLiB0aGUgaWQgaXMgdXN1YWwgdGhlIGlyaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9jb21wbGV0ZUl0ZW0ge1xuICAgIGlyaTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYWJlbD86IHN0cmluZztcbn1cblxuIiwiLypcbiAqIFB1YmxpYyBBUEkgU3VyZmFjZSBvZiBjb3JlXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9saWIvY29yZS5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvZGVjbGFyYXRpb25zLyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9kZWNsYXJhdGlvbnMvYXBpL29wZXJhdG9ycyc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy8nO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3B1YmxpY19hcGknO1xuXG5leHBvcnQge0t1aUNvcmVDb25maWcgYXMgw4nCtWF9IGZyb20gJy4vbGliL2RlY2xhcmF0aW9ucyc7XG5leHBvcnQge1Byb3BlcnR5IGFzIMOJwrVifSBmcm9tICcuL2xpYi9zZXJ2aWNlcyc7Il0sIm5hbWVzIjpbInRzbGliXzEuX19kZWNvcmF0ZSIsInRzbGliXzEuX19leHRlbmRzIiwidHNsaWJfMS5fX3ZhbHVlcyIsImpzb25sZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFNQTs7Ozs7UUFRVyxTQUFJLEdBQVcsU0FBUyxDQUFDOzs7OztRQU96QixRQUFHLEdBQVcsU0FBUyxDQUFDOzs7OztRQU94QixRQUFHLEdBQVcsU0FBUyxDQUFDOzs7OztRQU94QixVQUFLLEdBQVcsU0FBUyxDQUFDO0tBRXBDO0lBdkJHQTtRQURDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzsrQ0FDRztJQU9oQ0E7UUFEQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7OENBQ0c7SUFPL0JBO1FBREMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7OzhDQUNHO0lBTy9CQTtRQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztnREFDRztJQTVCeEIsYUFBYTtRQUR6QixVQUFVLENBQUMsZUFBZSxDQUFDO09BQ2YsYUFBYSxDQThCekI7SUFBRCxvQkFBQztDQUFBOztBQ3BDRDs7O0FBR0E7SUFBQTs7OztRQU9JLFdBQU0sR0FBRyxDQUFDLENBQUM7Ozs7UUFLWCxlQUFVLEdBQUcsRUFBRSxDQUFDOzs7O1FBS2hCLFFBQUcsR0FBRyxFQUFFLENBQUM7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