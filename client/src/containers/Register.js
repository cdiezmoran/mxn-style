import React, { Component } from 'react';
import { connect } from 'react-redux';

import Register from 'components/Register';

const mapStateToProps = ({ plan }) => (
  {
    plan
  }
);

class RegisterPage extends Component {
  state = {
    email: '',
    name: '',
    brandName: '',
    depositAccount: '',
    page: 0,
    errors: {},
    password: '',
    address: {
      state: 'Ciudad de México',
      street: '',
      exterior: '',
      interior: '',
      postalCode: '',
      city: ''
    }
  }

  componentDidMount() {
    const { plan } = this.props;

    if (!plan) {
      document.getElementById('choosePlanModal').style.display = 'block';
    }
  }

  goToPage = (page) => this.setState({ page });

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  receiveState = (newState) => this.setState(newState);

  render() {
    const { email, password, name, brandName, depositAccount, page, errors, address } = this.state;

    return (
      <Register
        address={address}
        email={email}
        password={password}
        name={name}
        brandName={brandName}
        depositAccount={depositAccount}
        handleInputChange={this.handleInputChange}
        page={page}
        goToPage={this.goToPage}
        errors={errors}
        setState={this.receiveState}
      />
    );
  }
}

export default connect(mapStateToProps, null)(RegisterPage);
