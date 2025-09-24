"use client";

import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { IconBox } from "../common";

function DropdownMenuRoot(props: InferProps<typeof DropdownMenuPrimitive.Root>) {
	return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal(props: InferProps<typeof DropdownMenuPrimitive.Portal>) {
	return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger(props: InferProps<typeof DropdownMenuPrimitive.Trigger>) {
	return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent(props: InferProps<typeof DropdownMenuPrimitive.Content>) {
	const { className, sideOffset = 4, ...restOfProps } = props;

	return (
		<DropdownMenuPortal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				className={cnMerge(
					`max-h-(--radix-dropdown-menu-content-available-height)
					origin-(--radix-dropdown-menu-content-transform-origin) bg-shadcn-popover
					text-shadcn-popover-foreground data-[side=bottom]:slide-in-from-top-2
					data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
					data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out
					data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in
					data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] overflow-y-auto
					overflow-x-hidden rounded-md border p-1 shadow-md`,
					className
				)}
				{...restOfProps}
			/>
		</DropdownMenuPortal>
	);
}

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
	return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem(
	props: InferProps<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
		variant?: "default" | "destructive";
	}
) {
	const { className, inset, variant, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-variant={variant}
			className={cnMerge(
				`outline-hidden focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[variant=destructive]:text-shadcn-destructive
				data-[variant=destructive]:focus:bg-shadcn-destructive/10
				data-[variant=destructive]:focus:text-shadcn-destructive
				dark:data-[variant=destructive]:focus:bg-shadcn-destructive/20
				[&_svg:not([class*='text-'])]:text-shadcn-muted-foreground
				data-[variant=destructive]:*:[svg]:text-shadcn-destructive! relative flex cursor-default
				select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50
				[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				inset && "pl-8",
				className
			)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuCheckboxItem(
	props: InferProps<typeof DropdownMenuPrimitive.CheckboxItem> & { withIndicator?: boolean }
) {
	const { checked, children, className, withIndicator = true, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={cnMerge(
				`outline-hidden focus:bg-shadcn-accent focus:text-shadcn-accent-foreground relative flex
				cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50
				[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className
			)}
			checked={checked}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<IconBox icon="radix-icons:check" className="size-4" />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioGroup(props: InferProps<typeof DropdownMenuPrimitive.RadioGroup>) {
	return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem(
	props: InferProps<typeof DropdownMenuPrimitive.RadioItem> & { withIndicator?: boolean }
) {
	const { children, className, withIndicator = true, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.RadioItem
			className={cnMerge(
				`outline-hidden focus:bg-shadcn-accent focus:text-shadcn-accent-foreground relative flex
				cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50
				[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`,
				className
			)}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<IconBox icon="radix-icons:dot-filled" className="size-4 fill-current" />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}

			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

function DropdownMenuLabel(props: InferProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
	const { className, inset, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			className={cnMerge("px-2 py-1.5 text-sm font-medium", inset && "pl-8", className)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuSeparator(props: InferProps<typeof DropdownMenuPrimitive.Separator>) {
	const { className, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cnMerge("bg-shadcn-border -mx-1 my-1 h-px", className)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuShortcut({ className, ...restOfProps }: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={cnMerge("text-shadcn-muted-foreground ml-auto text-xs tracking-widest", className)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuSubRoot(props: InferProps<typeof DropdownMenuPrimitive.Sub>) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub-root" {...props} />;
}

function DropdownMenuSubTrigger(
	props: InferProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
) {
	const { children, className, inset, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			className={cnMerge(
				`outline-hidden focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[state=open]:bg-shadcn-accent data-[state=open]:text-shadcn-accent-foreground flex
				cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm`,
				inset && "pl-8",
				className
			)}
			{...restOfProps}
		>
			{children}
			<IconBox icon="radix-icons:chevron-right" className="ml-auto size-4" />
		</DropdownMenuPrimitive.SubTrigger>
	);
}

function DropdownMenuSubContent(props: InferProps<typeof DropdownMenuPrimitive.SubContent>) {
	const { className, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			className={cnMerge(
				`origin-(--radix-dropdown-menu-content-transform-origin) bg-shadcn-popover
				text-shadcn-popover-foreground data-[side=bottom]:slide-in-from-top-2
				data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
				data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out
				data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in
				data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 min-w-[8rem] overflow-hidden
				rounded-md border p-1 shadow-lg`,
				className
			)}
			{...restOfProps}
		/>
	);
}

export const CheckboxItem = DropdownMenuCheckboxItem;
export const Content = DropdownMenuContent;
export const Group = DropdownMenuGroup;
export const Item = DropdownMenuItem;
export const Label = DropdownMenuLabel;
export const Portal = DropdownMenuPortal;
export const RadioGroup = DropdownMenuRadioGroup;
export const RadioItem = DropdownMenuRadioItem;
export const Root = DropdownMenuRoot;
export const Separator = DropdownMenuSeparator;
export const Shortcut = DropdownMenuShortcut;
export const SubRoot = DropdownMenuSubRoot;
export const SubContent = DropdownMenuSubContent;
export const SubTrigger = DropdownMenuSubTrigger;
export const Trigger = DropdownMenuTrigger;
