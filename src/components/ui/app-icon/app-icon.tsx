interface AppIconProps {
  size?: number;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const AppIcon = ({ Icon, size = 24 }: AppIconProps) => {
  const IconNode = (
    <Icon
      focusable={false}
      aria-hidden={true}
      width={size}
      height={size}
    />
  );

  return <div>{IconNode}</div>;
};

export default AppIcon;
