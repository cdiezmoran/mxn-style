import React from 'react';
import { func, number, string } from 'prop-types';
import shapes from '@shapes';
import styles from './styles.scss';

import ProgressCircles from './ProgressCircles';
import DesignerForm from './DesignerForm';
import AccountForm from './AccountForm';

const { designerErrorsShape } = shapes;

const Register = ({
  email,
  password,
  name,
  brandName,
  depositAccount,
  handleInputChange,
  page,
  goToPage,
  errors,
  setState
}) => {
  const renderContent = () => {
    switch (page) {
      case 0:
        return (
          <AccountForm
            email={email}
            password={password}
            handleChange={handleInputChange}
            goToPage={goToPage}
            errors={errors}
            setState={setState}
          />
        )
      case 1:
        return (
          <DesignerForm
            name={name}
            brandName={brandName}
            depositAccount={depositAccount}
            handleChange={handleInputChange}
            goToPage={goToPage}
            errors={errors}
            setState={setState}
          />
        );
      default:
        return <div>Content</div>
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p>
          Mexican Style
        </p>
      </div>
      <div className={styles.contentCard}>
        <ProgressCircles progress={page} />
        {renderContent()}
      </div>
    </div>
  );
};

Register.propTypes = {
  email: string.isRequired,
  password: string.isRequired,
  name: string.isRequired,
  brandName: string.isRequired,
  depositAccount: string.isRequired,
  handleInputChange: func.isRequired,
  page: number.isRequired,
  goToPage: func.isRequired,
  errors: designerErrorsShape.isRequired,
  setState: func.isRequired
};

export default Register;
