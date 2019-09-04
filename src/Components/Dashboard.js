import React, { Component} from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Divider, Grid, Icon, Menu } from "semantic-ui-react";
import BarLine from "./BarLine";



class Dashboard extends Component {
  state = {
    dropdownMenuStyle: {
      display: "none"
    }
  }

  handleToggleDropdownMenu = () => {
    let newState = Object.assign({}, this.state);
    if (newState.dropdownMenuStyle.display === "none") {
      newState.dropdownMenuStyle = { display: "flex", backgroundColor:"#43425D", color:"#f0f0f0" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };

  
  render() {
    return (
      <div className="Dashboard">
        <Grid padded className="mobile only">
          <Menu borderless fluid fixed="top">
            <Menu.Item header as="a" >
              Gas Leak Finder
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  icon
                  toggle
                  onClick={this.handleToggleDropdownMenu}
                >
                  <Icon name="content" color="black"/>
                </Button>
              </Menu.Item>
            </Menu.Menu>
            <Menu
              borderless
              fluid
              vertical
              style={this.state.dropdownMenuStyle}
            >
              <Menu.Item as="a" className="data1">Coming Soon 2013</Menu.Item>
              <Menu.Item as="a" className="data2">Coming Soon 2014</Menu.Item>
              <Menu.Item as="a" className="data3">Coming Soon 2015</Menu.Item>
              <Menu.Item as="a" className="data4">Coming Soon 2016</Menu.Item>
              <Menu.Item as="a" className="data5">Coming Soon 2017</Menu.Item>
              <Menu.Item as="a" className="data6">2018</Menu.Item>
              <Menu.Item as="a" action ='/logged-out' type = 'submit' method= "GET" className="log-out red">Log Out</Menu.Item>

            </Menu>
          </Menu>
        </Grid>
        <Grid.Column>
          <Grid.Column
            tablet={3}
            computer={3}
            only="tablet computer"
            id="sidebar"
            textAlign="center"
          >
            <Menu vertical borderless fluid text>
            <Menu.Item as="a" className="headerTitle">Gas Leak Finder</Menu.Item>
            <Divider />
              <Menu.Item as="a" className="menuTitle">
                Overview
              </Menu.Item>
              <Divider />
              <Menu.Item as="a" className="data1">2013</Menu.Item>
              <Menu.Item as="a" className="data2">2014</Menu.Item>
              <Menu.Item as="a" className="data3">2015</Menu.Item>
              <Menu.Item as="a" className="data4">2016</Menu.Item>
              <Menu.Item as="a" className="data5">2017</Menu.Item>
              <Menu.Item as="a" className="data6">2018</Menu.Item>
              <Menu.Item as="a" action ='/logged-out' type = 'submit' method= "GET" className="log-out red">Log Out</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            mobile={4}
            tablet={4}
            computer={1}
            floated="right"
            id="content"
          >
            <Grid textAlign='center'>
                <Grid.Column tablet={6}>
                    <div id="container">
                      <svg width={500} height={600}>
                        <BarLine x={10} y={10} width={500} height={600} />
                      </svg>
                    </div>
                </Grid.Column>
        </Grid>
        </Grid.Column>
      </Grid.Column>
      </div>
    );
    }
  }

export default Dashboard;