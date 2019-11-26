
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

  render() {
      return (
        <Dialog 
            onClose={this.props.cancel}>
                  <div className="row">
                    <div className="col p-3">
                      <img  src="https://cdn.jsdelivr.net/gh/pgbijwe1981/react-sz1tuo@master/boss.png" className="rounded mx-auto d-block img-responsive" alt={this.state.selectedEmployee.Display_Name} />
                    </div>
                  </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Product Name<br />
                    <Input
                        type="text"
                        name="Email_Address"
                        value={this.state.selectedEmployee.Display_Name}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Units In Stock<br />
                    <NumericTextBox
                        name="UnitsInStock"
                        value={ this.state.selectedEmployee.Email_Address}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="Discontinued"
                            checked={this.state.selectedEmployee.Email_Address || false}
                            onChange={this.onDialogInputChange}
                        />
                        Discontinued product
                    </label>
                </div>
           
            <DialogActionsBar>
                <button
                    className="k-button"
                    onClick={this.props.cancel}
                >
                    Cancel
                </button>
                <button
                    className="k-button k-primary"
                    onClick={this.props.save}
                >
                    Save
                </button>
            </DialogActionsBar>
        </Dialog>
    );
  }
}

