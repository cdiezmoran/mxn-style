import React from 'react';
import { bool, func, string } from 'prop-types';
import shapes from '@shapes';
import styles from './Settings.scss';

import Section from './SettingsSection';
import ColorPicker from '../ColorPicker';

const { userShape } = shapes;

const positionStyles = {
  left: styles.containerLeft,
  right: styles.containerRight,
  down: styles.containerDown
}

const Settings = ({
  position,
  setState,
  display,
  user: { stylesheet, profilePic },
  setStylesheet,
  updateUser
}) => {
  const handleFileChange = ({ target: { name, files } }) => {
    if (files && files[0]) {
    const reader = new FileReader();

    reader.onload = ({ target: { result } }) => {
      // update image
      const properties = name === 'bgImage'
        ? { stylesheet: { ...stylesheet, bgImage: result } }
        : { profilePic: result };
      updateUser(properties);
    }

    reader.readAsDataURL(files[0]);
  }
  }

  return (
    <div className={`${positionStyles[position]} ${display ? styles.display : {}}`}>
      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.posControlLeft} ${position === 'left' ? styles.active: {}}`}
          onClick={() => setState({ settingsPos: 'left' })}
        >
          <i className="far fa-window-maximize" />
        </button>
        <button
          type="button"
          className={`${styles.posControlDown} ${position === 'down' ? styles.active: {}}`}
          onClick={() => setState({ settingsPos: 'down' })}
        >
          <i className="far fa-window-maximize" />
        </button>
        <button
          type="button"
          className={`${styles.posControlRight} ${position === 'right' ? styles.active: {}}`}
          onClick={() => setState({ settingsPos: 'right' })}
        >
          <i className="far fa-window-maximize" />
        </button>
        <div className={styles.horizontalDivider} />
        <button type="button" className={styles.close} onClick={() => setState({ displaySettings: false })}>
          <i className="fa fa-times" />
        </button>
      </div>
      <Section title="Imagenes" display={display}>
        <div className={styles.imageSelect}>
          <p className={styles.subTitle}>
            Imagen de Fondo
          </p>
          <div>

            {
              stylesheet.bgImage
                ? <img className={styles.bgImage} src={stylesheet.bgImage} alt="Tu imagen de fondo" style={{ backgroundColor: stylesheet.bgColor }} />
                : <div className={styles.bgImage} style={{ backgroundColor: stylesheet.bgColor }} />
            }

            <label htmlFor="bg-img-input" className={styles.imageLabel}>
              Subir Imagen
              <input
                id="bg-img-input"
                name="bgImage"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
          <p className={styles.recommended}>
            Recomendado: 1920 x 576. Ratio: 3.33
          </p>
        </div>
        <p className={styles.subTitle}>
          Color de Fondo
        </p>
        <ColorPicker selectedColor={stylesheet.bgColor} setStylesheet={setStylesheet} />
        <div className={styles.imageSelect}>
          <p className={styles.subTitle}>
            Imagen de Perfil
          </p>
          <div>
            <img className={styles.profileImg} src={profilePic} alt="foto de perfil" />
            <label htmlFor="profile-pic-input" className={styles.imageLabel}>
              Subir Imagen
              <input
                id="profile-pic-input"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
          <p className={styles.recommended}>
            Recomendado: 400 x 400. Ratio: 1
          </p>
        </div>
      </Section>
      <Section title="Informacion" display={display}>
        info
      </Section>
      <Section title="Contenido" display={display}>
        content
      </Section>
    </div>
  );
}

Settings.propTypes = {
  position: string.isRequired,
  setState: func.isRequired,
  display: bool.isRequired,
  setStylesheet: func.isRequired,
  updateUser: func.isRequired,
  user: userShape
};

Settings.defaultProps = {
  user: null
};

export default Settings;
