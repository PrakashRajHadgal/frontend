import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import AnnouncementIcon from "../../../../ui-atoms-local/Icons/AnnouncementIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";
import { getRequiredDocData } from "../utils";
import get from "lodash/get";
import set from "lodash/set";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { pbkdf2 } from "crypto";

const header = getCommonHeader(
  {
    labelName: "Generate Press Notes",
    labelKey: "PR_GENERATE_PRESS_NOTES"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);
//alert("HOME")
const cardItems = [
  {
    label: {
      labelKey: "PR_GENERATE_PRESS_NOTES",
      labelName: "Generate Press Notes"
    },
    icon: <i
    viewBox="0 -8 35 42"
    color="primary"
    font-size="40px"
    class="material-icons module-page-icon" style={{fontSize:"50px"}}>
   menu_book
  </i>,
    route: "generatepressNote"
  },
  {
    label: {
      labelKey: "PR_VIEW_PRESS_NOTES",
      labelName: "View Press Notes "
    },
    icon: <MyApplicationIcon />,
    route: "pressNoteList"
  },
  
//   {
//     label: {
//       labelKey: "Committee Master",
//       labelName: "COMMITTEE_MASTER"
//     },
//     icon: <MyApplicationIcon />,
//     route: "my-applications-committee"
//   }
];

const PRSCPSearchAndResult = {
  uiFramework: "material-ui",
  name: "pressnotesHome",
  beforeInitScreen: (action, state, dispatch) => {
    getRequiredDocData(action, state, dispatch).then(() => {
      let documents = get(
        state,
        "screenConfiguration.preparedFinalObject.searchScreenMdmsData.PublicRelation.Documents",
        []
      );
      set(
        action,
        "screenConfig.components.adhocDialog.children.popup",
        getRequiredDocuments(documents)
      );
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        
      }
    },
    // cityPickerDialog: {
    //   componentPath: "Dialog",
    //   props: {
    //     open: false,
    //     maxWidth: "md"
    //   },
    //   children: {
    //     dialogContent: {
    //       componentPath: "DialogContent",
    //       props: {
    //         style: { minHeight: "180px", minWidth: "365px" }
    //       },
    //       children: {
    //         popup: cityPicker
    //       }
    //     }
    //   }
    // }
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-noc",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "home"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default PRSCPSearchAndResult;