"use client";

import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";

export function ScrollArea(props: InferProps<typeof ScrollAreaPrimitive.Root>) {
	const { children, className, ...restProps } = props;

	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			className={cnMerge("relative", className)}
			{...restProps}
		>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none
					focus-visible:ring-[3px] focus-visible:ring-shadcn-ring/50 focus-visible:outline-1"
			>
				{children}
			</ScrollAreaPrimitive.Viewport>

			<ScrollBar />

			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
}

export function ScrollBar(
	props: InferProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
		classNames?: {
			base?: string;
			thumb?: string;
		};
	}
) {
	const { className, classNames, orientation = "vertical", ...restProps } = props;

	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cnMerge(
				"flex touch-none p-px transition-colors select-none",
				orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
				orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
				className,
				classNames?.base
			)}
			{...restProps}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb
				data-slot="scroll-area-thumb"
				className={cnMerge("relative flex-1 rounded-full bg-shadcn-border", classNames?.thumb)}
			/>
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
}
