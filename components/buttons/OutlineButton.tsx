import { MouseEventHandler } from "react";
import styles from "./outlinebutton.module.scss";

interface Props {
  children: string | JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const OutlineButton = ({ children, onClick, disabled = false }: Props) => {
  return (
    <button 
      onClick={onClick} 
      className={`${styles.outlineButton} ${disabled ? styles.disabled : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
