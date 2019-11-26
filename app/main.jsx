import React from "react";
import ReactDOM from "react-dom";
import {
  Grid,
  GridColumn,
  GridDetailRow,
  GridToolbar
} from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages
} from "@progress/kendo-react-intl";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import numbers from "cldr-numbers-full/main/es/numbers.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";

load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);

import esMessages from "./es.json";
loadMessages(esMessages, "es-ES");

import { process } from "@progress/kendo-data-query";
import employees from "./employees.json";


employees.forEach(o => {

  o.orderDate = new Date(o.orderDate);
  o.shippedDate =
    o.shippedDate === "NULL" ? undefined : new Date(o.shippedDate);

   
});


class App extends React.Component {
  locales = [
    {
      language: "en-US",
      locale: "en"
    },
    {
      language: "es-ES",
      locale: "es"
    }
  ];
  constructor(props) {
    super(props);
    const dataState = {
      skip: 0,
      take: 20,
      sort: [{ field: "Amcom_Name", dir: "asc" }]
      
    };
    this.state = {
      dataResult: process(employees, dataState),
      dataState: dataState,
      currentLocale: this.locales[0]
    };
  }

  dataStateChange = event => {
    this.setState({
      dataResult: process(employees, event.data),
      dataState: event.data
    });
  };

  expandChange = event => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;

    this.setState({ ...this.state });
  };

  _pdfExport;
  exportExcel = () => {
    this._export.save();
  };

  _export;
  exportPDF = () => {
    this._pdfExport.save();
  };

  render() {
    return (

          <div>
            
              <Grid
                style={{ height: "700px" }}
                filterable
                reorderable
                pageable={{ buttonCount: 5, pageSizes: true }}
                data={this.state.dataResult}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}
                onExpandChange={this.expandChange}
              >
              

              <GridColumn  field="Amcom_Name"  title='Search Employee'  
                  cell={props => (


                    <div class="container">
                      <div class="row">
                          <div class="col-sm-3">
                            One of three columns
                          </div>

                          <div class="col-sm-9">

                            <div class="container">

                                <div class="row">
                                  <div class="col"><h6>{props.dataItem["Display_Name"]}</h6></div>
                                </div>
                                <div class="row">
                                
                                  <div class="col">E-Mail: {props.dataItem["Email_Address"]}</div>
                                  
                                  <div class="col">Mobile: {props.dataItem["Office_Num"]}</div>
                                
                                </div>
                            </div>
                        </div>
                       
                      </div>
                    </div>

                    )}

                 />
               
              </Grid>
        
            
          </div>

    );
  }
}

ReactDOM.render(<App />, document.querySelector("my-app"));
