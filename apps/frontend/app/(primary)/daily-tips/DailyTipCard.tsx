"use client";

import { IconBox, NavLink } from "@/components/common";
import { ForWithWrapper } from "@/components/common/for";
import { Card } from "@/components/ui";
import type { callBackendApi } from "@/lib/api/callBackendApi";
import type { TipsResponse } from "@/lib/api/callBackendApi/types";
import { cnMerge } from "@/lib/utils/cn";
import type {
	backendApiSchemaRoutes,
	BaseApiErrorResponse,
	BaseApiSuccessResponse,
	HealthTipSchemaType,
} from "@medinfo/shared/validation/backendApiSchema";
import type { CallApiResult, CallApiSuccessOrErrorVariant } from "@zayne-labs/callapi";
import { useDragScroll } from "@zayne-labs/ui-react/ui/drag-scroll";
import Image from "next/image";
import { z } from "zod";

export type DailyTipCardProps = z.infer<
	(typeof backendApiSchemaRoutes)["@get/health-tips/all"]["data"]
>["data"][number] & {
	className?: string;
};

export function DailyTipCard(props: DailyTipCardProps) {
	const { className, id, imageAlt, imageUrl, title } = props;

	return (
		<Card.Root
			as="li"
			className={cnMerge(
				`flex w-[161px] shrink-0 flex-col rounded-[16px] border-[1.4px] border-medinfo-light-1 pb-3
				max-md:gap-3 md:w-[276px] md:pb-7`,
				className
			)}
		>
			<Card.Header className="h-[117px] md:h-[176px]">
				<Image
					className="h-full rounded-t-[16px] object-cover"
					src={imageUrl}
					alt={imageAlt}
					draggable={false}
					width={161}
					height={117}
				/>
			</Card.Header>

			<Card.Content className="grow px-3 md:p-7">{title}</Card.Content>

			<Card.Footer className="px-3 md:px-7" asChild={true}>
				<NavLink href={`/daily-tips/${id}`} className="flex items-center gap-4">
					Learn More
					<IconBox icon="lucide:chevron-right" className="text-[20px]" />
				</NavLink>
			</Card.Footer>
		</Card.Root>
	);
}

type ScrollableCardProps = {
	result?: CallApiResult<BaseApiSuccessResponse<HealthTipSchemaType[]>, BaseApiErrorResponse>;
};

export function ScrollableTipCards(props: ScrollableCardProps) {
	const { result: tipsResult } = props;

	const { getItemProps, getRootProps } = useDragScroll<HTMLUListElement>({
		classNames: {
			base: "mt-6 select-none gap-5 md:mt-14 md:justify-between",
		},
	});

	if (!tipsResult || tipsResult.error) {
		tipsResult && console.error(tipsResult.error.errorData);

		return null;
	}

	return (
		<ForWithWrapper
			{...getRootProps()}
			each={tipsResult.data.data}
			renderItem={(tip) => (
				<DailyTipCard
					key={tip.id}
					id={tip.id}
					imageUrl={tip.imageUrl}
					title={tip.title}
					imageAlt={tip.imageAlt}
					{...getItemProps()}
				/>
			)}
		/>
	);
}
