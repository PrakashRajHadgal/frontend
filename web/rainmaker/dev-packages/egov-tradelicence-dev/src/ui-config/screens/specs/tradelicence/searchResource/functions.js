import get from "lodash/get";
import set from "lodash/set";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults, getCount } from "../../../../..//ui-utils/commons";
import {
  convertEpochToDate,
  convertDateToEpoch,
  getTextToLocalMapping
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

export const getStatusList = async (state, dispatch, screen, path) => {
  const queryObject = [{ key: "tenantId", value: getTenantId() }, 
                      { key: "businessServices", value: "NewTL" }]
  await setBusinessServiceDataToLocalStorage(queryObject, dispatch);
  const businessServices = JSON.parse(localStorageGet("businessServiceData"));
  if(!!businessServices) {
    const status = businessServices[0].states.filter(item => !!item.state).map(({state}) => ({code: state}))
    dispatch(
      handleField(
        screen,
        path,
        "props.data",
        status
      )
    );
  }
}

export const searchApiCall = async (state, dispatch, onInit, offset, limit = 100 , hideTable = true) => {
  // show loader
  dispatch(toggleSpinner());

  !!hideTable && showHideTable(false, dispatch);
  let queryObject = [
    {
      key: "tenantId",
      value: getTenantId()
    },
    { key: "offset", value: offset },
    { key: "limit", value: limit }
  ];
  queryObject = queryObject.filter(({value}) => !!value)
  let searchScreenObject = get(
    state.screenConfiguration.preparedFinalObject,
    "searchScreen",
    {}
  );

  var cFromDate = new Date(searchScreenObject["fromDate"]); 
  var ctoDate = new Date(searchScreenObject["toDate"]); 
  // if (cFromDate > ctoDate ) {
  //   dispatch((0, _actions.toggleSnackbar)(true, { labelName: "From date is greater than to date", labelKey: "From date is greater than to date"}, "warning"));
  //   _context.next = 22;
  // }

  const isSearchBoxFirstRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appTradeAndMobNumContainer.children",
    state,
    dispatch,
    "search"
  );

  const isSearchBoxSecondRowValid = validateFields(
    "components.div.children.tradeLicenseApplication.children.cardContent.children.appStatusAndToFromDateContainer.children",
    state,
    dispatch,
    "search"
  );

  if (!(isSearchBoxFirstRowValid && isSearchBoxSecondRowValid) && typeof onInit != "boolean") {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill valid fields to start search",
          labelKey: "ERR_FILL_VALID_FIELDS"
        },
        "warning"
      )
    );
  } else if (
    (Object.keys(searchScreenObject).length == 0 ||
    Object.values(searchScreenObject).every(x => x === "")) && typeof onInit != "boolean"
  ) {
    dispatch(
      toggleSnackbar(
        true,
        {
          labelName: "Please fill at least one field to start search",
          labelKey: "ERR_FILL_ONE_FIELDS"
        },
        "warning"
      )
    );
  } else if (
    (searchScreenObject["fromDate"] === undefined ||
      searchScreenObject["fromDate"].length === 0) &&
    searchScreenObject["toDate"] !== undefined &&
    searchScreenObject["toDate"].length !== 0 && typeof onInit != "boolean"
  ) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "Please fill From Date", labelKey: "ERR_FILL_FROM_DATE" },
        "warning"
      )
    );
  } else if (cFromDate > ctoDate) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: "From date is greater than to date", labelKey: "From date is greater than to date" },
        "warning"
      )
    );
  } else {
      for (var key in searchScreenObject) {
        if (
          searchScreenObject.hasOwnProperty(key) &&
          searchScreenObject[key].trim() !== ""
        ) {
          if (key === "fromDate") {
            queryObject.push({
              key: key,
              value: convertDateToEpoch(searchScreenObject[key], "daystart")
            });
          } else if (key === "toDate") {
            queryObject.push({
              key: key,
              value: convertDateToEpoch(searchScreenObject[key], "dayend")
            });
          } else {
            queryObject.push({ key: key, value: searchScreenObject[key].trim() });
          }
        }
    }

    // const {licensesCount = 0} = await getCount(queryObject) || {};

    

    const response = await getSearchResults(queryObject);
    try {
      const length = response.Licenses.length
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.count",
          length
        )
      );
  
      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.title",
          `${getTextToLocalMapping(
            "Search Results for Trade License Applications"
          )} (${length})`
        )
      );
      let data = response.Licenses.map(item => ({
  
        [getTextToLocalMapping("Application No")]:
          item.applicationNumber || "-",
        [getTextToLocalMapping("License No")]: item.licenseNumber || "-",
        [getTextToLocalMapping("License Type")]:   getLocaleLabels(item.businessService + "_GROUP", item.businessService + "_GROUP"),
        [getTextToLocalMapping("Service Type")]: getLocaleLabels(item.businessService + "_SHORT", item.businessService + "_SHORT"),
        [getTextToLocalMapping("Owner Name")]:
          item.tradeLicenseDetail.owners[0].name || "-",
        [getTextToLocalMapping("Application Date")]:
          convertEpochToDate(item.applicationDate) || "-",
          [getTextToLocalMapping("Financial Year")]:
          item.financialYear || "-",
          [getTextToLocalMapping("Application Type")]:
          item.applicationType || "Renew",
        [getTextToLocalMapping("Status")]: item.status || "-",
        ["tenantId"]: item.tenantId,
        ["status1"]: item.status || "-"
      }));

      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );
      !!hideTable && showHideTable(true, dispatch);
      // hide loader
      dispatch(toggleSpinner());
    } catch (error) {
      dispatch(toggleSnackbar(true, error.message, "error"));
      console.log(error);
    }
  }
};
const showHideTable = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "search",
      "components.div.children.searchResults",
      "visible",
      booleanHideOrShow
    )
  );
};

const getMdmsData = async (dispatch, body) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: body
    }
  };
  try {
    let payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );

    return payload;
  } catch (e) {
    console.log(e);
  }
};

export const getTradeTypes = async(action, state, dispatch) => {
  const tradeTypePayload = [{
    moduleName: "TradeLicense",
    masterDetails: [{ name: "TradeType", filter: `[?(@.type == "TL")]` }]
  }]

  const tradeRes = await getMdmsData(dispatch, tradeTypePayload);
  const {TradeLicense} = tradeRes.MdmsRes || {}
  let tradeTypes = TradeLicense.TradeType || [] 

  tradeTypes = tradeTypes.map((trade, index, array) => {
    const findIndex = array.findIndex(item => item.category === trade.category);
    if(index === findIndex) {
      return {
      code: trade.category,
      label: getLocaleLabels(trade.category + "_GROUP", trade.category + "_GROUP")
    }
    }
  }).filter(item => !!item)
  dispatch(
    prepareFinalObject("applyScreenMdmsData.TradeLicense.MdmsTradeType", TradeLicense.TradeType)
  )
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.searchScreen.tradeType",
      tradeTypes
    )
  );
}
