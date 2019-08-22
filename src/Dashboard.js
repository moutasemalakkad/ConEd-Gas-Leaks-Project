import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu
} from "semantic-ui-react";

class Dashboard extends Component {
  state = {
    dropdownMenuStyle: {
      display: "none"
    }
  };

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
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as="a">
              Gas Leak Tracker
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as="a">Jane Doe 
              <Image 
                alt='User Avatar'
                src='/static/images/wireframe/Avatar.png' avatar 
                size='small'  
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid>
        <Grid padded className="mobile only">
          <Menu borderless inverted fluid fixed="top">
            <Menu.Item header as="a">
              Gas Leak Tracker
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
                  <Icon name="content" />
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
              <Menu.Item as="a" className="data1">2013</Menu.Item>
              <Menu.Item as="a" className="data2">2014</Menu.Item>
              <Menu.Item as="a" className="data3">2015</Menu.Item>
              <Menu.Item as="a" className="data4">2016</Menu.Item>
              <Menu.Item as="a" className="data5">2017</Menu.Item>
              <Menu.Item as="a" className="data6">2018</Menu.Item>
              <Menu.Item as="a" className="data7">2019</Menu.Item>
            </Menu>
          </Menu>
        </Grid>
        <Grid padded>
          <Grid.Column
            tablet={3}
            computer={3}
            only="tablet computer"
            id="sidebar"
          >
            <Menu vertical borderless fluid text>
              <Menu.Item as="a" className="menuTitle">
                View By Year
                <Divider />
              </Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2013</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2014</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2015</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2016</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2017</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2018</Menu.Item>
              <Menu.Item as="a"><Icon link name= 'calendar alternate outline' />2019</Menu.Item>
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
            <Grid container stackable columns={2}>
              <Grid.Column mobile={5} tablet={10} computer={8}>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </Grid.Column>
              <Grid.Column mobile={5} tablet={6} computer={6}>
              <Grid.Row>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </Grid.Row>
              <Divider/>
              <Grid.Row mobile={5} tablet={6} computer={6}>
                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </Grid.Row>
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