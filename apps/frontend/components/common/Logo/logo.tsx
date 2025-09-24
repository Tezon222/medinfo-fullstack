import Link from "next/link";
import { LOGO_TYPE_LOOKUP } from "./logo-type-lookup";

const Logo = (
	props: React.SVGProps<SVGSVGElement> & {
		type?: "header" | "footer";
		href?: "none" | (string & NonNullable<unknown>);
	}
) => {
	const { type = "header", href = "/", ...restOfProps } = props;

	const { [type]: LogoType } = LOGO_TYPE_LOOKUP;

	return (
		<Link href={href}>
			<LogoType {...restOfProps} />
		</Link>
	);
};

export default Logo;
