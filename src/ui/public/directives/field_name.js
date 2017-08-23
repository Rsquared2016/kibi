import $ from 'jquery';
import 'ui/filters/short_dots';
import booleanFieldNameIcon from './field_name_icons/boolean_field_name_icon.html';
import conflictFieldNameIcon from './field_name_icons/conflict_field_name_icon.html';
import dateFieldNameIcon from './field_name_icons/date_field_name_icon.html';
import geoPointFieldNameIcon from './field_name_icons/geo_point_field_name_icon.html';
import ipFieldNameIcon from './field_name_icons/ip_field_name_icon.html';
import murmur3FieldNameIcon from './field_name_icons/murmur3_field_name_icon.html';
import numberFieldNameIcon from './field_name_icons/number_field_name_icon.html';
import sourceFieldNameIcon from './field_name_icons/source_field_name_icon.html';
import stringFieldNameIcon from './field_name_icons/string_field_name_icon.html';
import unknownFieldNameIcon from './field_name_icons/unknown_field_name_icon.html';

import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana');

module.directive('fieldName', function ($compile, $rootScope, $filter) {
  return {
    restrict: 'AE',
    scope: {
      'field': '=',
      'fieldName': '=',
      'fieldType': '=',
      'fieldAlias': '=?' // kibi: added fieldAlias to support column renaming in kibi-doc-table
    },
    link: function ($scope, $el) {
      const typeToIconMap = {
        boolean: booleanFieldNameIcon,
        conflict: conflictFieldNameIcon,
        date: dateFieldNameIcon,
        geo_point: geoPointFieldNameIcon,
        ip: ipFieldNameIcon,
        murmur3: murmur3FieldNameIcon,
        number: numberFieldNameIcon,
        source: sourceFieldNameIcon,
        string: stringFieldNameIcon,
      };

      function typeIcon(fieldType) {
        if (typeToIconMap.hasOwnProperty(fieldType)) {
          return typeToIconMap[fieldType];
        }

        return unknownFieldNameIcon;
      }

      $rootScope.$watchMulti.call($scope, [
        'field',
        'fieldName',
        'fieldAlias', // kibi: added fieldAlias to support column renaming in kibi-doc-table
        'fieldType',
        'field.rowCount'
      ], function () {

        const type = $scope.field ? $scope.field.type : $scope.fieldType;
        const name = $scope.field ? $scope.field.name : $scope.fieldName;
        const results = $scope.field ? !$scope.field.rowCount && !$scope.field.scripted : false;
        const scripted = $scope.field ? $scope.field.scripted : false;

        const displayName = $filter('shortDots')(name);

        // kibi: build element structure before setting field name
        $el
          .attr('title', name)
          .toggleClass('no-results', results)
          .toggleClass('scripted', scripted)
          .prepend(typeIcon(type));

        // kibi: support alias for column name
        // check if alias is different than original name to avoid showing
        // the same name in parenthesis
        if ($scope.fieldAlias && $scope.fieldAlias !== name) {
          $el
            .append($('<span>')
              .text($filter('shortDots')($scope.fieldAlias))
              .addClass('discover-field-name')
            );
          $el
            .append($('<span>')
              .text(displayName)
              .addClass('original-field-name')
            );
        } else {
          $el
            .append($('<span>')
              .text(displayName)
              .addClass('discover-field-name')
            );
        }
        // kibi: end
      });
    }
  };
});
