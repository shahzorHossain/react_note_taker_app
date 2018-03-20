import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";

export default class NavigationBar extends Component {
  state = {
    activeItem: "home",
    login: "Sign In"
  };

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleLoginClick(e, { name }) {
    console.log(name);
    if (name === "Sign In") {
      this.setState({ login: "Logout" });
    } else if (name === "Logout") {
      this.setState({ login: "Sign In" });
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary color="yellow" size="massive">
        <Menu.Item>
          <Input icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name={this.state.login}
            active={activeItem === "logout"}
            onClick={this.handleLoginClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
