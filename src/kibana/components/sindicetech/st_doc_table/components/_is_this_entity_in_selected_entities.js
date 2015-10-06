define(function (require) {
  var _ = require('lodash');

  return function _isThisEntityInSelectedEntities() {
    return function (se, entityId, column) {
      for (var i = 0; i < se.length; i++) {
        var entityIdToCompare = se[i];
        var entityIdToCompareParts = entityIdToCompare.split('/');
        if (entityIdToCompareParts.length === 5) {
          var idToCompare  = entityIdToCompareParts[2];
          var colToCompare = entityIdToCompareParts[3];
          if (idToCompare === entityId && colToCompare === column) {
            return true;
          }
        }
      }
      return false;
    };
  };
});
