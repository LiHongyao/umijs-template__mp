import React, { CSSProperties, FC, memo } from 'react';
import './index.less';

interface IProps {
  visible: boolean;
  round?: boolean;
  children?: JSX.Element | JSX.Element[];
  customStyle?: CSSProperties;
  customCls?: string;
  onClose?: () => void;
}

const Panel: FC<IProps> = props => {
  // props
  const { visible, round = true, children, customStyle, customCls } = props;
  // events
  const onMaskTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.persist();
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('lg-panel') && props.onClose) {
      props.onClose();
    }
  };
  // render
  return (
    <div className={`lg-panel ${visible ? 'visible' : ''}`} onClick={onMaskTap}>
      <div
        className={`lg-panel__contents ${round ? 'round' : ''} ${customCls ||
          ''}`}
        style={customStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(Panel);
