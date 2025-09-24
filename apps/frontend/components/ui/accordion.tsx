"use client";

import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cnMerge } from "@/lib/utils/cn";
import { IconBox } from "../common/IconBox";

function AccordionRoot(props: InferProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot="accordion-root" {...props} />;
}

function AccordionItem(props: InferProps<typeof AccordionPrimitive.Item>) {
	const { className, ...restOfProps } = props;

	return <AccordionPrimitive.Item data-slot="accordion-item" className={className} {...restOfProps} />;
}

function AccordionTrigger(
	props: InferProps<typeof AccordionPrimitive.Trigger> & {
		classNames?: { base?: string; header?: string; icon?: string };
		withIcon?: boolean;
	}
) {
	const { children, className, classNames, withIcon = true, ...restOfProps } = props;

	return (
		<AccordionPrimitive.Header className={cnMerge("flex", classNames?.header)}>
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cnMerge(
					`focus-visible:border-shadcn-ring focus-visible:ring-shadcn-ring/50 flex flex-1 items-start
					justify-between gap-4 rounded-md text-left text-[14px] font-medium outline-none
					transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50
					[&[data-state=open]>[data-icon]>svg]:rotate-180 [&[data-state=open]>svg]:rotate-180`,
					className,
					classNames?.base
				)}
				{...restOfProps}
			>
				{children}

				{withIcon && (
					<IconBox
						icon="radix-icons:chevron-down"
						className={cnMerge(
							`text-shadcn-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5
							transition-transform duration-200`,
							classNames?.icon
						)}
					/>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent(props: InferProps<typeof AccordionPrimitive.Content>) {
	const { children, className, ...restOfProps } = props;

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down
				overflow-hidden text-[14px]"
			{...restOfProps}
		>
			<div className={className}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export const Root = AccordionRoot;

export const Item = AccordionItem;

export const Trigger = AccordionTrigger;

export const Content = AccordionContent;
