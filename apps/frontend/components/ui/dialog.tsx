"use client";

import { createCustomContext, useCallbackRef, useToggle } from "@zayne-labs/toolkit-react";
import { composeEventHandlers, type InferProps } from "@zayne-labs/toolkit-react/utils";
import { isFunction } from "@zayne-labs/toolkit-type-helpers";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useCallback, useMemo } from "react";
import { cnMerge } from "@/lib/utils/cn";
import { IconBox } from "../common/IconBox";

type ContextValue = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	setOpen: (open: boolean) => void;
};

const [DialogContextProvider, useDialogContext] = createCustomContext<ContextValue>();

function DialogRoot(props: InferProps<typeof DialogPrimitive.Root>) {
	// eslint-disable-next-line ts-eslint/unbound-method
	const { defaultOpen, onOpenChange: setOpenProp, open: openProp, ...restOfProps } = props;

	const savedSetOpenProp = useCallbackRef(setOpenProp);

	const [internalOpen, toggleInternalOpen] = useToggle(defaultOpen);

	// == Use the open prop if it is provided
	// == Otherwise, use the internal open state
	const isOpen = openProp ?? internalOpen;

	const setOpen = useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const resolvedValue = isFunction(value) ? value(isOpen) : value;

			// == Call the onOpenChange prop if the openProp is provided
			// == Otherwise, toggle the internal open state
			const selectedOpenChange = openProp ? savedSetOpenProp : toggleInternalOpen;

			selectedOpenChange(resolvedValue);
		},
		[isOpen, openProp, savedSetOpenProp, toggleInternalOpen]
	);

	const onClose = useCallbackRef(() => setOpen(false));
	const onOpen = useCallbackRef(() => setOpen(true));

	const contextValue = useMemo(
		() => ({ isOpen, onClose, onOpen, setOpen }) satisfies ContextValue,
		[onClose, onOpen, isOpen, setOpen]
	);

	return (
		<DialogContextProvider value={contextValue}>
			<DialogPrimitive.Root
				{...restOfProps}
				data-slot="dialog-root"
				open={isOpen}
				onOpenChange={setOpen}
			/>
		</DialogContextProvider>
	);
}

type RenderFn = (props: ContextValue) => React.ReactNode;

function DialogContext(props: { children: RenderFn }) {
	const { children } = props;

	const dialogCtx = useDialogContext();

	return children(dialogCtx);
}

function DialogOverlay(props: InferProps<typeof DialogPrimitive.Overlay>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Overlay
			className={cnMerge(
				`data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in
				data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50`,
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogClose(props: InferProps<typeof DialogPrimitive.Close>) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogContent(props: InferProps<typeof DialogPrimitive.Content> & { withCloseBtn?: boolean }) {
	const { children, className, withCloseBtn = true, ...restOfProps } = props;

	return (
		<DialogPortal>
			<DialogOverlay />

			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cnMerge(
					`translate-[-50%] bg-shadcn-background data-[state=closed]:animate-out
					data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in
					data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50
					grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200
					sm:max-w-lg`,
					className
				)}
				{...restOfProps}
			>
				{children}

				{withCloseBtn && (
					<DialogClose
						className="rounded-xs ring-offset-shadcn-background focus:ring-shadcn-ring
							focus:outline-hidden data-[state=open]:bg-shadcn-accent
							data-[state=open]:text-shadcn-muted-foreground absolute right-4 top-4 opacity-70
							transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2
							disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4
							[&_svg]:pointer-events-none [&_svg]:shrink-0"
					>
						<IconBox icon="lucide:x" className="size-4" />
						<span className="sr-only">Close</span>
					</DialogClose>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

function DialogHeader(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return (
		<div
			data-slot="dialog-header"
			className={cnMerge("flex flex-col gap-2 text-center sm:text-left", className)}
			{...restOfProps}
		/>
	);
}

function DialogPortal(props: InferProps<typeof DialogPrimitive.Portal>) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogFooter(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return (
		<div
			data-slot="dialog-footer"
			className={cnMerge("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
			{...restOfProps}
		/>
	);
}

function DialogTitle(props: InferProps<typeof DialogPrimitive.Title>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cnMerge("text-lg font-semibold leading-none", className)}
			{...restOfProps}
		/>
	);
}

function DialogTrigger(props: InferProps<typeof DialogPrimitive.Trigger>) {
	const { onClick, ...restOfProps } = props;
	const { onOpen } = useDialogContext();

	return (
		<DialogPrimitive.Trigger
			data-slot="dialog-trigger"
			{...restOfProps}
			onClick={composeEventHandlers(onClick, onOpen)}
		/>
	);
}

function DialogDescription(props: InferProps<typeof DialogPrimitive.Description>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cnMerge("text-shadcn-muted-foreground text-sm", className)}
			{...restOfProps}
		/>
	);
}

export const Root = DialogRoot;

export const Context = DialogContext;

export const Close = DialogClose;

export const Content = DialogContent;

export const Description = DialogDescription;

export const Footer = DialogFooter;

export const Header = DialogHeader;

export const Overlay = DialogOverlay;

export const Portal = DialogPortal;

export const Title = DialogTitle;

export const Trigger = DialogTrigger;

// eslint-disable-next-line react-refresh/only-export-components
export { useDialogContext };
