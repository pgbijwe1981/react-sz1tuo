
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import "./assets/main.css"

export default class DialogContaincer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          selectedEmployee: this.props.dataItem || null
      };
  }
  handleSubmit(event) {
      event.preventDefault();
  }

  onDialogInputChange = (event) => {
      let target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.props ? target.props.name : target.name;

      const edited = this.state.productInEdit;
      edited[name] = value;

      this.setState({
          productInEdit: edited
      });
  }

 callApi(){
    // Github fetch library : https://github.com/github/fetch
    // Call the API page
    fetch('https://facebook.github.io/react-native/movies.json')
    .then((result) => {
      // Get the result
      // If we want text, call result.text()
      return result.json();
    }).then((jsonResult) => {
      // Do something with the result
      console.log(jsonResult);
    })
  }

sendText = (dataItem) => {
        
        alert('Text sent to ' + dataItem.Office_Num +' !!!')
            
 fetch('https://facebook.github.io/react-native/movies.json')
    .then((result) => {
      // Get the result
      // If we want text, call result.text()
      return result.json();
    }).then((jsonResult) => {
      // Do something with the result
      console.log(jsonResult);
    })

    }


makeACall = (dataItem) => {
    console.log('calling... ' + dataItem.Office_Num)
}


  render() {
      return (
        <Dialog 
            onClose={this.props.cancel}>
                <div className="row">
                  <div className="col p-3">
                    <img  src="https://cdn.jsdelivr.net/gh/pgbijwe1981/react-sz1tuo@master/boss128.png" className="rounded mx-auto d-block img-responsive" alt={this.state.selectedEmployee.Display_Name} />
                  </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center"><h5>{this.state.selectedEmployee.Display_Name}</h5></div>
                </div>
                 <div className="row" style={{ marginBottom: '1rem' }}>
                    <div className="col-sm-12 text-center">{this.state.selectedEmployee.Display_Department_Name}</div>
                </div>
                <div className="row border-top p-3" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                        <div className="col text-center">Email: {this.state.selectedEmployee.Email_Address}</div>
                </div>
                 <div className="row border-top p-3" style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                        <div className="col  text-center">Phone: {this.state.selectedEmployee.Office_Num}</div>
                </div>

 <button value="SendText"
                    className="k-button"
                    onClick={() => { this.sendText(this.state.selectedEmployee); }}
                >
                    Send Text
                </button>
 <button value="Call"
                    className="k-button"
                    onClick={() => { this.makeACall(this.state.selectedEmployee); }}
                >
                    Call
                </button>
            <DialogActionsBar>
                <button value="Close"
                    className="k-button"
                    onClick={this.props.cancel}
                >
                    Close
                </button>
                
            </DialogActionsBar>
        </Dialog>
    );
  }
}

