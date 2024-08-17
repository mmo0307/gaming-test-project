interface AlertProps {
  isOpen: boolean;

  isSuccess: boolean;

  vertical?: 'top' | 'bottom';

  horizontal?: 'left' | 'center' | 'right';

  onClose: () => void;
}

export type { AlertProps };
