import { cnMerge } from "@/lib/utils/cn";

function Main(props: React.ComponentPropsWithoutRef<"main">) {
	const { children, className, ...restOfProps } = props;

	return (
		<main
			className={cnMerge("flex grow flex-col px-6 py-14 md:px-10 md:pb-[92px] md:pt-10", className)}
			{...restOfProps}
		>
			{children}
		</main>
	);
}

export default Main;
