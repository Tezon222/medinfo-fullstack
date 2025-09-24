/* eslint-disable react/no-nested-component-definitions */
"use client";

import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import type { ExtractUnion } from "@zayne-labs/toolkit-type-helpers";
import { useEffect, useRef } from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { cnMerge } from "@/lib/utils/cn";
import { IconBox } from "../common";
import { type ShadcnButtonProps, shadcnButtonVariants } from "./constants";

export function Calendar(
	props: InferProps<typeof DayPicker> & {
		buttonVariant?: ExtractUnion<(typeof shadcnButtonVariants)["variants"]["variant"], "keys">;
		classNames?: InferProps<typeof DayPicker>["classNames"] & { base?: string };
	}
) {
	const {
		buttonVariant = "ghost",
		captionLayout = "label",
		className,
		classNames,
		components,
		formatters,
		showOutsideDays = true,
		...restOfProps
	} = props;

	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cnMerge(
				`group/calendar bg-shadcn-background in-data-[slot=card-content]:bg-transparent
				in-data-[slot=popover-content]:bg-transparent p-3 [--cell-size:--spacing(8)]`,
				// prettier-ignore
				String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
				// prettier-ignore
				String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
				className,
				classNames?.base
			)}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				...classNames,

				root: cnMerge("w-fit", defaultClassNames.root, classNames?.root),
				button_next: cnMerge(
					shadcnButtonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_next,
					classNames?.button_next
				),
				button_previous: cnMerge(
					shadcnButtonVariants({ variant: buttonVariant }),
					"size-(--cell-size) select-none p-0 aria-disabled:opacity-50",
					defaultClassNames.button_previous,
					classNames?.button_previous
				),
				caption_label: cnMerge(
					"select-none font-medium",
					captionLayout === "label" ? "text-sm" : (
						`[&>svg]:text-shadcn-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1
							text-sm [&>svg]:size-3.5`
					),
					defaultClassNames.caption_label,
					classNames?.caption_label
				),
				day: cnMerge(
					`group/day relative aspect-square h-full w-full select-none p-0 text-center
					[&:first-child[data-selected=true]_button]:rounded-l-md
					[&:last-child[data-selected=true]_button]:rounded-r-md`,
					defaultClassNames.day,
					classNames?.day
				),
				disabled: cnMerge(
					"text-shadcn-muted-foreground opacity-50",
					defaultClassNames.disabled,
					classNames?.disabled
				),
				dropdown: cnMerge(
					"absolute inset-0 opacity-0",
					defaultClassNames.dropdown,
					classNames?.dropdown
				),
				dropdown_root: cnMerge(
					`has-focus:border-ring border-shadcn-input shadow-xs has-focus:ring-[3px]
					has-focus:ring-shadcn-ring/50 relative rounded-md border`,
					defaultClassNames.dropdown_root,
					classNames?.dropdown_root
				),
				dropdowns: cnMerge(
					"h-(--cell-size) flex w-full items-center justify-center gap-1.5 text-sm font-medium",
					defaultClassNames.dropdowns,
					classNames?.dropdowns
				),
				hidden: cnMerge("invisible", defaultClassNames.hidden, classNames?.hidden),
				month: cnMerge("flex w-full flex-col gap-4", defaultClassNames.month, classNames?.month),
				month_caption: cnMerge(
					"h-(--cell-size) px-(--cell-size) flex w-full items-center justify-center",
					defaultClassNames.month_caption,
					classNames?.month_caption
				),
				months: cnMerge(
					"relative flex flex-col gap-4 md:flex-row",
					defaultClassNames.months,
					classNames?.months
				),
				nav: cnMerge(
					"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
					defaultClassNames.nav,
					classNames?.nav
				),
				outside: cnMerge(
					"text-shadcn-muted-foreground aria-selected:text-shadcn-muted-foreground",
					defaultClassNames.outside,
					classNames?.outside
				),
				range_end: cnMerge(
					"bg-shadcn-accent rounded-r-md",
					defaultClassNames.range_end,
					classNames?.range_end
				),
				range_middle: cnMerge(
					"rounded-none",
					defaultClassNames.range_middle,
					classNames?.range_middle
				),
				range_start: cnMerge(
					"bg-shadcn-accent rounded-l-md",
					defaultClassNames.range_start,
					classNames?.range_start
				),
				today: cnMerge(
					`bg-shadcn-accent text-shadcn-primary-foreground rounded-md
					data-[selected=true]:rounded-none`,
					defaultClassNames.today,
					classNames?.today
				),
				week: cnMerge("mt-2 flex w-full", defaultClassNames.week, classNames?.week),
				week_number: cnMerge(
					"text-shadcn-muted-foreground select-none text-[12.8px]",
					defaultClassNames.week_number,
					classNames?.week_number
				),
				week_number_header: cnMerge(
					"w-(--cell-size) select-none",
					defaultClassNames.week_number_header,
					classNames?.week_number_header
				),
				weekday: cnMerge(
					"text-shadcn-muted-foreground flex-1 select-none rounded-md text-[12.8px] font-normal",
					defaultClassNames.weekday,
					classNames?.weekday
				),
				weekdays: cnMerge("flex", defaultClassNames.weekdays, classNames?.weekdays),
			}}
			components={{
				Chevron: ({ className: innerClassName, orientation, ...innerRestOfProps }) => {
					if (orientation === "left") {
						return (
							<IconBox
								icon="lucide:chevron-left"
								className={cnMerge("size-4", innerClassName)}
								{...innerRestOfProps}
							/>
						);
					}

					if (orientation === "right") {
						return (
							<IconBox
								icon="lucide:chevron-right"
								className={cnMerge("size-4", innerClassName)}
								{...innerRestOfProps}
							/>
						);
					}

					return (
						<IconBox
							icon="lucide:chevron-down"
							className={cnMerge("size-4", innerClassName)}
							{...innerRestOfProps}
						/>
					);
				},

				DayButton: CalendarDayButton,

				Root: ({ className: innerClassName, rootRef, ...innerRestOfProps }) => {
					return (
						<div
							data-slot="calendar"
							ref={rootRef}
							className={cnMerge(innerClassName)}
							{...innerRestOfProps}
						/>
					);
				},

				WeekNumber: ({ children, ...innerRestOfProps }) => {
					return (
						<td {...innerRestOfProps}>
							<div className="size-(--cell-size) flex items-center justify-center text-center">
								{children}
							</div>
						</td>
					);
				},

				...components,
			}}
			{...restOfProps}
		/>
	);
}

export function CalendarDayButton(props: InferProps<typeof DayButton> & ShadcnButtonProps) {
	const { className, day, modifiers, variant = "ghost", size = "icon", ...restOfProps } = props;

	const defaultClassNames = getDefaultClassNames();

	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!modifiers.focused) return;

		ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<button
			type="button"
			ref={ref}
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={cnMerge(
				`min-w-(--cell-size) group-data-[focused=true]/day:ring-shadcn-ring/30
				data-[range-end=true]:bg-shadcn-primary data-[range-end=true]:text-shadcn-primary-foreground
				data-[range-middle=true]:bg-shadcn-accent
				data-[range-middle=true]:text-shadcn-primary-foreground
				data-[range-start=true]:bg-shadcn-primary
				data-[range-start=true]:text-shadcn-primary-foreground
				data-[selected-single=true]:bg-shadcn-primary
				data-[selected-single=true]:text-shadcn-primary-foreground
				dark:hover:text-shadcn-primary-foreground flex aspect-square size-auto w-full flex-col gap-1
				font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none
				data-[range-start=true]:rounded-md data-[range-end=true]:rounded-r-md
				data-[range-start=true]:rounded-l-md group-data-[focused=true]/day:relative
				group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs
				[&>span]:opacity-70`,
				defaultClassNames.day,
				shadcnButtonVariants({ size, variant }),
				className
			)}
			{...restOfProps}
		/>
	);
}
