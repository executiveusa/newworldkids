import React from "react";

const EIN = "85-1516064";
const DONATE_URL = `https://www.every.org/${EIN}?method=card,bank,paypal,venmo,pay,crypto,stocks,daf#donate`;

type EveryOrgDonateProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string;
};

const EveryOrgDonate: React.FC<EveryOrgDonateProps> = ({
  label = "Donate",
  className = "",
  children,
  ...rest
}) => {
  return (
    <a
      data-every-style
      href={DONATE_URL}
      className={className}
      {...rest}
    >
      {children ?? label}
    </a>
  );
};

export default EveryOrgDonate;
