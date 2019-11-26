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
import DialogContainer from './DialogContainer.jsx';
import "./assets/main.css"

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
      currentLocale: this.locales[0],
      selectedEmployee: undefined
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

cancel = () => {
        this.setState({ selectedEmployee: undefined });
    }

save = () => {
        this.setState({ selectedEmployee: undefined });
    }

 edit = (dataItem) => {
        this.setState({ selectedEmployee: this.cloneEmployee(dataItem) });
    }

  cloneEmployee(empolyee) {
        return Object.assign({}, empolyee);
    }

  render() {
    return (

          <div>
            <div className="text-center p-3"><h3>Information Systems Employee Directory</h3></div>
              <Grid
                style={{ height: "700px" }}
                filterable
                pageable={{ buttonCount: 5, pageSizes: true }}
                data={this.state.dataResult}
                {...this.state.dataState}
                onDataStateChange={this.dataStateChange}
                onExpandChange={this.expandChange}
              >
              
  
              <GridColumn  field="Amcom_Name"  title='Search Employee'  filterable={true} 
                  cell={props => (
                  <td>
                    <div className="container" onClick={this.edit}>
                    
                      <div className="row">
                          <div className="col-sm-3 p-2">
                            <img src="https://cdn.jsdelivr.net/gh/pgbijwe1981/react-sz1tuo@master/boss.png" className="rounded" alt="..." />
                          </div>

                          <div className="col-sm-9 p-3">

                            <div className="container">

                                <div className="row">
                                  <div className="col"><h5>{props.dataItem["Display_Name"]}</h5></div>
                                </div>
                                <div className="row">
                                
                                  <div className="col">Email: {props.dataItem["Email_Address"]}</div>
                                  
                                  <div className="col">Phone: {props.dataItem["Office_Num"]}</div>
                                
                                </div>
                            </div>
                        </div>
                       
                      </div>
                    </div>
                    </td>
                    )}

                 />
               
              </Grid>
        {this.state.selectedEmployee && <DialogContainer dataItem={this.state.selectedEmployee} save={this.save} cancel={this.cancel}/>}
            
          </div>

    );
  }
}

ReactDOM.render(<App />, document.querySelector("my-app"));
