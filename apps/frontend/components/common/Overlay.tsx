import { cnMerge } from "@/lib/utils/cn";
import { useId } from "react";

type OverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
};

function Overlay(props: OverlayProps) {
	const { isOpen, onClose, className } = props;

	const id = useId();

	return (
		<div
			id={`Overlay-(${id})`}
			onClick={onClose}
			className={cnMerge(
				"fixed bg-[hsl(0,0%,0%,0.6)] [backdrop-filter:blur(0.4rem)] [inset:0_0_0_auto] lg:hidden",
				isOpen ? "w-screen" : "w-0",
				className
			)}
		/>
	);
}

export default Overlay;
