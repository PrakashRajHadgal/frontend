import { getSearchResults } from "../../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getCitizenGridData, getCategory1, getYear1, getMonth1, getrepotforproccessingTime1, getSectordata1, getSubCategory1, getUpdatePriceBook1, getMasterGridData1, getGridDataSellMeat1, getGridDataRoadcut1, getGridDataAdvertisement1 } from "../../../../../ui-utils/commons";
import { convertEpochToDate, convertDateToEpoch } from "../../utils/index";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { textToLocalMapping } from "./searchResults";
import { validateFields, getTextToLocalMapping } from "../../utils";
import get from "lodash/get";
import set from "lodash/set";
export const fetchData = async (action, state, dispatch) => {
  const response = await getSearchResults();
  //const mdmsRes = await getMdmsData(dispatch);
  // let tenants =
  // mdmsRes &&
  // mdmsRes.MdmsRes &&
  // mdmsRes.MdmsRes.tenant.citymodule.find(item => {
  // if (item.code === "TL") return true;
  // });
  // dispatch(
  // prepareFinalObject(
  // "applyScreenMdmsData.common-masters.citiesByModule.TL",
  // tenants
  // )
  // );
  try {

    if (response.nocApplicationDetail.length > 0) {
      dispatch(prepareFinalObject("searchResults", response.nocApplicationDetail));
      dispatch(
        prepareFinalObject("myApplicationsCount", response.nocApplicationDetail.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGridData = async (action, state, dispatch) => {
  const response = await getCitizenGridData();
  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      //   localStorage.setItem('data',JSON.stringify(response.nocApplicationDetail))

      //  dispatch(prepareFinalObject("gridData",response.nocApplicationDetail ));

      //   dispatch(
      //     prepareFinalObject("gridDataCount",response.nocApplicationDetail.length)
      //   );




      let data = response.nocApplicationDetail.map(item => ({
        // alert(item)
        [getTextToLocalMapping("Application No")]:
          item.applicationId || "-",
        [getTextToLocalMapping("Application Status")]: getTextForPetNoc(item.applicationStatus) || "-",
        [getTextToLocalMapping("Applicant Name")]:
          item.applicantName || "-",


      }));

      dispatch(
        handleField(
          "search",
          "components.div.children.searchResults",
          "props.data",
          data
        )
      );

      showHideTable(true, dispatch);















    }
  } catch (error) {
    console.log(error);
  }
};


export const getGridDataSellMeat = async (action, state, dispatch) => {
  const response = await getGridDataSellMeat1();

  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // setgrid(response.nocApplicationDetail)
      // //alert(getgrid)
      //   localStorage.setItem('dataSellMeat',JSON.stringify(response.nocApplicationDetail))
      //   //alert(localStorage.getItem('data')
      // //)
      //   dispatch(prepareFinalObject("gridData",response.nocApplicationDetail ));

      //   dispatch(
      //     prepareFinalObject("gridDataCount",response.nocApplicationDetail.length)
      //   );

      let data = response.nocApplicationDetail.map(item => ({
        // alert(item)
        [getTextToLocalMapping("Application No")]:
          item.applicationId || "-",
        [getTextToLocalMapping("Application Status")]: getTextForSellMeatNoc(item.applicationStatus) || "-",
        [getTextToLocalMapping("Applicant Name")]:
          item.applicantName || "-",


      }));

      dispatch(
        handleField(
          "sellmeat-search",
          "components.div.children.searchResultsSellmeat",
          "props.data",
          data
        )
      );

      showHideTableSellmeat(true, dispatch);




    }
  } catch (error) {
    console.log(error);
  }
};

export const getGridDataRoadcut = async (action, state, dispatch) => {
  const response = await getGridDataRoadcut1();

  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // setgrid(response.nocApplicationDetail)
      // //alert(getgrid)
      //   localStorage.setItem('dataRoadcut',JSON.stringify(response.nocApplicationDetail))
      //   //alert(localStorage.getItem('data')
      // //)
      //   dispatch(prepareFinalObject("gridData",response.nocApplicationDetail ));

      //   dispatch(
      //     prepareFinalObject("gridDataCount",response.nocApplicationDetail.length)
      //   );


      let data = response.nocApplicationDetail.map(item => ({
        // alert(item)
        [getTextToLocalMapping("Application No")]:
          item.applicationId || "-",
        [getTextToLocalMapping("Application Status")]: getTextForRoadCuttNoc(item.applicationStatus) || "-",
        [getTextToLocalMapping("Applicant Name")]:
          item.applicantName || "-",


      }));
      dispatch(
        handleField(
          "roadcut-search",
          "components.div.children.searchResultsRoadcut",
          "props.data",
          data
        )
      );

      showHideTableRoadCut(true, dispatch);

    }
  } catch (error) {
    console.log(error);
  }
};




export const getGridDataAdvertisement = async (action, state, dispatch) => {
  const response = await getGridDataAdvertisement1();

  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // setgrid(response.nocApplicationDetail)
      // //alert(getgrid)
      //   localStorage.setItem('dataAdvertisement',JSON.stringify(response.nocApplicationDetail))
      //   //alert(localStorage.getItem('data')
      // //)
      //   dispatch(prepareFinalObject("gridData",response.nocApplicationDetail ));

      //   dispatch(
      //     prepareFinalObject("gridDataCount",response.nocApplicationDetail.length)
      //   );
      //   let data = response.nocApplicationDetail.map(item => ({
      // alert(item)
      //    [getTextToLocalMapping("Application No")]:
      //    item.applicationId || "-",
      //    [getTextToLocalMapping("Application Status")]: item.applicationStatus || "-",
      //    [getTextToLocalMapping("Applicant Name")]:
      //      item.applicantName || "-",


      //}));

      let data = response.nocApplicationDetail.map(item => ({
        [getTextToLocalMapping("Application No")]:
          item.applicationId || "-",
        [getTextToLocalMapping("Application Status")]: getTextAdvertisement(item.applicationStatus) || "-",
        [getTextToLocalMapping("Applicant Name")]:
          item.applicantName || "-",


      }));

      dispatch(
        handleField(
          "advertisement-search",
          "components.div.children.searchResultsAdvertisement",
          "props.data",
          data
        )
      );

      showHideTableADV(true, dispatch);

    }

  } catch (error) {
    console.log(error);
  }
};






export const getMasterGridData = async (action, state, dispatch) => {
  const response = await getMasterGridData1();
  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      //   localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))

      //  dispatch(prepareFinalObject("Matserdata",response.nocApplicationDetail ));

      //   dispatch(
      //     prepareFinalObject("MatserdataCount",response.nocApplicationDetail.length)
      //   );

      let category = get(
        state,
        "screenConfiguration.preparedFinalObject.category",

      );

      let Subcategory = get(
        state,
        "screenConfiguration.preparedFinalObject.subcategory",
      );
      //alert(JSON.stringify(Subcategory))
      //screenConfiguration.preparedFinalObject.subcategory

      for (let i = 0; i < response.nocApplicationDetail.length; i++) {
        for (let j = 0; j < category.length; j++) {
          if (response.nocApplicationDetail[i].categoryId == category[j].id) {

            //obj['categoryName']=category[j].name
            response.nocApplicationDetail[i]['categoryName'] = category[j].name
            response.nocApplicationDetail[i]['duration'] = category[j].duration
            response.nocApplicationDetail[i]['calculationType'] = category[j].calculationType


          }
        }

      }
      for (let i = 0; i < response.nocApplicationDetail.length; i++) {
        for (let j = 0; j < Subcategory.length; j++) {
          if (response.nocApplicationDetail[i].subCategoryId == Subcategory[j].id) {

            //obj['categoryName']=category[j].name
            response.nocApplicationDetail[i]['subcategoryName'] = Subcategory[j].name
          }
        }

      }
      console.log(response.nocApplicationDetail)


      let data = response.nocApplicationDetail.map(item => ({
        // alert(item)

        [getTextToLocalMapping("Price Book Id")]:
          item.priceBookId || "-",
        [getTextToLocalMapping("categoryId")]:
          item.categoryName || "-",
        [getTextToLocalMapping("subCategoryId")]: item.subcategoryName || "-",
        [getTextToLocalMapping("perDayPrice")]:
          item.perDayPrice,
        [getTextToLocalMapping("perWeekPrice")]:
          item.perWeekPrice,
        [getTextToLocalMapping("perMonthPrice")]:
          item.perMonthPrice,
        [getTextToLocalMapping("annualPrice")]:
          item.annualPrice,
        [getTextToLocalMapping("effectiveFromDate")]:
          item.effectiveFromDate.split(" ")[0] || "-",
        [getTextToLocalMapping("effectiveToDate")]:
          item.effectiveToDate===null?"-":item.effectiveToDate.split(" ")[0] || "-",

      }));

      dispatch(
        handleField(
          "masterAdvertisement",
          "components.div.children.searchResultsMaser",
          "props.data",
          data
        )
      );

      showHideTableMaster(true, dispatch);





    }
  } catch (error) {
    console.log(error);
  }
};

export const getUpdatePriceBook = async (action, state, dispatch, pricebookid) => {
  const response = await getUpdatePriceBook1(pricebookid);
  try {
    if (response && response.nocApplicationDetail && response.nocApplicationDetail.length > 0) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))
      // screenConfiguration.preparedFinalObject.category
      let category = get(
        state,
        "screenConfiguration.preparedFinalObject.category"

      );
      // alert(JSON.stringify(category))
      let Subcategory = get(
        state,
        "screenConfiguration.preparedFinalObject.subcategory"
      );

      // for(let i=0;i<response.nocApplicationDetail.length;i++)
      // {
      for (let j = 0; j < category.length; j++) {
        if (response.nocApplicationDetail[0].categoryId == category[j].id) {
          //let data=[]
          let cat = category[j].duration
          // alert(cat)
          // data.push(cat)
          //obj['categoryName']=category[j].name
          // response.nocApplicationDetail[i]['categoryName']=category[j].name
          response.nocApplicationDetail[0]['duration'] = category[j].duration
          response.nocApplicationDetail[0]['calculationType'] = category[j].calculationType
          let cat1 = JSON.stringify(cat)
          // alert(cat1.includes("annual"))
          set(
            state,
            "screenConfiguration.preparedFinalObjec.masterScreen.duration",
            cat1
          );
          if (cat1.includes("day") === true) {
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perDay.props.disabled",
              false
            );
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perDay.required",
              true
            );
          }

          if (cat1.includes("week") === true) {
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perweek.props.disabled",
              false
            );
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perweek.required",
              true
            );
          }
          if (cat1.includes("month") === true) {
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perMonth.props.disabled",
              false
            );
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.perMonth.required",
              true
            );
          }
          if (cat1.includes("annual") === true) {
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.anual.props.disabled",
              false
            );
            set(
              action,
              "screenConfig.components.div.children.NOCApplication2.children.cardContent.children.masterContainer.children.anual.required",
              true
            );

          }






          localStorage.setItem('duration', JSON.stringify(cat))
          //alert(localStorage.getItem('duration').includes("annual"))

        }

      }

      // }

      let date = convertEpochToDate(response.nocApplicationDetail[0].effectiveFromDate)
      let data = response.nocApplicationDetail[0]

      date = date.split('/')
      date = date[2] + '-' + date[1] + '-' + date[0]
      // Matserdata[0].effectiveFromDate

      data['effectiveFromDate'] = date
      //  alert(JSON.stringify(data))
      dispatch(prepareFinalObject("Matserdata", response.nocApplicationDetail));

      dispatch(
        prepareFinalObject("MatserdataCount", response.nocApplicationDetail.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const getCategory = async (action, state, dispatch, pricebookid) => {
  const response = await getCategory1();
  try {
    if (response) {

      dispatch(prepareFinalObject("category", response.MdmsRes.egpm.typeOfAdvertisement));

      dispatch(
        prepareFinalObject("categorycount", response.MdmsRes.egpm.typeOfAdvertisement.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSubCategory = async (action, state, dispatch, pricebookid) => {
  const response = await getSubCategory1();
  try {
    if (response) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))

      dispatch(prepareFinalObject("subcategory", response.MdmsRes.egpm.subTypeOfAdvertisement));

      dispatch(
        prepareFinalObject("subcategorycount", response.MdmsRes.egpm.subTypeOfAdvertisement.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSectordata = async (action, state, dispatch, pricebookid) => {
  const response = await getSectordata1();
  try {
    if (response) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))
      response.MdmsRes.egpm.sector.unshift({ name: "ALL", code: "ALL" });
      dispatch(prepareFinalObject("SectorData", response.MdmsRes.egpm.sector));

      dispatch(
        prepareFinalObject("SectorDataLen", response.MdmsRes.egpm.sector.length)
      );
    }
  } catch (error) {
    console.log(error);
  }
};



export const getrepotforproccessingTime = async (action, state, dispatch) => {
  const response = await getrepotforproccessingTime1();
  try {
    if (response) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))

      //  dispatch(prepareFinalObject("SectorData",response.MdmsRes.egpm.sector));

      //   dispatch(
      //     prepareFinalObject("SectorDataLen",response.MdmsRes.egpm.sector.length)
      //   );






      let data = response.reportResponses[0].reportData.map(item => ({
        // alert(item)
        [getTextToLocalMapping("applcationType")]:
          item[0] || "-",
        [getTextToLocalMapping("avgTimeTakenToProcessRequest")]: item[1] || "-",
        [getTextToLocalMapping("pendingMoreThan10AndLessThan30Days")]:
          item[3] || "-",
        [getTextToLocalMapping("pendingMoreThan30Days")]:
          item[2] || "-",

      }));

      dispatch(
        handleField(
          "reportForProcessingTime",
          "components.div.children.searchResultsReports4",
          "props.data",
          data
        )
      );

      showHideTable4(true, dispatch);



    }
  } catch (error) {
    console.log(error);
  }
};

const showHideTable4 = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "reportForProcessingTime",
      "components.div.children.searchResultsReports4",
      "visible",
      booleanHideOrShow
    )
  );
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


const showHideTableSellmeat = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "sellmeat-search",
      "components.div.children.searchResultsSellmeat",
      "visible",
      booleanHideOrShow
    )
  );
};

const showHideTableADV = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "advertisement-search",
      "components.div.children.searchResultsAdvertisement",
      "visible",
      booleanHideOrShow
    )
  );
};

const showHideTableRoadCut = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "roadcut-search",
      "components.div.children.searchResultsRoadcut",
      "visible",
      booleanHideOrShow
    )
  );
};




export const getYear = async (action, state, dispatch, pricebookid) => {
  const response = await getYear1();
  try {
    if (response) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))

      dispatch(prepareFinalObject("reportYear", response.MdmsRes.egpm.reportYear));


    }
  } catch (error) {
    console.log(error);
  }
};



export const getMonth = async (action, state, dispatch, pricebookid) => {
  const response = await getMonth1();
  try {
    if (response) {
      // dispatch(prepareFinalObject("gridData",response.nocApplicationDetail));

      // localStorage.setItem('Matserdata',JSON.stringify(response.nocApplicationDetail))

      dispatch(prepareFinalObject("reportMonth", response.MdmsRes.egpm.reportMonth));


    }
  } catch (error) {
    console.log(error);
  }
};


export const getTextForPetNoc = label => {
  switch (label) {
    case "FORWARD":
      return 'Pending for Approval'
    case "PAID":
      return 'Paid'
    case "REASSIGNTOSI":
      return 'Application Reassigned To SI'
    case "RESENT":
      return 'Resent'
    case "APPROVED":
      return 'Apllication Approved'
    default:
      return '-'
  }
}

export const getTextForSellMeatNoc = label => {
  switch (label) {
    case "INITIATED":
      return 'Initiated'
    case "PENDINGAPPROVAL":
      return 'Pending Approval'
    case "PAID":
      return 'Paid'
    case "REASSIGNTOSI":
      return 'Reassign To SI'
    case "RESENT":
      return 'Resent'
    case "APPROVED":
      return 'Apllication Approved'
    case "REVIEWOFSUPERINTENDENT":
      return 'Review Of Superintendent'
    case "REASSIGNTOSUPERINTENDENT":
      return 'Reassign To Superintendent'
    default:
      return '-'
  }
}

export const getTextAdvertisement = label => {

  switch (label) {
    case "INITIATED":
      return 'Initiated'
   case "INITIATEDEXC":
      return 'Initiated'
    case "PAID":
      return 'Paid'
    case "REVIEWOFSUPERINTENDENT":
      return 'Review Of Superintendent'
    case "REVIEWOFSPAFTERWITHDRAW":
      return 'Review Of Superintendent' 
    case "REVIEWOFOSD":
      return 'Review Of OSD'
    case "WITHDRAWAPPROVAL":
      return 'Withdraw Approval'
    case "WITHDRAWAFTERAPRROVAL":
      return 'Reassign To JEX'
    case "WITHDRAW":
      return 'Withdraw'
    case "PENDINGAPPROVAL":
        return 'Pending Approval'
    case "PENDINGAPPROVALFORWITHDRAW":
      return 'Pending Approval'
    case "REJECTED":
      return 'Rejected'
    case "RESENT":
      return 'Resent'
    case "REASSIGN":
      return 'Reassign'
    case "APPROVED":
      return 'Approved'
    case "REASSIGNTOJEX":
      return 'Reassign To JEX'
    case "REASSIGNTOSUPERINTENDENT":
      return 'Reassign To Superintendent'
   case "REASSIGNTOOSD":
        return 'Reassign To OSD'
    case "PAYMENTPENDING":
      return 'Payment Pending'
    default:
      return '-'
  }
}




export const getTextForRoadCuttNoc = label => {
  switch (label) {
    case "INITIATED":
      return 'Initiated'
    case "REASSIGNTOJE":
      return 'Reassign To JE'
    case "RESENT":
      return 'Resent'
    case "REASSIGNTOSDO":
      return 'Reassign To SDO'
    case "REVIEWSDO":
      return 'Review Of SDO'
    case "REASSIGNTOSE":
      return 'Reassign To SE'
    case "REVIEWOFSE":
      return 'Review of SE'
    case "APPLIED":
      return 'Applied'
    case "REVIEWOFEE":
      return 'Review of EE'
    case "REJECTED":
      return 'Rejected'
    case "REASSIGN":
      return 'Reassign'
    case "APPROVED":
      return 'Approved'
    case "PAID":
      return 'Paid'
    case "PENDINGAPRROVAL":
      return 'Pending Approval'
    case "REASSIGNTOEE":
      return 'Reassign To EE'
    case "PAYMENTPENDING":
      return 'Payment Pending'
    default:
      return '-'
  }
}

const showHideTableMaster = (booleanHideOrShow, dispatch) => {
  dispatch(
    handleField(
      "masterAdvertisement",
      "components.div.children.searchResultsRoadcut",
      "visible",
      booleanHideOrShow
    )
  );
};