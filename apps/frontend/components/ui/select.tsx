import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { Select as SelectPrimitive } from "radix-ui";
import { IconBox } from "../common";

function SelectRoot(props: InferProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select-root" {...props} />;
}

function SelectGroup(props: InferProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: InferProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger(
	props: InferProps<typeof SelectPrimitive.Trigger> & {
		classNames?: { base?: string; icon?: string };
		icon?: string;
		size?: "default" | "sm";
	}
) {
	const { children, className, classNames, icon, size = "default", ...restOfProps } = props;

	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cnMerge(
				`flex w-full items-center justify-between gap-2 rounded-md border border-shadcn-input
				bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow]
				outline-none focus-visible:border-shadcn-ring focus-visible:ring-[3px]
				focus-visible:ring-shadcn-ring/50 disabled:cursor-not-allowed disabled:opacity-50
				aria-invalid:border-shadcn-destructive aria-invalid:ring-shadcn-destructive/20
				data-[placeholder]:text-shadcn-muted-foreground *:data-[slot=select-value]:line-clamp-1
				*:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center
				*:data-[slot=select-value]:gap-2 dark:aria-invalid:ring-shadcn-destructive/40
				[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
				[&_svg:not([class*='text-'])]:text-shadcn-muted-foreground`,
				size === "sm" && "h-8",
				size === "default" && "h-9",
				className,
				classNames?.base
			)}
			{...restOfProps}
		>
			{children}

			<SelectPrimitive.Icon asChild={true}>
				<IconBox
					icon={icon ?? "lucide:chevron-down"}
					className={cnMerge("size-4 opacity-50", classNames?.icon)}
				/>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectScrollUpButton(props: InferProps<typeof SelectPrimitive.ScrollUpButton>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cnMerge("flex cursor-default items-center justify-center py-1", className)}
			{...restOfProps}
		>
			<IconBox icon="lucide:chevron-up" className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton(props: InferProps<typeof SelectPrimitive.ScrollDownButton>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cnMerge("flex cursor-default items-center justify-center py-1", className)}
			{...restOfProps}
		>
			<IconBox icon="lucide:chevron-down" className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

function SelectContent(
	props: InferProps<typeof SelectPrimitive.Content> & {
		classNames?: { base?: string; viewport?: string };
	}
) {
	const { children, className, classNames, position = "popper", ...restOfProps } = props;

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cnMerge(
					`relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem]
					origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto
					rounded-md border bg-shadcn-popover text-shadcn-popover-foreground shadow-md
					data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
					data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
					data-[state=closed]:animate-out data-[state=closed]:fade-out-0
					data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0
					data-[state=open]:zoom-in-95`,
					position === "popper"
						&& `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
						data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
					[className, classNames?.base]
				)}
				position={position}
				{...restOfProps}
			>
				<SelectScrollUpButton />

				<SelectPrimitive.Viewport
					className={cnMerge(
						"flex flex-col p-1",
						position === "popper"
							&& `h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)
							scroll-my-1`,
						classNames?.viewport
					)}
				>
					{children}
				</SelectPrimitive.Viewport>

				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel(props: InferProps<typeof SelectPrimitive.Label>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cnMerge("px-2 py-1.5 text-xs text-shadcn-muted-foreground", className)}
			{...restOfProps}
		/>
	);
}

function SelectItem(props: InferProps<typeof SelectPrimitive.Item> & { withIndicator?: boolean }) {
	const { children, className, withIndicator = true, ...restOfProps } = props;

	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cnMerge(
				`relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm
				outline-hidden select-none focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none
				[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
				[&_svg:not([class*='text-'])]:text-shadcn-muted-foreground *:[span]:last:flex
				*:[span]:last:items-center *:[span]:last:gap-2`,
				className
			)}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="absolute right-2 flex size-3.5 items-center justify-center">
					<SelectPrimitive.ItemIndicator>
						<IconBox icon="lucide:check" className="size-4" />
					</SelectPrimitive.ItemIndicator>
				</span>
			)}

			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator(props: InferProps<typeof SelectPrimitive.Separator>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Separator
			className={cnMerge("pointer-events-none -mx-1 my-1 h-px bg-shadcn-border", className)}
			{...restOfProps}
		/>
	);
}

export const Root = SelectRoot;
export const Group = SelectGroup;
export const Value = SelectValue;
export const Content = SelectContent;
export const Item = SelectItem;
export const Label = SelectLabel;
export const ScrollDownButton = SelectScrollDownButton;
export const ScrollUpButton = SelectScrollUpButton;
export const Separator = SelectSeparator;
export const Trigger = SelectTrigger;
