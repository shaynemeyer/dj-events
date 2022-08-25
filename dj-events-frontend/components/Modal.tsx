import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/Modal.module.css';

interface ModalProps {
  title?: string;
  show: boolean;
  onClose: () => void;
  children?: JSX.Element | JSX.Element[] | string[] | string;
}

const defaultProps = {
  show: false,
};

export default function Modal({ show, onClose, children, title }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true), []);

  const handleClose = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document?.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}

Modal.defaultProps = defaultProps;

// https://devrecipes.net/modal-component-with-next-js/
