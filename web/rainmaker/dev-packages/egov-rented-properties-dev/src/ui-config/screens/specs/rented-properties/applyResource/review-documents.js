import {
    getCommonGrayCard,
    getCommonSubHeader,
    getLabel
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  
  import { changeStep } from "./footer";
  
  export const getReviewDocuments = (isEditable = true, screenKey, sourceJsonPath = "PropertiesTemp[0].reviewDocData") => {
    return getCommonGrayCard({
      headerDiv: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          header: {
            gridDefination: {
              xs: 12,
              sm: 10
            },
            ...getCommonSubHeader({
              labelName: "Documents",
              labelKey: "TL_COMMON_DOCS"
            })
          },
          editSection: {
            componentPath: "Button",
            props: {
              color: "primary"
            },
            gridDefination: {
              xs: 12,
              sm: 2,
              align: "right"
            },
            visible: isEditable,
            children: {
              editIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "edit"
                }
              },
              buttonLabel: getLabel({
                labelName: "Edit",
                labelKey: "TL_SUMMARY_EDIT"
              })
            },
            onClickDefination: {
              action: "condition",
              callBack: (state, dispatch) => {
                changeStep(state, dispatch, screenKey, "", 1);
              }
            }
          },
          documents: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-rented-properties",
            componentPath: "DownloadFileContainer",
            props: {
              sourceJsonPath,
              className: "review-documents"
            }
          }
        }
      }
    });
  };