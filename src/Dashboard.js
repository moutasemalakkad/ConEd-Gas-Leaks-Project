import React, { Component, useMemo } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Container
} from "semantic-ui-react";
import Hybrid from "./Hybrid";
import PieChart from "./PieChart";
import * as d3 from "d3";
import Faker from "faker";
import chroma from "chroma-js";
import { range } from "d3-array";
import { useTooltip, tooltipContext } from "./useToolTip";
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
      newState.dropdownMenuStyle = { display: "flex" };
    } else {
      newState.dropdownMenuStyle = { display: "none" };
    }

    this.setState(newState);
  };

  render() {
    return (
      <div className="Dashboard">
        <Grid padded className="tablet computer only">
          <Menu borderless fluid fixed="top">
            <Menu.Menu position="right">
              <Menu.Item as="a">
              <Header as='h4'>
                <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> 
              </Header>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless fluid fixed="top">
            <Menu.Item header as="a" >
              Gas Leak Finder
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button
                  basic
                  inverted
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
              inverted
              vertical
              style={this.state.dropdownMenuStyle}
            >
              <Menu.Item as="a" className="data1">Coming Soon 2013</Menu.Item>
              <Menu.Item as="a" className="data2">Coming Soon 2014</Menu.Item>
              <Menu.Item as="a" className="data3">Coming Soon 2015</Menu.Item>
              <Menu.Item as="a" className="data4">Coming Soon 2016</Menu.Item>
              <Menu.Item as="a" className="data5">Coming Soon 2017</Menu.Item>
              <Menu.Item as="a" className="data6">Coming Soon 2018</Menu.Item>
              <Menu.Item as="a" className="data7">2019</Menu.Item>
              <Menu.Item as="a" action ='/logged-out' type = 'submit' method= "GET" className="log-out red">Log Out</Menu.Item>

            </Menu>
          </Menu>
        </Grid>
        <Grid padded>
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
                View By Year
              </Menu.Item>
              <Divider />
              <Menu.Item as="a" className="data1">Coming Soon>2013</Menu.Item>
              <Menu.Item as="a" className="data2">Coming Soon</Menu.Item>
              <Menu.Item as="a" className="data3">Coming Soon</Menu.Item>
              <Menu.Item as="a" className="data4">Coming Soon</Menu.Item>
              <Menu.Item as="a" className="data5">Coming Soon</Menu.Item>
              <Menu.Item as="a" className="data6">Coming Soon</Menu.Item>
              <Menu.Item as="a" className="data7">2019</Menu.Item>
              <Menu.Item as="a" href='/logged-out' className="log-out"><Icon link name= "log out" color="red"/>Log Out</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={13}
            computer={13}
            floated="right"
            id="content"
          >
            <Grid padded>
              <Grid.Row>
                <Header size="large" as="h3">
                  Overview
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
            <Grid container stackable>
              <Grid.Column mobile={5} tablet={10} computer={8}>
                <Container id= 'layout'>
                  <Grid id="container">
                  <div>
              <svg width="1000" height="600">
                <BarLine x={10} y={10} width={1000} height={600} />
              </svg>
           </div>
  
    </Grid>
  </Container>
    </Grid.Column>
            </Grid>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Column>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  
}

export default Dashboard;