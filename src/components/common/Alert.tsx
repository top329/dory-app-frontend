import { ReactNode, forwardRef } from 'react';

import IconClose from '@/assets/icons/circle_close.svg';

interface AlertProps {
  show: boolean;
  className?: string;
  icon?: ReactNode;
  value: ReactNode;
  onClose?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ show, className, icon, value, onClose }, ref) => {
  return (
    <>
      {show && (
        <div className={`${className} relative flex items-center p-[10px] rounded-lg gap-4`} ref={ref}>
          {icon && <>{icon}</>}
          {value}
          {onClose && (
            <div className="w-[22px] h-[22px] absolute right-[-7px] top-[-12px] cursor-pointer" onClick={onClose}>
              <IconClose />
            </div>
          )}
        </div>
      )}
    </>
  );
});

Alert.displayName = 'Alert';
export default Alert;
