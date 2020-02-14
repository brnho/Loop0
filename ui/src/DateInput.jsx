import React from 'react';
import DatePicker from 'react-datepicker';
 
import 'react-datepicker/dist/react-datepicker.css';
 
export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.date,
    }
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
    this.props.onDateChange(date);
  };
 
  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    );
  }
}