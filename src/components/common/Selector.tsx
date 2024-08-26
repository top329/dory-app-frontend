import React, { ChangeEvent } from 'react';

interface SelectorProps {
  options: string[];
  onSelectChange: (selected: string) => void;
  style?: React.CSSProperties;
}

interface SelectorState {
  selectedValue: string;
}

class Selector extends React.Component<SelectorProps, SelectorState> {
  constructor(props: SelectorProps) {
    super(props);
    this.state = { 
      selectedValue: this.props.options[0]
    };
  }

  handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value;
    this.setState({ selectedValue });
    this.props.onSelectChange(selectedValue); 
  };

  render() {
    const { options, style } = this.props; 

    return (
      <select
        value={this.state.selectedValue}
        onChange={this.handleChange}
        style={style}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

export default Selector;
