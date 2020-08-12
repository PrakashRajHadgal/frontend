import get from "lodash/get";
import set from "lodash/set";
import memoize from "lodash/memoize";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, getCount } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping as _getTextToLocalMapping
} from "../../utils/index";
import { toggleSnackbar, prepareFinalObject, toggleSpinner } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { validateFields } from "../../utils";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { setBusinessServiceDataToLocalStorage, getLocaleLabels } from "egov-ui-framework/ui-utils/commons";
import commonConfig from "config/common.js";
import { httpRequest } from "../../../../../ui-utils"
import {
  localStorageGet,
} from "egov-ui-kit/utils/localStorageUtils";

export const getTextToLocalMapping = memoize((label) => _getTextToLocalMapping(label));

export const searchApiCall = async (state, dispatch, onInit, offset, limit = 100, hideTable = true) => {
  !!hideTable && showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "offset",
      value: offset
    },
    {
      key: "limit",
      value: limit
    }
  ];
  queryObject = queryObject.filter(({
    value
  }) => !!value)
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen", {}
  );

  const searchBy = get(
    state.screenConfiguration.screenConfig,
    "property-search.components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.searchBy.props.value",
    ""
  )

  if (searchBy == "File Number") {
    var isSearchBoxValid = validateFields(
      "components.div.children.estateApplication.children.cardContent.children.searchBoxContainer.children.fileNumberContainer.children",
      state,
      dispatch,
      "property-search"
    );
  }
  else {

  }

  if (!isSearchBoxValid) {
    dispatch(
      toggleSnackbar(
        true, {
          labelName: "Please fill valid fields to start search",
          labelKey: "ERR_FILL_VALID_FIELDS"
        },
        "warning"
      )
    );
  } else if ((Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(x => x === ""))) {
    dispatch(
      toggleSnackbar(
        true, {
          labelName: "Please fill at least one field to start search",
          labelKey: "ERR_FILL_ONE_FIELDS"
        },
        "warning"
      )
    );
  }
  else {
    for (var key in searchScreenObject) {
      if (
        searchScreenObject.hasOwnProperty(key) &&
        searchScreenObject[key].trim() !== ""
      ) {
          queryObject.push({
            key: key,
            value: searchScreenObject[key].trim()
          });
      }
    }

    const response = await getSearchResults(queryObject);
    try {
      const length = response.Properties.length
      dispatch(
        handleField(
          "property-search",
          "components.div.children.searchResults",
          "props.count",
          length
        )
      );

      dispatch(
        handleField(
          "property-search",
          "components.div.children.searchResults",
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Estates"
          )} (${length})`
        )
      );
      let data = response.Properties.map(item => ({

        [getTextToLocalMapping("Action")]: "SELECT",
        [getTextToLocalMapping("File No")]: item.fileNumber || "-",
        [getTextToLocalMapping("Property Id")]: item.propertyDetails.propertyId,
        [getTextToLocalMapping("House No")]: "-",
        [getTextToLocalMapping("Owner Name")]: item.propertyDetails.owners.map(item => item.ownerDetails.ownerName).join(",") || "-",
        [getTextToLocalMapping("Mobile No")]: item.propertyDetails.owners.map(item => item.ownerDetails.mobileNumber).join(",") || "-"
      }));

      dispatch(
        handleField(
          "property-search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      !!hideTable && showHideTable(true, dispatch);
    } catch (error) {
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
};

const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "property-search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};